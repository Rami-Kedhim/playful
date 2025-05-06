
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity, Brain, Clock, FileBarChart, Settings, RefreshCw } from 'lucide-react';
import useUberCoreNeuralMonitor from '@/hooks/useUberCoreNeuralMonitor';
import UberCoreBrainHubPanel from '@/components/brainHub/UberCoreBrainHubPanel';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    isMonitoring,
    performanceReport,
    systemStatus,
    systemMetrics,
    subsystemHealth,
    isLoading,
    error,
    startMonitoring,
    stopMonitoring,
    refreshData
  } = useUberCoreNeuralMonitor({
    autoStart: true,
    monitorInterval: 60000,
    onAlert: (alerts) => {
      console.log('Neural system alerts:', alerts);
      // Could display these alerts in a toast or notification
    }
  });

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6" />
            UberCore Neural Monitoring
          </h1>
          <p className="text-muted-foreground">
            Real-time health and performance monitoring for neural systems
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={isMonitoring} 
              onCheckedChange={(checked) => checked ? startMonitoring() : stopMonitoring()} 
            />
            <Label>Auto-refresh</Label>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* System status overview */}
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      
      {/* Main content */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ubercore">UberCore</TabsTrigger>
          <TabsTrigger value="services">Neural Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* System Status Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${!isLoading && systemStatus?.operational ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="font-medium">{!isLoading && systemStatus?.operational ? 'Operational' : 'Connecting...'}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {performanceReport?.timestamp ? new Date(performanceReport.timestamp).toLocaleTimeString() : '-'}
                </p>
              </CardContent>
            </Card>
            
            {/* Average Response Time */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-2xl font-bold">{systemMetrics?.averageResponseTime || '-'}</span>
                  <span className="text-xs ml-1 text-muted-foreground">ms</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  System-wide average response time
                </p>
              </CardContent>
            </Card>
            
            {/* Error Rate */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-2xl font-bold">{(systemMetrics?.errorRate || 0) * 100}</span>
                  <span className="text-xs ml-1 text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Overall system error percentage
                </p>
              </CardContent>
            </Card>
            
            {/* Active Services */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileBarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-2xl font-bold">{systemStatus?.services?.length || 0}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Neural services currently running
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Subsystem Health */}
          <Card>
            <CardHeader>
              <CardTitle>Subsystem Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : subsystemHealth && subsystemHealth.length > 0 ? (
                  subsystemHealth.map((system, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          system.health > 80 ? 'bg-green-500' : 
                          system.health > 50 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`} />
                        <span className="capitalize">{system.name}</span>
                      </div>
                      <Badge variant="outline">{system.health}%</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">No subsystem health data available</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Overview */}
          <UberCoreBrainHubPanel
            metrics={systemMetrics || undefined}
            isConnected={!isLoading && !!systemStatus?.operational}
            isLoading={isLoading}
          />
        </TabsContent>
        
        {/* UberCore Tab Content */}
        <TabsContent value="ubercore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UberCore Neural Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                UberCore provides the neural foundation for all AI services across the platform.
              </p>
              
              {systemStatus && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Operational Status</span>
                    <Badge variant={systemStatus.operational ? "default" : "destructive"}>
                      {systemStatus.operational ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <span>{systemStatus.uptime}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Services</span>
                    <span>{systemStatus.services?.length || 0}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Services Tab Content */}
        <TabsContent value="services" className="space-y-4">
          <NeuralServicesPanel />
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neural Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground p-4">
                Analytics visualization is loading...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab Content */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitor Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <Switch 
                    id="auto-refresh" 
                    checked={isMonitoring} 
                    onCheckedChange={(checked) => checked ? startMonitoring() : stopMonitoring()} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="alerts">System Alerts</Label>
                  <Switch id="alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="detailed-logs">Detailed Logs</Label>
                  <Switch id="detailed-logs" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralMonitoringPage;
