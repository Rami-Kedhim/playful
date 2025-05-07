
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw, Play, Pause, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUberCoreNeuralMonitor } from '@/hooks/useUberCoreNeuralMonitor';
import { useTranslation } from 'react-i18next';

const NeuralMonitoringPage: React.FC = () => {
  const { t } = useTranslation();
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

  useEffect(() => {
    // Initial data fetch
    refreshHealth();
  }, [refreshHealth]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Neural Monitoring</h1>
            <p className="text-muted-foreground">Monitor and analyze UberCore neural processes</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refreshData()}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>

          {isMonitoring ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => stopMonitoring()}
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Monitoring
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => startMonitoring()}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Monitoring
            </Button>
          )}
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CardDescription>Overall health assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.status}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(health.timestamp).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Neural Load</CardTitle>
            <CardDescription>Current system neural load</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.metrics.load.toFixed(1)}%</div>
            <Progress value={health.metrics.load} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <CardDescription>Available neural memory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.metrics.memory.toFixed(1)}%</div>
            <Progress value={health.metrics.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <CardDescription>Neural error percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(health.metrics.errorRate * 100).toFixed(2)}%</div>
            <div className={`text-xs ${health.metrics.errorRate < 0.01 ? 'text-green-600' : 'text-amber-600'} mt-1`}>
              {health.metrics.errorRate < 0.01 ? 'Normal range' : 'Above normal'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="subsystems">Subsystems</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Metrics</CardTitle>
              <CardDescription>Core neural system performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {systemMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm">CPU Usage</div>
                    <div className="text-xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
                    <Progress value={systemMetrics.cpuUsage} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">Memory Usage</div>
                    <div className="text-xl font-bold">{systemMetrics.memoryUsage.toFixed(1)}%</div>
                    <Progress value={systemMetrics.memoryUsage} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">Latency</div>
                    <div className="text-xl font-bold">{systemMetrics.latency.toFixed(1)} ms</div>
                    <Progress value={systemMetrics.latency / 5} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">Average Response Time</div>
                    <div className="text-xl font-bold">{systemMetrics.averageResponseTime.toFixed(1)} ms</div>
                    <Progress value={systemMetrics.averageResponseTime / 4} />
                  </div>
                </div>
              )}
              {!systemMetrics && !isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Start monitoring to view system metrics data</p>
                </div>
              )}
              {isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  Loading metrics data...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subsystems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subsystem Health</CardTitle>
              <CardDescription>Status of neural subsystems</CardDescription>
            </CardHeader>
            <CardContent>
              {subsystemHealth && subsystemHealth.length > 0 && (
                <div className="space-y-4">
                  {subsystemHealth.map((subsystem) => (
                    <div key={subsystem.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{subsystem.name}</div>
                        <div className={`text-sm ${subsystem.status === 'operational' ? 'text-green-600' : 'text-amber-600'}`}>
                          {subsystem.status}
                        </div>
                      </div>
                      <Progress value={subsystem.health} />
                      <p className="text-xs text-muted-foreground">Health: {subsystem.health}%</p>
                    </div>
                  ))}
                </div>
              )}
              {(!subsystemHealth || subsystemHealth.length === 0) && !isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Start monitoring to view subsystem health data</p>
                </div>
              )}
              {isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  Loading subsystem data...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Report</CardTitle>
              <CardDescription>Detailed neural performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {performanceReport && (
                <div>
                  <p className="text-sm">{t('Last updated')}: {new Date(performanceReport.timestamp).toLocaleString()}</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Overall Health</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{performanceReport.overallHealth}</div>
                      </CardContent>
                    </Card>
                    {performanceReport.metrics && (
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-sm">CPU/Memory Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>CPU Usage:</span>
                              <span>{performanceReport.metrics.cpuUsage.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Memory Usage:</span>
                              <span>{performanceReport.metrics.memoryUsage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
              {!performanceReport && !isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>{t('Start monitoring to view performance data')}</p>
                </div>
              )}
              {isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  {t('Loading performance data...')}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralMonitoringPage;
