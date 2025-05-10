
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NeuralMetricsDisplayProps } from '@/types/analytics';
import { TrendingDown, TrendingUp, Clock, CheckCircle, Users, ThumbsUp } from 'lucide-react';

export const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  metrics,
  trend,
  period,
  title,
  refreshInterval
}) => {
  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.responseTime}ms</div>
            {trend && (
              <div className="flex items-center pt-1 text-xs">
                {trend.responseTime[trend.responseTime.length - 1] < trend.responseTime[0] ? (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Improved</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">Slower</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">{period}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.accuracy}%</div>
            {trend && (
              <div className="flex items-center pt-1 text-xs">
                {trend.accuracy[trend.accuracy.length - 1] > trend.accuracy[0] ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Improved</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">Decreased</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">{period}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.engagement}%</div>
            {trend && (
              <div className="flex items-center pt-1 text-xs">
                {trend.engagement[trend.engagement.length - 1] > trend.engagement[0] ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Improved</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">Decreased</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">{period}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.satisfaction}%</div>
            {trend && (
              <div className="flex items-center pt-1 text-xs">
                {trend.satisfaction[trend.satisfaction.length - 1] > trend.satisfaction[0] ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Improved</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">Decreased</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">{period}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {refreshInterval && (
        <p className="text-xs text-muted-foreground mt-2">
          Data refreshes every {refreshInterval} seconds
        </p>
      )}
    </div>
  );
};

export default NeuralMetricsDisplay;
