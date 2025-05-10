
export interface AnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

export interface ProfileAnalytics {
  viewsTrend: number[];
  interactionsTrend: number[];
  conversionRate: number;
  messageResponseRate: number;
  performanceScore: number;
  profileCompleteness: number;
  revenueData: {
    daily: number[];
    weekly: number;
    monthly: number;
    yearly: number;
  };
  visitorDemographics: {
    ages: Record<string, number>;
    locations: Record<string, number>;
    interests: Record<string, number>;
  };
}

export interface DashboardAnalytics {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    trend: number[];
  };
  visitors: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    trend: number[];
  };
  conversions: {
    rate: number;
    change: number;
    trend: number[];
  };
  topPerformingContent: Array<{
    id: string;
    title: string;
    views: number;
    revenue: number;
  }>;
}
