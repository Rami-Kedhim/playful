
import { useEffect, useState } from 'react';
import { useBoostContext } from '@/contexts/BoostContext';
import { usePulseBoost } from '@/hooks/boost/usePulseBoost';
import { useAuth } from '@/hooks/auth/useAuth';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';

interface LucieBrainData {
  knowsAboutBoosts: boolean;
  activeBoost?: {
    name: string;
    timeRemaining: string;
    visibility: string;
  };
  canRecommendBoost?: boolean;
  recommendedBoost?: {
    id: string;
    name: string;
    cost: number;
    description: string;
  };
  userSubscription?: string;
  boostStatus?: 'active' | 'inactive';
  ubxBalance?: number;
}

export const useLucieBrainEnhance = () => {
  const [brainData, setBrainData] = useState<LucieBrainData>({ 
    knowsAboutBoosts: true 
  });
  const { boostStatus } = useBoostContext();
  const { userEconomy, activeBoosts, pulseBoostPackages } = usePulseBoost();
  const { profile } = useAuth();

  useEffect(() => {
    if (boostStatus || activeBoosts || userEconomy) {
      // Determine if there's an active boost
      const isActive = boostStatus?.isActive || activeBoosts?.length > 0;

      // Get active boost details
      let activeBoostDetails;
      if (activeBoosts && activeBoosts.length > 0) {
        const firstBoost = activeBoosts[0];
        activeBoostDetails = {
          name: firstBoost.boostDetails?.name || 'Active Boost',
          timeRemaining: firstBoost.timeRemaining,
          visibility: firstBoost.boostDetails?.visibility || 'standard',
        };
      } else if (boostStatus?.isActive) {
        activeBoostDetails = {
          name: boostStatus?.pulseData?.boostType || 'Active Boost',
          timeRemaining: boostStatus?.remainingTime || 'unknown',
          visibility: boostStatus?.pulseData?.visibility || 'standard',
        };
      }
      
      // Recommend a boost if none active or almost expired
      const shouldRecommendBoost = !isActive || 
        (activeBoostDetails?.timeRemaining && activeBoostDetails.timeRemaining.includes('minutes'));
      
      // Find an appropriate boost to recommend
      let recommendedBoost;
      if (shouldRecommendBoost && pulseBoostPackages && pulseBoostPackages.length > 0) {
        // Find a boost that the user can afford
        const affordableBoosts = pulseBoostPackages.filter(
          boost => boost.costUBX <= (userEconomy?.ubxBalance || 0)
        );
        
        if (affordableBoosts.length > 0) {
          // Sort by duration/price value
          const sortedByValue = [...affordableBoosts].sort((a, b) => {
            const aValue = a.durationMinutes / a.costUBX;
            const bValue = b.durationMinutes / b.costUBX;
            return bValue - aValue; // Best value first
          });
          
          const boost = sortedByValue[0];
          recommendedBoost = {
            id: boost.id,
            name: boost.name,
            cost: boost.costUBX,
            description: boost.description || `Boost your profile for ${boost.durationMinutes / 60} hours`,
          };
        }
      }
      
      // Update brain data with all our gathered information
      setBrainData({
        knowsAboutBoosts: true,
        activeBoost: isActive ? activeBoostDetails : undefined,
        canRecommendBoost: shouldRecommendBoost && !!recommendedBoost,
        recommendedBoost,
        userSubscription: profile?.subscription_tier || 'free',
        boostStatus: isActive ? 'active' : 'inactive',
        ubxBalance: userEconomy?.ubxBalance || profile?.ubx_balance || 0
      });
    }
  }, [boostStatus, activeBoosts, userEconomy, pulseBoostPackages, profile]);

  return {
    brainData,
    pulseBoosts: PULSE_BOOSTS,
    updateBrainData: (partialData: Partial<LucieBrainData>) => {
      setBrainData(prev => ({ ...prev, ...partialData }));
    }
  };
};
