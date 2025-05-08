
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  additionalViews?: number;
}

export const useBoostAnalytics = (profileId?: string, isBoostActive = false) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
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
        },
        interactions: {
          today: 45,
          yesterday: 32,
          weeklyAverage: 30,
          withBoost: 45,
        },
        rank: {
          current: 8,
          previous: 24,
          change: 16
        },
        additionalViews: 145
      };
      
      setData(analyticsData);
      setLoading(false);
      return analyticsData;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
      setLoading(false);
      return null;
    }
  };
  
  useEffect(() => {
    if (profileId) {
      fetchAnalytics();
    }
  }, [profileId, isBoostActive]);
  
  return {
    data,
    loading,
    error,
    fetchAnalytics
  };
};

export default useBoostAnalytics;
