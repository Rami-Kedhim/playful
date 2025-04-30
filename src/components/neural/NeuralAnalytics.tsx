
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Brain, BarChart2, Activity, Zap, AlertTriangle } from 'lucide-react';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnalyticsExportOptions from '@/components/analytics/AnalyticsExportOptions';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';

const NeuralAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    dateRange,
    handleDateChange,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  
  // If still loading the initial data
  if (loading && !analyticsData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If there's an error fetching data
  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold text-destructive">Failed to load analytics data</h2>
            <p className="text-muted-foreground mt-2">{error}</p>
            <Button onClick={refreshAnalytics} className="mt-4">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // When viewing a specific metric detail
  if (selectedMetric) {
    const { value, change } = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    let unit = '';
    if (selectedMetric.key === 'responseTime') unit = 'ms';
    else if (selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate') unit = '%';
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={value}
        unit={unit}
        change={change}
        trendData={trendData}
        onBack={handleBackToOverview}
      />
    );
  }
  
  // Get values for overview metrics
  const responseTimeMetric = getMetricValue('responseTime');
  const accuracyMetric = getMetricValue('accuracy');
  const errorRateMetric = getMetricValue('errorRate');
  const operationsMetric = getMetricValue('operations');
  
  // Main dashboard view
  return (
    <div className="space-y-6">
      {/* Controls for filtering and refreshing */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateRangeFilter 
          startDate={dateRange.from} 
          endDate={dateRange.to}
          onDateChange={handleDateChange}
          onRefresh={refreshAnalytics}
        />
        
        <div className="flex gap-2">
          <AutoRefreshControl
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            refreshInterval={refreshInterval}
            onToggleAutoRefresh={toggleAutoRefresh}
            onChangeInterval={changeRefreshInterval}
          />
          
          <AnalyticsExportOptions 
            data={analyticsData} 
            filename="neural-analytics-export"
          />
        </div>
      </div>

      {/* Key metrics overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={responseTimeMetric.value}
          change={responseTimeMetric.change}
          unit="ms"
          metricKey="responseTime"
          description="Average time taken to process neural requests"
          onDrillDown={handleDrillDown}
        />
        
        <DrillableMetricCard
          title="Model Accuracy"
          value={accuracyMetric.value}
          change={accuracyMetric.change}
          unit="%"
          metricKey="accuracy"
          description="Overall accuracy of neural predictions"
          onDrillDown={handleDrillDown}
        />
        
        <DrillableMetricCard
          title="Error Rate"
          value={errorRateMetric.value}
          change={errorRateMetric.change}
          unit="%"
          metricKey="errorRate"
          description="Percentage of failed neural operations"
          onDrillDown={handleDrillDown}
        />
        
        <DrillableMetricCard
          title="Neural Operations"
          value={operationsMetric.value}
          change={operationsMetric.change}
          unit=""
          metricKey="operations"
          description="Total neural processing operations"
          onDrillDown={handleDrillDown}
        />
      </div>
      
      {/* Tabs for different analytics views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Forecast</CardTitle>
                <CardDescription>Predicted system performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={analyticsData?.performanceForecast.map(item => ({
                    date: item.date,
                    value: item.metrics.predictedResponseTime
                  })) || []}
                  dataKey="Response Time (ms)"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Recommendations</CardTitle>
                <CardDescription>AI-generated optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData?.recommendations.map((recommendation, idx) => (
                  <div key={idx} className="flex items-start gap-2 pb-2 border-b last:border-0 border-border">
                    <div className="p-1 mt-0.5 rounded-full bg-primary/10">
                      <Zap className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Response Time Trend</h3>
                    <PerformanceChart 
                      data={getTrendDataForMetric('responseTime')}
                      dataKey="Response Time"
                      height={200}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Error Rate Trend</h3>
                    <PerformanceChart 
                      data={getTrendDataForMetric('errorRate')}
                      dataKey="Error Rate"
                      height={200}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Neural system resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Daily Operations</h3>
                  <PerformanceChart 
                    data={getTrendDataForMetric('operations')}
                    dataKey="Operations"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detected Anomalies</CardTitle>
              <CardDescription>Recent unusual patterns in neural processing</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsData?.anomalies && analyticsData.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border border-border rounded-md">
                      <div className={`p-2 rounded-full ${
                        anomaly.severity === 'high' ? 'bg-red-100 text-red-600' :
                        anomaly.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{anomaly.type?.replace(/_/g, ' ')}</h4>
                        <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{new Date(anomaly.timestamp || '').toLocaleString()}</span>
                          <span>•</span>
                          <span className="capitalize">{anomaly.severity} Severity</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No anomalies detected</h3>
                  <p className="text-muted-foreground mt-1">All systems operating within normal parameters</p>
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
