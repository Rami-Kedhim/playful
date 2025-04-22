
import { useCallback, useState } from 'react';
import { BoostAnalytics } from '@/types/boost';

interface AnalyticsData {
  impressions: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
  };
  interactions: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
  };
  rankingPosition: number;
  viewsIncrease: number;
  clicks?: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
  };
}

export const useBoostOperations = (profileId: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData>({
    impressions: {
      withBoost: 0,
      withoutBoost: 0,
      increase: 0
    },
    interactions: {
      withBoost: 0,
      withoutBoost: 0,
      increase: 0
    },
    rankingPosition: 0,
    viewsIncrease: 0
  });

  const fetchAnalytics = useCallback(async (): Promise<BoostAnalytics> => {
    setLoading(true);
    
    try {
      // Simulate analytics data fetch
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analyticsData: BoostAnalytics & {
        impressions: {
          today: number;
          yesterday: number;
          weeklyAverage: number;
          withBoost: number;
          withoutBoost: number;
          increase: number;
        };
        interactions: {
          today: number;
          yesterday: number;
          weeklyAverage: number;
          withBoost: number;
          withoutBoost: number;
          increase: number;
        };
        clicks: {
          today: number;
          yesterday: number;
          weeklyAverage: number;
          withBoost: number;
          withoutBoost: number;
          increase: number;
        };
      } = {
        impressions: {
          today: 432,
          yesterday: 287,
          weeklyAverage: 310,
          withBoost: 432,
          withoutBoost: 210,
          increase: 105
        },
        interactions: {
          today: 87,
          yesterday: 63,
          weeklyAverage: 70,
          withBoost: 87,
          withoutBoost: 42,
          increase: 107
        },
        rank: {
          current: 13,
          previous: 47,
          change: 34
        },
        trending: true,
        additionalViews: 222,
        engagementIncrease: 0.23,
        rankingPosition: 13,
        viewsIncrease: 105,
        engagementRate: 0.2,
        clicks: {
          today: 45,
          yesterday: 28,
          weeklyAverage: 30,
          withBoost: 45,
          withoutBoost: 22,
          increase: 105
        }
      };
      
      setData({
        impressions: {
          withBoost: analyticsData.impressions.withBoost,
          withoutBoost: analyticsData.impressions.withoutBoost || 0,
          increase: analyticsData.impressions.increase || 0
        },
        interactions: {
          withBoost: analyticsData.interactions.withBoost,
          withoutBoost: analyticsData.interactions.withoutBoost || 0,
          increase: analyticsData.interactions.increase || 0
        },
        rankingPosition: analyticsData.rankingPosition,
        viewsIncrease: analyticsData.viewsIncrease || 0
      });
      
      return analyticsData;
    } catch (error) {
      console.error('Error fetching boost analytics:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return {
    data,
    loading,
    fetchAnalytics
  };
};

export default useBoostOperations;
