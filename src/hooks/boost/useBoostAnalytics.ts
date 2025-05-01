
import { useState, useEffect } from 'react';
import { BoostAnalytics as BoostAnalyticsType } from '@/types/boost';

export interface AnalyticsData {
  views?: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
  roi?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  clicks?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
}

export type BoostAnalytics = Required<AnalyticsData>;

export const useBoostAnalytics = (profileId: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
    setLoading(true);
    
    try {
      // Mock data for now - this would be a real API call
      const mockData: AnalyticsData = {
        additionalViews: 103,
        engagementIncrease: 24,
        rankingPosition: 12,
        conversions: 5,
        timeActive: 72,
        boostEfficiency: 87,
        trending: true,
        roi: 2.4,
        impressions: {
          today: 180,
          yesterday: 120,
          weeklyAverage: 100,
          withBoost: 180,
          withoutBoost: 100,
          increase: 80
        },
        interactions: {
          today: 45,
          yesterday: 32,
          weeklyAverage: 30,
          withBoost: 45,
          withoutBoost: 30,
          increase: 50
        }
      };
      
      setAnalytics(mockData);
      return mockData;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchAnalytics();
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
