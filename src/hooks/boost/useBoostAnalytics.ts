
import { useState, useEffect } from 'react';
import { BoostAnalytics } from '@/types/pulse-boost';

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
    value?: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
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
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
}

// Create a converter function to transform BoostAnalytics to AnalyticsData
export const convertToAnalyticsData = (boostAnalytics: BoostAnalytics): AnalyticsData => {
  return {
    additionalViews: boostAnalytics.additionalViews || 0,
    engagementIncrease: boostAnalytics.engagementIncrease || 0,
    rankingPosition: boostAnalytics.rankingPosition || 0,
    views: boostAnalytics.views || 0,
    impressions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: boostAnalytics.impressions?.withBoost || 0,
      withoutBoost: boostAnalytics.impressions?.withoutBoost || 0,
      increase: boostAnalytics.impressions?.increase || 0,
      change: boostAnalytics.impressions?.change || 0,
      value: boostAnalytics.impressions?.value || 0,
    },
    interactions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: boostAnalytics.interactions?.withBoost || 0,
      withoutBoost: boostAnalytics.interactions?.withoutBoost || 0,
      increase: boostAnalytics.interactions?.increase || 0,
      change: boostAnalytics.interactions?.change || 0,
      value: boostAnalytics.interactions?.value || 0,
    },
    rank: {
      current: 0,
      previous: 0,
      change: 0
    }
  };
};

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
            change: 20,
            value: 180
          },
          interactions: {
            today: 45,
            yesterday: 32,
            weeklyAverage: 30,
            withBoost: 45,
            withoutBoost: 25,
            increase: 80,
            change: 40,
            value: 45
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
            total: 1200,
            weeklyAverage: 145,
            withBoost: 275,
            withoutBoost: 210,
            increase: 30
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
