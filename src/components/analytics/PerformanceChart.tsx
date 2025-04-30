
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts';
import { RefreshCw, BarChart3, LineChart as LineChartIcon, Activity, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PerformanceChartProps } from '@/types/analytics';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  dataKey, 
  title,
  onRefresh 
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [showComparison, setShowComparison] = useState(false);
  const [aggregation, setAggregation] = useState('none'); // 'none', 'daily', 'weekly', 'monthly'
  
  // Get previous period data for comparison
  const comparisonData = data.map(item => ({
    ...item,
    previousValue: item.value * (0.7 + Math.random() * 0.4) // Simulate previous period data
  }));
  
  // Function to generate aggregated data based on selected aggregation
  const getAggregatedData = () => {
    if (aggregation === 'none') return comparisonData;
    
    const aggregatedData: Record<string, {date: string, value: number, previousValue: number, count: number}> = {};
    
    comparisonData.forEach(item => {
      const date = new Date(item.date);
      let key: string;
      
      if (aggregation === 'daily') {
        key = date.toISOString().split('T')[0];
      } else if (aggregation === 'weekly') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
      } else if (aggregation === 'monthly') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else {
        key = item.date;
      }
      
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: key,
          value: 0,
          previousValue: 0,
          count: 0
        };
      }
      
      aggregatedData[key].value += item.value;
      aggregatedData[key].previousValue += item.previousValue;
      aggregatedData[key].count += 1;
    });
    
    // Calculate averages
    return Object.values(aggregatedData).map(item => ({
      date: item.date,
      value: item.value / item.count,
      previousValue: item.previousValue / item.count
    }));
  };

  const aggregatedData = getAggregatedData();
  
  return (
    <div className="h-[400px] w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        <div className="flex flex-wrap gap-2 items-center">
          <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as 'line' | 'bar' | 'area')}>
            <ToggleGroupItem value="line" aria-label="Line chart">
              <LineChartIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Bar chart">
              <BarChart3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="area" aria-label="Area chart">
              <Activity className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Select value={aggregation} onValueChange={setAggregation}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Aggregation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Grouping</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
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
        {renderChart(chartType, aggregatedData, dataKey, showComparison)}
      </ResponsiveContainer>
    </div>
  );
};

function renderChart(chartType: 'line' | 'bar' | 'area', data: any[], dataKey: string, showComparison: boolean) {
  switch (chartType) {
    case 'line':
      return (
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
          {showComparison && <Legend />}
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            name="Current Period"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
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
      );
    case 'bar':
      return (
        <BarChart data={data}>
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
            radius={[4, 4, 0, 0]}
          />
          {showComparison && (
            <Bar 
              dataKey="previousValue" 
              name="Previous Period"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.6}
              radius={[4, 4, 0, 0]}
            />
          )}
        </BarChart>
      );
    case 'area':
      return (
        <AreaChart data={data}>
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
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            name="Current Period"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))" 
            fillOpacity={0.2}
          />
          {showComparison && (
            <Area 
              type="monotone" 
              dataKey="previousValue" 
              name="Previous Period"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground))" 
              fillOpacity={0.1}
              strokeDasharray="5 5"
            />
          )}
        </AreaChart>
      );
  }
}

export default PerformanceChart;
