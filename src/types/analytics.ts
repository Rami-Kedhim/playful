
// Analytics types

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
    increase?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
  // Add any additional properties that may be needed
  boostHistory?: Array<{
    date: string;
    score: number;
  }>;
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

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
}

export interface ExtendedMetricCardProps extends MetricCardProps {
  onClick?: () => void;
}

export interface DetailedMetricViewProps {
  title?: string;
  description?: string;
  value?: number;
  unit?: string;
  change?: number;
  trendData?: Array<{ name: string; value: number }>;
  onBack: () => void;
  metric?: {
    title: string;
    description: string;
    value: number;
    unit: string;
    change: number;
  };
  data?: Array<{ name: string; value: number }> | Array<{ date: string; value: number }>;
}

export interface NeuralMetricsDisplayProps {
  metrics: {
    responseTime: number;
    accuracy: number;
    engagement: number;
    satisfaction: number;
  };
  trend?: {
    responseTime: number[];
    accuracy: number[];
    engagement: number[];
    satisfaction: number[];
  };
  period?: string;
  title?: string;
  refreshInterval?: number;
}

export interface PerformanceChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
  description?: string;
  height?: number;
  color?: string;
  dataKey?: string;
  onRefresh?: () => void;
}
