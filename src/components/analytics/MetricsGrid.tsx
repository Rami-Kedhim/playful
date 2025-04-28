
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
}

const MetricsGrid: React.FC<{ metrics: MetricCardProps[] }> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              {metric.change !== 0 && (
                <span className={`flex items-center ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {Math.abs(metric.change)}%
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {value}
              <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
