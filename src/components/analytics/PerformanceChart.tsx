
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PerformanceChartProps } from '@/types/analytics';

const PerformanceChart: React.FC<PerformanceChartProps & { onRefresh?: () => void }> = ({ 
  data, 
  dataKey, 
  title,
  onRefresh 
}) => {
  return (
    <div className="h-[400px] w-full">
      <div className="flex items-center justify-between mb-4">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        {onRefresh && (
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-muted-foreground text-xs"
            tickLine={false}
          />
          <YAxis 
            className="text-muted-foreground text-xs"
            tickLine={false}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
