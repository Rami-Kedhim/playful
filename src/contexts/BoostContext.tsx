
import { ReactNode, useState, useEffect } from 'react';
import { BoostContext, BoostContextType } from '@/hooks/boost/useBoostContext';
import { useBoostManager } from '@/hooks/boost';
import { useAuth } from '@/hooks/auth/useAuth';

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider = ({ children }: BoostProviderProps) => {
  const { user } = useAuth();
  const profileId = user?.id;
  
  const {
    boostStatus,
    getBoostAnalytics,
    purchaseBoost,
    cancelBoost,
    loading: isLoading,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(profileId);
  
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  
  // Fetch analytics when boost status is active
  useEffect(() => {
    if (boostStatus.isActive) {
      fetchAnalytics();
    }
  }, [boostStatus.isActive]);
  
  const fetchAnalytics = async () => {
    if (boostStatus.isActive) {
      const analytics = await getBoostAnalytics();
      if (analytics) {
        setBoostAnalytics(analytics);
        return analytics;
      }
    }
    return null;
  };
  
  // Construct the context value
  const contextValue: BoostContextType = {
    boostStatus,
    boostAnalytics,
    isLoading,
    purchaseBoost,
    cancelBoost,
    fetchAnalytics,
    dailyBoostUsage: dailyBoostUsage || 0,
    dailyBoostLimit: dailyBoostLimit || 4
  };
  
  return (
    <BoostContext.Provider value={contextValue}>
      {children}
    </BoostContext.Provider>
  );
};
