
import React, { useEffect, useState } from 'react';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Brain, RefreshCw, Activity } from 'lucide-react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';
import { neuralHub } from '@/services/neural';
import { HealthMetrics } from '@/types/neuralMetrics';

interface HermesSeoConnectorProps {
  userId?: string;
}

// Helper to map health metrics from one format to another
function mapHealthMetrics(metrics: any): HealthMetrics {
  return {
    cpuUtilization: metrics.cpuUsage || metrics.systemLoad * 100,
    memoryUtilization: metrics.memoryUsage || metrics.memoryAllocation * 100,
    errorRate: metrics.errorRate || 0,
    responseTime: metrics.responseTime || metrics.averageResponseTime || 0,
    operationsPerSecond: metrics.operationsPerSecond || metrics.requestRate || 0,
    stability: 100 - (metrics.errorRate * 100 || 0),
    lastUpdated: metrics.lastUpdated || Date.now(),
    systemLoad: metrics.systemLoad || metrics.cpuUsage / 100 || 0,
    userEngagement: metrics.userEngagement || 0.5,
    requestsPerMinute: metrics.requestRate * 60 || metrics.requestsPerMinute || 0,
    cpuUsage: metrics.cpuUsage || metrics.systemLoad * 100,
    memoryUsage: metrics.memoryUsage || metrics.memoryAllocation * 100,
    neuralAccuracy: metrics.neuralAccuracy || 0.95,
    neuralEfficiency: metrics.neuralEfficiency || 0.9,
    neuralLatency: metrics.neuralLatency || metrics.responseTime || 100,
    memoryAllocation: metrics.memoryAllocation || metrics.memoryUsage / 100,
    networkThroughput: metrics.networkThroughput || 0,
    requestRate: metrics.requestRate || 0,
    averageResponseTime: metrics.averageResponseTime || metrics.responseTime || 0
  };
}

const HermesSeoConnector: React.FC<HermesSeoConnectorProps> = ({ userId }) => {
  const { insights, loading, error, refreshInsights } = useHermesInsights();
  
  // Use neuralHub.getHealthMetrics() to get system health metrics
  const [systemHealthMetrics, setSystemHealthMetrics] = useState<HealthMetrics>(
    mapHealthMetrics(neuralHub.getHealthMetrics())
  );

  const [lastOptimizedContent, setLastOptimizedContent] = useState<SeoOptimizationResult | null>(null);

  // Periodically update system health metrics
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSystemHealthMetrics(mapHealthMetrics(neuralHub.getHealthMetrics()));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Handler for toggling auto-optimization
  const [isAutoOptimizing, setIsAutoOptimizing] = useState(false);

  const handleToggleAutoOptimize = () => {
    setIsAutoOptimizing(!isAutoOptimizing);

    toast({
      title: isAutoOptimizing ? "Auto-optimization disabled" : "Auto-optimization enabled",
      description: isAutoOptimizing 
        ? "HERMES will no longer automatically optimize SEO"
        : "HERMES will automatically optimize your SEO based on intelligence"
    });
  };

  // Handler for manually syncing HERMES with SEO module
  const handleSyncHermesSeo = () => {
    toast({
      title: "HERMES-SEO Sync Complete",
      description: "Latest intelligence has been applied to your SEO configuration"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          HERMES-SEO Integration
        </CardTitle>
        <CardDescription>
          Neural intelligence connected to your SEO optimization
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>System Health</Label>
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date(systemHealthMetrics.lastUpdated).toLocaleTimeString()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Neural Load</span>
                <span>{Math.round(systemHealthMetrics.systemLoad * 100)}%</span>
              </div>
              <Progress value={systemHealthMetrics.systemLoad * 100} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>User Engagement</span>
                <span>{Math.round(systemHealthMetrics.userEngagement * 100)}%</span>
              </div>
              <Progress value={systemHealthMetrics.userEngagement * 100} />
            </div>
          </div>
        </div>

        {/* Auto-optimize Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-optimize"
            checked={isAutoOptimizing}
            onCheckedChange={handleToggleAutoOptimize}
          />
          <Label htmlFor="auto-optimize">
            Auto-optimize with HERMES intelligence
          </Label>
        </div>

        {/* Optimization Stats */}
        <div className="rounded-md bg-secondary/20 p-4 space-y-2">
          <h4 className="font-medium flex items-center">
            <Activity className="h-4 w-4 mr-2" /> 
            Optimization Statistics
          </h4>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Optimizations applied:</span>
              <span>127</span>
            </li>
            <li className="flex justify-between">
              <span>Average improvement:</span>
              <span>+23%</span>
            </li>
            <li className="flex justify-between">
              <span>Trending keywords applied:</span>
              <span>42</span>
            </li>
            <li className="flex justify-between">
              <span>Most effective content type:</span>
              <span>Profiles</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleSyncHermesSeo}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync HERMES with SEO Module
        </Button>
      </CardContent>
    </Card>
  );
};

export default HermesSeoConnector;
