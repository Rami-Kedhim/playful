
/**
 * Hook for fetching and processing boost analytics data
 */
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  effectiveness?: number;
  views?: {
    withoutBoost?: number;
    withBoost?: number;
    increase?: number;
    current?: number;
    previous?: number;
    change?: number;
  };
  clicks?: {
    withoutBoost?: number;
    withBoost?: number;
    increase?: number;
    current?: number;
    previous?: number;
    change?: number;
  };
  conversion?: {
    current?: number;
    previous?: number;
    change?: number;
  };
  searchRanking?: {
    withoutBoost?: number;
    withBoost?: number;
    improvement?: number;
  };
  timeData?: Array<{
    hour: string;
    views: number;
    engagement: number;
  }>;
}

/**
 * Hook for fetching and displaying analytics data for boosts
 */
export function useBoostAnalytics(boostId?: string) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!boostId) return;
    
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock analytics data - in a real app this would come from an API
        const mockData: AnalyticsData = {
          additionalViews: Math.floor(Math.random() * 50) + 20,
          engagementIncrease: Math.floor(Math.random() * 30) + 10,
          rankingPosition: Math.floor(Math.random() * 5) + 1,
          effectiveness: Math.floor(Math.random() * 30) + 70,
          views: {
            withoutBoost: Math.floor(Math.random() * 100) + 50,
            withBoost: Math.floor(Math.random() * 200) + 150,
            increase: Math.floor(Math.random() * 30) + 20,
            current: Math.floor(Math.random() * 200) + 150,
            previous: Math.floor(Math.random() * 100) + 50,
            change: Math.floor(Math.random() * 30) + 20
          },
          clicks: {
            withoutBoost: Math.floor(Math.random() * 30) + 10,
            withBoost: Math.floor(Math.random() * 70) + 30,
            increase: Math.floor(Math.random() * 50) + 30,
            current: Math.floor(Math.random() * 70) + 30,
            previous: Math.floor(Math.random() * 30) + 10,
            change: Math.floor(Math.random() * 50) + 30
          },
          conversion: {
            current: Math.floor(Math.random() * 10) + 5,
            previous: Math.floor(Math.random() * 5) + 2,
            change: Math.floor(Math.random() * 40) + 10
          },
          searchRanking: {
            withoutBoost: Math.floor(Math.random() * 15) + 8,
            withBoost: Math.floor(Math.random() * 5) + 1,
            improvement: Math.floor(Math.random() * 7) + 3
          },
          timeData: Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            views: Math.floor(Math.random() * 50) + 10,
            engagement: Math.floor(Math.random() * 10) + 5
          }))
        };
        
        setData(mockData);
      } catch (err) {
        console.error('Error fetching boost analytics:', err);
        setError('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [boostId]);
  
  return { data, loading, error };
}

export default useBoostAnalytics;
