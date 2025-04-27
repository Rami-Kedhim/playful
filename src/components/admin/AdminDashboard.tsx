
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
import { uberCoreInstance } from '@/core/UberCore';

const AdminDashboard: React.FC = () => {
  const { highestRole } = useRole();
  const { t } = useTranslation();
  
  const [systemLoad, setSystemLoad] = React.useState(42);
  const [systemStatus, setSystemStatus] = React.useState(uberCoreInstance.getSystemStatus());
  
  const handleSystemLoadChange = (value: number[]) => {
    setSystemLoad(value[0]);
    // Update UberCore system load
    if (value[0] !== systemLoad) {
      // This would update the actual system load in a real implementation
      console.log(`Updating system load to ${value[0]}`);
    }
  };

  // Fetch system status periodically
  React.useEffect(() => {
    const fetchSystemStatus = () => {
      const status = uberCoreInstance.getSystemStatus();
      setSystemStatus(status);
    };

    // Initial fetch
    fetchSystemStatus();

    // Set up interval for updates
    const intervalId = setInterval(fetchSystemStatus, 30000);

    // Clean up
    return () => clearInterval(intervalId);
  }, []);

  // Default translations
  const defaultTranslations = {
    admin: {
      userManagement: {
        title: "User Management",
        description: "Manage user accounts and permissions",
        addUser: "Add New User",
        emptyState: "User list would appear here"
      },
      systemSettings: {
        title: "System Settings",
        description: "Configure global system parameters",
        emptyState: "System configuration options would appear here"
      }
    }
  };

  const tWithFallback = (key: string) => {
    // Try to use the translation from i18n, but fall back to our defaults if not available
    const translation = t(key);
    if (translation === key) {
      // Translation not found, use our fallback
      const parts = key.split('.');
      let current: any = defaultTranslations;
      
      for (const part of parts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return key; // Fallback failed too
        }
      }
      
      return current;
    }
    
    return translation;
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
              <CardTitle>{tWithFallback("admin.userManagement.title")}</CardTitle>
              <CardDescription>{tWithFallback("admin.userManagement.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>{tWithFallback("admin.userManagement.addUser")}</Button>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-center text-muted-foreground">
                  {tWithFallback("admin.userManagement.emptyState")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{tWithFallback("admin.systemSettings.title")}</CardTitle>
              <CardDescription>{tWithFallback("admin.systemSettings.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <p className="text-center text-muted-foreground">
                  {tWithFallback("admin.systemSettings.emptyState")}
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
