
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, AlertCircle, BarChart } from 'lucide-react';

export interface NeuralMetricItem {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  timespan?: string;
}

export interface NeuralMetricsDisplayProps {
  metrics: NeuralMetricItem[];
  period?: string; // Make period optional
  refreshInterval?: number;
  loading?: boolean;
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ 
  metrics,
  period = '24h',
  refreshInterval = 60,
  loading = false 
}) => {
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Neural Metrics</CardTitle>
          <CardDescription>Loading metrics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-secondary/20 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-secondary/20 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-secondary/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neural Metrics</CardTitle>
        <CardDescription>Performance for the past {period}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="mb-4">
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{metric.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-2xl font-bold">{metric.value}{metric.unit}</p>
                      {metric.change !== undefined && (
                        <div className={`flex items-center ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.change >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-xs">{Math.abs(metric.change)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress value={metric.value} className="w-1/3" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="flex items-center justify-center h-40 border border-dashed rounded-md">
              <div className="text-center">
                <BarChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Trend visualization placeholder</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
