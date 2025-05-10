
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DatePicker } from '@/components/ui/date-picker';
import { Loader2, AlertTriangle } from 'lucide-react';
import PerformanceChart from './PerformanceChart';
import { NeuralMetricsDisplay } from './NeuralMetricsDisplay';

// Mock hook for neural analytics
const useNeuralAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>({
    performance: {
      accuracy: 95,
      responseTime: 120,
      engagement: 87,
      satisfaction: 92
    },
    trends: {
      accuracy: [92, 94, 93, 95, 96, 95],
      responseTime: [150, 140, 130, 125, 122, 120],
      engagement: [80, 82, 85, 84, 86, 87],
      satisfaction: [88, 90, 89, 91, 90, 92]
    }
  });
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({});

  const refreshAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would fetch new data
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDateChange = (start?: Date, end?: Date) => {
    setDateRange({from: start, to: end});
    refreshAnalytics();
  };

  const getMetricData = (metric: string) => {
    return [
      { name: 'Mon', value: Math.floor(Math.random() * 100) },
      { name: 'Tue', value: Math.floor(Math.random() * 100) },
      { name: 'Wed', value: Math.floor(Math.random() * 100) },
      { name: 'Thu', value: Math.floor(Math.random() * 100) },
      { name: 'Fri', value: Math.floor(Math.random() * 100) },
      { name: 'Sat', value: Math.floor(Math.random() * 100) },
      { name: 'Sun', value: Math.floor(Math.random() * 100) },
    ];
  };

  const getTrendDataForMetric = (metricKey: string) => {
    return getMetricData(metricKey);
  };

  return {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    dateRange,
    handleDateChange,
    getMetricData,
    getTrendDataForMetric
  };
};

const NeuralAnalytics: React.FC = () => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    dateRange,
    handleDateChange,
    getTrendDataForMetric
  } = useNeuralAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error loading neural analytics: {error.message || 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-semibold">Neural Processing Metrics</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <DatePicker
            selected={dateRange.from}
            onSelect={(date) => handleDateChange(date, dateRange.to)}
            placeholder="Start date"
          />
          <DatePicker
            selected={dateRange.to}
            onSelect={(date) => handleDateChange(dateRange.from, date)}
            placeholder="End date"
          />
        </div>
      </div>
      
      <NeuralMetricsDisplay 
        metrics={{
          responseTime: analyticsData.performance.responseTime,
          accuracy: analyticsData.performance.accuracy,
          engagement: analyticsData.performance.engagement,
          satisfaction: analyticsData.performance.satisfaction
        }}
        trend={{
          responseTime: analyticsData.trends.responseTime,
          accuracy: analyticsData.trends.accuracy,
          engagement: analyticsData.trends.engagement,
          satisfaction: analyticsData.trends.satisfaction
        }}
        period="Last 7 days"
      />
      
      <Tabs defaultValue="accuracy">
        <TabsList>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accuracy" className="mt-6">
          <PerformanceChart
            data={getTrendDataForMetric('accuracy')}
            dataKey="value"
            title="Accuracy Over Time"
            onRefresh={refreshAnalytics}
          />
        </TabsContent>
        
        <TabsContent value="response-time" className="mt-6">
          <PerformanceChart
            data={getTrendDataForMetric('responseTime')}
            dataKey="value"
            title="Response Time Over Time"
            onRefresh={refreshAnalytics}
          />
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PerformanceChart
                  data={getTrendDataForMetric('engagement')}
                  dataKey="value"
                  title=""
                  height={280}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="satisfaction" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PerformanceChart
                  data={getTrendDataForMetric('satisfaction')}
                  dataKey="value"
                  title=""
                  height={280}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
