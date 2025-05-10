
export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
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
}

export interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  unit?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export interface DetailedMetricViewProps {
  title: string;
  data: any;
  onClose: () => void;
}

export interface ExtendedMetricCardProps extends MetricCardProps {
  icon?: React.ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'neutral';
  footer?: React.ReactNode;
  description?: string;
}
