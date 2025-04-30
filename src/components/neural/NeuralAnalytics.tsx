
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useNeuralAnalyticsDashboard, { AnalyticsChartType } from '@/hooks/useNeuralAnalyticsDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BarChart3, LineChart, AlertCircle, Download } from 'lucide-react';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AnalyticsExportOptions from '@/components/analytics/AnalyticsExportOptions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NeuralAnalytics: React.FC = () => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    startDate,
    endDate,
    handleDateRangeChange,
    selectedMetric,
    drillIntoMetric,
    exitDrillDown,
    getMetricTrendData
  } = useNeuralAnalyticsDashboard();

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Analytics</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>{error}</p>
          <Button onClick={refreshAnalytics} variant="outline" size="sm" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (loading || !analyticsData || !keyMetrics) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-[240px]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  // If a metric is selected, show the detailed view
  if (selectedMetric) {
    const metricData = keyMetrics[selectedMetric.key];
    const trendData = getMetricTrendData(selectedMetric.key);
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={metricData.value}
        unit={metricData.unit}
        change={metricData.change}
        trendData={trendData}
        onBack={exitDrillDown}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <DateRangeFilter 
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateRangeChange}
          onRefresh={refreshAnalytics}
        />
        
        <div className="flex items-center gap-2">
          <AnalyticsExportOptions data={analyticsData} filename="neural-analytics" />
          <AutoRefreshControl
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            refreshInterval={refreshInterval}
            onToggleAutoRefresh={toggleAutoRefresh}
            onChangeInterval={changeRefreshInterval}
          />
        </div>
      </div>

      {/* Anomalies Alert (Show only if there are anomalies) */}
      {analyticsData.anomalies.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Anomalies Detected</AlertTitle>
          <AlertDescription>
            {analyticsData.anomalies.length} anomalies detected in the system. 
            {analyticsData.anomalies.some(a => a.severity === 'high') && 
              " Including high severity issues that require attention."}
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={keyMetrics.responseTime.value}
          change={keyMetrics.responseTime.change}
          unit="ms"
          metricKey="responseTime"
          description="Average system response time in milliseconds"
          onDrillDown={drillIntoMetric}
        />
        <DrillableMetricCard
          title="Accuracy"
          value={keyMetrics.accuracy.value}
          change={keyMetrics.accuracy.change}
          unit="%"
          metricKey="accuracy"
          description="Neural processing accuracy percentage"
          onDrillDown={drillIntoMetric}
        />
        <DrillableMetricCard
          title="Error Rate"
          value={keyMetrics.errorRate.value}
          change={keyMetrics.errorRate.change}
          unit="%"
          metricKey="errorRate"
          description="Percentage of operations resulting in errors"
          onDrillDown={drillIntoMetric}
        />
        <DrillableMetricCard
          title="Operations"
          value={keyMetrics.operations.value}
          change={keyMetrics.operations.change}
          unit=""
          metricKey="operations"
          description="Total number of neural operations processed"
          onDrillDown={drillIntoMetric}
        />
      </div>

      {/* Charts */}
      <Tabs value={activeChart} onValueChange={(value) => setActiveChart(value as AnalyticsChartType)}>
        <TabsList className="mb-4">
          <TabsTrigger value="usage">
            <BarChart3 className="h-4 w-4 mr-2" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="performance">
            <LineChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="pt-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage Metrics</CardTitle>
              <CardDescription>
                Neural system usage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={analyticsData.usageMetrics.dailyUsageTrend}
                dataKey="value"
                title="Daily Usage"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="pt-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                System performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={getMetricTrendData(
                  selectedMetric ? selectedMetric.key : 'responseTime'
                )}
                dataKey="value"
                title="Response Time Trend"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
