
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';
import { useBoostManager } from '@/hooks/boost';

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
  error?: string;
}

// Create context with default values
export const BoostContext = createContext<BoostContextType | undefined>(undefined);

// Provider component
export const BoostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  
  // Get the current user ID (this would ideally come from an auth context)
  const userId = "current-user-id"; // Placeholder
  
  // Use the boost manager hook
  const {
    boostStatus: managerBoostStatus,
    eligibility,
    purchaseBoost: purchaseLegacyBoost,
    cancelBoost: cancelLegacyBoost,
    loading,
    error,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(userId);
  
  // Fetch analytics on load and when boost status changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBoostAnalytics();
      if (data) {
        setAnalyticsData(data);
      }
    };
    
    fetchData();
  }, [managerBoostStatus.isActive, getBoostAnalytics]);
  
  // Function to fetch analytics on demand
  const fetchAnalytics = async () => {
    try {
      const data = await getBoostAnalytics();
      if (data) {
        setAnalyticsData(data);
      }
      return data;
    } catch (err) {
      console.error("Error fetching analytics:", err);
      return null;
    }
  };
  
  // Create a BoostStatus that adheres to the interface
  const boostStatus: BoostStatus = {
    isActive: managerBoostStatus.isActive,
    progress: managerBoostStatus.progress,
    startTime: managerBoostStatus.startTime ? 
      (typeof managerBoostStatus.startTime === 'string' ? 
        managerBoostStatus.startTime : 
        managerBoostStatus.startTime.toISOString()) : 
      undefined,
    endTime: managerBoostStatus.endTime ? 
      (typeof managerBoostStatus.endTime === 'string' ? 
        managerBoostStatus.endTime : 
        managerBoostStatus.endTime.toISOString()) : 
      undefined,
    timeRemaining: managerBoostStatus.timeRemaining,
    packageId: managerBoostStatus.packageId,
    packageName: managerBoostStatus.packageName,
  };
  
  // Adapt purchaseBoost to accept packageId string
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    // In a real app, we'd fetch the package from API or find it in state
    const mockPackage: BoostPackage = {
      id: packageId,
      name: "Standard Boost",
      duration: "24:00:00",
      price_ubx: 15, // Ensure price is included
      description: "Standard boost package",
      features: []
    };
    
    return await purchaseLegacyBoost(mockPackage);
  };
  
  const value: BoostContextType = {
    boostStatus,
    isLoading: loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost: cancelLegacyBoost,
    boostAnalytics: analyticsData,
    fetchAnalytics
  };
  
  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};

// Hook for easy context consumption
export const useBoostContext = () => {
  const context = useContext(BoostContext);
  if (context === undefined) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  return context;
};
