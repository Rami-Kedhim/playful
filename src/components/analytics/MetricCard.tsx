
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MetricCardProps } from '@/types/analytics';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  unit 
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const formatValue = (val: number): string => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toFixed(1);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formatValue(value)}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <div className={cn(
              "flex items-center text-xs",
              isPositive && "text-green-600",
              isNegative && "text-red-600",
              !isPositive && !isNegative && "text-gray-500"
            )}>
              {isPositive && <ArrowUp className="h-3 w-3" />}
              {isNegative && <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
            <span className="text-xs text-muted-foreground">
              vs. previous period
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
