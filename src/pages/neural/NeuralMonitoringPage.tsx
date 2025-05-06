
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity, Brain, Clock, FileBarChart, Settings, RefreshCw, Database, Shield, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useUberCoreNeuralMonitor from '@/hooks/useUberCoreNeuralMonitor';
import UberCoreBrainHubPanel from '@/components/brainHub/UberCoreBrainHubPanel';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';
import { orus } from '@/core/Orus';
import { SystemIntegrityResult } from '@/types/core-systems';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const [systemIntegrity, setSystemIntegrity] = useState<SystemIntegrityResult | null>(null);
  
  // Use the UberCore neural monitor hook
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
      alerts.forEach(alert => {
        toast({
          title: "Neural Alert",
          description: alert,
          variant: "destructive"
        });
      });
    }
  });

  // Check system integrity on component mount
  useEffect(() => {
    const checkIntegrity = () => {
      try {
        const result = orus.checkIntegrity();
        setSystemIntegrity(result);
        
        if (!result.isValid) {
          toast({
            title: "System Integrity Warning",
            description: result.message,
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Failed to check system integrity:', err);
        toast({
          title: "System Error",
          description: "Failed to verify system integrity.",
          variant: "destructive"
        });
      }
    };
    
    checkIntegrity();
  }, [toast]);

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
              id="auto-refresh"
            />
            <Label htmlFor="auto-refresh">Auto-refresh</Label>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* System integrity alert */}
      {systemIntegrity && !systemIntegrity.isValid && (
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertTitle>Security Warning</AlertTitle>
          <AlertDescription>{systemIntegrity.message}</AlertDescription>
        </Alert>
      )}
      
      {/* Error alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
                  <div className={`h-3 w-3 rounded-full mr-2 ${!isLoading && systemStatus?.isActive ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="font-medium">{!isLoading && systemStatus?.isActive ? 'Operational' : 'Connecting...'}</span>
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
                  <span className="text-2xl font-bold">{((systemMetrics?.errorRate || 0) * 100).toFixed(2)}</span>
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
            isConnected={!isLoading && !!systemStatus?.isActive}
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
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  UberCore provides the central neural infrastructure for all escort and companion AI services.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-semibold mb-2">Core Neural Systems</h3>
                    <ul className="space-y-2 text-sm">
                      {['Persona Generator', 'Chat Companion', 'Image Processing', 'Content Moderation'].map((system, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span>{system}</span>
                          <Badge variant="outline" className="bg-green-50">Active</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-semibold mb-2">Latest Operations</h3>
                    <ul className="space-y-2 text-sm">
                      {['Profile Analysis', 'Moderation Check', 'Content Generation', 'Persona Match'].map((op, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span>{op}</span>
                          <span className="text-xs text-muted-foreground">{new Date(Date.now() - i * 1000 * 60 * 5).toLocaleTimeString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Database className="h-4 w-4 mr-2" /> View Detailed Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['UberWallet', 'Oxum Engine', 'Lucie AI', 'Hermes Analytics'].map((system, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full mr-2 bg-green-500" />
                      <span>{system}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground mr-2">Connected</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Services Tab Content */}
        <TabsContent value="services">
          <NeuralServicesPanel />
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Neural Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Performance metrics and usage analytics for the UberCore neural infrastructure.
              </p>
              
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will render here</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2">Response Time (ms)</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">{systemMetrics?.averageResponseTime || '-'}</p>
                      <p className="text-xs text-muted-foreground">7-day average</p>
                    </div>
                    <div className="h-10 flex items-end space-x-1">
                      {[40, 65, 30, 85, 60, 70, 40].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-primary" 
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2">Error Rate (%)</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">{((systemMetrics?.errorRate || 0) * 100).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">7-day average</p>
                    </div>
                    <div className="h-10 flex items-end space-x-1">
                      {[10, 5, 15, 8, 12, 7, 5].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-destructive" 
                          style={{ height: `${h * 5}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab Content */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Neural Monitor Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-refresh-interval">Auto-Refresh Interval</Label>
                    <p className="text-sm text-muted-foreground">How often to check system status</p>
                  </div>
                  <div className="w-[180px]">
                    <select 
                      id="auto-refresh-interval" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="30000">30 seconds</option>
                      <option value="60000" selected>1 minute</option>
                      <option value="300000">5 minutes</option>
                      <option value="600000">10 minutes</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Alert Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about critical issues</p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="detailed-logs">Detailed Logging</Label>
                    <p className="text-sm text-muted-foreground">Collect verbose system logs</p>
                  </div>
                  <Switch id="detailed-logs" />
                </div>
                
                <div className="pt-4">
                  <Button>Save Settings</Button>
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
