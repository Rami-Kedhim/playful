
import { useState, useEffect } from 'react';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';
import { 
  BoostPackage, 
  UsePulseBoostReturn, 
  UserEconomy, 
  ActiveBoost,
  EnhancedBoostStatus,
  PulseBoost
} from '@/types/boost';
import { formatPulseBoostDuration, convertDurationToMinutes } from '@/constants/pulseBoostConfig';

// Convert our standard BoostPackage to PulseBoost
const convertToPulseBoost = (boostPackage: BoostPackage): PulseBoost => {
  return {
    id: boostPackage.id,
    name: boostPackage.name,
    durationMinutes: convertDurationToMinutes(boostPackage.duration),
    description: boostPackage.description,
    visibility: boostPackage.id === 'basic' ? 'homepage' : 
               boostPackage.id === 'premium' ? 'search' : 'global',
    costUBX: boostPackage.price_ubx || boostPackage.price,
    badgeColor: boostPackage.color
  };
};

export function usePulseBoost(profileId?: string): UsePulseBoostReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userEconomy, setUserEconomy] = useState<UserEconomy | null>(null);
  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>([]);
  const [enhancedBoostStatus, setEnhancedBoostStatus] = useState<EnhancedBoostStatus>({
    isActive: false,
  });
  const [pulseBoostPackages, setPulseBoostPackages] = useState<BoostPackage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call to get boost packages
        const packages = PULSE_BOOSTS;
        
        // Enhance the packages with price_ubx field for compatibility
        const enhancedPackages = packages.map(pkg => ({
          ...pkg,
          price_ubx: pkg.price
        }));
        
        setPulseBoostPackages(enhancedPackages);
        
        // Simulate API call to get user economy data
        setUserEconomy({
          ubxBalance: 500, // Mock balance
          walletAddress: '0x123...abc'
        });
        
        // Check if there's an active boost
        const mockActiveBoost = {
          isActive: false,
          pulseData: {
            boostType: 'Standard Boost',
            visibility: 'Homepage',
            coverage: 75,
          }
        };
        
        setEnhancedBoostStatus(mockActiveBoost);
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch boost data');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [profileId]);

  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
      console.log(`Purchasing boost: ${boostPackage.id} for profile: ${profileId}`);
      
      // Create new active boost
      const now = new Date();
      const expirationTime = new Date(now.getTime() + convertDurationToMinutes(boostPackage.duration) * 60 * 1000);
      
      const newBoost: ActiveBoost = {
        boostId: boostPackage.id,
        startedAt: now,
        expiresAt: expirationTime,
        timeRemaining: formatPulseBoostDuration(convertDurationToMinutes(boostPackage.duration)),
        boostDetails: boostPackage
      };
      
      // Update state
      setActiveBoosts(prev => [...prev, newBoost]);
      
      // Update enhanced status
      setEnhancedBoostStatus({
        isActive: true,
        endTime: expirationTime,
        remainingTime: formatPulseBoostDuration(convertDurationToMinutes(boostPackage.duration)),
        pulseData: {
          boostType: boostPackage.name,
          visibility: boostPackage.id === 'basic' ? 'Homepage' : 
                     boostPackage.id === 'premium' ? 'Search Results' : 'Global',
          coverage: boostPackage.boostLevel * 20
        }
      });
      
      // Update user economy (deduct balance)
      if (userEconomy) {
        const newBalance = userEconomy.ubxBalance - (boostPackage.price_ubx || boostPackage.price);
        setUserEconomy({
          ...userEconomy,
          ubxBalance: newBalance > 0 ? newBalance : 0
        });
      }
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Failed to purchase boost');
      setIsLoading(false);
      return false;
    }
  };

  const cancelBoost = async (boostId?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
      console.log(`Cancelling boost for profile: ${profileId}`);
      
      // If boostId is provided, only cancel that specific boost
      if (boostId) {
        setActiveBoosts(prev => prev.filter(boost => boost.boostId !== boostId));
      } else {
        // Cancel all active boosts
        setActiveBoosts([]);
      }
      
      // Reset enhanced status
      setEnhancedBoostStatus({
        isActive: false
      });
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Failed to cancel boost');
      setIsLoading(false);
      return false;
    }
  };

  return {
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    activeBoosts,
    enhancedBoostStatus,
    pulseBoostPackages
  };
}
