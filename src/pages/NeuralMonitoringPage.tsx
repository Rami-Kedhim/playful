
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralMetricsDisplay from '@/components/neural/NeuralMetricsDisplay';
import NeuralAnalyticsDashboard from '@/components/neural/NeuralAnalyticsDashboard';
import SystemHealthPanel from '@/components/brainHub/SystemHealthPanel';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Settings, AlertTriangle, BarChart3, Brain, History, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [refreshInterval, setRefreshInterval] = useState<number>(10000);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHistorical, setShowHistorical] = useState<boolean>(false);
  
  const handleRefreshIntervalChange = (value: string) => {
    setRefreshInterval(parseInt(value, 10));
  };

  useEffect(() => {
    // Effect for handling full-screen mode or other initializations
    return () => {
      // Cleanup on component unmount
    };
  }, []);
  
  return (
    <MainLayout
      title="Neural Monitoring"
      description="Monitor and analyze neural system performance"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-3xl font-bold tracking-tight">Neural System Hub</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Refresh:</span>
            <Select 
              value={refreshInterval.toString()} 
              onValueChange={handleRefreshIntervalChange}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Refresh Interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">5 seconds</SelectItem>
                <SelectItem value="10000">10 seconds</SelectItem>
                <SelectItem value="30000">30 seconds</SelectItem>
                <SelectItem value="60000">1 minute</SelectItem>
                <SelectItem value="300000">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button size="sm" variant="outline" onClick={() => setShowHistorical(!showHistorical)}>
            <History className="mr-2 h-4 w-4" />
            {showHistorical ? 'Hide' : 'Show'} History
          </Button>
          
          <Button size="sm">
            <Activity className="mr-2 h-4 w-4" />
            System Status
          </Button>
        </div>
      </div>

      {showHistorical && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Historical Performance</CardTitle>
            <CardDescription>Performance metrics over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PerformanceChart
              data={[
                { timestamp: '30d', value: 72, memory: 34, error: 3.2 },
                { timestamp: '25d', value: 75, memory: 36, error: 3.0 },
                { timestamp: '20d', value: 79, memory: 35, error: 2.8 },
                { timestamp: '15d', value: 82, memory: 37, error: 2.7 },
                { timestamp: '10d', value: 80, memory: 36, error: 2.6 },
                { timestamp: '5d', value: 84, memory: 37, error: 2.5 },
                { timestamp: 'Now', value: 87, memory: 38, error: 2.3 }
              ]}
              dataKey="timestamp"
              lines={[
                {
                  dataKey: "value",
                  name: "Processing Efficiency",
                  color: "#8b5cf6",
                  strokeWidth: 2
                },
                {
                  dataKey: "memory",
                  name: "Memory Usage",
                  color: "#ec4899",
                  strokeWidth: 2
                },
                {
                  dataKey: "error",
                  name: "Error Rate",
                  color: "#ef4444",
                  strokeWidth: 2
                }
              ]}
              height={250}
            />
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Detailed Metrics
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            System Controls
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Architecture
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeuralMetricsDisplay refreshInterval={refreshInterval} />
            <SystemHealthPanel />
          </div>
          
          <NeuralAnalyticsDashboard className="mt-6" />
        </TabsContent>
        
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 gap-6">
            <NeuralMetricsDisplay refreshInterval={refreshInterval} />
            
            <NeuralAnalyticsDashboard refreshInterval={refreshInterval} />
          </div>
        </TabsContent>
        
        <TabsContent value="controls">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeuralSystemControls />
            <NeuralRecommendations />
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeuralRecommendations />
            <SystemHealthPanel />
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Optimization Plan</CardTitle>
              <CardDescription>Recommended steps for system optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal list-inside ml-4">
                <li className="text-sm">
                  <span className="font-medium">Optimize Neural Pathways</span>
                  <p className="text-muted-foreground ml-6">Restructure neural connections to improve information flow and response times.</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Upgrade Memory Allocation</span>
                  <p className="text-muted-foreground ml-6">Increase available memory for complex operations to prevent bottlenecks.</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Schedule Maintenance Window</span>
                  <p className="text-muted-foreground ml-6">Plan for system maintenance during low-traffic periods to minimize disruption.</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Apply Neural Network Optimization</span>
                  <p className="text-muted-foreground ml-6">Implement advanced algorithms to enhance model accuracy and efficiency.</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Review Error Patterns</span>
                  <p className="text-muted-foreground ml-6">Analyze system errors to identify recurring issues and implement permanent fixes.</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="architecture">
          <Card>
            <CardHeader>
              <CardTitle>Neural System Architecture</CardTitle>
              <CardDescription>Overview of the neural processing system architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-lg bg-muted/50">
                <div className="flex flex-col items-center">
                  <div className="text-center mb-8">
                    <div className="p-4 border rounded-lg bg-background mb-2 w-64">
                      <h3 className="font-medium">Interface Layer</h3>
                      <p className="text-xs text-muted-foreground">User interactions & system inputs</p>
                    </div>
                    <div className="h-8 w-0.5 bg-border mx-auto"></div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="p-4 border rounded-lg bg-background mb-2 w-64">
                      <h3 className="font-medium">Processing Layer</h3>
                      <p className="text-xs text-muted-foreground">Neural computation & analysis</p>
                    </div>
                    <div className="h-8 w-0.5 bg-border mx-auto"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
                    <div className="p-3 border rounded-lg bg-background text-center">
                      <h4 className="text-sm font-medium">Data Store</h4>
                      <p className="text-xs text-muted-foreground">Historical metrics</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-background text-center">
                      <h4 className="text-sm font-medium">Neural Engine</h4>
                      <p className="text-xs text-muted-foreground">Core processing</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-background text-center">
                      <h4 className="text-sm font-medium">Analytics</h4>
                      <p className="text-xs text-muted-foreground">Performance metrics</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-8 w-0.5 bg-border mx-auto mb-2"></div>
                    <div className="p-4 border rounded-lg bg-background w-64">
                      <h3 className="font-medium">Output Layer</h3>
                      <p className="text-xs text-muted-foreground">Results & recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">System Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Neural Engine</h4>
                    <p className="text-sm text-muted-foreground">Core processing unit that handles all neural computations and optimizations.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Data Store</h4>
                    <p className="text-sm text-muted-foreground">Persistent storage for metrics, configurations and historical performance data.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Analytics Module</h4>
                    <p className="text-sm text-muted-foreground">Processes raw metrics into actionable insights and visualizations.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Recommendation System</h4>
                    <p className="text-sm text-muted-foreground">AI-powered system that suggests optimizations based on performance data.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;

// Make sure to import PerformanceChart
import PerformanceChart from '@/components/neural/PerformanceChart';
