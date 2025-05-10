
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
  metrics: {
    views: number;
    engagement: number;
    conversion: number;
    revenue: number;
  };
  trends: {
    daily: any[];
    weekly: any[];
    monthly: any[];
  };
  comparisons: {
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
}

export interface NeuralMetric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  target?: number;
  history?: number[];
}
