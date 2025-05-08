
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceChart from "./PerformanceChart";
import MetricCard from "@/components/analytics/MetricCard";
import NeuralMetricsDisplay from "./NeuralMetricsDisplay";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NeuralAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  // Mock data
  const performanceData = [
    { name: "Mon", value: 87 },
    { name: "Tue", value: 85 },
    { name: "Wed", value: 89 },
    { name: "Thu", value: 92 },
    { name: "Fri", value: 94 },
    { name: "Sat", value: 91 },
    { name: "Sun", value: 93 }
  ];
  
  const errorRateData = [
    { name: "Mon", value: 0.8 },
    { name: "Tue", value: 0.7 },
    { name: "Wed", value: 0.9 },
    { name: "Thu", value: 0.5 },
    { name: "Fri", value: 0.4 },
    { name: "Sat", value: 0.3 },
    { name: "Sun", value: 0.2 }
  ];
  
  const responseTimeData = [
    { name: "Mon", value: 145 },
    { name: "Tue", value: 132 },
    { name: "Wed", value: 128 },
    { name: "Thu", value: 122 },
    { name: "Fri", value: 118 },
    { name: "Sat", value: 124 },
    { name: "Sun", value: 120 }
  ];
  
  const loadData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 72 },
    { name: "Wed", value: 78 },
    { name: "Thu", value: 85 },
    { name: "Fri", value: 92 },
    { name: "Sat", value: 84 },
    { name: "Sun", value: 75 }
  ];
  
  const predictionData = [
    { name: "Mon", value: 78 },
    { name: "Tue", value: 82 },
    { name: "Wed", value: 85 },
    { name: "Thu", value: 89 },
    { name: "Fri", value: 92 },
    { name: "Sat", value: 93 },
    { name: "Sun", value: 94 }
  ];
  
  const handleRefresh = () => {
    setRefreshKey(Date.now());
  };
  
  if (selectedMetric) {
    const getMetricDetails = () => {
      switch (selectedMetric) {
        case "performance":
          return {
            title: "System Performance",
            description: "Overall neural system performance score based on multiple factors including response time, accuracy, and resource utilization.",
            value: 93,
            unit: "%",
            change: 2.4,
            data: performanceData
          };
        case "error":
          return {
            title: "Error Rate",
            description: "Percentage of requests that result in errors or unexpected responses from the neural system.",
            value: 0.2,
            unit: "%",
            change: -35.8,
            data: errorRateData
          };
        case "response":
          return {
            title: "Response Time",
            description: "Average time taken for the neural system to process a request and return a response.",
            value: 120,
            unit: "ms",
            change: -8.3,
            data: responseTimeData
          };
        case "load":
          return {
            title: "System Load",
            description: "Current resource utilization across the neural system infrastructure.",
            value: 75,
            unit: "%",
            change: 12.5,
            data: loadData
          };
        default:
          return {
            title: "Prediction Accuracy",
            description: "How accurately the neural system predicts outcomes based on input data.",
            value: 94,
            unit: "%",
            change: 3.9,
            data: predictionData
          };
      }
    };
    
    const metric = getMetricDetails();
    
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{metric.title}</h2>
            <p className="text-muted-foreground">{metric.description}</p>
          </div>
          <Button variant="ghost" onClick={() => setSelectedMetric(null)}>
            Back to Overview
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {metric.value}{metric.unit}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Change (7d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                Optimal
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>7-Day Trend</CardTitle>
            <Button size="sm" variant="ghost" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <PerformanceChart
                data={metric.data}
                dataKey={selectedMetric}
                title={metric.title}
                onRefresh={handleRefresh}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
      <TabsList className="grid grid-cols-4 w-full md:w-1/2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Neural System Overview</h2>
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard
            title="System Performance"
            value={93}
            unit="%"
            change={2.4}
            onClick={() => setSelectedMetric("performance")}
          />
          
          <MetricCard
            title="Error Rate"
            value={0.2}
            unit="%"
            change={-35.8}
            onClick={() => setSelectedMetric("error")}
          />
          
          <MetricCard
            title="Response Time"
            value={120}
            unit="ms"
            change={-8.3}
            onClick={() => setSelectedMetric("response")}
          />
          
          <MetricCard
            title="System Load"
            value={75}
            unit="%"
            change={12.5}
            onClick={() => setSelectedMetric("load")}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={performanceData}
                dataKey="performance"
                title="Performance Score"
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Error Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={errorRateData}
                dataKey="errorRate"
                title="Error Rate (%)"
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="performance" className="space-y-6">
        <NeuralMetricsDisplay
          title="Performance Metrics"
          refreshInterval={30000}
        />
      </TabsContent>
      
      <TabsContent value="predictions" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">AI Prediction Metrics</h2>
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard
            title="Accuracy"
            value={94}
            unit="%"
            change={3.9}
          />
          
          <MetricCard
            title="Precision"
            value={92.5}
            unit="%"
            change={2.1}
          />
          
          <MetricCard
            title="Recall"
            value={91.8}
            unit="%"
            change={4.2}
          />
          
          <MetricCard
            title="F1 Score"
            value={92.1}
            unit="%"
            change={3.5}
          />
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Prediction Accuracy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={predictionData}
              dataKey="prediction"
              title="Prediction Accuracy"
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resources" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Resource Utilization</h2>
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard
            title="CPU Usage"
            value={82}
            unit="%"
            change={7.3}
          />
          
          <MetricCard
            title="Memory"
            value={78}
            unit="%"
            change={4.8}
          />
          
          <MetricCard
            title="Network"
            value={67}
            unit="%"
            change={-2.3}
          />
          
          <MetricCard
            title="Storage"
            value={43}
            unit="%"
            change={5.1}
          />
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Load Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={loadData}
              dataKey="load"
              title="System Load"
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NeuralAnalytics;
