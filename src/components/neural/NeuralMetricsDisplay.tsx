
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Brain, Clock, BarChart4, ThumbsUp } from 'lucide-react';
import { NeuralMetricsDisplayProps } from '@/types/analytics';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  metrics,
  trend,
  period = 'Last 24 hours',
  title = 'Neural System Metrics',
  refreshInterval = 60,
}) => {
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());

  // Set up refresh interval
  React.useEffect(() => {
    if (!refreshInterval) return;
    
    const timer = setInterval(() => {
      setLastRefresh(new Date());
      // In a real app, you'd fetch new data here
    }, refreshInterval * 1000);
    
    return () => clearInterval(timer);
  }, [refreshInterval]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-xs text-muted-foreground">
          {period} • Updated {lastRefresh.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Response Time"
          value={metrics.responseTime}
          suffix="ms"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          trend={trend?.responseTime}
        />
        
        <MetricCard
          title="Accuracy"
          value={metrics.accuracy}
          suffix="%"
          icon={<Brain className="h-4 w-4 text-muted-foreground" />}
          trend={trend?.accuracy}
        />
        
        <MetricCard
          title="Engagement"
          value={metrics.engagement}
          suffix="%"
          icon={<BarChart4 className="h-4 w-4 text-muted-foreground" />}
          trend={trend?.engagement}
        />
        
        <MetricCard
          title="Satisfaction"
          value={metrics.satisfaction}
          suffix="%"
          icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
          trend={trend?.satisfaction}
        />
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number[];
  suffix?: string;
}

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  suffix = '',
}: MetricCardProps) => {
  const trendChange = trend && trend.length > 1
    ? ((trend[trend.length - 1] - trend[0]) / trend[0] * 100).toFixed(1)
    : null;
  
  const isPositive = trendChange && parseFloat(trendChange) >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}{suffix}</div>
        {trendChange && (
          <p className={`text-xs flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {isPositive ? '+' : ''}{trendChange}% change
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
