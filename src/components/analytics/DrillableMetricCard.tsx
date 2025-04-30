
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';

interface DrillableMetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
  metricKey: 'responseTime' | 'accuracy' | 'errorRate' | 'operations';
  description?: string;
  onDrillDown: (metric: MetricDetail) => void;
}

const DrillableMetricCard: React.FC<DrillableMetricCardProps> = ({
  title,
  value,
  change,
  unit,
  metricKey,
  description = '',
  onDrillDown
}) => {
  const formatValue = () => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const handleClick = () => {
    onDrillDown({
      key: metricKey,
      title,
      description: description || `Detailed analysis of ${title.toLowerCase()}`
    });
  };

  return (
    <Card 
      className="transition-all hover:shadow-md cursor-pointer" 
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold">
            {formatValue()}{unit}
          </h3>
          <p className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}{unit.includes('%') ? '%' : ''}
          </p>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Click for details
        </div>
      </CardContent>
    </Card>
  );
};

export default DrillableMetricCard;
