
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { BrainHubHealth } from '@/types/brainHubHealth';
import { cn } from '@/lib/utils';

interface BrainHubHealthStatusProps {
  className?: string;
  onRefresh?: () => void;
}

const BrainHubHealthStatus: React.FC<BrainHubHealthStatusProps> = ({
  className,
  onRefresh
}) => {
  const { health, checkHealth, loading } = useBrainHubHealth();

  const handleRefresh = () => {
    checkHealth();
    if (onRefresh) onRefresh();
  };

  const getStatusInfo = (status: BrainHubHealth['status']) => {
    // Map the status values to our display states
    const mappedStatus = (() => {
      if (status === 'online' || status === 'healthy') return 'healthy';
      if (status === 'degraded' || status === 'warning') return 'warning';
      if (status === 'offline' || status === 'error') return 'error';
      return 'unknown';
    })();
    
    switch (mappedStatus) {
      case 'healthy':
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Operational'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Performance Issues'
        };
      case 'error':
        return {
          icon: <XCircle className="h-6 w-6" />,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'System Outage'
        };
      default:
        return {
          icon: <RotateCw className="h-6 w-6" />,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Checking Status'
        };
    }
  };
  
  const statusInfo = getStatusInfo(health.status);
  
  const formatLastOptimized = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("pb-4", statusInfo.bgColor, statusInfo.borderColor)}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <span className={statusInfo.color}>{statusInfo.icon}</span>
            System Status
          </CardTitle>
          <Badge variant="outline" className={cn("font-normal", statusInfo.color)}>
            {statusInfo.label}
          </Badge>
        </div>
        <CardDescription>
          {health.message || "System health metrics and status"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {/* CPU Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>CPU Usage</span>
              <span>{health.metrics.cpuUsage}%</span>
            </div>
            <Progress value={health.metrics.cpuUsage} className="h-2" />
          </div>
          
          {/* Memory Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Memory Usage</span>
              <span>{health.metrics.memoryUsage}%</span>
            </div>
            <Progress value={health.metrics.memoryUsage} className="h-2" />
          </div>
          
          {/* Requests per minute */}
          <div className="flex justify-between items-center text-sm">
            <span>Requests / min</span>
            <span>{health.metrics.requestsPerMinute}</span>
          </div>
          
          {/* Last optimization timestamp */}
          <div className="flex justify-between items-center text-sm">
            <span>Last Optimized</span>
            <span>{formatLastOptimized(health.metrics.lastOptimized)}</span>
          </div>
          
          {/* Neural metrics if available */}
          {health.metrics.neuralMetrics && (
            <>
              <div className="mt-4 mb-2 text-sm font-medium">Neural System Metrics</div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Accuracy</span>
                <span>{health.metrics.neuralMetrics.accuracy}%</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Efficiency</span>
                <span>{health.metrics.neuralMetrics.efficiency}%</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Latency</span>
                <span>{health.metrics.neuralMetrics.latency}ms</span>
              </div>
            </>
          )}
          
          {/* Refresh button */}
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
          >
            <RotateCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
            {loading ? 'Refreshing...' : 'Refresh Status'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubHealthStatus;
