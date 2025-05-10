
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NeuralMetricsDisplayProps } from '@/types/analytics';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  metrics,
  showDetails = false,
  // Add optional properties with default values
  trend = 'neutral',
  period = '24h',
  title = 'Neural Metrics',
  refreshInterval = 60000
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // Function to refresh metrics
  const refreshMetrics = React.useCallback(() => {
    setIsLoading(true);
    // Simulate metrics refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format metric value (0-100) as a percentage
  const formatMetric = (value: number): string => {
    return `${Math.round(value)}%`;
  };

  // Format metric value for display
  const getMetricDisplay = (key: keyof typeof metrics, name: string) => {
    return (
      <div key={key} className="flex flex-col">
        <span className="text-sm text-muted-foreground">{name}</span>
        <span className="text-xl font-semibold">
          {isLoading ? "..." : formatMetric(metrics[key])}
        </span>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Neural network performance metrics for the {period} period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getMetricDisplay("accuracy", "Accuracy")}
          {getMetricDisplay("speed", "Speed")}
          {getMetricDisplay("completeness", "Completeness")}
          {getMetricDisplay("consistency", "Consistency")}
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={refreshMetrics}
              className="text-sm text-primary hover:underline"
              disabled={isLoading}
            >
              {isLoading ? "Refreshing..." : "Refresh metrics"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
