
import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, RefreshCw, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import useUberCoreNeuralMonitor from '@/hooks/useUberCoreNeuralMonitor';

const NeuralMonitorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    health,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    refreshData,
    systemStatus,
    systemMetrics,
    subsystemHealth,
    isLoading
  } = useUberCoreNeuralMonitor();
  
  useEffect(() => {
    if (!isMonitoring) {
      startMonitoring();
    }
    
    return () => {
      if (isMonitoring) {
        stopMonitoring();
      }
    };
  }, [isMonitoring, startMonitoring, stopMonitoring]);

  return (
    <Layout
      title="Neural Monitor"
      description="Real-time monitoring of UberCore neural systems"
      showBreadcrumbs
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-sm font-medium">{isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          {isMonitoring ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={stopMonitoring}
            >
              <Square className="w-4 h-4 mr-2" /> Stop
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={startMonitoring}
            >
              <Play className="w-4 h-4 mr-2" /> Start
            </Button>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subsystems">Subsystems</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                System Health
              </CardTitle>
              <CardDescription>
                Current status: <span className={`font-semibold ${health.status === 'ok' ? 'text-green-500' : health.status === 'degraded' ? 'text-amber-500' : 'text-red-500'}`}>
                  {health.status.toUpperCase()}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>CPU Usage</span>
                    <span>{Math.round(health.metrics.cpuUsage)}%</span>
                  </div>
                  <Progress value={health.metrics.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Memory Usage</span>
                    <span>{Math.round(health.metrics.memoryUsage)}%</span>
                  </div>
                  <Progress value={health.metrics.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>System Load</span>
                    <span>{Math.round(health.metrics.load)}%</span>
                  </div>
                  <Progress value={health.metrics.load} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Error Rate</span>
                    <span>{(health.metrics.errorRate * 100).toFixed(2)}%</span>
                  </div>
                  <Progress value={health.metrics.errorRate * 100} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-sm">
                  <span className="block text-muted-foreground">Latency</span>
                  <span className="text-lg font-medium">{Math.round(health.metrics.latency)} ms</span>
                </div>
                <div className="text-sm">
                  <span className="block text-muted-foreground">Avg Response Time</span>
                  <span className="text-lg font-medium">{Math.round(health.metrics.averageResponseTime)} ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus && Object.entries(systemStatus.services).map(([service, status]) => (
                    <div key={service} className="flex justify-between items-center">
                      <span className="capitalize">{service}</span>
                      <span className={`px-2 py-1 text-xs rounded ${status === 'online' || status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                {systemMetrics && (
                  <div className="space-y-4">
                    {Object.entries(systemMetrics).map(([metric, value]) => (
                      <div key={metric} className="flex justify-between items-center">
                        <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-mono">
                          {typeof value === 'number' ? 
                            (metric.includes('rate') ? `${(value * 100).toFixed(2)}%` : `${value.toFixed(1)}`) 
                            : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subsystems">
          <Card>
            <CardHeader>
              <CardTitle>Subsystem Health</CardTitle>
              <CardDescription>Status of all interconnected subsystems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subsystemHealth.map((subsystem) => (
                  <div key={subsystem.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold capitalize">{subsystem.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${subsystem.status === 'operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {subsystem.status}
                      </span>
                    </div>
                    <Progress value={subsystem.health} className="h-2" />
                    <div className="mt-1 text-right text-xs">{subsystem.health}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent neural system activity and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-md p-4 font-mono text-sm h-[400px] overflow-auto">
                <div className="text-green-500">[{new Date().toISOString()}] Neural system startup complete</div>
                <div className="text-blue-500">[{new Date(Date.now() - 60000).toISOString()}] System monitoring initiated</div>
                <div className="text-blue-500">[{new Date(Date.now() - 120000).toISOString()}] Health check performed</div>
                <div className="text-amber-500">[{new Date(Date.now() - 300000).toISOString()}] Memory usage spike detected - 82%</div>
                <div className="text-blue-500">[{new Date(Date.now() - 600000).toISOString()}] Auto-scaling triggered</div>
                <div className="text-green-500">[{new Date(Date.now() - 900000).toISOString()}] Memory usage normalized - 54%</div>
                <div className="text-blue-500">[{new Date(Date.now() - 1800000).toISOString()}] System config updated</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NeuralMonitorPage;
