
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Brain, RefreshCw, Activity, Settings, Server, Zap } from 'lucide-react';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';
import NeuralAnalyticsPanel from '@/components/brainHub/NeuralAnalyticsPanel';
import UberCoreBrainHubPanel from '@/components/brainHub/UberCoreBrainHubPanel';
import { useUberCoreMonitoring } from '@/hooks/useUberCoreMonitoring';
import { Progress } from '@/components/ui/progress';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    systemMetrics, 
    systemStatus, 
    systemActivity,
    isLoading, 
    refreshMetrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  } = useUberCoreMonitoring();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRefresh = () => {
    refreshMetrics();
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Neural Monitoring System</h1>
            <p className="text-muted-foreground">
              UberCore and BrainHub integrated neural network monitoring
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
          <Button variant="default" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">
            <Brain className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ubercore">
            <Zap className="h-4 w-4 mr-2" />
            UberCore
          </TabsTrigger>
          <TabsTrigger value="services">
            <Server className="h-4 w-4 mr-2" />
            Neural Services
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <UberCoreBrainHubPanel />
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">System Status</CardTitle>
                  <CardDescription>Overall neural system health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">System Integrity</span>
                        <span className="text-sm font-medium">{systemStatus.integrity}%</span>
                      </div>
                      <Progress value={systemStatus.integrity} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Neural Efficiency</span>
                        <span className="text-sm font-medium">{systemStatus.neuralEfficiency}%</span>
                      </div>
                      <Progress value={systemStatus.neuralEfficiency} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">{systemMetrics.responseTime} ms</span>
                      </div>
                      <Progress 
                        value={Math.max(0, 100 - systemMetrics.responseTime / 3)} 
                        className="h-2" 
                      />
                    </div>
                    
                    {systemStatus.alerts.length > 0 && (
                      <div className="mt-2 p-2 border rounded bg-amber-50 border-amber-200">
                        <div className="flex items-center gap-2 text-amber-800">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">System Alerts</span>
                        </div>
                        <ul className="mt-1 text-xs text-amber-700 pl-6 list-disc">
                          {systemStatus.alerts.map((alert, index) => (
                            <li key={index}>{alert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest neural operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {systemActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className="text-xs p-2 border-b flex items-start gap-2"
                      >
                        <span className="text-muted-foreground whitespace-nowrap">
                          {activity.timestamp}
                        </span>
                        <div>
                          <div className="font-medium">{activity.operation}</div>
                          <div className="text-muted-foreground">{activity.details}</div>
                        </div>
                      </div>
                    ))}
                    
                    {systemActivity.length === 0 && (
                      <div className="text-center p-4 text-muted-foreground">
                        No recent activity to display
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ubercore">
          <Card>
            <CardHeader>
              <CardTitle>UberCore Neural System</CardTitle>
              <CardDescription>
                Core neural processing architecture and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Neural Processing Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Processing Efficiency</span>
                        <span>{systemMetrics.processingEfficiency}%</span>
                      </div>
                      <Progress value={systemMetrics.processingEfficiency} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Accuracy Rate</span>
                        <span>{systemMetrics.accuracyRate}%</span>
                      </div>
                      <Progress value={systemMetrics.accuracyRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Network Throughput</span>
                        <span>{systemMetrics.networkThroughput} MB/s</span>
                      </div>
                      <Progress 
                        value={systemMetrics.networkThroughput / 2} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">System Resources</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>CPU Utilization</span>
                        <span>{systemMetrics.cpuUsage}%</span>
                      </div>
                      <Progress value={systemMetrics.cpuUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Memory Allocation</span>
                        <span>{systemMetrics.memoryAllocation} MB</span>
                      </div>
                      <Progress 
                        value={systemMetrics.memoryAllocation / 10} 
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Request Rate</span>
                        <span>{systemMetrics.requestRate} req/s</span>
                      </div>
                      <Progress value={systemMetrics.requestRate} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-3">System Recommendations</h3>
                {systemStatus.recommendations.length > 0 ? (
                  <ul className="space-y-1 list-disc pl-5">
                    {systemStatus.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No system recommendations at this time.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <NeuralServicesPanel />
        </TabsContent>
        
        <TabsContent value="analytics">
          <NeuralAnalyticsPanel />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Neural System Settings</CardTitle>
              <CardDescription>
                Configure neural monitoring and system parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Monitoring Interval (seconds)</label>
                    <input 
                      type="number" 
                      className="w-full rounded-md border p-2"
                      value={30}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Threshold (%)</label>
                    <input 
                      type="number" 
                      className="w-full rounded-md border p-2"
                      value={90}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enableAlerts" checked onChange={() => {}} />
                    <label htmlFor="enableAlerts" className="text-sm">Enable System Alerts</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enableAutomation" checked onChange={() => {}} />
                    <label htmlFor="enableAutomation" className="text-sm">Enable Automated Optimization</label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enableLogging" checked onChange={() => {}} />
                    <label htmlFor="enableLogging" className="text-sm">Enable Enhanced Logging</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enablePrediction" checked onChange={() => {}} />
                    <label htmlFor="enablePrediction" className="text-sm">Enable Predictive Analytics</label>
                  </div>
                </div>
                
                <Button className="mt-2">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralMonitoringPage;
