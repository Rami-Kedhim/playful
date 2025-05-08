
import { useState, useCallback } from 'react';

export interface AnalyticsData {
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    change?: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    change?: number;
    withoutBoost?: number;
    increase?: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
  roi?: number;
  clicks?: {
    today: number;
    yesterday: number;
    lastWeek: number;
    thisWeek: number;
    change: number;
    total: number;
  };
}

export const useBoostAnalytics = (profileId?: string, isBoostActive = false) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    if (!profileId) return null;
    
    setLoading(true);
    try {
      // Mock data
      const analyticsData: AnalyticsData = {
        views: 350,
        impressions: {
          today: 180,
          yesterday: 150,
          weeklyAverage: 145,
          withBoost: 180,
          change: 20,
          withoutBoost: 130,
          increase: 38
        },
        interactions: {
          today: 45,
          yesterday: 32,
          weeklyAverage: 30,
          withBoost: 45,
          change: 40,
          withoutBoost: 28,
          increase: 60
        },
        rank: {
          current: 8,
          previous: 24,
          change: 16
        },
        additionalViews: 145,
        engagementIncrease: 35,
        rankingPosition: 8,
        conversions: 12,
        timeActive: 72,
        boostEfficiency: 85,
        trending: true,
        roi: 250,
        clicks: {
          today: 75,
          yesterday: 65,
          lastWeek: 350,
          thisWeek: 420,
          change: 20,
          total: 1250
        }
      };
      
      setData(analyticsData);
      setLoading(false);
      return analyticsData;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
      setLoading(false);
      return null;
    }
  }, [profileId]);
  
  useEffect(() => {
    if (profileId) {
      fetchAnalytics();
    }
  }, [profileId, isBoostActive, fetchAnalytics]);
  
  return {
    data,
    loading,
    error,
    fetchAnalytics
  };
};

export default useBoostAnalytics;
