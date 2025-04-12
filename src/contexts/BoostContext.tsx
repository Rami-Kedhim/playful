
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { useAuth } from '@/hooks/auth/useAuth';
import { useBoostEffects } from '@/hooks/boost/useBoostEffects';
import { useBoostOperations } from '@/hooks/boost/useBoostOperations';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';

// Define the context interface
export interface BoostContextType {
  boostStatus: BoostStatus;
  isLoading: boolean;
  error: string | null;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  purchaseBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  boostAnalytics: AnalyticsData | null;
  fetchAnalytics: () => Promise<AnalyticsData | null>;
}

// Create context with default values
const BoostContext = createContext<BoostContextType | undefined>(undefined);

// Provider component
interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider = ({ children }: BoostProviderProps) => {
  const { user } = useAuth();
  const [boostAnalytics, setBoostAnalytics] = useState<AnalyticsData | null>(null);
  
  // Use custom hooks to separate logic
  const {
    boostStatus,
    isLoading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    setBoostStatus,
    setIsLoading,
    setError,
    setDailyBoostUsage
  } = useBoostEffects(user?.id);

  const {
    checkActiveBoost,
    purchaseBoost,
    cancelBoost,
    fetchAnalytics: fetchBoostAnalytics
  } = useBoostOperations(
    user?.id, 
    boostStatus, 
    setBoostStatus, 
    setIsLoading, 
    setError, 
    setDailyBoostUsage
  );
  
  // Fetch analytics data for current boost
  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
    const analytics = await fetchBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
    }
    return analytics;
  };

  const value = {
    boostStatus,
    isLoading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost,
    boostAnalytics,
    fetchAnalytics
  };

  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};

// Hook for using the boost context
export const useBoostContext = () => {
  const context = useContext(BoostContext);
  
  if (context === undefined) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return context;
};
