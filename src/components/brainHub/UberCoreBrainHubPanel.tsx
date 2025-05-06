
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity, Brain, Zap, Server } from 'lucide-react';
import { useUberCoreBrainHub } from '@/hooks/useUberCoreBrainHub';

const UberCoreBrainHubPanel: React.FC = () => {
  const { 
    systemStatus, 
    metrics, 
    neuralActivities, 
    isLoading, 
    isConnected,
    refreshData,
    runDiagnostics
  } = useUberCoreBrainHub();

  const handleRefresh = () => {
    refreshData();
  };

  const handleDiagnostics = () => {
    runDiagnostics();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <div className="mr-2 p-1 bg-primary/10 rounded">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            UberCore-BrainHub Connection
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "success" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                <h3 className="text-sm font-medium">UberCore</h3>
              </div>
              <Badge variant={systemStatus.uberCore.status === 'operational' ? "success" : "warning"}>
                {systemStatus.uberCore.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Uptime: {systemStatus.uberCore.uptime.toFixed(1)}%
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>CPU Load</span>
                <span>{metrics.cpuUsage}%</span>
              </div>
              <Progress value={metrics.cpuUsage} className="h-1" />
            </div>
          </div>

          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-2 text-blue-500" />
                <h3 className="text-sm font-medium">BrainHub</h3>
              </div>
              <Badge variant={systemStatus.brainHub.status === 'operational' ? "success" : "warning"}>
                {systemStatus.brainHub.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Active Modules: {systemStatus.brainHub.activeModules.length}
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Memory Usage</span>
                <span>{metrics.memoryUsage}%</span>
              </div>
              <Progress value={metrics.memoryUsage} className="h-1" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">System Performance</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-background p-2 rounded border">
              <div className="text-xs text-muted-foreground">Requests/min</div>
              <div className="font-semibold">{metrics.requestsPerMinute}</div>
            </div>
            <div className="bg-background p-2 rounded border">
              <div className="text-xs text-muted-foreground">Response Time</div>
              <div className="font-semibold">{metrics.averageResponseTime} ms</div>
            </div>
            <div className="bg-background p-2 rounded border">
              <div className="text-xs text-muted-foreground">Error Rate</div>
              <div className="font-semibold">{metrics.errorRate}%</div>
            </div>
            <div className="bg-background p-2 rounded border">
              <div className="text-xs text-muted-foreground">Active Models</div>
              <div className="font-semibold">{metrics.modelCount}</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Neural Activity Feed</h3>
            <Button size="sm" variant="ghost" onClick={handleDiagnostics} disabled={isLoading}>
              <Activity className="h-3.5 w-3.5 mr-1" />
              Run Diagnostics
            </Button>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1 bg-muted/20 p-2 rounded">
            {neuralActivities.length > 0 ? (
              neuralActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex gap-2 text-xs p-1 border-b border-muted">
                  <div className="text-muted-foreground whitespace-nowrap">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="font-medium whitespace-nowrap">[{activity.type}]</div>
                  <div className="truncate">{activity.details}</div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm py-2 text-muted-foreground">
                No recent neural activity
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UberCoreBrainHubPanel;
