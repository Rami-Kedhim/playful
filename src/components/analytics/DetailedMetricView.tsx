
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PerformanceChart from './PerformanceChart';

interface DetailedMetricViewProps {
  title: string;
  description?: string;
  value: number;
  unit: string;
  change: number;
  trendData: Array<{date: string, value: number}>;
  onBack: () => void;
}

const DetailedMetricView: React.FC<DetailedMetricViewProps> = ({
  title,
  description,
  value,
  unit,
  change,
  trendData,
  onBack
}) => {
  // Format change as percentage or absolute value
  const formatChange = () => {
    const prefix = change >= 0 ? '+' : '';
    return `${prefix}${change}${unit.includes('%') ? '%' : unit}`;
  };
  
  // Determine if trend is positive or negative
  const trend = change >= 0 ? 'up' : 'down';
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Button variant="ghost" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <div className="text-4xl font-bold">
              {value}{unit}
            </div>
            <div className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {formatChange()} from previous period
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Trend Analysis</h3>
            <PerformanceChart 
              data={trendData}
              dataKey="value"
              title=""
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Key Insights</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Peak Value:</strong> {Math.max(...trendData.map(d => d.value))}{unit}
              </li>
              <li>
                <strong>Minimum Value:</strong> {Math.min(...trendData.map(d => d.value))}{unit}
              </li>
              <li>
                <strong>Average:</strong> {(trendData.reduce((sum, d) => sum + d.value, 0) / trendData.length).toFixed(2)}{unit}
              </li>
              <li>
                <strong>Volatility:</strong> {
                  (() => {
                    const values = trendData.map(d => d.value);
                    const max = Math.max(...values);
                    const min = Math.min(...values);
                    return ((max - min) / ((max + min) / 2) * 100).toFixed(1);
                  })()
                }%
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedMetricView;
