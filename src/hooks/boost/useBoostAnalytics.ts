
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

export const useBoostAnalytics = (userId: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Simulate API call with mock data
        setTimeout(() => {
          const mockData: AnalyticsData = {
            totalBoosts: 5,
            activeBoosts: 1,
            averageBoostScore: 78,
            boostHistory: [
              { date: new Date('2023-01-01'), score: 65 },
              { date: new Date('2023-01-08'), score: 72 },
              { date: new Date('2023-01-15'), score: 78 },
              { date: new Date('2023-01-22'), score: 82 },
              { date: new Date('2023-01-29'), score: 85 },
            ],
            views: 234,
            impressions: {
              value: 1245,
              change: 23,
              withBoost: 1245,
              withoutBoost: 856
            },
            interactions: {
              value: 89,
              change: 34,
              withBoost: 89,
              withoutBoost: 42
            },
            additionalViews: 389,
            engagementIncrease: 111,
            rankingPosition: 12
          };
          
          setAnalytics(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { analytics, loading, error };
};

export default useBoostAnalytics;
