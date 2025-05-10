
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNeuralAnalyticsDashboard } from "@/hooks/useNeuralAnalyticsDashboard";
import PerformanceChart from "@/components/neural/PerformanceChart";
import DetailedMetricView from "@/components/analytics/DetailedMetricView";
import NeuralMetricsDisplay from "@/components/neural/NeuralMetricsDisplay";
import { MetricCard, MetricsGrid } from "@/components/analytics";
import { MetricCardProps } from "@/types/analytics";

const NeuralAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const { metrics, loading, error, fetchData } = useNeuralAnalyticsDashboard();
  
  if (loading) {
    return <div className="py-10 text-center">Loading neural analytics data...</div>;
  }
  
  if (error) {
    return (
      <div className="py-10">
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-destructive">
              <p className="font-medium">Error loading neural analytics data</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // If no metrics data is available yet
  if (!metrics) {
    return (
      <div className="py-10">
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="font-medium">No neural analytics data available</p>
              <p className="text-sm mt-2">Data will appear here once neural processing has begun.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRefresh = () => {
    fetchData();
  };
  
  // Format the metric cards for the overview
  const metricCards: MetricCardProps[] = [
    {
      title: "Response Time",
      value: `${metrics.responseTime.toFixed(2)}ms`,
      change: metrics.trends.responseTime,
    },
    {
      title: "Accuracy",
      value: `${(metrics.accuracy * 100).toFixed(1)}%`,
      change: metrics.trends.accuracy * 100,
    },
    {
      title: "User Engagement",
      value: `${metrics.engagement.toFixed(1)}`,
      change: metrics.trends.engagement,
    },
    {
      title: "Satisfaction Score",
      value: `${metrics.satisfaction.toFixed(1)}`,
      change: metrics.trends.satisfaction,
    }
  ];

  // Handle back from detailed view
  const handleBack = () => {
    setSelectedMetric(null);
  };
  
  // Convert the selected metric data into the format needed for the chart
  const getSelectedMetricData = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return metrics.charts.responseTime.map(item => ({
          name: item.timestamp,
          value: item.value
        }));
      case 'accuracy':
        return metrics.charts.accuracy.map(item => ({
          name: item.timestamp,
          value: item.value * 100 // Convert to percentage
        }));
      case 'engagement':
        return metrics.charts.engagement.map(item => ({
          name: item.timestamp,
          value: item.value
        }));
      case 'satisfaction':
        return metrics.charts.satisfaction.map(item => ({
          name: item.timestamp,
          value: item.value
        }));
      default:
        return [];
    }
  };
  
  // Get the detailed view props based on the selected metric
  const getMetricDetails = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return {
          title: "Response Time",
          description: "Average time taken to respond to user queries",
          value: metrics.responseTime,
          unit: "ms",
          change: metrics.trends.responseTime,
          data: getSelectedMetricData()
        };
      case 'accuracy':
        return {
          title: "Accuracy",
          description: "Precision of neural responses compared to expected outcomes",
          value: metrics.accuracy * 100,
          unit: "%",
          change: metrics.trends.accuracy * 100,
          data: getSelectedMetricData()
        };
      case 'engagement':
        return {
          title: "User Engagement",
          description: "Measure of how users interact with neural responses",
          value: metrics.engagement,
          unit: "",
          change: metrics.trends.engagement,
          data: getSelectedMetricData()
        };
      case 'satisfaction':
        return {
          title: "Satisfaction Score",
          description: "User reported satisfaction with neural interactions",
          value: metrics.satisfaction,
          unit: "",
          change: metrics.trends.satisfaction,
          data: getSelectedMetricData()
        };
      default:
        return null;
    }
  };
  
  // If a metric is selected, show detailed view
  if (selectedMetric) {
    const metricDetail = getMetricDetails();
    if (metricDetail) {
      return (
        <DetailedMetricView 
          {...metricDetail}
          onBack={handleBack}
        />
      );
    }
  }
  
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Neural System Health</CardTitle>
            <CardDescription>
              Current performance metrics for the neural processing system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <NeuralMetricsDisplay 
                metrics={{
                  responseTime: metrics.responseTime,
                  accuracy: metrics.accuracy,
                  engagement: metrics.engagement,
                  satisfaction: metrics.satisfaction
                }}
                period="24h"
              />
            </div>
            
            <MetricsGrid 
              metrics={metricCards}
              onMetricClick={(index) => {
                const metricKeys = ['responseTime', 'accuracy', 'engagement', 'satisfaction'];
                setSelectedMetric(metricKeys[index]);
              }}
            />
          </CardContent>
        </Card>
        
        <PerformanceChart 
          data={metrics.charts.responseTime.map(point => ({
            name: point.timestamp,
            value: point.value
          }))}
          dataKey="value"
          title="Response Time Trend"
          onRefresh={handleRefresh}
        />
      </TabsContent>
      
      <TabsContent value="performance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>
              Detailed performance metrics for neural processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">System Load</h3>
                <div className="text-2xl font-semibold">{metrics.systemLoad.toFixed(2)}%</div>
                <p className="text-sm text-muted-foreground">
                  {metrics.systemLoad < 50 ? 'System operating normally' : 
                   metrics.systemLoad < 80 ? 'Moderate system load' : 
                   'High system load detected'}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Memory Usage</h3>
                <div className="text-2xl font-semibold">{metrics.memoryUsage.toFixed(2)}%</div>
                <p className="text-sm text-muted-foreground">
                  {metrics.memoryUsage < 70 ? 'Memory usage normal' : 'High memory usage'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <PerformanceChart 
          data={metrics.charts.accuracy.map(point => ({
            name: point.timestamp,
            value: point.value * 100
          }))}
          dataKey="value"
          title="Accuracy Trend"
          onRefresh={handleRefresh}
        />
      </TabsContent>
      
      <TabsContent value="insights" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Neural Insights</CardTitle>
            <CardDescription>
              Advanced metrics and insights from neural operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-secondary/20 rounded">
                  <div className="text-sm font-medium text-secondary-foreground">Total Requests</div>
                  <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
                </div>
                
                <div className="p-4 bg-secondary/20 rounded">
                  <div className="text-sm font-medium text-secondary-foreground">Success Rate</div>
                  <div className="text-2xl font-bold">{(metrics.successRate * 100).toFixed(1)}%</div>
                </div>
                
                <div className="p-4 bg-secondary/20 rounded">
                  <div className="text-sm font-medium text-secondary-foreground">Avg. Processing Time</div>
                  <div className="text-2xl font-bold">{metrics.avgProcessingTime.toFixed(2)}ms</div>
                </div>
                
                <div className="p-4 bg-secondary/20 rounded">
                  <div className="text-sm font-medium text-secondary-foreground">Error Rate</div>
                  <div className="text-2xl font-bold">{(metrics.errorRate * 100).toFixed(2)}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NeuralAnalytics;
