
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Activity, BarChart3, Cpu, RefreshCw, Play, Pause, Gauge } from 'lucide-react';
import { useUberCoreMonitoring } from '@/hooks/useUberCoreMonitoring';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const NeuralMonitoringPage = () => {
  const [activeTab, setActiveTab] = useState('status');
  const { 
    metrics, 
    isLoading, 
    error, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring, 
    refreshMetrics 
  } = useUberCoreMonitoring(5000);

  const handleRefresh = async () => {
    await refreshMetrics();
  };

  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  // Helper to get color based on value
  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Helper to get progress bar color
  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout 
      title="Neural Monitoring" 
      description="Advanced neural monitoring for UberEscorts ecosystem"
      showBreadcrumbs={true}
    >
      <div className="space-y-6">
        {/* Control panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleRefresh}
              variant="outline"
              disabled={isLoading}
              size="sm"
            >
              <RefreshCw className={cn("h-4 w-4 mr-1", isLoading && "animate-spin")} />
              Refresh
            </Button>
            <Button 
              onClick={handleToggleMonitoring}
              variant={isMonitoring ? "destructive" : "default"}
              size="sm"
            >
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
          {metrics.status && (
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-md bg-background border">
              <span className="text-sm font-medium">System Status:</span>
              <span className={cn(
                "text-sm font-bold uppercase",
                metrics.status === "optimal" ? "text-green-500" : 
                metrics.status === "warning" ? "text-yellow-500" : 
                "text-red-500"
              )}>
                {metrics.status}
              </span>
              {isMonitoring && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Tabs interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="status">
              <Gauge className="h-4 w-4 mr-2" />
              System Status
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <Cpu className="h-4 w-4 mr-2" />
              Core Metrics
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>
          
          {/* Status Tab Content */}
          <TabsContent value="status" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">CPU Usage</CardTitle>
                  <CardDescription>Current processor utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <span className={getHealthColor(metrics.performance.cpuUsage)}>
                      {metrics.performance.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={metrics.performance.cpuUsage} 
                    className={cn("h-2", getProgressColor(metrics.performance.cpuUsage))}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Memory Usage</CardTitle>
                  <CardDescription>Current memory allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    <span className={getHealthColor(metrics.performance.memoryUsage)}>
                      {metrics.performance.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={metrics.performance.memoryUsage} 
                    className={cn("h-2", getProgressColor(metrics.performance.memoryUsage))}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Accuracy Rate</CardTitle>
                  <CardDescription>Neural processing accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <span className={getHealthColor(metrics.performance.accuracyRate || 0)}>
                      {(metrics.performance.accuracyRate || 0).toFixed(1)}%
                    </span>
                    {metrics.performance.accuracyTrend === "up" && (
                      <span className="text-green-500 text-sm">↑</span>
                    )}
                    {metrics.performance.accuracyTrend === "down" && (
                      <span className="text-red-500 text-sm">↓</span>
                    )}
                  </div>
                  <Progress 
                    value={metrics.performance.accuracyRate || 0} 
                    className={cn("h-2", getProgressColor(metrics.performance.accuracyRate || 0))}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* System Status Panel */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current health status of core systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.metrics?.systemHealth && (
                      Object.entries(metrics.metrics.systemHealth).map(([key, value], idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">{typeof value === 'number' ? 
                            value % 1 === 0 ? value : value.toFixed(2) : 
                            value instanceof Date ? value.toLocaleString() : 
                            String(value)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {metrics.performance?.recommendations && metrics.performance.recommendations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold mb-2">Recommendations</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {metrics.performance.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Last updated: {metrics.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : 'Never'}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Metrics Tab Content */}
          <TabsContent value="metrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Core Performance Metrics</CardTitle>
                <CardDescription>Detailed metrics from neural core systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {metrics.metrics && Object.entries(metrics.metrics).map(([key, value]) => {
                    // Skip complex objects or arrays
                    if (typeof value === 'object') return null;
                    
                    return (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium">
                          {typeof value === 'number' ? 
                            value % 1 === 0 ? value : value.toFixed(2) : 
                            String(value)
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab Content */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Efficiency</CardTitle>
                  <CardDescription>Neural processing performance over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Processing efficiency analytics visualization</p>
                    <p className="text-sm">{metrics.performance.processingEfficiency?.toFixed(1)}% efficiency</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Neural Activity</CardTitle>
                  <CardDescription>Historical neural activity patterns</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Neural activity pattern visualization</p>
                    <p className="text-sm">Based on {metrics.performance.history?.length || 0} data points</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Activity Tab Content */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Recent neural system activities</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.logs && metrics.logs.length > 0 ? (
                  <div className="space-y-2">
                    {metrics.logs.map((log, idx) => (
                      <div key={idx} className={cn(
                        "p-2 border rounded-md text-sm flex items-start gap-3",
                        log.level === 'error' && "bg-red-50 border-red-200",
                        log.level === 'warning' && "bg-yellow-50 border-yellow-200",
                        log.level === 'info' && "bg-blue-50 border-blue-200"
                      )}>
                        <span className={cn(
                          "capitalize font-medium w-16",
                          log.level === 'error' && "text-red-600",
                          log.level === 'warning' && "text-yellow-600",
                          log.level === 'info' && "text-blue-600"
                        )}>
                          {log.level}:
                        </span>
                        <div className="flex-1">
                          <p>{log.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>No logs available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {metrics.anomalies && metrics.anomalies.length > 0 && (
              <Card className="border-yellow-200">
                <CardHeader className="bg-yellow-50 text-yellow-800">
                  <CardTitle className="text-lg">System Anomalies Detected</CardTitle>
                  <CardDescription className="text-yellow-700">
                    The following anomalies require attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {metrics.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <div className="font-semibold">{anomaly.type || 'Unknown'}</div>
                      <p className="text-sm mt-1">{anomaly.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NeuralMonitoringPage;
