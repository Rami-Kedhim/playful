
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
    purchaseBoost: purchaseBoostOperation,
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
  
  // Wrapper function that accepts packageId string to match the interface
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    // Find the package by ID - in a real app this would fetch from an API or cache
    const mockPackages = [
      {
        id: "boost-1",
        name: "1-Hour Boost",
        duration: "01:00:00",
        price_ubx: 5,
        description: "Quick visibility boost",
        features: ["Top search position", "Featured badge"]
      },
      {
        id: "boost-3",
        name: "3-Hour Boost",
        duration: "03:00:00",
        price_ubx: 15,
        description: "Standard visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting"]
      },
      {
        id: "boost-24",
        name: "24-Hour Boost",
        duration: "24:00:00",
        price_ubx: 50,
        description: "Full day visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting", "Priority in all listings"]
      }
    ] as BoostPackage[];
    
    const packageToBoost = mockPackages.find(p => p.id === packageId);
    if (!packageToBoost) {
      return false;
    }
    
    return await purchaseBoostOperation(packageToBoost);
  };
  
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
