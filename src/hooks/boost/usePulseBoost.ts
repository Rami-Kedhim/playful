
import { useState, useEffect } from 'react';
import { useBoost } from '@/hooks/boost/useBoost';
import { BoostPackage } from '@/types/boost';
import { ActiveBoost, EnhancedBoostStatus } from '@/types/pulse-boost';

export const usePulseBoost = (profileId?: string) => {
  const { boostStatus, packages, boostProfile, cancelBoost } = useBoost();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>([]);
  const [enhancedBoostStatus, setEnhancedBoostStatus] = useState<EnhancedBoostStatus>({
    isActive: false
  });
  const [userEconomy, setUserEconomy] = useState({
    ubxBalance: 0
  });

  const pulseBoostPackages: BoostPackage[] = packages || [];

  useEffect(() => {
    const loadBoostData = async () => {
      setIsLoading(true);
      try {
        // Mock user economy data
        const mockUserEconomy = {
          ubxBalance: 500,
          walletAddress: '0x1234...5678'
        };

        setUserEconomy(mockUserEconomy);

        if (boostStatus?.isActive && boostStatus.packageId) {
          const boostPackage = packages.find(pkg => pkg.id === boostStatus.packageId);

          if (boostPackage) {
            // Convert startTime and endTime to Date if they are strings
            const startTimeDate = boostStatus.startTime instanceof Date
              ? boostStatus.startTime
              : (boostStatus.startTime ? new Date(boostStatus.startTime) : new Date());
            const endTimeDate = boostStatus.endTime instanceof Date
              ? boostStatus.endTime
              : (boostStatus.endTime ? new Date(boostStatus.endTime) : undefined);

            const mockActiveBoost: ActiveBoost = {
              boostId: boostStatus.packageId,
              startedAt: startTimeDate,
              expiresAt: endTimeDate,
              timeRemaining: boostStatus.remainingTime || '00:00:00',
              boostDetails: boostPackage,
            };

            setActiveBoosts([mockActiveBoost]);

            const enhancedStatus: EnhancedBoostStatus = {
              ...boostStatus,
              startTime: startTimeDate,
              endTime: endTimeDate,
              expiresAt: endTimeDate || new Date(),
              pulseData: {
                boostType: boostPackage.name,
                visibility: boostPackage.id === 'basic' ? 'homepage' :
                            boostPackage.id === 'premium' ? 'search' : 'global',
                coverage: boostPackage.visibility_increase || 50
              },
              isActive: true
            };

            setEnhancedBoostStatus(enhancedStatus);
          }
        } else {
          setActiveBoosts([]);
          setEnhancedBoostStatus({ isActive: false });
        }
      } catch (err: any) {
        console.error("Error loading Pulse Boost data:", err);
        setError(err.message || "Failed to load boost data");
      } finally {
        setIsLoading(false);
      }
    };

    loadBoostData();
  }, [boostStatus, packages, profileId]);

  const purchaseBoost = async (pkg: BoostPackage): Promise<boolean> => {
    if (!profileId) return false;

    try {
      const result = await boostProfile(profileId, pkg.id);
      return !!result;
    } catch (err: any) {
      console.error("Error purchasing boost:", err);
      setError(err.message || "Failed to purchase boost");
      return false;
    }
  };

  const cancelActiveBoost = async (): Promise<boolean> => {
    try {
      const result = await cancelBoost();
      return !!result;
    } catch (err: any) {
      console.error("Error cancelling boost:", err);
      setError(err.message || "Failed to cancel boost");
      return false;
    }
  };

  return {
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost: cancelActiveBoost,
    activeBoosts,
    enhancedBoostStatus,
    pulseBoostPackages
  };
};

export default usePulseBoost;
