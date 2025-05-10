
export interface NeuralMetricsDisplayProps {
  metrics: {
    accuracy: number;
    speed: number;
    completeness: number;
    consistency: number;
  };
  showDetails?: boolean;
}

export interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  loading?: boolean;
}

export interface DetailedMetricViewProps {
  title: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  unit?: string;
  timeframe?: string;
  data?: any[];
  loading?: boolean;
  insights?: string[];
  onBack?: () => void;
  // Add these new properties from the error messages
  description?: string;
  trendData?: any[];
  metric?: string;
}

export interface AnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  views: number;
  impressions: {
    value: number;
    change: number;
  };
  interactions: {
    value: number;
    change: number;
  };
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}
