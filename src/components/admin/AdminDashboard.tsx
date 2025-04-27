
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/auth/useRole';
import { useTranslation } from 'react-i18next';
import SystemLoadCard from './dashboard/SystemLoadCard';
import BrainHubHealthMonitor from './dashboard/BrainHubHealthMonitor';
import OxumRuleComplianceMonitor from './dashboard/OxumRuleComplianceMonitor';
import TimeImpactCard from './dashboard/TimeImpactCard';
import HermesSeoConnector from './dashboard/HermesSeoConnector';
import SEOModule from './dashboard/SEOModule';

const AdminDashboard: React.FC = () => {
  const { highestRole } = useRole();
  const { t } = useTranslation();
  
  const [systemLoad, setSystemLoad] = React.useState(42);
  
  const handleSystemLoadChange = (value: number[]) => {
    setSystemLoad(value[0]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            UberCore system controls and monitoring
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          Role: {highestRole}
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SystemLoadCard 
                systemLoad={systemLoad}
                handleSystemLoadChange={handleSystemLoadChange}
              />
              <TimeImpactCard />
              <BrainHubHealthMonitor />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <OxumRuleComplianceMonitor />
              <HermesSeoConnector />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.userManagement.title")}</CardTitle>
              <CardDescription>{t("admin.userManagement.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>{t("admin.userManagement.addUser")}</Button>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-center text-muted-foreground">
                  {t("admin.userManagement.emptyState")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.systemSettings.title")}</CardTitle>
              <CardDescription>{t("admin.systemSettings.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <p className="text-center text-muted-foreground">
                  {t("admin.systemSettings.emptyState")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <SEOModule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
