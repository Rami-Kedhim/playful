
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Server, RefreshCw, Play, Square } from 'lucide-react';
import { useUberCoreNeuralMonitor } from '@/hooks/useUberCoreNeuralMonitor';

/**
 * Neural monitoring dashboard page component
 */
const NeuralMonitoringPage: React.FC = () => {
  // Use the neural monitor hook
  const {
    health,
    loading,
    error,
    refreshHealth,
    isMonitoring,
    performanceReport,
    systemStatus,
    systemMetrics,
    subsystemHealth,
    isLoading,
    startMonitoring,
    stopMonitoring,
    refreshData
  } = useUberCoreNeuralMonitor();

  // Auto-start monitoring on component mount
  useEffect(() => {
    startMonitoring();
    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Neural System Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time performance tracking for UberCore neural infrastructure
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          
          {isMonitoring ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={stopMonitoring}
            >
              <Square className="h-4 w-4 mr-1" />
              Stop Monitoring
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={startMonitoring}
            >
              <Play className="h-4 w-4 mr-1" />
              Start Monitoring
            </Button>
          )}
        </div>
      </div>
      
      <Separator />
      
      {/* System status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center text-lg font-medium">
              System Status
              <Badge variant={health.status === 'ok' ? 'default' : 'destructive'}>
                {health.status === 'ok' ? 'Healthy' : 'Issues Detected'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated</span>
                <span>{new Date(health.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">System load</span>
                <span>{health.metrics.load.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Memory usage</span>
                <span>{health.metrics.memory.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latency</span>
                <span>{health.metrics.latency.toFixed(2)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Error rate</span>
                <span>{(health.metrics.errorRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response time</span>
                <span>{health.metrics.averageResponseTime.toFixed(2)}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {performanceReport && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Health</span>
                  <span className="capitalize">{performanceReport.overallHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span>{performanceReport.metrics.cpuUsage.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span>{performanceReport.metrics.memoryUsage.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{new Date(performanceReport.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {systemStatus && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Services Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(systemStatus.services).map(([service, status]) => (
                  <div key={service} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{service}</span>
                    <Badge variant={status === 'online' ? 'outline' : 'secondary'}>
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* System metrics */}
      {systemMetrics && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">System Load</div>
                <div className="text-2xl font-semibold">{systemMetrics.load.toFixed(1)}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">Memory</div>
                <div className="text-2xl font-semibold">{systemMetrics.memory.toFixed(1)}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">Latency</div>
                <div className="text-2xl font-semibold">{systemMetrics.latency.toFixed(1)}ms</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">CPU</div>
                <div className="text-2xl font-semibold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">Memory Usage</div>
                <div className="text-2xl font-semibold">{systemMetrics.memoryUsage.toFixed(1)}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm">Error Rate</div>
                <div className="text-2xl font-semibold">{(systemMetrics.errorRate * 100).toFixed(2)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Subsystem health */}
      {subsystemHealth && subsystemHealth.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Subsystem Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subsystemHealth.map(subsystem => (
                <div key={subsystem.name} className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-muted-foreground text-sm capitalize">{subsystem.name}</div>
                    <Badge variant={subsystem.status === 'operational' ? 'outline' : 'secondary'}>
                      {subsystem.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{width: `${subsystem.health}%`}}
                      />
                    </div>
                    <span className="text-sm font-medium">{subsystem.health}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {error && (
        <div className="p-4 border border-destructive text-destructive bg-destructive/10 rounded-lg">
          <div className="font-semibold">Error monitoring system</div>
          <div>{String(error)}</div>
        </div>
      )}
    </div>
  );
};

export default NeuralMonitoringPage;
