
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Brain } from 'lucide-react';
import EcosystemStatsCards from './dashboard/EcosystemStatsCards';
import ConversionFlowChart from './dashboard/ConversionFlowChart';
import RevenueBreakdownChart from './dashboard/RevenueBreakdownChart';
import DailyTrafficChart from './dashboard/DailyTrafficChart';
import BrainHubHealthMonitor from './dashboard/BrainHubHealthMonitor';

// Mock data
const conversionData = [
  { name: 'Jan', ai: 40, real: 24 },
  { name: 'Feb', ai: 30, real: 15 },
  { name: 'Mar', ai: 20, real: 32 },
  { name: 'Apr', ai: 27, real: 38 },
  { name: 'May', ai: 18, real: 45 },
  { name: 'Jun', ai: 23, real: 42 },
  { name: 'Jul', ai: 34, real: 35 },
];

const revenueData = [
  { name: 'Mon', ai_content: 4000, ai_boost: 3400, real_booking: 2400, real_content: 1800 },
  { name: 'Tue', ai_content: 3000, ai_boost: 2398, real_booking: 1800, real_content: 2100 },
  { name: 'Wed', ai_content: 2000, ai_boost: 1900, real_booking: 3800, real_content: 2400 },
  { name: 'Thu', ai_content: 2780, ai_boost: 1908, real_booking: 2900, real_content: 2100 },
  { name: 'Fri', ai_content: 1890, ai_boost: 2800, real_booking: 3300, real_content: 2300 },
  { name: 'Sat', ai_content: 2390, ai_boost: 3800, real_booking: 4300, real_content: 3400 },
  { name: 'Sun', ai_content: 3490, ai_boost: 4300, real_booking: 3800, real_content: 4300 },
];

const ecologyData = [
  { name: '00:00', ai_profile_views: 1400, real_escort_views: 240 },
  { name: '04:00', ai_profile_views: 800, real_escort_views: 120 },
  { name: '08:00', ai_profile_views: 1200, real_escort_views: 700 },
  { name: '12:00', ai_profile_views: 1800, real_escort_views: 1300 },
  { name: '16:00', ai_profile_views: 2400, real_escort_views: 1800 },
  { name: '20:00', ai_profile_views: 2800, real_escort_views: 1100 },
];

const UnifiedEcosystemDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ecosystem Performance</h2>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>
      
      <EcosystemStatsCards />
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="ecology">Ecosystem Ecology</TabsTrigger>
          <TabsTrigger value="brainhub">
            <Brain className="h-4 w-4 mr-2" />
            BrainHub
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <ConversionFlowChart conversionData={conversionData} />
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6">
          <RevenueBreakdownChart revenueData={revenueData} />
        </TabsContent>
        
        <TabsContent value="ecology" className="space-y-6">
          <DailyTrafficChart ecologyData={ecologyData} />
        </TabsContent>
        
        <TabsContent value="brainhub" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrainHubHealthMonitor />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">BrainHub AI System</h3>
              <p className="text-muted-foreground">
                The BrainHub AI system powers our ecosystem intelligence and optimization processes.
                It continuously monitors platform performance, user engagement, and revenue metrics
                to provide actionable insights and automate optimization tasks.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Autonomous decision making and optimization</li>
                <li>Performance analysis and trend detection</li>
                <li>Predictive analytics for user behavior</li>
                <li>Real-time monitoring and alerting</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedEcosystemDashboard;
