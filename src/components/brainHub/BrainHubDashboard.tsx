
import React from 'react';
import AutonomyModulesPanel from './AutonomyModulesPanel';
import ModuleActivityMonitor from './ModuleActivityMonitor';
import EconomicManagementPanel from './EconomicManagementPanel';
import SecurityModulesPanel from './SecurityModulesPanel';
import StrategicPlanningPanel from './StrategicPlanningPanel';
import BusinessIntelligencePanel from './BusinessIntelligencePanel';
import ContentGenerationPanel from './ContentGenerationPanel';
import AutoDevOpsPanel from './AutoDevOpsPanel';
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
          <TabsTrigger value="devops">AutoDevOps</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="economic">Economic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        
        <TabsContent value="devops" className="mt-6">
          <AutoDevOpsPanel />
        </TabsContent>
        
        <TabsContent value="intelligence" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessIntelligencePanel />
            <StrategicPlanningPanel />
          </div>
        </TabsContent>
        
        <TabsContent value="economic" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <EconomicManagementPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
