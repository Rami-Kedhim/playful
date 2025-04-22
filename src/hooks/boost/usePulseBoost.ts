
import { useState, useEffect } from 'react';
import { useBoost } from '@/hooks/boost/useBoost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';
import { PulseBoost, BoostPackage, ActiveBoost, EnhancedBoostStatus } from '@/types/boost';

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
  
  // Convert packages to PulseBoost format
  const pulseBoostPackages: BoostPackage[] = packages || [];
  
  useEffect(() => {
    const loadBoostData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, we'd fetch data from an API
        // For now, simulate with mock data based on boostStatus
        
        const mockUserEconomy = {
          ubxBalance: 500,
          walletAddress: '0x1234...5678'
        };
        
        setUserEconomy(mockUserEconomy);
        
        if (boostStatus?.isActive && boostStatus.packageId) {
          const boostPackage = packages.find(pkg => pkg.id === boostStatus.packageId);
          
          if (boostPackage) {
            // Create a mock active boost
            const mockActiveBoost: ActiveBoost = {
              boostId: boostStatus.packageId,
              startedAt: boostStatus.startTime ? new Date(boostStatus.startTime) : new Date(),
              expiresAt: boostStatus.endTime ? new Date(boostStatus.endTime) : new Date(),
              timeRemaining: boostStatus.remainingTime || '00:00:00',
              boostDetails: boostPackage
            };
            
            setActiveBoosts([mockActiveBoost]);
            
            // Create enhanced boost status
            const enhancedStatus: EnhancedBoostStatus = {
              ...boostStatus,
              pulseData: {
                boostType: boostPackage.name,
                visibility: boostPackage.id === 'basic' ? 'homepage' : 
                            boostPackage.id === 'standard' ? 'platform' : 'global',
                coverage: boostPackage.visibility_increase || 50
              }
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
  
  // Purchase a boost
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
  
  // Cancel a boost
  const cancelActiveBoost = async (boostId?: string): Promise<boolean> => {
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
