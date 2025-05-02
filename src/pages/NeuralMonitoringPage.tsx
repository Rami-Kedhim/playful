
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralMetricsDisplay from '@/components/neural/NeuralMetricsDisplay';
import NeuralAnalyticsDashboard from '@/components/neural/NeuralAnalyticsDashboard';
import SystemHealthPanel from '@/components/brainHub/SystemHealthPanel';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Settings, AlertTriangle, BarChart3, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [refreshInterval, setRefreshInterval] = useState<number>(10000);
  
  const handleRefreshIntervalChange = (value: string) => {
    setRefreshInterval(parseInt(value, 10));
  };
  
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
          
          <Button size="sm">
            <Activity className="mr-2 h-4 w-4" />
            System Status
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
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
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-4">Historical Performance Data</h3>
              <div className="h-[400px]">
                {/* This would be populated with historical data charts from the data collected over time */}
                <NeuralAnalyticsDashboard />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="controls">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeuralSystemControls />
            <NeuralMetricsDisplay refreshInterval={refreshInterval} />
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeuralRecommendations />
            <SystemHealthPanel />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
