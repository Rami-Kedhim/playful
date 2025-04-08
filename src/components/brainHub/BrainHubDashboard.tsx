
import React from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BrainHubDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-semibold">Brain Hub Dashboard</h1>
      <p className="text-muted-foreground">
        Unified control and monitoring of autonomous AI systems
      </p>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="braincore">Brain Core</TabsTrigger>
          <TabsTrigger value="devops">AutoDevOps</TabsTrigger>
          <TabsTrigger value="economics">Economics</TabsTrigger>
          <TabsTrigger value="contentgen">Content Generation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
        
        <TabsContent value="devops" className="mt-6">
          <AutoDevOpsPanel />
        </TabsContent>

        <TabsContent value="economics" className="mt-6">
          <AdvancedPricingEngine />
        </TabsContent>
        
        <TabsContent value="contentgen" className="mt-6">
          <EnhancedContentGenerator />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <AdvancedAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
