
export interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
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
