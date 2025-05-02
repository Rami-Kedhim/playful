
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, AlertTriangle, Check, Activity, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHealthMetrics } from '@/services/neural/monitoring/NeuralMetricsProvider';
import { HealthMetrics } from '@/types/neuralMetrics';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import PerformanceChart from '../neural/PerformanceChart';

interface NeuralMetricsDisplayProps {
  className?: string;
  refreshInterval?: number; // in milliseconds
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ 
  className = '', 
  refreshInterval = 10000 
}) => {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [historicalData, setHistoricalData] = useState<HealthMetrics[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const fetchMetrics = useCallback(async (forceRefresh = false) => {
    try {
      setError(null);
      const newMetrics = getHealthMetrics(forceRefresh);
      setMetrics(newMetrics);
      
      // Add to historical data (limit to 30 points)
      setHistoricalData(prev => {
        const updated = [...prev, newMetrics];
        return updated.slice(-30);
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching neural metrics:', err);
      setError('Failed to fetch metrics data');
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchMetrics(true);
  }, [fetchMetrics]);

  // Setup auto-refresh
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoRefresh && refreshInterval > 0) {
      intervalId = setInterval(() => {
        fetchMetrics(true);
      }, refreshInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, refreshInterval, fetchMetrics]);

  const handleRefresh = () => {
    setLoading(true);
    fetchMetrics(true);
    toast.success('Metrics refreshed');
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(prev => !prev);
    toast.info(autoRefresh ? 'Auto-refresh disabled' : 'Auto-refresh enabled');
  };

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return 'bg-green-500';
    if (value < thresholds[1]) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return <Check className="h-5 w-5 text-green-500" />;
    if (value < thresholds[1]) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  if (loading && !metrics) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Neural System Metrics</span>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`${className} border-red-300`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-red-500">Neural System Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-center text-red-500">{error}</p>
            <Button onClick={handleRefresh} className="mt-4" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            <span>Neural System Metrics</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={autoRefresh ? "bg-primary/10" : ""} 
              onClick={toggleAutoRefresh}
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
              <span className="ml-2">{autoRefresh ? "Live" : "Paused"}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="historical" className="flex-1">Historical</TabsTrigger>
            <TabsTrigger value="neural" className="flex-1">Neural Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {metrics && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">CPU Utilization</span>
                      {getStatusIcon(metrics.cpuUtilization, [50, 80])}
                    </div>
                    <span className="text-sm font-bold">
                      {typeof metrics.cpuUtilization === 'number' ? metrics.cpuUtilization.toFixed(1) : metrics.cpuUtilization}%
                    </span>
                  </div>
                  <Progress 
                    value={metrics.cpuUtilization} 
                    className={getStatusColor(metrics.cpuUtilization, [50, 80])} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">Memory Utilization</span>
                      {getStatusIcon(metrics.memoryUtilization, [60, 85])}
                    </div>
                    <span className="text-sm font-bold">
                      {typeof metrics.memoryUtilization === 'number' ? metrics.memoryUtilization.toFixed(1) : metrics.memoryUtilization}%
                    </span>
                  </div>
                  <Progress 
                    value={metrics.memoryUtilization} 
                    className={getStatusColor(metrics.memoryUtilization, [60, 85])} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                    <div className="text-xl font-bold flex items-center">
                      {metrics.errorRate.toFixed(2)}% 
                      {getStatusIcon(metrics.errorRate, [2, 5])}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Response Time</div>
                    <div className="text-xl font-bold flex items-center">
                      {metrics.responseTime.toFixed(0)} ms
                      {getStatusIcon(metrics.responseTime, [100, 200])}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Ops/Second</div>
                    <div className="text-xl font-bold">{metrics.operationsPerSecond}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">System Stability</div>
                    <div className="text-xl font-bold flex items-center">
                      {(metrics.stability * 100).toFixed(1)}%
                      {getStatusIcon(100 - metrics.stability * 100, [5, 15])}
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="historical">
            {historicalData.length > 0 ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <PieChart className="h-4 w-4 mr-2" /> CPU & Memory Trends
                  </h3>
                  <div className="h-64">
                    <PerformanceChart 
                      data={historicalData.map((m, i) => ({
                        time: i.toString(),
                        cpu: m.cpuUtilization,
                        memory: m.memoryUtilization
                      }))}
                      dataKey="time"
                      lines={[
                        { dataKey: 'cpu', name: 'CPU', color: '#8b5cf6' },
                        { dataKey: 'memory', name: 'Memory', color: '#2dd4bf' }
                      ]}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-2" /> Operations & Error Rates
                  </h3>
                  <div className="h-64">
                    <PerformanceChart 
                      data={historicalData.map((m, i) => ({
                        time: i.toString(),
                        ops: m.operationsPerSecond,
                        error: m.errorRate
                      }))}
                      dataKey="time"
                      lines={[
                        { dataKey: 'ops', name: 'Operations/s', color: '#f97316' },
                        { dataKey: 'error', name: 'Error Rate %', color: '#ef4444' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Not enough historical data collected yet.</p>
                <p className="text-sm">Data will appear as more metrics are gathered.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="neural">
            {metrics && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Neural Accuracy</div>
                    <div className="text-2xl font-bold">{(metrics.neuralAccuracy * 100).toFixed(1)}%</div>
                    <Progress 
                      value={metrics.neuralAccuracy * 100} 
                      className="bg-green-500 mt-2" 
                    />
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Neural Efficiency</div>
                    <div className="text-2xl font-bold">{(metrics.neuralEfficiency * 100).toFixed(1)}%</div>
                    <Progress 
                      value={metrics.neuralEfficiency * 100} 
                      className="bg-blue-500 mt-2" 
                    />
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Neural Latency</div>
                  <div className="text-2xl font-bold">{metrics.neuralLatency.toFixed(2)} ms</div>
                  <div className="mt-2">
                    <Progress 
                      value={100 - Math.min(metrics.neuralLatency / 100 * 100, 100)} 
                      className="bg-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <h3 className="font-medium mb-3">System Recommendations</h3>
                  <ul className="space-y-2">
                    {generateRecommendations(metrics).map((rec, i) => (
                      <li key={i} className="flex items-start">
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

function generateRecommendations(metrics: HealthMetrics): string[] {
  const recommendations = [];
  
  if (metrics.cpuUtilization > 75) {
    recommendations.push("High CPU usage detected. Consider optimizing processing or scaling resources.");
  }
  
  if (metrics.memoryUtilization > 80) {
    recommendations.push("Memory usage approaching limit. Review memory allocation or check for potential memory leaks.");
  }
  
  if (metrics.errorRate > 3) {
    recommendations.push("Error rate above normal threshold. Investigate potential issues in neural processing pipeline.");
  }
  
  if (metrics.responseTime > 150) {
    recommendations.push("Response time is higher than optimal. Consider performance optimization.");
  }
  
  if (metrics.neuralAccuracy < 0.8) {
    recommendations.push("Neural accuracy is below target levels. Model retraining may be needed.");
  }
  
  if (metrics.neuralLatency > 70) {
    recommendations.push("Neural latency is high. Check for bottlenecks in the neural processing chain.");
  }
  
  // Always provide at least one recommendation
  if (recommendations.length === 0) {
    recommendations.push("All systems operating within optimal parameters.");
  }
  
  return recommendations;
}

export default NeuralMetricsDisplay;
