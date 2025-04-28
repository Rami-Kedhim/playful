
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { RefreshCw, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PerformanceChartProps } from '@/types/analytics';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  dataKey, 
  title,
  onRefresh 
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [showComparison, setShowComparison] = useState(false);
  
  // Get previous period data for comparison
  const comparisonData = data.map(item => ({
    ...item,
    previousValue: item.value * (0.7 + Math.random() * 0.4) // Simulate previous period data
  }));
  
  return (
    <div className="h-[400px] w-full">
      <div className="flex items-center justify-between mb-4">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        <div className="flex gap-2 items-center">
          <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as 'line' | 'bar')}>
            <ToggleGroupItem value="line" aria-label="Line chart">
              <LineChartIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Bar chart">
              <BarChart3 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide Comparison" : "Show Comparison"}
          </Button>
          {onRefresh && (
            <Button variant="ghost" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'line' ? (
          <LineChart data={comparisonData}>
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
            {showComparison && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              name="Current Period"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            {showComparison && (
              <Line 
                type="monotone" 
                dataKey="previousValue" 
                name="Previous Period"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
          </LineChart>
        ) : (
          <BarChart data={comparisonData}>
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
            {showComparison && <Legend />}
            <Bar 
              dataKey={dataKey} 
              name="Current Period"
              fill="hsl(var(--primary))"
            />
            {showComparison && (
              <Bar 
                dataKey="previousValue" 
                name="Previous Period"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.6}
              />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
