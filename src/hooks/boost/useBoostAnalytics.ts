
import { useState } from 'react';
import { BoostAnalytics } from '@/types/boost';

export interface AnalyticsData {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  effectiveness: number;
  views: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  clicks: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  searchRanking: {
    withoutBoost: number;
    withBoost: number;
    improvement: number;
  };
}

export const useBoostAnalytics = (profileId: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // For demo, generate random analytics data
      const mockAnalytics: AnalyticsData = {
        additionalViews: Math.floor(Math.random() * 120) + 50,
        engagementIncrease: Math.floor(Math.random() * 40) + 15,
        rankingPosition: Math.floor(Math.random() * 5) + 1,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        views: {
          withoutBoost: Math.floor(Math.random() * 100) + 50,
          withBoost: Math.floor(Math.random() * 200) + 150,
          increase: Math.floor(Math.random() * 30) + 20
        },
        clicks: {
          withoutBoost: Math.floor(Math.random() * 30) + 10,
          withBoost: Math.floor(Math.random() * 70) + 30,
          increase: Math.floor(Math.random() * 50) + 30
        },
        searchRanking: {
          withoutBoost: Math.floor(Math.random() * 15) + 8,
          withBoost: Math.floor(Math.random() * 5) + 1,
          improvement: Math.floor(Math.random() * 7) + 3
        }
      };
      
      setAnalytics(mockAnalytics);
      return mockAnalytics;
    } catch (err) {
      console.error("Error fetching boost analytics:", err);
      setError("Failed to fetch analytics data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    error,
    fetchAnalytics
  };
};
