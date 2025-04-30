
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceChartProps {
  data: Array<{date: string, value: number}>;
  dataKey: string;
  title?: string;
  gradient?: boolean;
  showGrid?: boolean;
  height?: number;
  tooltipFormatter?: (value: number) => string;
  xAxisFormatter?: (value: string) => string;
  yAxisFormatter?: (value: number) => string;
  unit?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  dataKey,
  title = '',
  gradient = true,
  showGrid = true,
  height = 300,
  tooltipFormatter,
  xAxisFormatter,
  yAxisFormatter,
  unit = ''
}) => {
  const formatXAxis = (tickItem: string) => {
    if (xAxisFormatter) return xAxisFormatter(tickItem);
    
    // Default formatter: convert ISO date to readable format
    try {
      const date = new Date(tickItem);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return tickItem;
    }
  };

  const formatYAxis = (value: number) => {
    if (yAxisFormatter) return yAxisFormatter(value);
    return `${value}${unit}`;
  };

  const formatTooltipValue = (value: number) => {
    if (tooltipFormatter) return tooltipFormatter(value);
    return `${value}${unit}`;
  };

  const getGradientOffset = () => {
    const dataMax = Math.max(...data.map(item => item.value));
    const dataMin = Math.min(...data.map(item => item.value));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };

  const gradientOffset = getGradientOffset();

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatYAxis} 
                tick={{ fontSize: 12 }} 
              />
              <Tooltip 
                formatter={(value: number) => [formatTooltipValue(value), dataKey]}
              />
              <Legend />
              {gradient ? (
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={gradientOffset} stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset={gradientOffset} stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              ) : null}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill={gradient ? "url(#colorValue)" : "#8884d8"}
                fillOpacity={gradient ? 0.3 : 0.2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
