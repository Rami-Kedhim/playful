
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Users, CreditCard, FileText, Shield, Settings } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import ReportManagement from '@/components/admin/ReportManagement';
import FinanceManagement from '@/components/admin/FinanceManagement';
import ContentModeration from '@/components/admin/ContentModeration';
import SystemStatus from '@/components/admin/SystemStatus';
import ConfigSettings from '@/components/admin/ConfigSettings';
import UnifiedEcosystemDashboard from '@/components/admin/UnifiedEcosystemDashboard';
import { uberCore } from '@/core/UberCore';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Layout 
      title="Admin Dashboard" 
      description="System administration and moderation tools"
      showBreadcrumbs
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-7 md:w-fit">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" /> Overview
          </TabsTrigger>
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
            <Shield className="w-4 h-4" /> Status
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <UnifiedEcosystemDashboard />
        </TabsContent>
        
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
    </Layout>
  );
};

export default AdminPage;
