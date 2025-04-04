
import { useState, useCallback } from 'react';
import { BoostAnalytics } from '@/types/boost';

export type AnalyticsData = {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
};

export const useBoostAnalytics = (profileId?: string) => {
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate analytics data
      const mockBoostAnalytics: BoostAnalytics = {
        views: {
          withBoost: Math.floor(Math.random() * 200) + 100,
          withoutBoost: Math.floor(Math.random() * 100) + 20,
          increase: Math.floor(Math.random() * 30) + 70
        },
        clicks: {
          withBoost: Math.floor(Math.random() * 50) + 25,
          withoutBoost: Math.floor(Math.random() * 25) + 5,
          increase: Math.floor(Math.random() * 30) + 70
        },
        searchRanking: {
          withBoost: Math.floor(Math.random() * 3) + 1,
          withoutBoost: Math.floor(Math.random() * 5) + 5,
          improvement: Math.floor(Math.random() * 30) + 70
        },
        effectiveness: Math.floor(Math.random() * 30) + 70
      };
      
      setAnalytics(mockBoostAnalytics);
      
      // Convert to AnalyticsData format for backward compatibility
      const analyticsData: AnalyticsData = {
        additionalViews: mockBoostAnalytics.views.withBoost - mockBoostAnalytics.views.withoutBoost,
        engagementIncrease: mockBoostAnalytics.clicks.increase,
        rankingPosition: mockBoostAnalytics.searchRanking.withBoost
      };
      
      return analyticsData;
    } catch (err: any) {
      console.error('Error fetching boost analytics:', err);
      setError(err.message || 'Failed to fetch boost analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics
  };
};

export default useBoostAnalytics;
