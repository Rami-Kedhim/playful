
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { DetailedMetricViewProps } from '@/types/analytics';

const DetailedMetricView: React.FC<DetailedMetricViewProps> = ({
  title,
  value,
  previousValue,
  change,
  unit = '',
  timeframe = '7 days',
  data = [],
  loading = false,
  insights = [],
  onBack,
  description,
  trendData,
  metric
}) => {
  // Handle title as either string or object with title and description
  const metricTitle = typeof title === 'string' ? title : title.title;
  const metricDescription = typeof title === 'string' ? description : title.description;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{metricTitle}</CardTitle>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
          {metricDescription && <p className="text-sm text-muted-foreground mt-1">{metricDescription}</p>}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">{value}{unit}</div>
                  {change !== undefined && (
                    <div className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {change >= 0 ? '+' : ''}{change}%
                    </div>
                  )}
                </div>
                {previousValue !== undefined && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Previously: {previousValue}{unit} ({timeframe} ago)
                  </div>
                )}
              </div>

              {/* Chart would go here */}
              <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">Metric trend visualization</span>
              </div>

              {insights.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Insights</h4>
                  <ul className="space-y-1">
                    {insights.map((insight, i) => (
                      <li key={i} className="text-sm">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedMetricView;
