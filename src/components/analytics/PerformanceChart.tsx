
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Line, ComposedChart 
} from 'recharts';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

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
  aggregation?: 'none' | 'daily' | 'weekly' | 'monthly';
  showAggregationSelector?: boolean;
  colors?: {
    stroke?: string;
    fill?: string;
  };
  showConfidence?: boolean;
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
  unit = '',
  aggregation: initialAggregation = 'none',
  showAggregationSelector = false,
  colors = {
    stroke: '#8884d8',
    fill: '#8884d8',
  },
  showConfidence = false
}) => {
  const [aggregation, setAggregation] = useState<'none' | 'daily' | 'weekly' | 'monthly'>(initialAggregation);

  // Process data based on selected aggregation
  const processedData = useMemo(() => {
    if (aggregation === 'none' || !data) return data;
    
    // Helper function to get date key for grouping
    const getDateKey = (date: string) => {
      const dateObj = new Date(date);
      
      switch(aggregation) {
        case 'daily':
          return dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
        case 'weekly':
          // Get the week start date (Sunday)
          const dayOfWeek = dateObj.getDay();
          const weekStart = new Date(dateObj);
          weekStart.setDate(dateObj.getDate() - dayOfWeek);
          return weekStart.toISOString().split('T')[0];
        case 'monthly':
          return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        default:
          return date;
      }
    };

    // Group and aggregate data
    const groupedData: Record<string, {sum: number, count: number, date: string}> = {};
    
    data.forEach(item => {
      const key = getDateKey(item.date);
      
      if (!groupedData[key]) {
        groupedData[key] = { sum: 0, count: 0, date: key };
      }
      
      groupedData[key].sum += item.value;
      groupedData[key].count += 1;
    });
    
    // Calculate averages and format
    return Object.values(groupedData).map(({ sum, count, date }) => ({
      date,
      value: sum / count
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [data, aggregation]);
  
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
    if (!data || data.length === 0) return 0;
    
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
  const chartHeight = height;

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        {title && <CardTitle className="text-lg">{title}</CardTitle>}
        
        {showAggregationSelector && (
          <Select value={aggregation} onValueChange={(value: any) => setAggregation(value)}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Aggregation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            {showConfidence ? (
              <ComposedChart
                data={processedData}
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
                
                {/* Confidence Area */}
                <Area
                  name="Confidence Interval"
                  type="monotone"
                  dataKey="confidence"
                  stroke="transparent"
                  fill={`${colors.fill}33`}  // 20% opacity
                  activeDot={false}
                />
                
                {/* Main Line */}
                <Line
                  type="monotone"
                  dataKey="value"
                  name={dataKey}
                  stroke={colors.stroke || '#8884d8'}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            ) : (
              <AreaChart
                data={processedData}
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
                      <stop offset={gradientOffset} stopColor={colors.fill || '#8884d8'} stopOpacity={0.8}/>
                      <stop offset={gradientOffset} stopColor={colors.fill || '#8884d8'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                ) : null}
                <Area
                  type="monotone"
                  dataKey="value"
                  name={dataKey}
                  stroke={colors.stroke || '#8884d8'}
                  fill={gradient ? "url(#colorValue)" : (colors.fill || '#8884d8')}
                  fillOpacity={gradient ? 0.3 : 0.2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
