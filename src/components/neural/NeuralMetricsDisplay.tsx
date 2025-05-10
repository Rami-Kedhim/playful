
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NeuralMetric, NeuralMetricsDisplayProps } from '@/types/analytics';
import { Loader2 } from 'lucide-react';

export interface NeuralMetricItem extends NeuralMetric {
  title?: string;
  unit?: string;
  timespan?: string;
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ 
  metrics,
  loading = false,
  error = null,
  refreshInterval,
  period
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric: NeuralMetric) => (
        <Card key={metric.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value}{typeof metric.target !== 'undefined' && (
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / {metric.target}
                </span>
              )}
            </div>
            
            {typeof metric.change !== 'undefined' && (
              <div className={`text-sm ${
                metric.change > 0 ? 'text-green-500' : 
                metric.change < 0 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from previous
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {period && (
        <div className="text-sm text-muted-foreground mt-2">
          Period: {period}
        </div>
      )}
    </div>
  );
};

export default NeuralMetricsDisplay;
