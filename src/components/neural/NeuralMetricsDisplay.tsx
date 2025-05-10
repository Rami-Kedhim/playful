
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { NeuralMetricsDisplayProps } from '@/types/analytics';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  metrics,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <div className="h-4 bg-muted rounded w-24"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-muted rounded w-16 mb-2"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-semibold">
                {metric.value}
                {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
              </p>
              
              {metric.change !== undefined && (
                <div 
                  className={`flex items-center text-xs ${
                    metric.change > 0 
                      ? 'text-green-500' 
                      : metric.change < 0 
                        ? 'text-red-500' 
                        : 'text-gray-500'
                  }`}
                >
                  {metric.change > 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : metric.change < 0 ? (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  ) : (
                    <Minus className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              )}
            </div>
            {metric.timespan && (
              <p className="text-xs text-muted-foreground mt-1">{metric.timespan}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NeuralMetricsDisplay;
