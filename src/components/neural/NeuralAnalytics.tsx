
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import NeuralMetricsDisplay from './NeuralMetricsDisplay';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import PerformanceChart from '@/components/neural/PerformanceChart';

const NeuralAnalytics: React.FC = () => {
  const [startDate, setStartDate] = React.useState<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // One week ago
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  
  const handleRefreshData = () => {
    console.log('Refreshing data...');
    refreshAnalytics();
  };

  // Sample performance metrics data for demonstration
  const responseTimeData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 132 },
    { name: 'Wed', value: 101 },
    { name: 'Thu', value: 134 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 110 },
    { name: 'Sun', value: 120 },
  ];

  const accuracyData = [
    { name: 'Mon', value: 94 },
    { name: 'Tue', value: 92 },
    { name: 'Wed', value: 97 },
    { name: 'Thu', value: 95 },
    { name: 'Fri', value: 98 },
    { name: 'Sat', value: 96 },
    { name: 'Sun', value: 97 },
  ];

  // Default metrics in case analytics data is not loaded yet
  const defaultMetrics = {
    responseTime: 120,
    accuracy: 96,
    engagement: 85,
    satisfaction: 92
  };

  // Use actual metrics if available, otherwise use defaults
  const metrics = analyticsData?.metrics || defaultMetrics;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Neural Analytics</h1>
        <Button variant="outline" size="sm" onClick={handleRefreshData}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Date Range</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            label="Start Date"
          />
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            label="End Date"
          />
        </CardContent>
      </Card>
      
      {/* Display metrics overview */}
      <NeuralMetricsDisplay 
        metrics={metrics}
        period={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
        refreshInterval={60}
      />
      
      {/* Performance charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time (ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={responseTimeData}
              dataKey="value"
              title="Response Time"
              onRefresh={handleRefreshData}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Accuracy (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={accuracyData}
              dataKey="value"
              title="Accuracy"
              onRefresh={handleRefreshData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralAnalytics;
