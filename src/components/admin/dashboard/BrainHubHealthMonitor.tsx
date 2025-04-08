
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw, Activity, Server, Clock, Brain, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import useBrainHubHealth, { BrainHubHealth } from '@/hooks/useBrainHubHealth';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import Alert from '@/components/common/Alert';

const BrainHubHealthMonitor: React.FC = () => {
  const { health, analytics, isMonitoring, checkHealth, updateAnalytics } = useBrainHubHealth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      try {
        await checkHealth();
        await updateAnalytics();
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load BrainHub health data');
        setIsLoading(false);
      }
    };

    initializeData();
  }, [checkHealth, updateAnalytics]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await checkHealth();
      await updateAnalytics();
      toast({
        title: 'BrainHub Health Updated',
        description: 'Health metrics have been refreshed',
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Error refreshing BrainHub health:', err);
      setError(err.message || 'Failed to refresh BrainHub health data');
      toast({
        title: 'Update Failed',
        description: 'Could not refresh BrainHub health data',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatLastOptimized = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleDismissError = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">BrainHub Health</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <LoadingIndicator size="sm" text="Loading BrainHub health data..." centered />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            BrainHub Health Monitor
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-6 w-6"
          >
            <RefreshCcw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert
            variant="destructive"
            message={error}
            onClose={handleDismissError}
            className="mb-4"
            showIcon
          />
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Badge className={getStatusColor(health.status)}>
              {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Last optimized: {formatLastOptimized(health.metrics.lastOptimized)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-xs">
                <Activity className="h-3 w-3 mr-1" />
                <span>CPU Usage</span>
              </div>
              <span className="text-xs">{health.metrics.cpuUsage}%</span>
            </div>
            <Progress value={health.metrics.cpuUsage} className="h-1.5" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-xs">
                <Server className="h-3 w-3 mr-1" />
                <span>Memory Usage</span>
              </div>
              <span className="text-xs">{health.metrics.memoryUsage}%</span>
            </div>
            <Progress value={health.metrics.memoryUsage} className="h-1.5" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>Response Time</span>
              </div>
              <span className="text-xs">{analytics.averageResponseTime} ms</span>
            </div>
            <Progress 
              value={Math.min(analytics.averageResponseTime / 10, 100)} 
              className="h-1.5" 
            />
          </div>
        </div>

        <div className="mt-4 text-xs">
          <div className="flex justify-between mb-2">
            <span>Daily Operations: {analytics.dailyOperations}</span>
            <span>Error Rate: {analytics.errorRate}%</span>
          </div>
          
          {health.warnings.length > 0 && (
            <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <div className="flex items-start gap-1 text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Warning: {health.warnings[0]}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubHealthMonitor;
