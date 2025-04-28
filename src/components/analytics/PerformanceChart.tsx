
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceChartProps } from '@/types/analytics';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, dataKey, title }) => {
  return (
    <div className="h-[400px] w-full">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
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
