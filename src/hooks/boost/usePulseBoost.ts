
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { 
  BoostPackage, 
  EnhancedBoostStatus, 
  ActiveBoost,
  UserEconomy,
  UsePulseBoostReturn
} from '@/types/boost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';
import { getPulsePackages } from '@/services/boost/pulseService';

// Default configuration
const DEFAULT_ENHANCED_STATUS: EnhancedBoostStatus = {
  isActive: false,
  pulseData: {
    boostType: 'none',
    visibility: 'standard',
    coverage: 0
  }
};

export const usePulseBoost = (profileId?: string): UsePulseBoostReturn => {
  const { user } = useAuth();
  const userId = profileId || user?.id;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pulseLevel, setPulseLevel] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [enhancedStatus, setEnhancedStatus] = useState<EnhancedBoostStatus>(DEFAULT_ENHANCED_STATUS);
  const [userEconomy, setUserEconomy] = useState<UserEconomy | null>(null);
  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>([]);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        // Load boost packages
        const packages = await getPulsePackages();
        setBoostPackages(packages);
        
        // Fetch user's active boosts
        const { data: boostsData, error: boostsError } = await supabase
          .from('active_boosts')
          .select('*')
          .eq('user_id', userId);
          
        if (boostsError) throw new Error(boostsError.message);
        
        // Process active boosts
        if (boostsData && boostsData.length > 0) {
          const activeUserBoosts = boostsData.map(boost => {
            const boostPackage = packages.find(p => p.id === boost.package_id);
            const expiresAt = new Date(boost.end_time);
            const now = new Date();
            
            // Calculate remaining time
            const remainingMs = expiresAt.getTime() - now.getTime();
            const remainingHours = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60)));
            const remainingMinutes = Math.max(0, Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)));
            
            return {
              boostId: boost.package_id,
              startedAt: new Date(boost.created_at),
              expiresAt,
              timeRemaining: `${remainingHours}h ${remainingMinutes}m`,
              boostDetails: boostPackage
            };
          });
          
          setActiveBoosts(activeUserBoosts);
          
          if (activeUserBoosts.length > 0) {
            setIsActive(true);
            setPulseLevel(Math.max(...activeUserBoosts.map(b => b.boostDetails?.boostLevel || 0)));
            
            // Enhanced status with the highest level boost
            const topBoost = activeUserBoosts.reduce((prev, current) => {
              return (prev.boostDetails?.boostLevel || 0) > (current.boostDetails?.boostLevel || 0) ? prev : current;
            });
            
            setEnhancedStatus({
              isActive: true,
              timeRemaining: topBoost.timeRemaining,
              expiresAt: topBoost.expiresAt,
              endTime: topBoost.expiresAt,
              level: topBoost.boostDetails?.boostLevel,
              pulseData: {
                boostType: topBoost.boostDetails?.name || 'standard',
                visibility: `${Math.round((topBoost.boostDetails?.boostLevel || 1) * 50)}% increased`,
                coverage: (topBoost.boostDetails?.boostLevel || 1) * 25
              }
            });
          }
        }
        
        // Fetch user economy data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('ubx_balance')
          .eq('id', userId)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          throw new Error(profileError.message);
        }
        
        if (profileData) {
          setUserEconomy({
            ubxBalance: profileData.ubx_balance || 0
          });
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error in usePulseBoost:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);
  
  // Apply a new pulse boost
  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      setError(null);
      
      // Check if user has enough UBX balance
      if (!userEconomy || userEconomy.ubxBalance < boostPackage.price) {
        setError('Insufficient UBX balance');
        return false;
      }
      
      // Calculate end time based on duration
      const durationHours = parseInt(boostPackage.duration.split(' ')[0], 10);
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + durationHours);
      
      // Begin transaction
      const { data: boostData, error: boostError } = await supabase
        .from('active_boosts')
        .insert({
          user_id: userId,
          package_id: boostPackage.id,
          end_time: endTime.toISOString(),
          status: 'active',
          boost_data: {
            level: boostPackage.boostLevel,
            name: boostPackage.name
          }
        })
        .select();
      
      if (boostError) throw new Error(boostError.message);
      
      // Deduct UBX from user balance
      const { error: balanceError } = await supabase
        .from('profiles')
        .update({ 
          ubx_balance: (userEconomy.ubxBalance - boostPackage.price),
          last_boost: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (balanceError) throw new Error(balanceError.message);
      
      // Record transaction
      const { error: txError } = await supabase
        .from('ubx_transactions')
        .insert({
          user_id: userId,
          amount: -boostPackage.price,
          transaction_type: 'boost_purchase',
          description: `Purchased ${boostPackage.name} boost`,
          metadata: { boost_id: boostPackage.id }
        });
        
      if (txError) throw new Error(txError.message);
      
      // Update local state
      setUserEconomy({
        ...userEconomy,
        ubxBalance: userEconomy.ubxBalance - boostPackage.price
      });
      
      const newActiveBoost: ActiveBoost = {
        boostId: boostPackage.id,
        startedAt: new Date(),
        expiresAt: endTime,
        timeRemaining: `${durationHours}h 0m`,
        boostDetails: boostPackage
      };
      
      setActiveBoosts([...activeBoosts, newActiveBoost]);
      setIsActive(true);
      setPulseLevel(Math.max(pulseLevel, boostPackage.boostLevel));
      
      setEnhancedStatus({
        isActive: true,
        timeRemaining: `${durationHours}h 0m`,
        expiresAt: endTime,
        endTime: endTime,
        level: boostPackage.boostLevel,
        pulseData: {
          boostType: boostPackage.name,
          visibility: `${Math.round(boostPackage.boostLevel * 50)}% increased`,
          coverage: boostPackage.boostLevel * 25
        }
      });
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase boost');
      console.error('Error purchasing boost:', err);
      return false;
    }
  };
  
  // Cancel an active boost
  const cancelBoost = async (boostId?: string): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      setError(null);
      
      const targetBoostId = boostId || (activeBoosts.length > 0 ? activeBoosts[0].boostId : null);
      
      if (!targetBoostId) {
        setError('No active boost to cancel');
        return false;
      }
      
      // Update status in database
      const { error: cancelError } = await supabase
        .from('active_boosts')
        .update({ status: 'cancelled' })
        .eq('user_id', userId)
        .eq('package_id', targetBoostId);
        
      if (cancelError) throw new Error(cancelError.message);
      
      // Update local state
      const updatedBoosts = activeBoosts.filter(boost => boost.boostId !== targetBoostId);
      setActiveBoosts(updatedBoosts);
      
      if (updatedBoosts.length === 0) {
        setIsActive(false);
        setPulseLevel(0);
        setEnhancedStatus(DEFAULT_ENHANCED_STATUS);
      } else {
        // Recalculate highest remaining boost
        const highestRemaining = updatedBoosts.reduce((prev, current) => {
          return (prev.boostDetails?.boostLevel || 0) > (current.boostDetails?.boostLevel || 0) ? prev : current;
        });
        
        setPulseLevel(highestRemaining.boostDetails?.boostLevel || 0);
        setEnhancedStatus({
          isActive: true,
          timeRemaining: highestRemaining.timeRemaining,
          expiresAt: highestRemaining.expiresAt,
          endTime: highestRemaining.expiresAt,
          level: highestRemaining.boostDetails?.boostLevel,
          pulseData: {
            boostType: highestRemaining.boostDetails?.name || 'standard',
            visibility: `${Math.round((highestRemaining.boostDetails?.boostLevel || 1) * 50)}% increased`,
            coverage: (highestRemaining.boostDetails?.boostLevel || 1) * 25
          }
        });
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel boost');
      console.error('Error cancelling boost:', err);
      return false;
    }
  };

  // Return the values matching the expected interface
  return {
    isLoading: loading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    activeBoosts,
    enhancedBoostStatus: enhancedStatus,
    pulseBoostPackages: boostPackages
  };
};
