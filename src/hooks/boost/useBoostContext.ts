
import { createContext, useContext } from 'react';
import { BoostStatus } from '@/types/boost';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';

// Define the context interface
export interface BoostContextType {
  boostStatus: BoostStatus;
  boostAnalytics: AnalyticsData | null;
  isLoading: boolean;
  purchaseBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  fetchAnalytics: () => Promise<AnalyticsData | null>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
}

// Create context with default values
export const BoostContext = createContext<BoostContextType | undefined>(undefined);

// Hook for easy context consumption
export const useBoostContext = () => {
  const context = useContext(BoostContext);
  if (context === undefined) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  return context;
};
