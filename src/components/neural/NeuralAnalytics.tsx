
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import useNeuralAnalyticsDashboard, { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import PerformanceChart from '../analytics/PerformanceChart';
import AnomalyDetails from '../analytics/AnomalyDetails';
import DateRangeFilter from '../analytics/DateRangeFilter';
import AutoRefreshControl from '../analytics/AutoRefreshControl';
import DrillableMetricCard from '../analytics/DrillableMetricCard';
import DetailedMetricView from '../analytics/DetailedMetricView';
import { toast } from 'sonner';

const NeuralAnalytics: React.FC = () => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    hasCriticalAnomalies,
    acknowledgeAnomaly,
    startDate,
    endDate,
    handleDateRangeChange,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    drillIntoMetric,
    exitDrillDown,
    getMetricTrendData
  } = useNeuralAnalyticsDashboard();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 w-24 bg-muted rounded animate-pulse mb-4"></div>
                <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="h-[400px] w-full bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!analyticsData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          Analytics data could not be loaded. Please try refreshing.
        </AlertDescription>
      </Alert>
    );
  }
  
  const handleAcknowledgeAnomaly = (id: string) => {
    acknowledgeAnomaly(id);
    toast.success("Anomaly acknowledged");
  };

  // If a metric is selected, show the detailed view
  if (selectedMetric) {
    const trendData = getMetricTrendData(selectedMetric.key);
    const metricData = keyMetrics ? keyMetrics[selectedMetric.key] : { value: 0, change: 0, unit: '' };
    
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
      {hasCriticalAnomalies && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Anomalies Detected</AlertTitle>
          <AlertDescription>
            The system has detected critical anomalies that require attention.
            Please check the Anomalies tab for details.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateRangeChange}
          onRefresh={refreshAnalytics}
        />
        
        <AutoRefreshControl
          isAutoRefreshEnabled={isAutoRefreshEnabled}
          refreshInterval={refreshInterval}
          onToggleAutoRefresh={toggleAutoRefresh}
          onChangeInterval={changeRefreshInterval}
        />
      </div>
      
      {keyMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DrillableMetricCard
            title="Response Time"
            value={keyMetrics.responseTime.value}
            change={keyMetrics.responseTime.change}
            unit="ms"
            metricKey="responseTime"
            description="Average time taken to respond to requests"
            onDrillDown={drillIntoMetric}
          />
          <DrillableMetricCard
            title="Accuracy"
            value={keyMetrics.accuracy.value}
            change={keyMetrics.accuracy.change}
            unit="%"
            metricKey="accuracy"
            description="Average accuracy of neural operations"
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
            description="Total number of neural operations performed"
            onDrillDown={drillIntoMetric}
          />
        </div>
      )}
      
      <Tabs value={activeChart} onValueChange={setActiveChart as (value: string) => void}>
        <TabsList className="mb-2">
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="anomalies">
            Anomalies 
            {analyticsData.anomalies.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {analyticsData.anomalies.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage">
          <Card>
            <CardContent className="pt-6">
              <PerformanceChart
                data={analyticsData.usageMetrics.dailyUsageTrend}
                dataKey="value"
                title="Daily Usage Trend"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardContent className="pt-6">
              <PerformanceChart
                data={analyticsData.operationalMetrics.performanceTrend || []}
                dataKey="value"
                title="Performance Trend"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardContent className="pt-6">
              <PerformanceChart
                data={analyticsData.performanceForecast || []}
                dataKey="value"
                title="Performance Forecast"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies">
          <Card>
            <CardContent className="pt-6">
              <AnomalyDetails 
                anomalies={analyticsData.anomalies} 
                onAcknowledge={handleAcknowledgeAnomaly} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
