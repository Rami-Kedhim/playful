
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PerformanceChart from './PerformanceChart';
import MetricsGrid from '@/components/analytics/MetricsGrid';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';

export interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30000 }) => {
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [interval, setInterval] = useState(refreshInterval);
  
  useEffect(() => {
    if (!autoRefresh) return;
    
    const timer = setInterval(() => {
      refreshAnalytics();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoRefresh, interval, refreshAnalytics]);
  
  const handleManualRefresh = () => {
    refreshAnalytics();
  };
  
  // Prepare metrics for the grid
  const getMetrics = () => {
    if (!analyticsData) return [];
    
    return [
      {
        title: 'Response Time',
        value: analyticsData.systemMetrics.responseTimeMs,
        change: analyticsData.operationalMetrics.responseTimeChange,
        unit: 'ms'
      },
      {
        title: 'Error Rate',
        value: analyticsData.systemMetrics.errorRate,
        change: analyticsData.operationalMetrics.errorRateChange,
        unit: '%'
      },
      {
        title: 'CPU Usage',
        value: analyticsData.systemMetrics.cpuUsage,
        change: 0,
        unit: '%'
      },
      {
        title: 'Memory Usage',
        value: analyticsData.systemMetrics.memoryUsage,
        change: 0,
        unit: '%'
      }
    ];
  };
  
  // Prepare performance chart data
  const getPerformanceData = () => {
    if (!detailedMetrics) return [];
    
    return detailedMetrics.timeSeriesData;
  };
  
  // Handler for interval changes
  const handleIntervalChange = (newInterval: number) => {
    setInterval(newInterval);
  };
  
  // Handle refresh from AutoRefreshControl
  const handleRefresh = () => {
    refreshAnalytics();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Neural System Analytics</h2>
        
        <div className="flex items-center gap-2">
          <AutoRefreshControl 
            interval={interval} 
            onIntervalChange={handleIntervalChange}
            onRefresh={handleRefresh}
          />
          
          <Button variant="outline" size="sm" onClick={() => console.log('Download analytics data')}>
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading && !analyticsData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <MetricsGrid metrics={getMetrics()} />
          
          <Tabs defaultValue="performance">
            <TabsList className="mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="resources">Resource Usage</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Neural System Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {detailedMetrics ? (
                    <PerformanceChart
                      data={getPerformanceData()}
                      dataKey="timestamp"
                      lines={[
                        { dataKey: "metrics.requestsPerSecond", name: "Requests/sec", color: "#4f46e5" },
                        { dataKey: "metrics.responseTimeMs", name: "Response Time (ms)", color: "#16a34a" }
                      ]}
                      height={350}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">No performance data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {detailedMetrics ? (
                    <PerformanceChart
                      data={getPerformanceData()}
                      dataKey="timestamp"
                      lines={[
                        { dataKey: "metrics.cpuUsage", name: "CPU Usage (%)", color: "#dc2626" },
                        { dataKey: "metrics.memoryUsage", name: "Memory Usage (%)", color: "#2563eb" },
                        { dataKey: "metrics.gpuUsage", name: "GPU Usage (%)", color: "#7c3aed" }
                      ]}
                      height={350}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">No resource data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle>Detected Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  {detailedMetrics && detailedMetrics.anomalies && detailedMetrics.anomalies.length > 0 ? (
                    <div className="space-y-4">
                      {detailedMetrics.anomalies.map((anomaly, index) => (
                        <div key={index} className="bg-muted p-4 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <span className={`text-sm font-medium ${anomaly.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                                {anomaly.severity.toUpperCase()} Severity
                              </span>
                              <h4 className="font-medium">{anomaly.metric} Anomaly</h4>
                              <p className="text-sm text-muted-foreground">
                                Expected: {anomaly.expected}, Actual: {anomaly.actual}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {new Date(anomaly.timestamp).toLocaleString()}
                              </p>
                              <span className={`text-sm ${anomaly.resolved ? 'text-green-500' : 'text-red-500'}`}>
                                {anomaly.resolved ? 'Resolved' : 'Unresolved'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No anomalies detected in the current time period</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {detailedMetrics && detailedMetrics.recommendations && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  {detailedMetrics.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default NeuralAnalytics;
