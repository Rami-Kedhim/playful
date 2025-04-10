import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ActivitySquare, 
  Gauge, 
  Cpu, 
  BarChart3, 
  Network, 
  ArrowUpDown, 
  BarChart4, 
  RefreshCcw,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { useNeuralSystemMetrics } from '@/hooks/useNeuralSystemMetrics';

const NeuralMonitorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('realtime');
  const { toast } = useToast();
  
  const {
    metrics,
    performance,
    logs,
    isLoading,
    errorMessage,
    refreshMetrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  } = useNeuralSystemMetrics();

  // Create dummy historical data for the chart
  const generateHistoricalData = () => {
    // If we have performance data with history, use that
    if (performance?.history) {
      return performance.history.map((value, index) => ({
        time: `${index * 5}m`,
        value
      }));
    }
    
    // Otherwise generate some dummy data
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 15 * 60000);
      return {
        time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 40,
        network: Math.floor(Math.random() * 20) + 20
      };
    });
  };

  const historicalData = generateHistoricalData();

  const handleRefresh = async () => {
    await refreshMetrics();
    toast({
      title: "Metrics Refreshed",
      description: "Neural system metrics have been updated."
    });
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
      toast({
        title: "Monitoring Stopped",
        description: "Real-time metrics monitoring has been paused."
      });
    } else {
      startMonitoring();
      toast({
        title: "Monitoring Started",
        description: "Real-time metrics monitoring is now active."
      });
    }
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <ActivitySquare className="h-5 w-5 mr-2 text-primary" />
              Neural System Monitor
            </CardTitle>
            <CardDescription>Real-time performance metrics and system health</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant={isMonitoring ? "destructive" : "default"} 
              size="sm"
              onClick={toggleMonitoring}
            >
              {isMonitoring ? (
                <>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
        </div>
        {isLoading && (
          <Progress value={50} className="mt-2 animate-pulse" />
        )}
        {errorMessage && (
          <div className="mt-2 p-2 bg-destructive/10 text-destructive rounded-md text-sm">
            {errorMessage}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="realtime">Realtime</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="realtime" className="space-y-4">
            {/* System Load Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metrics && (
                <>
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-primary" />
                        System Load
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-3xl font-bold">
                        {metrics.systemLoad}%
                      </div>
                      <Progress value={metrics.systemLoad} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                        Memory Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-3xl font-bold">
                        {metrics.memoryAllocation}%
                      </div>
                      <Progress value={metrics.memoryAllocation} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm flex items-center">
                        <Network className="h-4 w-4 mr-2 text-primary" />
                        Network Throughput
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-3xl font-bold">
                        {metrics.networkThroughput} MB/s
                      </div>
                      <Progress value={metrics.networkThroughput * 10} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Processing Performance */}
            {performance && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center">
                    <Gauge className="h-4 w-4 mr-2 text-primary" />
                    Processing Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Processing Efficiency</span>
                        <span className="text-sm font-medium flex items-center">
                          {performance.processingEfficiency}%
                          {performance.processingTrend === 'up' ? (
                            <ArrowUpDown className="h-3 w-3 ml-1 text-green-500" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3 ml-1 text-red-500 transform rotate-180" />
                          )}
                        </span>
                      </div>
                      <Progress value={performance.processingEfficiency} className="h-2 mb-4" />
                      
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Accuracy Rate</span>
                        <span className="text-sm font-medium flex items-center">
                          {performance.accuracyRate}%
                          {performance.accuracyTrend === 'up' ? (
                            <ArrowUpDown className="h-3 w-3 ml-1 text-green-500" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3 ml-1 text-red-500 transform rotate-180" />
                          )}
                        </span>
                      </div>
                      <Progress value={performance.accuracyRate} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">System Recommendations</h4>
                      <ul className="space-y-1">
                        {performance.recommendations.map((rec, index) => (
                          <li key={index} className="text-xs px-2 py-1 rounded-md bg-muted">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Request Statistics */}
            {metrics && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center">
                    <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                    Request Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 border rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Request Rate</div>
                      <div className="text-2xl font-bold">{metrics.requestRate}/sec</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Response Time</div>
                      <div className="text-2xl font-bold">{metrics.averageResponseTime}ms</div>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Error Rate</div>
                      <div className="text-2xl font-bold">{metrics.errorRate}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="historical">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Historical Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory" />
                      <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Historical system metrics over the last 24 hours
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-2 text-xs font-medium grid grid-cols-12">
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-8">Message</div>
                  </div>
                  <div className="divide-y max-h-96 overflow-y-auto">
                    {logs.length > 0 ? (
                      logs.map((log, index) => (
                        <div key={index} className="grid grid-cols-12 text-sm p-2">
                          <div className="col-span-2 text-muted-foreground">{log.timestamp}</div>
                          <div className="col-span-2">
                            <Badge variant={
                              log.level === 'error' ? 'destructive' : 
                              log.level === 'warning' ? 'warning' : 
                              'outline'
                            } className="text-xs">
                              {log.level}
                            </Badge>
                          </div>
                          <div className="col-span-8">{log.message}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No logs available
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralMonitorPanel;
