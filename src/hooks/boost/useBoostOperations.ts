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

interface BoostAnalyticsWithImpressions extends Omit<BoostAnalytics, 'impressions'> {
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
      
      const analyticsData: BoostAnalyticsWithImpressions = generateMockAnalytics(profileId);
      
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

const generateMockAnalytics = (profileId: string): BoostAnalyticsWithImpressions => {
  const randomRank = Math.floor(Math.random() * 100);
  const previousRank = Math.floor(Math.random() * 100);
  const rankChange = Math.floor(Math.random() * 50);
  const impressionChange = Math.floor(Math.random() * 100);

  return {
    impressions: {
      today: 324,
      yesterday: 217,
      weeklyAverage: 245,
      withBoost: 324,
      withoutBoost: 120,
      increase: 170
    },
    interactions: {
      today: 87,
      yesterday: 42,
      weeklyAverage: 53,
      withBoost: 87,
      withoutBoost: 29,
      increase: 200
    },
    rank: {
      current: randomRank,
      previous: previousRank,
      change: rankChange
    },
    trending: impressionChange > 0,
    additionalViews: Math.floor(Math.random() * 500),
    engagementIncrease: Math.floor(Math.random() * 200),
    rankingPosition: randomRank,
    clicks: {
      today: 42,
      yesterday: 21,
      weeklyAverage: 25,
      withBoost: 42,
      withoutBoost: 15,
      increase: 180
    }
  };
};
