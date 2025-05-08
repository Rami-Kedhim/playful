import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceChart } from '@/components/neural/PerformanceChart';
import { MetricCard } from '@/components/neural/MetricCard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface NeuralMetricsDisplayProps {
  neuralNetworkId: string;
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ neuralNetworkId }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    averageResponseTime: number;
    errorRate: number;
    expectedLoad: number;
    predictedResponseTime: number;
    predictedErrorRate: number;
    loadPredictionData: Array<{ date: string; value: number }>;
    responsePredictionData: Array<{ date: string; value: number }>;
    errorPredictionData: Array<{ date: string; value: number }>;
  }>({
    averageResponseTime: 0,
    errorRate: 0,
    expectedLoad: 0,
    predictedResponseTime: 0,
    predictedErrorRate: 0,
    loadPredictionData: [],
    responsePredictionData: [],
    errorPredictionData: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    refreshMetrics();
  }, [neuralNetworkId]);

  const refreshMetrics = async () => {
    setLoading(true);
    try {
      // Simulate fetching metrics from an API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockMetrics = {
        averageResponseTime: Math.random() * 150 + 50,
        errorRate: Math.random() * 0.05,
        expectedLoad: Math.random() * 1000,
        predictedResponseTime: Math.random() * 160 + 40,
        predictedErrorRate: Math.random() * 0.06,
        loadPredictionData: generateMockData(7),
        responsePredictionData: generateMockData(7),
        errorPredictionData: generateMockData(7)
      };

      setPerformanceMetrics(mockMetrics);
    } catch (error: any) {
      console.error('Error fetching metrics:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch performance metrics',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (days: number) => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: date.toLocaleDateString(),
        value: Math.random() * 100
      });
    }
    return data.reverse();
  };

  const {
    averageResponseTime,
    errorRate,
    expectedLoad,
    predictedResponseTime,
    predictedErrorRate,
    loadPredictionData,
    responsePredictionData,
    errorPredictionData
  } = performanceMetrics;

  // In mapDataForChart function, transform the date property to name
  const mapDataForChart = (data: Array<{ date: string; value: number }>) => {
    return data.map(item => ({
      name: item.date,
      value: item.value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neural Network Performance</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard title="Average Response Time" value={averageResponseTime} unit="ms" />
          <MetricCard title="Error Rate" value={errorRate * 100} unit="%" />
          <MetricCard title="Expected Load" value={expectedLoad} />
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Load Predictions</h3>
            <Button variant="outline" size="sm" onClick={refreshMetrics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <PerformanceChart
            data={mapDataForChart(loadPredictionData)}
            dataKey="expectedLoad"
            title="Load Predictions"
            onRefresh={refreshMetrics}
          />
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Response Time Predictions</h3>
            <Button variant="outline" size="sm" onClick={refreshMetrics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <PerformanceChart
            data={mapDataForChart(responsePredictionData)}
            dataKey="predictedResponseTime"
            title="Response Time Predictions"
            onRefresh={refreshMetrics}
          />
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Error Rate Predictions</h3>
            <Button variant="outline" size="sm" onClick={refreshMetrics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <PerformanceChart
            data={mapDataForChart(errorPredictionData)}
            dataKey="predictedErrorRate"
            title="Error Rate Predictions"
            onRefresh={refreshMetrics}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
