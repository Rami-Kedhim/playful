
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  views: number;
  impressions: {
    value: number;
    change?: number;
    withBoost?: number;
  };
  interactions: {
    value: number;
    change?: number;
  };
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
  // Add missing properties that are used in other components
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

export interface BoostAnalytics {
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
  };
  interactions?: {
    value: number;
    change?: number;
  };
}

export const useBoostAnalytics = (userId: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Mock analytics data
        setTimeout(() => {
          setAnalytics({
            views: 120,
            impressions: {
              value: 450,
              change: 15,
              withBoost: 675
            },
            interactions: {
              value: 45,
              change: 22
            },
            totalBoosts: 3,
            activeBoosts: 1,
            averageBoostScore: 7.8,
            additionalViews: 55,
            engagementIncrease: 18,
            rankingPosition: 12,
            boostHistory: [
              { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), score: 7.2 },
              { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), score: 7.5 },
              { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), score: 7.8 },
              { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), score: 8.1 },
              { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), score: 7.9 },
              { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), score: 8.0 },
              { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), score: 8.2 }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  return { analytics, loading, error };
};
