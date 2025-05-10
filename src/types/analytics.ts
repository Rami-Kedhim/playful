
// Analytics related types

export interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  unit?: string;
}

export interface AnalyticsData {
  // General analytics
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  
  // Boost-specific analytics
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  impressions?: {
    value: number;
    change: number;
  };
  interactions?: {
    value: number;
    change: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  
  // Time series data
  timeSeries?: {
    date: string;
    value: number;
  }[];
}

// For detailed metrics view
export interface MetricDataPoint {
  date: string;
  value: number;
}

export interface MetricTimeSeriesData {
  label: string;
  data: MetricDataPoint[];
  color?: string;
}
