
import { useState, useCallback } from "react";
import { BoostAnalytics } from "@/types/boost";

// Define the AnalyticsData interface to match the properties used in components
export interface AnalyticsData {
  views: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  clicks: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  searchRanking: {
    withBoost: number;
    withoutBoost: number;
    improvement: number;
  };
  effectiveness: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}

export const useBoostAnalytics = (profileId?: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch analytics for a profile's boost
  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    if (!profileId) return null;
    
    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      // For now, we'll use mock data that follows the Oxum Ethical Boosting Model
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const mockAnalytics: AnalyticsData = {
        views: {
          withBoost: 128,
          withoutBoost: 42,
          increase: 205 // percentage
        },
        clicks: {
          withBoost: 24,
          withoutBoost: 7,
          increase: 243 // percentage
        },
        searchRanking: {
          withBoost: 3, // Average position with boost
          withoutBoost: 14, // Average position without boost
          improvement: 79 // percentage
        },
        effectiveness: 87, // Overall effectiveness score
        additionalViews: 86, // Additional views from boost
        engagementIncrease: 243, // Same as clicks increase
        rankingPosition: 3 // Same as searchRanking.withBoost
      };
      
      setAnalytics(mockAnalytics);
      return mockAnalytics;
    } catch (err: any) {
      console.error("Error fetching boost analytics:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return {
    analytics,
    loading,
    fetchAnalytics
  };
};
