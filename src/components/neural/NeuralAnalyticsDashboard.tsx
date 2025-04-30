
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, RefreshIcon } from 'lucide-react';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import PerformanceChart from './PerformanceChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

const NeuralAnalyticsDashboard: React.FC = () => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue
  } = useNeuralAnalyticsDashboard();

  const [activeTab, setActiveTab] = useState('overview');

  if (error) {
    return (
      <Card className="border-red-300">
        <CardContent className="py-6">
          <div className="text-center text-red-500">
            <p>Error loading neural analytics data: {error}</p>
            <Button variant="outline" onClick={refreshAnalytics} className="mt-4">
              <RefreshIcon className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading && !analyticsData) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  const renderMetricCard = (
    key: 'responseTime' | 'accuracy' | 'errorRate' | 'operations',
    title: string,
    description: string
  ) => {
    const { value, change } = getMetricValue(key);
    const isPositive = key === 'accuracy' || key === 'operations' ? change > 0 : change < 0;
    const isNeutral = change === 0;
    
    return (
      <Card 
        className="cursor-pointer hover:border-primary/50 transition-all"
        onClick={() => handleDrillDown({ key, title, description })}
      >
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold">
              {key === 'errorRate' || key === 'accuracy' ? `${value}%` : value}
            </span>
            <div>
              <Badge className={isPositive ? 'bg-green-500' : isNeutral ? 'bg-gray-500' : 'bg-red-500'}>
                {change > 0 ? '+' : ''}{change}%
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    );
  };

  // Show drill-down view if metric is selected
  if (selectedMetric) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={handleBackToOverview} className="mr-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">{selectedMetric.title} Details</h2>
        </div>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Trend Analysis</h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[400px]">
              <PerformanceChart metricKey={selectedMetric.key} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Metrics Breakdown</h3>
          </CardHeader>
          <CardContent>
            {/* Detailed metrics would be rendered here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Current Value</h4>
                <p className="text-2xl font-bold">{getMetricValue(selectedMetric.key).value}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Change</h4>
                <p className="text-2xl font-bold">{getMetricValue(selectedMetric.key).change}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="system">System Status</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={isAutoRefreshEnabled}
              onCheckedChange={toggleAutoRefresh}
              id="auto-refresh"
            />
            <Label htmlFor="auto-refresh">Auto-refresh</Label>
          </div>
          <Button variant="outline" size="sm" onClick={refreshAnalytics}>
            <RefreshIcon className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <TabsContent value="overview" className="m-0">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderMetricCard(
              'responseTime', 
              'Response Time', 
              'Average response time in milliseconds'
            )}
            {renderMetricCard(
              'accuracy', 
              'Accuracy', 
              'Model prediction accuracy percentage'
            )}
            {renderMetricCard(
              'errorRate', 
              'Error Rate', 
              'Percentage of failed operations'
            )}
            {renderMetricCard(
              'operations', 
              'Operations', 
              'Total neural operations processed'
            )}
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Performance Overview</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <PerformanceChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="performance" className="m-0">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Model Performance Metrics</h3>
            {analyticsData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Accuracy</h4>
                  <p className="text-2xl font-bold">{(analyticsData.modelPerformance.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">F1 Score</h4>
                  <p className="text-2xl font-bold">{(analyticsData.modelPerformance.f1Score * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Inference Time</h4>
                  <p className="text-2xl font-bold">{analyticsData.modelPerformance.inferenceTime} ms</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="system" className="m-0">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">System Health</h3>
            {analyticsData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">CPU Usage</h4>
                  <p className="text-2xl font-bold">{analyticsData.systemMetrics.cpuUsage}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Memory Usage</h4>
                  <p className="text-2xl font-bold">{analyticsData.systemMetrics.memoryUsage}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Request Rate</h4>
                  <p className="text-2xl font-bold">{analyticsData.systemMetrics.qps} QPS</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="forecast" className="m-0">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">7-Day Forecast</h3>
            {analyticsData && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Date</th>
                      <th className="text-right pb-2">Response Time</th>
                      <th className="text-right pb-2">Error Rate</th>
                      <th className="text-right pb-2">Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.performanceForecast.map((day, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2">{day.date}</td>
                        <td className="text-right">{day.metrics.predictedResponseTime} ms</td>
                        <td className="text-right">{(day.metrics.predictedErrorRate * 100).toFixed(1)}%</td>
                        <td className="text-right">{day.metrics.expectedLoad} ops</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default NeuralAnalyticsDashboard;
