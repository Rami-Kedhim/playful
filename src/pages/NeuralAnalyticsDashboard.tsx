
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNeuralAnalyticsDashboard } from '@/hooks/useNeuralAnalyticsDashboard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from "@/components/ui/use-toast";
import MainLayout from '@/components/layout/MainLayout';
import MetricsGrid from '@/components/analytics/MetricsGrid';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoadingMetrics = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="bg-card">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-8 w-[120px]" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const LoadingChart = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-[200px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[400px] w-full" />
    </CardContent>
  </Card>
);

const NeuralAnalyticsDashboard = () => {
  const { 
    analyticsData,
    loading,
    error,
    keyMetrics,
    activeChart,
    setActiveChart,
    hasCriticalAnomalies,
    refreshAnalytics,
    acknowledgeAnomaly,
    startDate,
    endDate,
    handleDateRangeChange
  } = useNeuralAnalyticsDashboard();

  if (loading) {
    return (
      <MainLayout title="Neural Analytics Dashboard" description="Real-time neural system analytics">
        <div className="space-y-6">
          <LoadingMetrics />
          <LoadingChart />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Neural Analytics Dashboard" description="Real-time neural system analytics">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  // Transform keyMetrics object into an array with proper title properties
  const metricsArray = keyMetrics ? [
    { 
      title: "Response Time", 
      value: keyMetrics.responseTime.value, 
      change: keyMetrics.responseTime.change, 
      unit: keyMetrics.responseTime.unit 
    },
    { 
      title: "Accuracy", 
      value: keyMetrics.accuracy.value, 
      change: keyMetrics.accuracy.change, 
      unit: keyMetrics.accuracy.unit 
    },
    { 
      title: "Error Rate", 
      value: keyMetrics.errorRate.value, 
      change: keyMetrics.errorRate.change, 
      unit: keyMetrics.errorRate.unit 
    },
    { 
      title: "Operations", 
      value: keyMetrics.operations.value, 
      change: keyMetrics.operations.change, 
      unit: keyMetrics.operations.unit 
    }
  ] : [];

  // Get chart data based on active chart type
  const getChartData = () => {
    if (!analyticsData) return [];
    
    switch (activeChart) {
      case 'usage':
        return analyticsData.usageMetrics.dailyUsageTrend || [];
      case 'performance':
        // Create performance trend data from operational metrics
        return analyticsData.usageMetrics.dailyUsageTrend.map((item, index) => ({
          date: item.date,
          value: analyticsData.operationalMetrics.averageAccuracy * 100 - (index * 0.5 * (Math.random() - 0.5))
        }));
      case 'forecast':
        // Use the performance forecast data if available
        return analyticsData.performanceForecast?.map(item => ({
          date: item.date,
          value: item.metrics.expectedLoad
        })) || [];
      default:
        return analyticsData.usageMetrics.dailyUsageTrend || [];
    }
  };

  // Get chart title based on active chart type
  const getChartTitle = () => {
    switch (activeChart) {
      case 'usage':
        return 'Daily System Usage';
      case 'performance':
        return 'System Performance Metrics';
      case 'forecast':
        return 'Neural System Forecast';
      default:
        return 'Neural System Analytics';
    }
  };

  const handleAcknowledgeAnomaly = (id: string) => {
    acknowledgeAnomaly(id);
    toast({
      title: "Anomaly acknowledged",
      description: "The anomaly has been acknowledged and will be monitored.",
    });
  };

  return (
    <MainLayout title="Neural Analytics Dashboard" description="Real-time neural system analytics">
      <div className="space-y-6">
        {hasCriticalAnomalies && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              Critical anomalies detected in the neural system. Immediate attention required.
            </AlertDescription>
          </Alert>
        )}

        {keyMetrics && <MetricsGrid metrics={metricsArray} />}

        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts">
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateRangeChange}
              onRefresh={refreshAnalytics}
            />
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Neural System Analytics</CardTitle>
                  <div className="flex gap-2">
                    {['usage', 'performance', 'forecast'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setActiveChart(type as any)}
                        className={`px-3 py-1 rounded capitalize text-sm ${
                          activeChart === type ? 'bg-primary text-white' : 'bg-secondary'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={getChartData()}
                  dataKey="value"
                  title={getChartTitle()}
                  onRefresh={refreshAnalytics}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="anomalies">
            <AnomalyDetails 
              anomalies={analyticsData?.anomalies || []}
              onAcknowledge={handleAcknowledgeAnomaly}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsDashboard;
