
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Activity, Settings, BarChart4 } from 'lucide-react';
import NeuralAnalyticsDashboard from '@/components/neural/NeuralAnalyticsDashboard';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import { Separator } from '@/components/ui/separator';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // 30 seconds
  
  const handleToggleAutoRefresh = () => {
    setIsAutoRefreshEnabled(prev => !prev);
  };
  
  const handleChangeInterval = (interval: number) => {
    setRefreshInterval(interval);
  };

  return (
    <MainLayout
      title="Neural Monitoring System"
      description="Advanced neural system monitoring and controls"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural Monitoring System</h1>
              <p className="text-muted-foreground">
                Monitor and control neural system performance and parameters
              </p>
            </div>
          </div>
          
          <AutoRefreshControl 
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            refreshInterval={refreshInterval}
            onToggleAutoRefresh={handleToggleAutoRefresh}
            onChangeInterval={handleChangeInterval}
          />
        </div>
        
        <Card>
          <CardHeader className="p-4 border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 max-w-lg">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart4 className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="controls" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Controls</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Recommendations</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Neural Architecture</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="p-0">
            <TabsContent value="dashboard" className="p-6 pt-4 m-0 space-y-6">
              <NeuralAnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="controls" className="p-6 pt-4 m-0 space-y-6">
              <NeuralSystemControls />
            </TabsContent>
            
            <TabsContent value="recommendations" className="p-6 pt-4 m-0 space-y-6">
              <NeuralRecommendations />
            </TabsContent>
            
            <TabsContent value="history" className="p-6 pt-4 m-0 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Architecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 text-center border rounded-md">
                      <Brain className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">Neural Architecture Visualization</p>
                      <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 text-center border rounded-md">
                      <Activity className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">Neural Performance History</p>
                      <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
        
        <Separator />
        
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p>Neural Monitoring System v1.0</p>
              <p className="text-xs mt-1">Last updated: May 2, 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
