
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNeuralAnalyticsDashboard } from '@/hooks/useNeuralAnalyticsDashboard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MainLayout from '@/components/layout/MainLayout';
import MetricsGrid from '@/components/analytics/MetricsGrid';
import PerformanceChart from '@/components/analytics/PerformanceChart';

const NeuralAnalyticsDashboard = () => {
  const { 
    analyticsData,
    loading,
    error,
    keyMetrics,
    activeChart,
    setActiveChart,
    hasCriticalAnomalies 
  } = useNeuralAnalyticsDashboard();

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading analytics...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Neural System Performance</CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveChart('usage')}
                  className={`px-3 py-1 rounded ${
                    activeChart === 'usage' ? 'bg-primary text-white' : 'bg-secondary'
                  }`}
                >
                  Usage
                </button>
                <button
                  onClick={() => setActiveChart('performance')}
                  className={`px-3 py-1 rounded ${
                    activeChart === 'performance' ? 'bg-primary text-white' : 'bg-secondary'
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveChart('forecast')}
                  className={`px-3 py-1 rounded ${
                    activeChart === 'forecast' ? 'bg-primary text-white' : 'bg-secondary'
                  }`}
                >
                  Forecast
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={analyticsData?.usageMetrics?.dailyUsageTrend || []}
              dataKey="value"
              title={`${activeChart.charAt(0).toUpperCase() + activeChart.slice(1)} Metrics`}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsDashboard;
