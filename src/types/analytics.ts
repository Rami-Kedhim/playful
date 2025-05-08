
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
  conversionRate?: number;
  conversions?: number;
  messageRate?: number;
  bookingRate?: number;
}

export interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  unit?: string;
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
    description?: string;
  };
  data?: Array<{ name: string; value: number }>;
}

export interface PerformanceChartProps {
  data: Array<{ name: string; value: number }>;
  dataKey: string;
  title?: string;
  height?: number;
  onRefresh?: () => void;
  colors?: {
    stroke?: string;
    fill?: string;
  };
}

export interface MetricDetail {
  title: string;
  description?: string;
  value: number;
  unit: string;
  change: number;
  data: Array<{ name: string; value: number }>;
}
