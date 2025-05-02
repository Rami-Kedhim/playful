
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PerformanceChartProps } from '@/types/analytics';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  dataKey,
  title = 'Performance',
  onRefresh
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground mb-4">No data available</p>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickFormatter={(value) => {
              if (dataKey === 'predictedResponseTime') return `${value}ms`;
              if (dataKey === 'predictedErrorRate') return `${(value * 100).toFixed(1)}%`;
              return value.toString();
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [
              dataKey === 'predictedErrorRate' 
                ? `${(value * 100).toFixed(2)}%` 
                : dataKey === 'predictedResponseTime'
                  ? `${value.toFixed(1)}ms`
                  : value.toFixed(1),
              dataKey === 'predictedErrorRate'
                ? 'Error Rate'
                : dataKey === 'predictedResponseTime'
                  ? 'Response Time'
                  : dataKey === 'expectedLoad'
                    ? 'Expected Load'
                    : 'Value'
            ]}
            labelFormatter={(label) => label}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name={
              dataKey === 'predictedErrorRate'
                ? 'Error Rate'
                : dataKey === 'predictedResponseTime'
                  ? 'Response Time'
                  : dataKey === 'expectedLoad'
                    ? 'Expected Load'
                    : 'Value'
            }
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
