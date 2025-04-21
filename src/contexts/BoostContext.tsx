
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BoostStatus } from '@/types/boost';
import { AnalyticsData } from '@/components/boost/types';
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
    boostStatus,
    eligibility,
    purchaseBoost,
    cancelBoost,
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
      setAnalyticsData(data);
    };
    
    fetchData();
  }, [boostStatus.isActive, getBoostAnalytics]);
  
  // Function to fetch analytics on demand
  const fetchAnalytics = async () => {
    try {
      const data = await getBoostAnalytics();
      setAnalyticsData(data);
      return data;
    } catch (err) {
      console.error("Error fetching analytics:", err);
      return null;
    }
  };
  
  // Create a safe boostStatus object with progress 
  const safeBoostStatus: BoostStatus = {
    ...boostStatus,
    progress: boostStatus.progress || 0
  };
  
  // Create safe analytics data
  const safeAnalyticsData: AnalyticsData = analyticsData || {
    impressions: 0,
    clicks: 0,
    engagementRate: 0,
    conversionRate: 0,
    boostEfficiency: 0
  };
  
  const value: BoostContextType = {
    boostStatus: safeBoostStatus,
    isLoading: loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost,
    boostAnalytics: safeAnalyticsData,
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
