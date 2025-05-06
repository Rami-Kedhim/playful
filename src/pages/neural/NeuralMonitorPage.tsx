
import React from 'react';
import { Brain, Activity, Server, LineChart } from 'lucide-react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrainHubMetrics from '@/components/brainHub/BrainHubMetrics';
import BrainHubAnalytics from '@/components/brainHub/BrainHubAnalytics';
import ModuleActivityMonitor from '@/components/brainHub/ModuleActivityMonitor';
import useBrainHubHealth from '@/hooks/useBrainHubHealth';
import useNeuralSystemMonitor from '@/hooks/useNeuralSystemMonitor';

const NeuralMonitorPage = () => {
  const { health, analytics, isMonitoring, startMonitoring, stopMonitoring } = useBrainHubHealth();
  const { systemStatus, isLoading } = useNeuralSystemMonitor({
    autoStart: true,
    monitorInterval: 30000
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'text-green-500';
      case 'warning':
      case 'degraded':
        return 'text-amber-500';
      case 'error':
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <Layout 
      title="Neural Monitor" 
      description="Real-time monitoring of neural activities within the UberEscorts ecosystem"
      showBreadcrumbs={true}
    >
      <div className="space-y-6">
        {/* System Status Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              System Status
              {health && (
                <span className={`ml-auto text-sm font-medium ${getStatusColor(health.status)}`}>
                  ● {health.status.toUpperCase()}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {health && (
                <BrainHubMetrics 
                  cpuUsage={health.metrics.cpuUsage}
                  memoryUsage={health.metrics.memoryUsage}
                  responseTime={health.metrics.neuralMetrics?.latency}
                />
              )}
              
              <div className="md:col-span-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">System Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Requests per minute:</div>
                    <div className="font-medium">{health?.metrics.requestsPerMinute.toFixed(2) || "N/A"}</div>
                    
                    <div>Last optimized:</div>
                    <div className="font-medium">
                      {health ? new Date(health.metrics.lastOptimized).toLocaleString() : "N/A"}
                    </div>
                    
                    <div>Neural accuracy:</div>
                    <div className="font-medium">
                      {health?.metrics.neuralMetrics ? 
                        `${(health.metrics.neuralMetrics.accuracy * 100).toFixed(1)}%` : 
                        "N/A"}
                    </div>
                    
                    <div>Neural efficiency:</div>
                    <div className="font-medium">
                      {health?.metrics.neuralMetrics ? 
                        `${(health.metrics.neuralMetrics.efficiency * 100).toFixed(1)}%` : 
                        "N/A"}
                    </div>
                  </div>
                </div>
                
                {(health?.warnings.length > 0 || health?.errors.length > 0) && (
                  <div className="mt-4">
                    {health.errors.length > 0 && (
                      <div className="text-red-500 text-sm mb-2">
                        <strong>Errors:</strong> {health.errors.join(", ")}
                      </div>
                    )}
                    {health.warnings.length > 0 && (
                      <div className="text-amber-500 text-sm">
                        <strong>Warnings:</strong> {health.warnings.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Monitoring Tabs */}
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="analytics">
              <LineChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Server className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4">
            <BrainHubAnalytics className="h-auto" />
          </TabsContent>
          
          <TabsContent value="activity">
            <ModuleActivityMonitor />
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Active Neural Models</h3>
                    <div className="bg-primary/10 rounded p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        {isLoading 
                          ? "Loading neural models..."
                          : "Neural model information will be displayed here"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Network Throughput</h3>
                    <div className="bg-primary/10 rounded p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        {isLoading 
                          ? "Loading network data..."
                          : "Network throughput information will be displayed here"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NeuralMonitorPage;
