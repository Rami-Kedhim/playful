
export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
    change: number;
    value: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
    change: number;
    value: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
}

export interface NeuralMetric {
  name: string;
  value: number;
  change?: number;
  target?: number;
}

export interface NeuralMetricsDisplayProps {
  metrics: NeuralMetric[];
  loading?: boolean;
  error?: null | string;
  refreshInterval?: number;
  period?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  timespan?: string;
}

export interface NeuralMetricItem extends NeuralMetric {
  title?: string;
  unit?: string;
  timespan?: string;
}

export interface MetricsGridProps {
  metrics: MetricCardProps[];
}
