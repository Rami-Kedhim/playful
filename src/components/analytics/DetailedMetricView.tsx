
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DetailedMetricViewProps } from '@/types/analytics';

const DetailedMetricView: React.FC<DetailedMetricViewProps> = ({ 
  title,
  value,
  previousValue,
  change,
  unit,
  timeframe,
  data,
  loading,
  insights,
  onBack,
  onClose,
  description,
  trendData,
  metric
}) => {
  const renderTitle = () => {
    if (typeof title === 'object') {
      return (
        <>
          <CardTitle>{title.title}</CardTitle>
          {title.description && <CardDescription>{title.description}</CardDescription>}
        </>
      );
    }
    return <CardTitle>{title}</CardTitle>;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          {renderTitle()}
        </div>
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <div className="text-4xl font-bold">
                {value}
                {unit && <span className="text-lg ml-1">{unit}</span>}
              </div>
              
              {change !== undefined && previousValue !== undefined && (
                <div className="flex items-center text-sm">
                  <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(change)}%
                  </div>
                  <span className="text-muted-foreground ml-2">
                    vs. previous {timeframe || 'period'}
                  </span>
                </div>
              )}
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            
            {insights && insights.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Insights</h4>
                <ul className="space-y-1">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {trendData && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Trend</h4>
                <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Trend visualization placeholder</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedMetricView;
