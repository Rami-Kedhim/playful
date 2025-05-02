
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PerformanceChart from './PerformanceChart';
import NeuralSystemControls from './NeuralSystemControls';
import NeuralRecommendations from './NeuralRecommendations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';

// Sample data for the charts
const generateSampleData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    data.push({
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      responseTime: Math.random() * 100 + 50,
      cpuUsage: Math.random() * 30 + 40,
      memoryUsage: Math.random() * 25 + 55,
      errorRate: Math.random() * 2,
      accuracy: Math.random() * 10 + 85,
      efficiency: Math.random() * 15 + 75
    });
  }
  
  return data;
};

const NeuralAnalyticsDashboard: React.FC = () => {
  const { toast } = useToast();
  const [performanceData, setPerformanceData] = useState(generateSampleData());
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('performance');
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setPerformanceData(generateSampleData());
      setRefreshing(false);
      
      toast({
        title: "Data Refreshed",
        description: "Neural analytics data has been updated.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Neural Analytics Dashboard</h2>
        <Button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="controls">System Controls</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time & CPU Usage</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PerformanceChart 
                  data={performanceData} 
                  dataKey="time"
                  lines={[
                    { dataKey: "responseTime", name: "Response Time (ms)", color: "#3b82f6" },
                    { dataKey: "cpuUsage", name: "CPU Usage (%)", color: "#ef4444" }
                  ]}
                  height={270}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Memory Usage & Error Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PerformanceChart 
                  data={performanceData} 
                  dataKey="time"
                  lines={[
                    { dataKey: "memoryUsage", name: "Memory Usage (%)", color: "#8b5cf6" },
                    { dataKey: "errorRate", name: "Error Rate (%)", color: "#f97316", strokeWidth: 3 }
                  ]}
                  height={270}
                />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Efficiency & Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PerformanceChart 
                  data={performanceData} 
                  dataKey="time"
                  lines={[
                    { dataKey: "accuracy", name: "Model Accuracy (%)", color: "#10b981" },
                    { dataKey: "efficiency", name: "Processing Efficiency (%)", color: "#f59e0b" }
                  ]}
                  height={270}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="controls">
          <NeuralSystemControls />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <NeuralRecommendations className="max-w-4xl" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalyticsDashboard;
