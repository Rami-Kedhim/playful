
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DrillableMetricCardProps {
  title: string;
  value: number;
  unit: string;
  change: number;
  icon?: ReactNode;
  isNegative?: boolean;
  onClick?: () => void;
}

const DrillableMetricCard: React.FC<DrillableMetricCardProps> = ({
  title,
  value,
  unit,
  change,
  icon,
  isNegative = false,
  onClick
}) => {
  // Format the change value with a positive/negative sign and limit to 1 decimal place
  const formattedChange = change !== undefined ? 
    `${change > 0 ? '+' : ''}${change.toFixed(1)}%` : 
    '0.0%';

  // Determine if the change is positive or negative for styling
  const isPositiveChange = isNegative ? change < 0 : change > 0;
  const isNegativeChange = isNegative ? change > 0 : change < 0;
  
  // Format the value based on its magnitude
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toFixed(1);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        onClick && "cursor-pointer hover:border-primary hover:shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              {icon}
              <p className="text-sm font-medium">{title}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {typeof value === 'number' ? formatValue(value) : value}
              </span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          
          <div className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            isPositiveChange && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            isNegativeChange && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
            !isPositiveChange && !isNegativeChange && "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
          )}>
            {formattedChange}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrillableMetricCard;
