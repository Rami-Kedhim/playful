
import { useState } from 'react';
import { BoostAnalytics } from '@/types/boost';

// Define the AnalyticsData interface to match BoostAnalytics
export type AnalyticsData = BoostAnalytics;

export const useBoostAnalytics = (profileId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
    setLoading(true);
    try {
      // In a real app this would call to an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock analytics data
      const data: AnalyticsData = {
        impressions: {
          today: 250,
          yesterday: 190,
          weeklyAverage: 175,
          withBoost: 250,
          withoutBoost: 120,
          increase: 108
        },
        clicks: {
          today: 45,
          yesterday: 32,
          weeklyAverage: 28,
          withBoost: 45,
          withoutBoost: 22,
          increase: 105
        },
        engagementRate: 18,
        conversionRate: 4.2,
        boostEfficiency: 85,
        additionalViews: 130,
        engagementIncrease: 65,
        rankingPosition: 3,
        viewsIncrease: 108 // Added to match usage in code
      };
      
      setLoading(false);
      return data;
    } catch (error) {
      setError("Failed to load analytics data");
      setLoading(false);
      return null;
    }
  };
  
  return {
    fetchAnalytics,
    loading,
    error
  };
};
