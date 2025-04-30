
import { useState, useEffect } from 'react';
import { PulseBoost } from '@/types/pulse-boost';
import { pulseBoostService } from '@/services/boost/pulseBoostService';
import { useAuth } from '@/hooks/auth';
import { BoostPackage } from '@/types/boost';

const usePulseBoost = (profileId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pulseBoostPackages, setPulseBoostPackages] = useState<BoostPackage[]>([]);
  const [activeBoosts, setActiveBoosts] = useState<any[]>([]);
  const [userEconomy, setUserEconomy] = useState<{ ubxBalance: number; paidBalance: number }>({
    ubxBalance: 0,
    paidBalance: 0
  });
  
  const { user } = useAuth();
  const effectiveProfileId = profileId || user?.id;

  // Load boost packages
  useEffect(() => {
    const fetchBoostPackages = async () => {
      if (!effectiveProfileId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch available boost packages
        const { data: packages, error } = await pulseBoostService.getBoostPackages();
        
        if (error) {
          setError(error.message || 'Failed to load boost packages');
          return;
        }
        
        if (packages) {
          setPulseBoostPackages(packages);
        }
        
        // Fetch active boosts for the profile
        const { data: activeBoostsData, error: activeBoostError } = 
          await pulseBoostService.getActiveBoosts(effectiveProfileId);
        
        if (activeBoostError) {
          console.error('Error fetching active boosts:', activeBoostError);
        } else if (activeBoostsData) {
          setActiveBoosts(activeBoostsData);
        }
        
        // Fetch user economy
        const { data: economyData, error: economyError } = 
          await pulseBoostService.getUserEconomy(effectiveProfileId);
        
        if (economyError) {
          console.error('Error fetching user economy:', economyError);
        } else if (economyData) {
          // Handle different response formats by converting to consistent format
          if ('ubx_balance' in economyData && 'paid_balance' in economyData) {
            setUserEconomy({
              ubxBalance: economyData.ubx_balance || 0,
              paidBalance: economyData.paid_balance || 0
            });
          } else {
            setUserEconomy(economyData);
          }
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        console.error('Error in usePulseBoost:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBoostPackages();
  }, [effectiveProfileId]);
  
  // Purchase a boost package
  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    if (!effectiveProfileId) return false;
    
    try {
      const { success, error } = await pulseBoostService.purchaseBoost(
        effectiveProfileId,
        boostPackage.id
      );
      
      if (error) {
        setError(error.message || 'Failed to purchase boost');
        return false;
      }
      
      // Refresh data after successful purchase
      const { data: updatedBoosts } = await pulseBoostService.getActiveBoosts(effectiveProfileId);
      if (updatedBoosts) {
        setActiveBoosts(updatedBoosts);
      }
      
      // Refresh economy data
      const { data: updatedEconomy } = await pulseBoostService.getUserEconomy(effectiveProfileId);
      if (updatedEconomy) {
        // Handle different response formats
        if ('ubx_balance' in updatedEconomy && 'paid_balance' in updatedEconomy) {
          setUserEconomy({
            ubxBalance: updatedEconomy.ubx_balance || 0,
            paidBalance: updatedEconomy.paid_balance || 0
          });
        } else {
          setUserEconomy(updatedEconomy);
        }
      }
      
      return success || false;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while purchasing boost');
      console.error('Error purchasing boost:', err);
      return false;
    }
  };
  
  // Cancel an active boost
  const cancelBoost = async (boostId?: string): Promise<boolean> => {
    if (!effectiveProfileId) return false;
    
    try {
      const { success, error } = await pulseBoostService.cancelBoost(
        effectiveProfileId,
        boostId
      );
      
      if (error) {
        setError(error.message || 'Failed to cancel boost');
        return false;
      }
      
      // Refresh data after successful cancellation
      const { data: updatedBoosts } = await pulseBoostService.getActiveBoosts(effectiveProfileId);
      if (updatedBoosts) {
        setActiveBoosts(updatedBoosts);
      }
      
      return success || false;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while cancelling boost');
      console.error('Error cancelling boost:', err);
      return false;
    }
  };

  return {
    isLoading,
    error,
    pulseBoostPackages,
    activeBoosts,
    userEconomy,
    purchaseBoost,
    cancelBoost
  };
};

export default usePulseBoost;
