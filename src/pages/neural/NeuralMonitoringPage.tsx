
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import UberCoreBrainHubPanel from '@/components/brainHub/UberCoreBrainHubPanel';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';
import AdaptiveCognitiveCore from '@/components/brainHub/AdaptiveCognitiveCore';
import useUberCoreNeuralMonitor from '@/hooks/useUberCoreNeuralMonitor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircuitBoard, Brain, RefreshCcw, Activity, Settings, Server } from 'lucide-react';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const monitor = useUberCoreNeuralMonitor();
  const { 
    isMonitoring, 
    isLoading, 
    systemStatus, 
    systemMetrics, 
    systemActivity, 
    startMonitoring, 
    stopMonitoring, 
    fetchMetrics, 
    performanceReport 
  } = monitor;

  const handleRefresh = () => {
    fetchMetrics();
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-amber-500';
      case 'maintenance':
        return 'bg-blue-500';
      case 'error':
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">UberCore Neural Monitor</h1>
            <p className="text-muted-foreground">
              Unified monitoring for UberCore neural infrastructure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="monitoring-toggle">Active Monitoring</Label>
            <Switch 
              id="monitoring-toggle" 
              checked={isMonitoring} 
              onCheckedChange={toggleMonitoring}
            />
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-500" />
              UberCore Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${getSystemStatusColor(systemStatus?.uberCore?.status || 'unknown')}`}></div>
                <span className="font-semibold">{systemStatus?.uberCore?.status || 'Unknown'}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Uptime: {systemStatus?.uberCore?.uptime.toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Brain className="h-4 w-4 mr-2 text-indigo-500" />
              BrainHub Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${getSystemStatusColor(systemStatus?.brainHub?.status || 'unknown')}`}></div>
                <span className="font-semibold">{systemStatus?.brainHub?.status || 'Unknown'}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Active Modules: {systemStatus?.brainHub?.activeModules?.length || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-rose-500" />
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{systemMetrics?.cpuUsage?.toFixed(1) || 0}% CPU</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Memory: {systemMetrics?.memoryUsage?.toFixed(1) || 0}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ubercore">UberCore Details</TabsTrigger>
          <TabsTrigger value="services">Neural Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdaptiveCognitiveCore 
              systemName="UberCore Neural System"
              intelligenceLevel={85}
              adaptivityLevel={92}
              isActive={true}
            />

            <Card>
              <CardHeader>
                <CardTitle>UberCore Neural Subsystems</CardTitle>
                <CardDescription>
                  Neural processing subsystem status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus?.uberCore?.subsystems.map((subsystem, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${getSystemStatusColor(subsystem.status)}`}></div>
                        <span>{subsystem.name}</span>
                      </div>
                      <Badge variant={subsystem.health > 80 ? "default" : subsystem.health > 50 ? "secondary" : "destructive"}>
                        {subsystem.health}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <UberCoreBrainHubPanel 
              status={systemStatus}
              metrics={systemMetrics}
              isConnected={true}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="ubercore">
          <Card>
            <CardHeader>
              <CardTitle>UberCore Detailed Status</CardTitle>
              <CardDescription>
                In-depth monitoring of UberCore neural infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(performanceReport?.services || {}).map(([key, service]) => (
                    <Card key={key} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">{key} Service</CardTitle>
                          <Badge variant={service.status === 'operational' ? 'default' : 'destructive'}>
                            {service.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {Object.entries(service.metrics).map(([metric, value]) => (
                            <div key={metric} className="flex justify-between items-center">
                              <span className="text-muted-foreground">{metric}</span>
                              <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
                            </div>
                          ))}
                          
                          {service.warnings.length > 0 && (
                            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-sm text-xs">
                              <p className="font-medium text-amber-600 dark:text-amber-400">Warnings:</p>
                              <ul className="list-disc pl-4 mt-1">
                                {service.warnings.map((warning, i) => (
                                  <li key={i}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">System Recommendations</h3>
                  <ul className="space-y-2">
                    {performanceReport?.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircuitBoard className="h-4 w-4 text-primary mt-1" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <NeuralServicesPanel />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Neural Analytics</CardTitle>
              <CardDescription>
                Performance metrics and analytics for neural systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Total Operations</div>
                    <div className="text-2xl font-bold mt-1">1,426</div>
                    <div className="text-xs text-muted-foreground">+12% from previous period</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Avg. Response Time</div>
                    <div className="text-2xl font-bold mt-1">137ms</div>
                    <div className="text-xs text-muted-foreground">-5% from previous period</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Neural Accuracy</div>
                    <div className="text-2xl font-bold mt-1">97.8%</div>
                    <div className="text-xs text-muted-foreground">+0.5% from previous period</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Activity Log</h3>
                  <div className="space-y-3">
                    {systemActivity.map((activity, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{activity.type}</div>
                            <div className="text-sm text-muted-foreground">
                              Module: {activity.module} • Duration: {activity.duration}ms
                            </div>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'in-progress' ? 'secondary' : 'outline'}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Neural System Settings</CardTitle>
              <CardDescription>
                Configure and manage neural system parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="automatic-optimization">Automatic Optimization</Label>
                      <div className="text-xs text-muted-foreground">System will automatically optimize resources</div>
                    </div>
                    <Switch id="automatic-optimization" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="deep-learning">Deep Learning Mode</Label>
                      <div className="text-xs text-muted-foreground">Enable enhanced neural processing</div>
                    </div>
                    <Switch id="deep-learning" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alert-notifications">Alert Notifications</Label>
                      <div className="text-xs text-muted-foreground">Receive notifications on critical events</div>
                    </div>
                    <Switch id="alert-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Advanced Data Collection</Label>
                      <div className="text-xs text-muted-foreground">Collect detailed metrics for analytics</div>
                    </div>
                    <Switch id="data-collection" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
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
