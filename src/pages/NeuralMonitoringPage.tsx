
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertTriangle, Brain, Settings, Activity, Zap, Cpu, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import NeuralAutomationPanel from '@/components/neural/NeuralAutomationPanel';
import NeuralSettingsPanel from '@/components/neural/NeuralSettingsPanel';
import { Link } from 'react-router-dom';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout
      title="Neural System Monitoring"
      description="Advanced neural system monitoring and control dashboard"
    >
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural System Monitoring</h1>
              <p className="text-muted-foreground">
                Advanced monitoring and control for neural systems
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/neural-analytics">
                <Activity className="h-4 w-4 mr-2" />
                <span>Analytics</span>
              </Link>
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <Cpu className="h-4 w-4 mr-1" />
              <span>System Status: </span>
              <span className="flex items-center ml-1 text-emerald-500 font-medium">
                Operational
              </span>
            </Button>
          </div>
        </div>

        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700">
          <CardContent className="p-4 flex gap-3 items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              System detected a 23% increase in response time over the last 24 hours. 
              <Button variant="link" className="p-0 h-auto text-amber-700 dark:text-amber-400 font-medium">
                View details →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>System Controls</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              <span>Automation</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <NeuralAnalytics refreshInterval={30} />
          </TabsContent>
          
          <TabsContent value="controls" className="space-y-6">
            <NeuralSystemControls />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <NeuralRecommendations />
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-6">
            <NeuralAutomationPanel />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <NeuralSettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
