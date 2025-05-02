
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import MetricCard from '@/components/analytics/MetricCard';
import { useNeuralAnalyticsDashboard } from '@/hooks/useNeuralAnalyticsDashboard';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import PerformanceChart from '@/components/neural/PerformanceChart';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';

const NeuralAnalytics: React.FC = () => {
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
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();

  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = () => {
    refreshAnalytics();
  };

  if (loading && !analyticsData) {
    return (
      <div className="w-full p-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p className="text-lg font-medium">Failed to load analytics data</p>
            <p className="text-sm mt-1">{error.toString()}</p>
            <Button onClick={handleRefresh} variant="outline" className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return null;
  }

  // Helper to map metrics to their respective values and changes
  const getMetrics = () => {
    return [
      {
        title: 'Response Time',
        value: getMetricValue('responseTime').value,
        change: getMetricValue('responseTime').change,
        unit: 'ms',
        key: 'responseTime'
      },
      {
        title: 'Model Accuracy',
        value: getMetricValue('accuracy').value,
        change: getMetricValue('accuracy').change,
        unit: '%',
        key: 'accuracy'
      },
      {
        title: 'Error Rate',
        value: getMetricValue('errorRate').value,
        change: getMetricValue('errorRate').change,
        unit: '%',
        key: 'errorRate'
      },
      {
        title: 'Total Operations',
        value: getMetricValue('operations').value,
        change: getMetricValue('operations').change,
        unit: 'ops',
        key: 'operations'
      }
    ];
  };

  // If we're viewing a detailed metric
  if (selectedMetric) {
    const metricData = getTrendDataForMetric(selectedMetric.key);
    return (
      <DetailedMetricView
        metric={selectedMetric}
        data={metricData}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Neural System Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Real-time performance insights and neural system health
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <AutoRefreshControl
            isEnabled={isAutoRefreshEnabled}
            refreshInterval={refreshInterval}
            onToggle={toggleAutoRefresh}
            onChangeInterval={changeRefreshInterval}
          />
          
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-2 hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getMetrics().map((metric) => (
          <MetricCard
            key={metric.key}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            unit={metric.unit}
            onClick={() => handleDrillDown({
              key: metric.key as any,
              title: metric.title,
              description: `Detailed analysis of ${metric.title.toLowerCase()}`
            })}
          />
        ))}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Performance</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies ({analyticsData.anomalies.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">System Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData.performanceForecast}
                dataKey="predictedResponseTime"
                title="Response Time Trend"
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="mt-6">
          <AnomalyDetails anomalies={analyticsData.anomalies} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
