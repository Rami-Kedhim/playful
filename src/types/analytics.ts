
export interface DetailedMetricViewProps {
  title: string | { title: string; description?: string };
  value?: number | string;
  previousValue?: number | string;
  change?: number;
  unit?: string;
  timeframe?: string;
  data?: any[];
  loading?: boolean;
  insights?: string[];
  onBack?: () => void;
  onClose: () => void;
  description?: string;
  trendData?: any;
  metric?: string;
}

export interface AnalyticsData {
  // Original properties
  metrics?: {
    views: number;
    engagement: number;
    conversion: number;
    revenue: number;
  };
  trends?: {
    daily: any[];
    weekly: any[];
    monthly: any[];
  };
  comparisons?: {
    previousPeriod: {
      views: number;
      engagement: number;
      conversion: number;
      revenue: number;
    };
    industry: {
      views: number;
      engagement: number;
      conversion: number;
      revenue: number;
    };
  };
  // Additional properties from analytics.d.ts
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
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
  // Boost analytics properties
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
}

export interface NeuralMetric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  target?: number;
  history?: number[];
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  timespan?: string;
  onClick?: () => void;
}

export interface NeuralMetricsDisplayProps {
  metrics: NeuralMetric[];
  refreshInterval?: number;
  loading?: boolean;
  error?: string | null;
}
