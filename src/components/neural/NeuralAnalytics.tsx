
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/analytics/MetricCard';
import PerformanceChart from '@/components/neural/PerformanceChart';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { Separator } from '@/components/ui/separator';
import { Anomaly } from '@/types/analytics';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ 
  refreshInterval = 30 
}) => {
  const [isAutoRefreshOn, setIsAutoRefreshOn] = useState<boolean>(true);
  const [autoRefreshIntervalMs, setAutoRefreshIntervalMs] = useState<number>(refreshInterval * 1000);
  
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  
  const handleRefresh = useCallback(() => {
    refreshAnalytics();
  }, [refreshAnalytics]);
  
  // Set up automatic refresh
  useEffect(() => {
    if (!isAutoRefreshOn) return;
    
    const timer = setInterval(() => {
      refreshAnalytics();
    }, autoRefreshIntervalMs);
    
    return () => clearInterval(timer);
  }, [isAutoRefreshOn, autoRefreshIntervalMs, refreshAnalytics]);
  
  // Handle interval change
  const handleIntervalChange = (interval: number) => {
    setAutoRefreshIntervalMs(interval);
  };
  
  // Handle pause toggle
  const handlePauseToggle = () => {
    setIsAutoRefreshOn(prev => !prev);
  };
  
  // Mocked anomaly data
  const anomalies: Anomaly[] = analyticsData ? [{
    id: 'anomaly-1',
    type: 'Latency Spike',
    severity: 'high',
    description: 'Sudden increase in response time',
    timestamp: new Date().toISOString(),
    relatedComponentId: 'neural-processing',
    message: 'Neural processing response time increased by 35% in the last hour'
  }] : [];
  
  // If we're drilling down into a specific metric
  if (selectedMetric) {
    const metricData = getTrendDataForMetric(selectedMetric.key);
    const { value, change } = getMetricValue(selectedMetric.key);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToOverview}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h2 className="text-xl font-bold">{selectedMetric.title} Details</h2>
          </div>
          
          <AutoRefreshControl
            interval={autoRefreshIntervalMs}
            onIntervalChange={handleIntervalChange}
            onRefresh={handleRefresh}
            isPaused={!isAutoRefreshOn}
            onPauseToggle={handlePauseToggle}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title={selectedMetric.title}
            value={value}
            change={change}
            unit={selectedMetric.key === 'operations' ? 'ops' : 
                  selectedMetric.key === 'responseTime' ? 'ms' : 
                  selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : ''}
          />
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <PerformanceChart
                data={metricData}
                dataKey="date"
                lines={[{
                  dataKey: 'value',
                  name: selectedMetric.title,
                  color: '#8884d8',
                  strokeWidth: 2,
                }]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {selectedMetric.description || 'Detailed information about this metric will appear here.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Handle loading state
  if (loading && !analyticsData) {
    return (
      <div className="w-full space-y-6">
        <div className="flex justify-end">
          <AutoRefreshControl
            interval={autoRefreshIntervalMs}
            onIntervalChange={handleIntervalChange}
            onRefresh={handleRefresh}
            isPaused={!isAutoRefreshOn}
            onPauseToggle={handlePauseToggle}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="w-full">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  <div className="h-8 bg-muted rounded animate-pulse w-2/3"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="h-80 bg-muted rounded animate-pulse w-full"></div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <Card className="border-red-300">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <AlertTriangle className="h-10 w-10 text-red-500" />
            <h3 className="text-xl font-medium">Error loading analytics data</h3>
            <p className="text-muted-foreground max-w-md">
              {error || 'An unexpected error occurred while loading the analytics data. Please try again later.'}
            </p>
            <Button onClick={handleRefresh}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Default view with analytics data
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Neural System Analytics</h2>
        <AutoRefreshControl
          interval={autoRefreshIntervalMs}
          onIntervalChange={handleIntervalChange}
          onRefresh={handleRefresh}
          isPaused={!isAutoRefreshOn}
          onPauseToggle={handlePauseToggle}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Response Time */}
        <div onClick={() => handleDrillDown({
          key: 'responseTime',
          title: 'Response Time',
          description: 'Average time it takes for the neural system to respond to requests.'
        })}>
          <MetricCard
            title="Response Time"
            value={getMetricValue('responseTime').value}
            change={getMetricValue('responseTime').change}
            unit="ms"
          />
        </div>
        
        {/* Accuracy */}
        <div onClick={() => handleDrillDown({
          key: 'accuracy',
          title: 'Accuracy',
          description: 'Overall accuracy rate of neural processing operations.'
        })}>
          <MetricCard
            title="Accuracy"
            value={getMetricValue('accuracy').value}
            change={getMetricValue('accuracy').change}
            unit="%"
          />
        </div>
        
        {/* Error Rate */}
        <div onClick={() => handleDrillDown({
          key: 'errorRate',
          title: 'Error Rate',
          description: 'Percentage of operations that result in errors or failures.'
        })}>
          <MetricCard
            title="Error Rate"
            value={getMetricValue('errorRate').value}
            change={getMetricValue('errorRate').change}
            unit="%"
          />
        </div>
        
        {/* Operations */}
        <div onClick={() => handleDrillDown({
          key: 'operations',
          title: 'Operations',
          description: 'Total number of neural operations processed by the system.'
        })}>
          <MetricCard
            title="Operations"
            value={getMetricValue('operations').value}
            change={getMetricValue('operations').change}
            unit="ops"
          />
        </div>
      </div>
      
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {analyticsData && (
                <PerformanceChart
                  data={analyticsData.performanceForecast.map(item => ({
                    date: item.date,
                    responseTime: item.metrics.predictedResponseTime,
                    accuracy: (1 - item.metrics.predictedErrorRate) * 100
                  }))}
                  dataKey="date"
                  lines={[
                    { dataKey: 'responseTime', name: 'Response Time (ms)', color: '#8884d8' },
                    { dataKey: 'accuracy', name: 'Accuracy (%)', color: '#82ca9d' }
                  ]}
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {analyticsData && (
                <PerformanceChart
                  data={analyticsData.resourceUtilization}
                  dataKey="timestamp"
                  lines={[
                    { dataKey: 'cpuUsage', name: 'CPU (%)', color: '#8884d8' },
                    { dataKey: 'memoryUsage', name: 'Memory (%)', color: '#82ca9d' },
                    { dataKey: 'networkUsage', name: 'Network (%)', color: '#ffc658' }
                  ]}
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="pt-4">
          {anomalies.length > 0 ? (
            anomalies.map((anomaly) => (
              <AnomalyDetails 
                key={anomaly.id}
                anomalies={{
                  id: anomaly.id || '',
                  type: anomaly.type || 'Unknown',
                  severity: anomaly.severity || 'medium',
                  message: anomaly.message || anomaly.description || 'No description available',
                  timestamp: anomaly.timestamp || new Date().toISOString(),
                }}
              />
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <p className="text-muted-foreground">No anomalies detected</p>
                  <p className="text-xs text-muted-foreground">The system is operating within normal parameters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
