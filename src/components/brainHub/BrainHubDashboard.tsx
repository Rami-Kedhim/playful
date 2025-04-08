
import React, { useState } from 'react';
import AutonomyModulesPanel from './AutonomyModulesPanel';
import ModuleActivityMonitor from './ModuleActivityMonitor';
import EconomicManagementPanel from './EconomicManagementPanel';
import SecurityModulesPanel from './SecurityModulesPanel';
import StrategicPlanningPanel from './StrategicPlanningPanel';
import BusinessIntelligencePanel from './BusinessIntelligencePanel';
import ContentGenerationPanel from './ContentGenerationPanel';
import AutoDevOpsPanel from './AutoDevOpsPanel';
import BrainCore from './BrainCore';
import AdvancedPricingEngine from './AdvancedPricingEngine';
import AdvancedAnalytics from './AdvancedAnalytics';
import EnhancedContentGenerator from './EnhancedContentGenerator';
import BrainHubHealthStatus from './BrainHubHealthStatus';
import BrainHubAnalytics from './BrainHubAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Activity, Gauge } from 'lucide-react';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { useToast } from '@/components/ui/use-toast';

const BrainHubDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { health, checkHealth, isMonitoring, startMonitoring, stopMonitoring } = useBrainHubHealth();
  const { toast } = useToast();
  
  const handleSystemRefresh = () => {
    setIsRefreshing(true);
    checkHealth();
    
    // Simulate a system refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "System Refresh Complete",
        description: `System status: ${health.status.toUpperCase()}`,
      });
    }, 1500);
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
      toast({
        title: "Monitoring Stopped",
        description: "Real-time monitoring has been paused",
      });
    } else {
      startMonitoring();
      toast({
        title: "Monitoring Started",
        description: "Real-time monitoring is now active",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Brain Hub Dashboard</h1>
          <p className="text-muted-foreground">
            Unified control and monitoring of autonomous AI systems
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={toggleMonitoring}
            className="flex items-center gap-2"
          >
            <Gauge className={`h-4 w-4 ${isMonitoring ? 'text-green-500' : ''}`} />
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
          
          <Button 
            onClick={handleSystemRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh System'}
          </Button>
        </div>
      </div>
      
      {/* System Health Alert - Shown only for warning/error statuses */}
      {health.status !== 'good' && (
        <Card className={health.status === 'error' ? 'border-destructive' : 'border-yellow-500'}>
          <CardContent className="py-3 flex items-start gap-3">
            <AlertCircle className={`h-5 w-5 mt-0.5 ${health.status === 'error' ? 'text-destructive' : 'text-yellow-500'}`} />
            <div>
              <h3 className="font-medium">{health.status === 'error' ? 'Critical Issue Detected' : 'System Warning'}</h3>
              <p className="text-sm text-muted-foreground">{health.message || `${health.errors.length} errors and ${health.warnings.length} warnings found. Check the health tab for details.`}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <div className="md:col-span-2 lg:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="braincore">Brain Core</TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="devops">AutoDevOps</TabsTrigger>
              <TabsTrigger value="economics">Economics</TabsTrigger>
              <TabsTrigger value="contentgen">Content Generation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <BrainCore />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <ModuleActivityMonitor />
                <AutonomyModulesPanel />
                <SecurityModulesPanel />
              </div>
            </TabsContent>
            
            <TabsContent value="modules" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AutonomyModulesPanel />
                <ModuleActivityMonitor />
                <SecurityModulesPanel />
                <ContentGenerationPanel />
              </div>
            </TabsContent>

            <TabsContent value="braincore" className="mt-6">
              <BrainCore />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <BrainHubAnalytics />
            </TabsContent>
            
            <TabsContent value="devops" className="mt-6">
              <AutoDevOpsPanel />
            </TabsContent>

            <TabsContent value="economics" className="mt-6">
              <AdvancedPricingEngine />
            </TabsContent>
            
            <TabsContent value="contentgen" className="mt-6">
              <EnhancedContentGenerator />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right sidebar with health status */}
        <div>
          <BrainHubHealthStatus />
          
          <div className="mt-6">
            <BusinessIntelligencePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainHubDashboard;
