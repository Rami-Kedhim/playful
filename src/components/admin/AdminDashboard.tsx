
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, CreditCard, Settings, FileText } from 'lucide-react';
import UserManagement from './UserManagement';
import ReportManagement from './ReportManagement';
import FinanceManagement from './FinanceManagement';
import ConfigSettings from './ConfigSettings';
import ContentModeration from './ContentModeration';
import SystemStatus from './SystemStatus';
import { UberCore } from '@/core';

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    // Create a temporary UberCore instance for initialization
    const core = new UberCore(null);
    
    // Initialize SEO automation
    core.initializeAutomaticSeo();
  }, []);
  
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-6 md:w-fit">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Reports
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Finance
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Content
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Activity className="w-4 h-4" /> Status
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportManagement />
        </TabsContent>
        
        <TabsContent value="finance">
          <FinanceManagement />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentModeration />
        </TabsContent>
        
        <TabsContent value="status">
          <SystemStatus />
        </TabsContent>
        
        <TabsContent value="settings">
          <ConfigSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
