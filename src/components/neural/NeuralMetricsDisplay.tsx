
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PerformanceChart from './PerformanceChart';

// CPU/Memory mock data
const cpuMemoryData = [
  { time: '00:00', cpu: 45, memory: 62 },
  { time: '02:00', cpu: 53, memory: 65 },
  { time: '04:00', cpu: 58, memory: 64 },
  { time: '06:00', cpu: 42, memory: 63 },
  { time: '08:00', cpu: 60, memory: 70 },
  { time: '10:00', cpu: 75, memory: 72 },
  { time: '12:00', cpu: 80, memory: 78 },
  { time: '14:00', cpu: 65, memory: 82 },
  { time: '16:00', cpu: 70, memory: 76 },
  { time: '18:00', cpu: 63, memory: 72 },
  { time: '20:00', cpu: 55, memory: 68 },
  { time: '22:00', cpu: 48, memory: 65 }
];

// Operations/Errors mock data
const operationsData = [
  { time: '00:00', ops: 120, error: 0.5 },
  { time: '02:00', ops: 90, error: 0.3 },
  { time: '04:00', ops: 75, error: 0.2 },
  { time: '06:00', ops: 85, error: 0.4 },
  { time: '08:00', ops: 150, error: 0.6 },
  { time: '10:00', ops: 230, error: 0.8 },
  { time: '12:00', ops: 310, error: 1.2 },
  { time: '14:00', ops: 280, error: 1.0 },
  { time: '16:00', ops: 260, error: 0.9 },
  { time: '18:00', ops: 240, error: 0.7 },
  { time: '20:00', ops: 170, error: 0.5 },
  { time: '22:00', ops: 130, error: 0.4 }
];

interface NeuralMetricsDisplayProps {
  title?: string;
  refreshInterval?: number;
}

interface ChartConfig {
  title: string;
  description: string;
  dataKey: string;
  color: string;
  yAxisLabel: string;
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  title = 'Neural System Metrics',
  refreshInterval = 30000
}) => {
  const [activeTab, setActiveTab] = useState<string>('resources');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Auto-refresh mock data
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, we would fetch new data here
      setLastUpdated(new Date());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  // Helper function to format time for display
  const formatUpdateTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Convert the CPU/Memory data to the format expected by PerformanceChart
  const cpuChartData = cpuMemoryData.map(entry => ({
    date: entry.time,
    value: entry.cpu
  }));
  
  const memoryChartData = cpuMemoryData.map(entry => ({
    date: entry.time,
    value: entry.memory
  }));
  
  // Convert the Operations/Errors data to the format expected by PerformanceChart
  const operationsChartData = operationsData.map(entry => ({
    date: entry.time,
    value: entry.ops
  }));
  
  const errorRateChartData = operationsData.map(entry => ({
    date: entry.time,
    value: entry.error
  }));
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          Updated: {formatUpdateTime(lastUpdated)}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="resources">Resource Utilization</TabsTrigger>
          <TabsTrigger value="operations">Operations & Errors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CPU Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={cpuChartData}
                  dataKey="cpu"
                  title="CPU Usage"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Memory Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={memoryChartData}
                  dataKey="memory"
                  title="Memory Usage"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Operations per Hour</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={operationsChartData}
                  dataKey="operations"
                  title="Operations"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Error Rate (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={errorRateChartData}
                  dataKey="errorRate"
                  title="Error Rate"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralMetricsDisplay;
