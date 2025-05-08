
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  views: number;
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
  };
  rank: {
    current: number;
    previous: number;
    change: number;
  };
  conversions?: number;
  timeActive?: string;
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

export const useBoostAnalytics = (profileId?: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!profileId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Mock data for demonstration
        const mockData: AnalyticsData = {
          additionalViews: 145,
          engagementIncrease: 32,
          rankingPosition: 8,
          views: 300,
          impressions: {
            today: 180,
            yesterday: 150,
            weeklyAverage: 145,
            withBoost: 180,
            withoutBoost: 120,
            increase: 50,
            change: 20
          },
          interactions: {
            today: 45,
            yesterday: 32,
            weeklyAverage: 30,
            withBoost: 45,
            withoutBoost: 25,
            increase: 80,
            change: 40
          },
          rank: {
            current: 8,
            previous: 24,
            change: 16
          },
          conversions: 12,
          timeActive: '5 days',
          boostEfficiency: 87,
          trending: true,
          roi: 2.4,
          clicks: {
            today: 45,
            yesterday: 32,
            lastWeek: 210,
            thisWeek: 275,
            change: 31,
            total: 1200
          }
        };

        setData(mockData);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [profileId]);

  return { data, loading, error };
};

export default useBoostAnalytics;
