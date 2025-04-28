
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
