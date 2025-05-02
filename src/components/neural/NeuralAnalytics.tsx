
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, Brain, Activity, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import NeuralMetricsDisplay from './NeuralMetricsDisplay';
import MetricCard from '@/components/analytics/MetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import PerformanceChart from './PerformanceChart';
import { Separator } from '@/components/ui/separator';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    isAutoRefreshEnabled,
    refreshInterval: currentRefreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Handle manual refresh click
  const handleRefreshClick = () => {
    refreshAnalytics();
  };
  
  if (loading && !analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading neural analytics data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error loading analytics</AlertTitle>
        <AlertDescription>
          {error || "Failed to load neural analytics data. Please try again later."}
        </AlertDescription>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefreshClick}
          className="mt-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </Alert>
    );
  }
  
  // If a specific metric is selected, show the detailed view
  if (selectedMetric) {
    const metricValues = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={metricValues.value}
        unit={selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : ''}
        change={metricValues.change}
        data={trendData}
        onBack={handleBackToOverview}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Neural System Analytics</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <AutoRefreshControl
            interval={currentRefreshInterval}
            onIntervalChange={changeRefreshInterval}
            onRefresh={handleRefreshClick}
            isPaused={!isAutoRefreshEnabled}
            onPauseToggle={toggleAutoRefresh}
          />
          
          <Button variant="outline" size="sm" onClick={handleRefreshClick}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>
      
      {analyticsData && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Anomalies {analyticsData.anomalies.length > 0 && `(${analyticsData.anomalies.length})`}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Response Time"
                value={analyticsData.systemMetrics.responseTimeMs}
                unit="ms"
                change={analyticsData.operationalMetrics.responseTimeChange}
                onClick={() => handleDrillDown({ 
                  key: 'responseTime', 
                  title: 'Response Time',
                  description: 'Average time to process neural operations' 
                })}
              />
              <MetricCard
                title="Accuracy"
                value={analyticsData.modelPerformance.accuracy * 100}
                unit="%"
                change={analyticsData.operationalMetrics.accuracyChange}
                onClick={() => handleDrillDown({ 
                  key: 'accuracy', 
                  title: 'Model Accuracy',
                  description: 'Accuracy of neural processing operations' 
                })}
              />
              <MetricCard
                title="Error Rate"
                value={analyticsData.systemMetrics.errorRate}
                unit="%"
                change={analyticsData.operationalMetrics.errorRateChange}
                onClick={() => handleDrillDown({ 
                  key: 'errorRate', 
                  title: 'Error Rate',
                  description: 'Percentage of failed operations' 
                })}
              />
              <MetricCard
                title="Operations"
                value={analyticsData.operationalMetrics.totalOperations}
                unit=""
                change={analyticsData.operationalMetrics.operationsChange}
                onClick={() => handleDrillDown({ 
                  key: 'operations', 
                  title: 'Total Operations',
                  description: 'Number of neural operations processed' 
                })}
              />
            </div>
            
            {/* Performance Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  data={analyticsData.performanceForecast.map(item => ({
                    date: item.date,
                    value: item.metrics.predictedResponseTime
                  }))}
                  dataKey="predictedResponseTime"
                  title="Predicted Response Time"
                  onRefresh={handleRefreshClick}
                />
              </CardContent>
            </Card>
            
            {/* System Metrics Display */}
            <NeuralMetricsDisplay 
              title="Resource Utilization"
              refreshInterval={refreshInterval * 1000}
            />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Time Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.predictedResponseTime
                    }))}
                    dataKey="predictedResponseTime"
                    title="Response Time"
                    onRefresh={handleRefreshClick}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Error Rate Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.predictedErrorRate * 100
                    }))}
                    dataKey="predictedErrorRate"
                    title="Error Rate"
                    onRefresh={handleRefreshClick}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">System Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: item.metrics.expectedLoad
                    }))}
                    dataKey="expectedLoad"
                    title="Expected Load"
                    onRefresh={handleRefreshClick}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Accuracy Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={analyticsData.performanceForecast.map(item => ({
                      date: item.date,
                      value: (1 - item.metrics.predictedErrorRate) * 100
                    }))}
                    dataKey="accuracy"
                    title="Accuracy"
                    onRefresh={handleRefreshClick}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="anomalies" className="space-y-4">
            {analyticsData.anomalies.length === 0 ? (
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertTitle>No anomalies detected</AlertTitle>
                <AlertDescription>
                  All neural systems are operating within normal parameters.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {analyticsData.anomalies.map((anomaly, index) => (
                  <Card key={anomaly.id || index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`
                        p-4 border-l-4
                        ${anomaly.severity === 'high' ? 'border-red-500 bg-red-50' : 
                          anomaly.severity === 'medium' ? 'border-amber-500 bg-amber-50' : 
                          'border-blue-500 bg-blue-50'}
                      `}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">
                              {anomaly.type || 'System Anomaly'}
                            </h3>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {anomaly.description || 'No details available'}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center gap-2">
                            <span className={`
                              text-xs px-2 py-1 rounded
                              ${anomaly.severity === 'high' ? 'bg-red-200 text-red-800' : 
                                anomaly.severity === 'medium' ? 'bg-amber-200 text-amber-800' : 
                                'bg-blue-200 text-blue-800'}
                            `}>
                              {anomaly.severity || 'low'} severity
                            </span>
                            {anomaly.timestamp && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(anomaly.timestamp).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default NeuralAnalytics;
