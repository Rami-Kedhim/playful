
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { checkBrainHubHealth } from '@/services/brainHubHealth';
import { BrainHubHealth } from '@/types/brainHubHealth';

const BrainHubHealthStatus: React.FC = () => {
  const [health, setHealth] = useState<BrainHubHealth>({
    status: 'loading',
    metrics: {
      cpuUsage: 0,
      memoryUsage: 0,
      requestsPerMinute: 0,
      lastOptimized: Date.now()
    },
    warnings: [],
    errors: []
  });
  
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchHealthStatus = async () => {
    setRefreshing(true);
    try {
      const result = checkBrainHubHealth();
      setHealth(result);
    } catch (error) {
      console.error('Failed to check brain hub health', error);
      setHealth({
        status: 'error',
        message: 'Failed to retrieve health status',
        metrics: {
          cpuUsage: 0,
          memoryUsage: 0,
          requestsPerMinute: 0,
          lastOptimized: Date.now()
        },
        warnings: [],
        errors: ['Connection error']
      });
    } finally {
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchHealthStatus();
    
    // Set up periodic health checks
    const intervalId = setInterval(fetchHealthStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getStatusIcon = () => {
    switch (health.status) {
      case 'healthy':
      case 'online':
        return <CircleCheck className="w-10 h-10 text-green-500" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
      case 'error':
      case 'offline':
        return <AlertCircle className="w-10 h-10 text-red-500" />;
      default:
        return <RefreshCw className="w-10 h-10 text-blue-500 animate-spin" />;
    }
  };
  
  const getMetricColor = (value: number, thresholds: [number, number]) => {
    const [warning, critical] = thresholds;
    if (value >= critical) return 'text-red-500';
    if (value >= warning) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brain Hub Health</CardTitle>
        <CardDescription>Neural system health and monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          {getStatusIcon()}
          <div>
            <h3 className="text-xl font-medium capitalize">{health.status}</h3>
            <p className="text-muted-foreground">{health.message || 'System operational'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">System Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>CPU Usage</span>
                <span className={getMetricColor(health.metrics.cpuUsage, [70, 90])}>
                  {health.metrics.cpuUsage.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Memory Usage</span>
                <span className={getMetricColor(health.metrics.memoryUsage, [80, 95])}>
                  {health.metrics.memoryUsage.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Requests Per Minute</span>
                <span>{health.metrics.requestsPerMinute.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Optimized</span>
                <span>{new Date(health.metrics.lastOptimized).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          {(health.warnings && health.warnings.length > 0) && (
            <div>
              <h4 className="font-medium mb-2 text-yellow-500 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" /> Warnings
              </h4>
              <ul className="space-y-1 text-sm">
                {health.warnings.map((warning, i) => (
                  <li key={i} className="text-yellow-500">{warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          {(health.errors && health.errors.length > 0) && (
            <div>
              <h4 className="font-medium mb-2 text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> Errors
              </h4>
              <ul className="space-y-1 text-sm">
                {health.errors.map((error, i) => (
                  <li key={i} className="text-red-500">{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <Button 
              onClick={fetchHealthStatus} 
              disabled={refreshing} 
              variant="outline" 
              className="w-full"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Health Status'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubHealthStatus;
