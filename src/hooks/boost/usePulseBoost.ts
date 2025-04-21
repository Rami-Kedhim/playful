
import { useState, useEffect } from 'react';
import { UserEconomy, PulseBoost, EnhancedBoostStatus } from '@/types/pulse-boost';
import { toast } from '@/hooks/use-toast';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';
import { useAuth } from '@/hooks/auth/useAuth';
import { useBoostManager } from '@/hooks/boost';
import {
  applyPulseBoost,
  autoApplyPulseBoosts,
  cleanExpiredPulseBoosts,
  hasAnyActiveBoost,
  getActiveBoostDetails,
  calculatePulseBoostPower
} from '@/services/pulseBoostService';
import { formatDistanceToNow } from 'date-fns';

export interface UsePulseBoostReturn {
  userEconomy: UserEconomy | null;
  isLoading: boolean;
  error: string | null;
  purchaseBoost: (boostId: string) => Promise<boolean>;
  cancelBoost: (boostId: string) => Promise<boolean>;
  refreshBoosts: () => void;
  hasActiveBoost: boolean;
  activeBoosts: ReturnType<typeof getActiveBoostDetails>;
  boostPower: number;
  enhancedBoostStatus: EnhancedBoostStatus;
  pulseBoostPackages: PulseBoost[];
}

// Combines both boost systems to provide unified functionality
export const usePulseBoost = (profileId?: string): UsePulseBoostReturn => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userEconomy, setUserEconomy] = useState<UserEconomy | null>(null);
  
  // Get the legacy boost system
  const { 
    boostStatus,
    boostPackages,
    purchaseBoost: purchaseLegacyBoost,
    cancelBoost: cancelLegacyBoost
  } = useBoostManager(profileId || user?.id);
  
  // Initialize user economy data
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch this data from an API
        // For now, we'll create mock data based on the user profile
        
        const mockUserEconomy: UserEconomy = {
          userId: user.id,
          ubxBalance: profile?.ubx_balance || 0,
          subscriptionLevel: (profile?.subscription_tier || 'free') as any,
          subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          activeBoosts: []
        };
        
        setUserEconomy(mockUserEconomy);
        
        // Auto apply boosts based on subscription
        setTimeout(() => {
          setUserEconomy(prev => {
            if (!prev) return prev;
            return autoApplyPulseBoosts(prev);
          });
        }, 500);
      } catch (err: any) {
        setError(err.message || 'Failed to load user economy data');
        toast({
          title: "Error",
          description: "Failed to load boost data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Set up an interval to clean expired boosts
    const interval = setInterval(() => {
      setUserEconomy(prev => {
        if (!prev) return prev;
        return cleanExpiredPulseBoosts(prev);
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user?.id, profile?.ubx_balance]);
  
  // Purchase a boost
  const purchaseBoost = async (boostId: string): Promise<boolean> => {
    if (!userEconomy) {
      toast({
        title: "Error",
        description: "User data not loaded",
        variant: "destructive",
      });
      return false;
    }
    
    const boost = PULSE_BOOSTS.find(b => b.id === boostId);
    if (!boost) {
      toast({
        title: "Error",
        description: "Boost package not found",
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      const result = applyPulseBoost(userEconomy, boost);
      
      if (result instanceof Error) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
        return false;
      }
      
      setUserEconomy(result);
      
      toast({
        title: "Boost Activated",
        description: `${boost.name} has been applied to your profile!`,
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to purchase boost');
      toast({
        title: "Error",
        description: "Failed to activate boost",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cancel a specific boost
  const cancelBoost = async (boostId: string): Promise<boolean> => {
    if (!userEconomy) return false;
    
    setIsLoading(true);
    
    try {
      const updatedUserEconomy = {
        ...userEconomy,
        activeBoosts: userEconomy.activeBoosts.filter(boost => boost.boostId !== boostId)
      };
      
      setUserEconomy(updatedUserEconomy);
      
      toast({
        title: "Boost Cancelled",
        description: "The boost has been cancelled",
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel boost');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Refresh boosts manually
  const refreshBoosts = () => {
    if (!userEconomy) return;
    
    setUserEconomy(prev => {
      if (!prev) return prev;
      return cleanExpiredPulseBoosts(prev);
    });
  };
  
  // Calculate derived values
  const hasActiveBoost = userEconomy ? hasAnyActiveBoost(userEconomy) : false;
  const activeBoosts = userEconomy ? getActiveBoostDetails(userEconomy) : [];
  const boostPower = userEconomy ? calculatePulseBoostPower(userEconomy) : 0;
  
  // Combine the legacy boost status with Pulse boost info
  const enhancedBoostStatus: EnhancedBoostStatus = {
    ...boostStatus,
    pulseData: hasActiveBoost ? {
      visibility: activeBoosts[0]?.boostDetails?.visibility || 'unknown',
      pulseLevel: boostPower,
      boostType: activeBoosts[0]?.boostDetails?.name || 'Unknown Boost'
    } : undefined
  };
  
  return {
    userEconomy,
    isLoading,
    error,
    purchaseBoost,
    cancelBoost,
    refreshBoosts,
    hasActiveBoost,
    activeBoosts,
    boostPower,
    enhancedBoostStatus,
    pulseBoostPackages: PULSE_BOOSTS
  };
};
