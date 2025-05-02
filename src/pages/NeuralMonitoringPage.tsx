
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Activity, Settings, BarChart4, Zap } from 'lucide-react';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import NeuralAutomationPanel from '@/components/neural/NeuralAutomationPanel';
import NeuralSettingsPanel from '@/components/neural/NeuralSettingsPanel';
import { Separator } from '@/components/ui/separator';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  
  return (
    <MainLayout
      title="Neural Monitoring System"
      description="Monitor and control the Neural Systems"
    >
      <div className="px-4 py-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Neural Monitoring System</h1>
          </div>
          
          {activeTab === 'dashboard' && (
            <AutoRefreshControl 
              interval={refreshInterval} 
              onIntervalChange={setRefreshInterval} 
            />
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Automation</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {/* Neural System Status Component */}
                      <NeuralSystemControls />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Neural Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <NeuralRecommendations />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="min-h-[600px]">
              <NeuralAutomationPanel />
            </TabsContent>
            
            <TabsContent value="analytics">
              <NeuralAnalytics refreshInterval={refreshInterval} />
            </TabsContent>
            
            <TabsContent value="settings">
              <NeuralSettingsPanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
