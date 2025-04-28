
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNeuralAnalyticsDashboard } from '@/hooks/useNeuralAnalyticsDashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowUp, ArrowDown } from 'lucide-react';

const MetricCard = ({ title, value, change, unit }: { 
  title: string;
  value: number;
  change: number;
  unit: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {change !== 0 && (
          <span className={`flex items-center ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold mt-2">
        {value}
        <span className="text-sm font-normal text-muted-foreground ml-1">
          {unit}
        </span>
      </h3>
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

        {keyMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Response Time" 
              value={keyMetrics.responseTime.value} 
              change={keyMetrics.responseTime.change}
              unit={keyMetrics.responseTime.unit}
            />
            <MetricCard 
              title="Accuracy" 
              value={keyMetrics.accuracy.value} 
              change={keyMetrics.accuracy.change}
              unit={keyMetrics.accuracy.unit}
            />
            <MetricCard 
              title="Error Rate" 
              value={keyMetrics.errorRate.value} 
              change={keyMetrics.errorRate.change}
              unit={keyMetrics.errorRate.unit}
            />
            <MetricCard 
              title="Total Operations" 
              value={keyMetrics.operations.value} 
              change={keyMetrics.operations.change}
              unit={keyMetrics.operations.unit}
            />
          </div>
        )}

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
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData?.usageMetrics?.dailyUsageTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsDashboard;
