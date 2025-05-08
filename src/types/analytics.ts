
export interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
  onClick?: () => void;
}

export interface PerformanceChartProps {
  data: {
    date: string;
    value: number;
  }[];
  dataKey: string;
  title?: string;
  onRefresh?: () => void;
}

export interface Anomaly {
  id?: string;
  type?: string;
  severity?: 'low' | 'medium' | 'high';
  description?: string;
  timestamp?: string;
  relatedComponentId?: string;
  message?: string; // Added message property to match AnomalyDetails requirements
}

export interface DetailedMetricViewProps {
  title?: string;
  description?: string;
  value?: number;
  unit?: string;
  change?: number;
  trendData?: Array<{date: string, value: number}>;
  onBack: () => void;
  metric?: any;
  data?: Array<{date: string, value: number}>;
}

export interface AutoRefreshControlProps {
  interval: number;
  onIntervalChange: (interval: number) => void;
  onRefresh?: () => void;
  isPaused?: boolean;
  onPauseToggle?: () => void;
  isEnabled?: boolean;
  refreshInterval?: number;
  onToggle?: () => void;
  onChangeInterval?: (interval: number) => void;
}

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
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
    change: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  conversions?: number;
  timeActive?: string;
  boostEfficiency?: number;
  trending?: boolean;
  roi?: number;
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
  clicks?: {
    today: number;
    yesterday: number;
    lastWeek: number;
    thisWeek: number;
    change: number;
    total: number;
  };
}
