
/**
 * AnalyticsData interface for boost-related analytics
 */
export interface AnalyticsData {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}

/**
 * Interface representing detailed click analytics
 */
export interface ClickAnalytics {
  today: number;
  yesterday: number;
  weeklyAverage: number;
  withBoost: number;
  withoutBoost?: number;
  increase?: number;
}

/**
 * BoostAnalytics interface for more detailed boost analysis
 */
export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  clicks: ClickAnalytics;
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}

/**
 * Custom hook for accessing boost analytics
 */
export const useBoostAnalytics = (profileId: string) => {
  /**
   * Get analytics data for a profile
   */
  const getAnalyticsData = async (): Promise<AnalyticsData> => {
    // This would fetch from an API in a real application
    // Mock data for now
    return {
      impressions: {
        today: 234,
        yesterday: 180,
        weeklyAverage: 200,
        withBoost: 280,
        withoutBoost: 120,
        increase: 133
      },
      clicks: {
        today: 45,
        yesterday: 30,
        weeklyAverage: 35,
        withBoost: 50,
        withoutBoost: 25,
        increase: 100
      },
      engagementRate: 19.2,
      conversionRate: 5.3,
      boostEfficiency: 78,
      additionalViews: 120,
      engagementIncrease: 25,
      rankingPosition: 3
    };
  };

  return {
    getAnalyticsData
  };
};
