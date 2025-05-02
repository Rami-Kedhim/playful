
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield, Activity, LineChart, Brain } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MetricCard from '@/components/analytics/MetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import PerformanceChart from '@/components/neural/PerformanceChart';
import { useNeuralAnalyticsDashboard, MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const {
    analyticsData,
    loading,
    error,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric,
    isAutoRefreshEnabled,
    toggleAutoRefresh,
    changeRefreshInterval,
    refreshAnalytics
  } = useNeuralAnalyticsDashboard();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [refreshIntervalMs, setRefreshIntervalMs] = useState<number>(refreshInterval * 1000);

  // Handle refresh interval change
  useEffect(() => {
    setRefreshIntervalMs(refreshInterval * 1000);
  }, [refreshInterval]);

  // Show loading state
  if (loading && !analyticsData) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Loading neural analytics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertTitle>Error loading analytics</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Define metrics for cards
  const metrics: MetricDetail[] = [
    { key: 'responseTime', title: 'Response Time', description: 'Average neural processing response time' },
    { key: 'accuracy', title: 'Accuracy', description: 'Model prediction accuracy rate' },
    { key: 'errorRate', title: 'Error Rate', description: 'Percentage of failed operations' },
    { key: 'operations', title: 'Operations', description: 'Total neural operations processed' }
  ];

  // Show detailed view if a metric is selected
  if (selectedMetric) {
    const metricData = getTrendDataForMetric(selectedMetric.key);
    const { value, change } = getMetricValue(selectedMetric.key);
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={value}
        change={change}
        unit={selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : 
              selectedMetric.key === 'responseTime' ? 'ms' : ''}
        data={metricData}
        onBack={handleBackToOverview}
        metric={selectedMetric}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Neural System Analytics</h2>
        </div>
        
        <AutoRefreshControl
          isPaused={!isAutoRefreshEnabled}
          onPauseToggle={toggleAutoRefresh}
          interval={refreshIntervalMs}
          onIntervalChange={changeRefreshInterval}
          onRefresh={refreshAnalytics}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => {
              const { value, change } = getMetricValue(metric.key);
              const unit = metric.key === 'accuracy' || metric.key === 'errorRate' ? '%' : 
                          metric.key === 'responseTime' ? 'ms' : '';
              
              return (
                <MetricCard
                  key={metric.key}
                  title={metric.title}
                  value={value}
                  change={change}
                  unit={unit}
                  onClick={() => handleDrillDown(metric)}
                />
              );
            })}
          </div>
          
          <Separator className="my-6" />
          
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Neural processing efficiency over time</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsData && analyticsData.performanceForecast && (
                <PerformanceChart
                  data={analyticsData.performanceForecast.map(item => ({
                    date: item.date,
                    value: item.metrics.predictedResponseTime
                  }))}
                  dataKey="predictedResponseTime"
                  title="Response Time"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average neural processing time in milliseconds</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData && analyticsData.performanceForecast && (
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.predictedResponseTime
                    }))}
                    dataKey="predictedResponseTime"
                    title="Response Time"
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>Percentage of failed operations</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData && analyticsData.performanceForecast && (
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.predictedErrorRate * 100
                    }))}
                    dataKey="predictedErrorRate"
                    title="Error Rate"
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Load</CardTitle>
                <CardDescription>Expected operations per minute</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData && analyticsData.performanceForecast && (
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.expectedLoad
                    }))}
                    dataKey="expectedLoad"
                    title="System Load"
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accuracy</CardTitle>
                <CardDescription>Model prediction accuracy rate</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData && analyticsData.performanceForecast && (
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: (1 - item.metrics.predictedErrorRate) * 100
                    }))}
                    dataKey="accuracy"
                    title="Accuracy"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Anomalies</CardTitle>
              <CardDescription>Detected performance anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsData?.anomalies?.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.anomalies.map((anomaly, index) => (
                    <Alert key={index} variant={anomaly.severity === 'high' ? 'destructive' : 'default'}>
                      <AlertTitle className="flex items-center gap-2">
                        <span>{anomaly.type || 'Anomaly'}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          anomaly.severity === 'high' ? 'bg-red-500' :
                          anomaly.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                        } text-white`}>
                          {anomaly.severity || 'low'}
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        {anomaly.description || 'No description available'}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No anomalies detected</p>
                  <p className="text-sm">All systems operating within normal parameters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
