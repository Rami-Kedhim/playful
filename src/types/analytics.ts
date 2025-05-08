
// Define analytics data types for the whole application

// This creates consistency between useBoostAnalytics and BoostAnalytics component
export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  interactions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  rank?: {
    current?: number;
    previous?: number;
    change?: number;
  };
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
}
