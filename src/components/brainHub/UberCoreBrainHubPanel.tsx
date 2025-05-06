
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SystemHealthMetrics } from '@/services/neural/types/NeuralService';
import { Brain, Cpu, Memory, Network } from 'lucide-react';

interface UberCoreBrainHubPanelProps {
  status?: {
    uberCore?: {
      status: string;
      uptime: number;
    };
    brainHub?: {
      status: string;
      activeModules: any[];
    };
  };
  metrics?: SystemHealthMetrics;
  isConnected?: boolean;
  isLoading?: boolean;
}

const UberCoreBrainHubPanel: React.FC<UberCoreBrainHubPanelProps> = ({
  status = {
    uberCore: {
      status: 'operational',
      uptime: 99.9
    },
    brainHub: {
      status: 'operational',
      activeModules: []
    }
  },
  metrics = {
    load: 45,
    memory: 32,
    latency: 120,
    errorRate: 0.05,
    averageResponseTime: 150,
    cpuUsage: 45,
    memoryUsage: 32
  },
  isConnected = true,
  isLoading = false
}) => {
  // Function to get color based on metric value
  const getMetricColor = (value: number, inverse = false) => {
    if (inverse) {
      if (value > 70) return 'text-red-500';
      if (value > 50) return 'text-amber-500';
      return 'text-green-500';
    } else {
      if (value < 30) return 'text-red-500';
      if (value < 60) return 'text-amber-500';
      return 'text-green-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CPU Utilization Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Cpu className="h-4 w-4 mr-2 text-blue-500" />
            CPU Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Current Usage</span>
              <span className={`text-xs font-semibold ${getMetricColor(metrics.cpuUsage || 0, true)}`}>
                {metrics.cpuUsage || 0}%
              </span>
            </div>
            <Progress value={metrics.cpuUsage || 0} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Memory Usage Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Memory className="h-4 w-4 mr-2 text-purple-500" />
            Memory Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Current Usage</span>
              <span className={`text-xs font-semibold ${getMetricColor(metrics.memoryUsage || 0, true)}`}>
                {metrics.memoryUsage || 0}%
              </span>
            </div>
            <Progress value={metrics.memoryUsage || 0} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Network Latency Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Network className="h-4 w-4 mr-2 text-emerald-500" />
            Network Latency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Response Time</span>
              <span className={`text-xs font-semibold ${getMetricColor(Math.min(100, (metrics.latency || 0) / 2), true)}`}>
                {metrics.latency || 0} ms
              </span>
            </div>
            <Progress value={Math.min(100, (metrics.latency || 0) / 2)} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Neural Activity Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Brain className="h-4 w-4 mr-2 text-indigo-500" />
            Neural Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Processing Efficiency</span>
              <span className={`text-xs font-semibold ${getMetricColor(100 - (metrics.errorRate || 0) * 100)}`}>
                {(100 - (metrics.errorRate || 0) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={100 - (metrics.errorRate || 0) * 100} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UberCoreBrainHubPanel;
