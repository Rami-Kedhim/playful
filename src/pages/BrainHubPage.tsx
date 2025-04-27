
import React, { useState, useEffect } from 'react';
import { Brain, Activity, ServerCrash, RefreshCw } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { SystemHealthMetrics } from '@/types/neural-system';
import BrainHubProtected from '@/components/brainHub/BrainHubProtected';

const BrainHubPage = () => {
  // State for system status
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'degraded' | 'maintenance'>('online');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Mock system health metrics for demonstration
  const [systemMetrics, setSystemMetrics] = useState<SystemHealthMetrics>({
    modelCount: 5,
    activeConnections: 23,
    requestsPerMinute: 187,
    averageResponseTime: 120,
    errorRate: 0.5,
    uptime: 99.97,
    models: [],
    cpuUtilization: 42,
    memoryUtilization: 38,
    errorFrequency: 0.8,
    systemUptime: 48.5,
    networkLatency: 45,
    responseTime: 115,
    userSatisfactionScore: 92,
    systemLoad: 35,
    memoryAllocation: 60,
    networkThroughput: 250,
    requestRate: 14.5,
  });
  
  // Mock function to refresh system status
  const refreshSystemStatus = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Randomly select a status for demonstration
      const statuses: Array<'online' | 'offline' | 'degraded' | 'maintenance'> = 
        ['online', 'degraded', 'online', 'online'];
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSystemStatus(randomStatus);
      
      // Update some metrics for demonstration
      setSystemMetrics(prev => ({
        ...prev,
        cpuUtilization: Math.floor(Math.random() * 30) + 30,
        memoryUtilization: Math.floor(Math.random() * 40) + 30,
        requestsPerMinute: Math.floor(Math.random() * 100) + 150,
      }));
      
      toast({
        title: 'Status Updated',
        description: `System status: ${randomStatus.toUpperCase()}`,
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Initial fetch on component mount
  useEffect(() => {
    refreshSystemStatus();
    
    // Set up interval for regular updates (every 30 seconds)
    const intervalId = setInterval(refreshSystemStatus, 30000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'online':
        return <Activity className="h-8 w-8 text-green-500" />;
      case 'degraded':
        return <Activity className="h-8 w-8 text-yellow-500" />;
      case 'offline':
        return <ServerCrash className="h-8 w-8 text-red-500" />;
      case 'maintenance':
        return <RefreshCw className="h-8 w-8 text-blue-500" />;
      default:
        return <Brain className="h-8 w-8" />;
    }
  };
  
  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online':
        return 'bg-green-500 hover:bg-green-600';
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'offline':
        return 'bg-red-500 hover:bg-red-600';
      case 'maintenance':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-green-500 hover:bg-green-600';
    }
  };

  return (
    <BrainHubProtected>
      <MainLayout>
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center">
              <Brain className="h-10 w-10 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">Brain Hub Control Center</h1>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Badge className={`mr-4 ${getStatusColor()} text-white`}>
                Status: {systemStatus.toUpperCase()}
              </Badge>
              <Button 
                onClick={refreshSystemStatus} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
            </div>
          </div>
          
          {systemStatus === 'offline' && (
            <Alert variant="destructive" className="mb-6">
              <ServerCrash className="h-4 w-4" />
              <AlertTitle>System Offline</AlertTitle>
              <AlertDescription>
                The Brain Hub system is currently offline. Our engineers are working to restore service.
              </AlertDescription>
            </Alert>
          )}
          
          {systemStatus === 'maintenance' && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <RefreshCw className="h-4 w-4" />
              <AlertTitle>Maintenance Mode</AlertTitle>
              <AlertDescription>
                Brain Hub is undergoing scheduled maintenance. Some features may be temporarily unavailable.
              </AlertDescription>
            </Alert>
          )}
          
          {systemStatus === 'degraded' && (
            <Alert variant="warning" className="mb-6">
              <Activity className="h-4 w-4" />
              <AlertTitle>Degraded Performance</AlertTitle>
              <AlertDescription>
                Brain Hub is experiencing performance issues. You may notice slower response times.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="models">Neural Models</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">System Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              {systemStatus !== 'offline' ? (
                <BrainHubDashboard />
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <ServerCrash className="h-16 w-16 mx-auto text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">System Offline</h3>
                    <p className="text-muted-foreground">
                      The Brain Hub dashboard is currently unavailable due to system outage.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle>Neural Models</CardTitle>
                  <CardDescription>
                    Manage and monitor neural models in the Brain Hub ecosystem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {systemStatus !== 'offline' ? (
                    <p>Neural models interface would be displayed here.</p>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Neural models data is unavailable while the system is offline.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Brain Hub Analytics</CardTitle>
                  <CardDescription>
                    View performance metrics and usage patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {systemStatus !== 'offline' ? (
                    <p>Analytics dashboard would be displayed here.</p>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Analytics data is unavailable while the system is offline.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure Brain Hub settings and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {systemStatus !== 'offline' ? (
                    <p>Settings interface would be displayed here.</p>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Settings are unavailable while the system is offline.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </BrainHubProtected>
  );
};

export default BrainHubPage;
