
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import NeuralMetricsDisplay from './NeuralMetricsDisplay';
import PerformanceChart from './PerformanceChart';

const NeuralAnalyticsPage: React.FC = () => {
  // Mock data
  const mockMetrics = {
    responseTime: 120,
    accuracy: 95,
    engagement: 87,
    satisfaction: 92
  };

  const mockTrend = {
    responseTime: [150, 140, 130, 125, 122, 120],
    accuracy: [90, 92, 93, 94, 95, 95],
    engagement: [80, 82, 84, 85, 86, 87],
    satisfaction: [85, 87, 89, 90, 91, 92]
  };

  const mockChartData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 72 },
    { name: 'Wed', value: 68 },
    { name: 'Thu', value: 78 },
    { name: 'Fri', value: 82 },
    { name: 'Sat', value: 76 },
    { name: 'Sun', value: 85 },
  ];

  const handleRefreshData = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Neural Analytics Dashboard</h1>
      
      <div className="grid gap-6">
        <NeuralMetricsDisplay 
          metrics={mockMetrics}
          trend={mockTrend}
          period="Last 7 days"
          title="System Performance Metrics"
          refreshInterval={30}
        />
        
        <Tabs defaultValue="performance" className="mt-6">
          <TabsList>
            <TabsTrigger value="performance">Overall Performance</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy Metrics</TabsTrigger>
            <TabsTrigger value="response">Response Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <PerformanceChart 
                  data={mockChartData}
                  title="Performance Trend"
                  description="Overall system performance scoring"
                  dataKey="value"
                  onRefresh={handleRefreshData}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accuracy" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <PerformanceChart 
                  data={mockChartData.map(d => ({ ...d, value: d.value + 10 }))}
                  title="Accuracy Metrics"
                  description="Prediction accuracy percentage"
                  color="#22c55e"
                  dataKey="value"
                  onRefresh={handleRefreshData}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="response" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <PerformanceChart 
                  data={mockChartData.map(d => ({ ...d, value: d.value - 20 }))}
                  title="Response Time"
                  description="Average response time in milliseconds"
                  color="#f59e0b"
                  dataKey="value"
                  onRefresh={handleRefreshData}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NeuralAnalyticsPage;
