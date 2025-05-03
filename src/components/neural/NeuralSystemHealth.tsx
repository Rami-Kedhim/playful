
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ServiceMetrics } from '@/types/neuralMetrics';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface NeuralSystemHealthProps {
  status?: 'optimal' | 'good' | 'warning' | 'critical';
  metrics?: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    errorRate: number;
    accuracy?: number;
    latency?: number;
    [key: string]: any;
  };
  className?: string;
}

const NeuralSystemHealth: React.FC<NeuralSystemHealthProps> = ({
  status = 'good',
  metrics = {
    cpuUsage: 45,
    memoryUsage: 60,
    responseTime: 120,
    errorRate: 0.02,
    accuracy: 0.97
  },
  className = ''
}) => {
  // Helper function to determine status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'optimal':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Helper function to determine progress color
  const getProgressColor = (value: number, isErrorRate: boolean = false): string => {
    if (isErrorRate) {
      // For error rates, lower is better
      if (value < 0.01) return 'bg-green-500';
      if (value < 0.05) return 'bg-blue-500';
      if (value < 0.1) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      // For CPU and memory usage, lower is better
      if (value < 50) return 'bg-green-500';
      if (value < 70) return 'bg-blue-500';
      if (value < 85) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  // Helper function to determine status icon
  const StatusIcon = () => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Neural System Health</span>
          <div className="flex items-center">
            <StatusIcon />
            <span className={`ml-2 capitalize ${getStatusColor(status)}`}>{status}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* CPU Usage */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">CPU Usage</span>
              <span className="text-sm font-medium">{metrics.cpuUsage.toFixed(1)}%</span>
            </div>
            <Progress
              value={metrics.cpuUsage}
              className={getProgressColor(metrics.cpuUsage)}
            />
          </div>

          {/* Memory Usage */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Memory Usage</span>
              <span className="text-sm font-medium">{metrics.memoryUsage.toFixed(1)}%</span>
            </div>
            <Progress
              value={metrics.memoryUsage}
              className={getProgressColor(metrics.memoryUsage)}
            />
          </div>

          {/* Response Time */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Response Time</span>
              <span className="text-sm font-medium">{metrics.responseTime.toFixed(0)} ms</span>
            </div>
            <Progress
              value={Math.min(metrics.responseTime / 5, 100)}
              className={metrics.responseTime < 100 ? 'bg-green-500' : 
                         metrics.responseTime < 200 ? 'bg-blue-500' : 
                         metrics.responseTime < 500 ? 'bg-yellow-500' : 'bg-red-500'}
            />
          </div>

          {/* Error Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Error Rate</span>
              <span className="text-sm font-medium">{(metrics.errorRate * 100).toFixed(2)}%</span>
            </div>
            <Progress
              value={Math.min(metrics.errorRate * 1000, 100)}
              className={getProgressColor(metrics.errorRate, true)}
            />
          </div>

          {/* Accuracy (if available) */}
          {metrics.accuracy !== undefined && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Accuracy</span>
                <span className="text-sm font-medium">{(metrics.accuracy * 100).toFixed(1)}%</span>
              </div>
              <Progress
                value={metrics.accuracy * 100}
                className={metrics.accuracy > 0.95 ? 'bg-green-500' : 
                           metrics.accuracy > 0.9 ? 'bg-blue-500' : 
                           metrics.accuracy > 0.8 ? 'bg-yellow-500' : 'bg-red-500'}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemHealth;
