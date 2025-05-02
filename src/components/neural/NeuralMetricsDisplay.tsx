
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertCircle, 
  ArrowDownRight, 
  ArrowUpRight, 
  Clock, 
  Cpu, 
  MessageSquare, 
  RefreshCw, 
  Server 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getHealthMetrics } from '@/services/neural/monitoring/NeuralMetricsProvider';
import { HealthMetrics } from '@/types/neuralMetrics';

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  description?: string;
  format?: 'percentage' | 'number' | 'time' | 'decimal';
  trendDirection?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  description,
  format = 'number',
  trendDirection
}) => {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${Math.round(val)}%`;
      case 'time':
        return `${val}ms`;
      case 'decimal':
        return val.toFixed(2);
      default:
        return val.toString();
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold tracking-tighter">
                {formatValue(value)}
              </h3>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>

          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${
              trendDirection === 'up' 
                ? 'text-green-500' 
                : trendDirection === 'down' 
                ? 'text-red-500' 
                : 'text-muted-foreground'
            }`}>
              {trendDirection === 'up' ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : trendDirection === 'down' ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : null}
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NeuralMetricsDisplay: React.FC<{ className?: string }> = ({ className }) => {
  const [metrics, setMetrics] = React.useState<HealthMetrics | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = React.useState<Date>(new Date());

  const refreshMetrics = () => {
    setLoading(true);
    // Get fresh metrics from the provider
    const freshMetrics = getHealthMetrics(true);
    setMetrics(freshMetrics);
    setLastUpdated(new Date());
    setLoading(false);
  };

  React.useEffect(() => {
    refreshMetrics();
    
    // Set up polling interval
    const intervalId = setInterval(() => {
      refreshMetrics();
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !metrics) {
    return (
      <Card className={className}>
        <CardContent className="p-6 flex justify-center items-center h-60">
          <div className="flex flex-col items-center space-y-4">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading neural metrics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className={className}>
        <CardContent className="p-6 flex justify-center items-center h-60">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="text-muted-foreground">Failed to load neural metrics</p>
            <Button onClick={refreshMetrics}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Neural System Metrics</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshMetrics}
            className="h-8 px-2 lg:px-3"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            <span>Refresh</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {/* System Health Indicators */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">System Health</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>CPU Utilization</span>
                  <span>{typeof metrics.cpuUtilization === 'number' ? metrics.cpuUtilization.toFixed(1) : metrics.cpuUtilization}%</span>
                </div>
                <Progress value={Number(metrics.cpuUtilization)} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Memory Utilization</span>
                  <span>{typeof metrics.memoryUtilization === 'number' ? metrics.memoryUtilization.toFixed(1) : metrics.memoryUtilization}%</span>
                </div>
                <Progress value={Number(metrics.memoryUtilization)} className="h-2" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Performance Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <MetricCard
                title="Response Time"
                value={metrics.responseTime}
                icon={<Clock className="h-4 w-4 text-primary" />}
                format="time"
              />
              <MetricCard
                title="Operations/Sec"
                value={metrics.operationsPerSecond}
                icon={<Activity className="h-4 w-4 text-primary" />}
              />
              <MetricCard
                title="Error Rate"
                value={metrics.errorRate}
                icon={<AlertCircle className="h-4 w-4 text-primary" />}
                format="percentage"
                trendDirection={metrics.errorRate > 3 ? 'up' : 'down'}
              />
            </div>
          </div>

          <Separator />

          {/* Neural Network Metrics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Neural Network</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <MetricCard
                title="Neural Accuracy"
                value={metrics.neuralAccuracy * 100} // Convert from decimal to percentage
                icon={<Server className="h-4 w-4 text-primary" />}
                format="percentage"
              />
              <MetricCard
                title="Neural Efficiency"
                value={metrics.neuralEfficiency * 100} // Convert from decimal to percentage
                icon={<Cpu className="h-4 w-4 text-primary" />}
                format="percentage"
              />
              <MetricCard
                title="Neural Latency"
                value={metrics.neuralLatency}
                icon={<MessageSquare className="h-4 w-4 text-primary" />}
                format="time"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
