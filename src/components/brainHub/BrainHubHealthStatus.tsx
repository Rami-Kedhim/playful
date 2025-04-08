
import React from 'react';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  RefreshCw,
  Gauge,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const BrainHubHealthStatus: React.FC = () => {
  const { health, analytics, checkHealth, updateAnalytics, isMonitoring, startMonitoring, stopMonitoring } = useBrainHubHealth();
  const { toast } = useToast();
  
  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    unknown: 'bg-gray-500',
  };
  
  const statusIcons = {
    healthy: <CheckCircle className="h-5 w-5 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    unknown: <AlertCircle className="h-5 w-5 text-gray-500" />,
  };

  const handleRefresh = () => {
    checkHealth();
    updateAnalytics();
    toast({
      title: "Health Status Refreshed",
      description: `Current status: ${health.status.toUpperCase()}`,
      variant: health.status === 'error' ? 'destructive' : health.status === 'warning' ? 'warning' : 'default',
    });
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
      toast({
        title: "Monitoring Stopped",
        description: "BrainHub health monitoring has been paused",
      });
    } else {
      startMonitoring();
      toast({
        title: "Monitoring Started",
        description: "BrainHub health is now being monitored in real-time",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center space-x-2">
            <Activity className="h-5 w-5 mr-2" />
            <span>Brain Hub Health</span>
            <Badge variant={
              health.status === 'healthy' ? 'success' : 
              health.status === 'warning' ? 'secondary' : 
              health.status === 'error' ? 'destructive' : 'outline'
            }>
              {health.status.toUpperCase()}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleMonitoring}
              title={isMonitoring ? "Stop monitoring" : "Start monitoring"}
            >
              <Gauge className={`h-4 w-4 ${isMonitoring ? 'text-green-500' : 'text-gray-500'}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleRefresh}
              title="Refresh health status"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4 pt-2">
          <CardContent className="pb-2">
            <div className="space-y-4">
              {/* Resource Usage */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span>{health.metrics.cpuUsage}%</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Progress 
                        value={health.metrics.cpuUsage} 
                        max={100}
                        className={`h-2 ${health.metrics.cpuUsage > 80 ? 'bg-red-200' : 'bg-green-200'}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>CPU Usage: {health.metrics.cpuUsage}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span>{health.metrics.memoryUsage}%</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Progress 
                        value={health.metrics.memoryUsage}
                        max={100} 
                        className={`h-2 ${health.metrics.memoryUsage > 85 ? 'bg-red-200' : 'bg-green-200'}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Memory Usage: {health.metrics.memoryUsage}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* System Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-muted/50 p-2 rounded">
                  <div className="text-sm font-medium">Requests/min</div>
                  <div className="text-lg">{health.metrics.requestsPerMinute}</div>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <div className="text-sm font-medium">Last Optimized</div>
                  <div className="text-sm">
                    {formatDate(health.metrics.lastOptimized)}
                  </div>
                </div>
              </div>
              
              {/* Neural Hub Status - Only show if neural metrics are available */}
              {health.metrics.neuralMetrics && (
                <div className="pt-2 border-t border-border">
                  <div className="text-sm font-medium mb-2">Neural Hub Status</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Stability</span>
                      <span className="text-sm font-medium">
                        {(health.metrics.neuralMetrics.stability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Engagement</span>
                      <span className="text-sm font-medium">
                        {(health.metrics.neuralMetrics.userEngagement * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          {/* Warnings/Alerts */}
          {(health.warnings.length > 0 || health.errors.length > 0) && (
            <CardFooter className="border-t pt-2 pb-1 px-6">
              <div className="space-y-1 w-full">
                {health.errors.map((error, index) => (
                  <div key={`error-${index}`} className="flex items-start gap-2 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                ))}
                
                {health.warnings.map((warning, index) => (
                  <div key={`warning-${index}`} className="flex items-start gap-2 text-xs text-yellow-600">
                    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="pt-2">
          <CardContent className="pb-2">
            <div className="space-y-4">
              {/* Analytics Summary */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 p-2 rounded">
                  <div className="text-xs text-muted-foreground">Daily Operations</div>
                  <div className="text-lg font-medium">{analytics.dailyOperations.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <div className="text-xs text-muted-foreground">Avg Response Time</div>
                  <div className="text-lg font-medium">{analytics.averageResponseTime.toFixed(2)} ms</div>
                </div>
              </div>
              
              {/* Error Rate */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Error Rate</span>
                  <span>{(analytics.errorRate * 100).toFixed(2)}%</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Progress 
                        value={analytics.errorRate * 100} 
                        max={100}
                        className={`h-2 ${analytics.errorRate > 0.05 ? 'bg-red-200' : 'bg-green-200'}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Error Rate: {(analytics.errorRate * 100).toFixed(2)}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Recommendations */}
              {analytics.recommendations.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <div className="text-sm font-medium mb-2">Optimization Recommendations</div>
                  <div className="space-y-1">
                    {analytics.recommendations.map((recommendation, index) => (
                      <div key={`recommendation-${index}`} className="flex items-start gap-2 text-xs">
                        <BarChart className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-500" />
                        <span>{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      {/* Status indicator dot */}
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${statusColors[health.status]}`} />
    </Card>
  );
};

export default BrainHubHealthStatus;
