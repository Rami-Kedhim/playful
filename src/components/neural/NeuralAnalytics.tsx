
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import { Separator } from '@/components/ui/separator';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30000 }) => {
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // Handle automatic refresh based on interval
  useEffect(() => {
    // Only set up interval if auto-refresh is enabled
    if (autoRefresh && refreshInterval > 0) {
      const intervalId = setInterval(() => {
        refreshAnalytics();
      }, refreshInterval);
      
      // Clean up interval on unmount or when dependencies change
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh, refreshInterval, refreshAnalytics]);

  const toggleAutoRefresh = () => {
    setAutoRefresh(prev => !prev);
  };

  const handleManualRefresh = () => {
    refreshAnalytics();
  };

  if (loading && !analyticsData) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary border-r-2 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-medium">Error loading neural analytics</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Neural System Analytics</h2>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {autoRefresh ? `Auto-refreshing every ${refreshInterval / 1000}s` : 'Auto-refresh paused'}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAutoRefresh}
          >
            {autoRefresh ? 'Pause' : 'Resume'} Auto-refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh} 
            className="flex items-center gap-1"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh Now</span>
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">CPU Usage</div>
                    <div className="text-2xl font-semibold">{analyticsData.systemMetrics.cpuUsage}%</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Memory Usage</div>
                    <div className="text-2xl font-semibold">{analyticsData.systemMetrics.memoryUsage}%</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Response Time</div>
                    <div className="text-2xl font-semibold">{analyticsData.systemMetrics.responseTimeMs} ms</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                    <div className="text-2xl font-semibold">{analyticsData.systemMetrics.errorRate}%</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm font-medium mb-2">System Status</div>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${analyticsData.systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="capitalize">{analyticsData.systemHealth.status}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-2xl font-semibold">{(analyticsData.modelPerformance.accuracy * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="text-2xl font-semibold">{(analyticsData.modelPerformance.precision * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">Recall</div>
                    <div className="text-2xl font-semibold">{(analyticsData.modelPerformance.recall * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-sm text-muted-foreground">F1 Score</div>
                    <div className="text-2xl font-semibold">{(analyticsData.modelPerformance.f1Score * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Operational Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded p-3">
                <div className="text-sm text-muted-foreground">Total Operations</div>
                <div className="text-2xl font-semibold">{analyticsData.operationalMetrics.totalOperations.toLocaleString()}</div>
                <div className={`text-xs ${analyticsData.operationalMetrics.operationsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.operationalMetrics.operationsChange > 0 ? '+' : ''}{analyticsData.operationalMetrics.operationsChange}% from previous
                </div>
              </div>
              <div className="bg-muted rounded p-3">
                <div className="text-sm text-muted-foreground">Successful Operations</div>
                <div className="text-2xl font-semibold">{analyticsData.operationalMetrics.successfulOperations.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  {((analyticsData.operationalMetrics.successfulOperations / analyticsData.operationalMetrics.totalOperations) * 100).toFixed(1)}% success rate
                </div>
              </div>
              <div className="bg-muted rounded p-3">
                <div className="text-sm text-muted-foreground">Failed Operations</div>
                <div className="text-2xl font-semibold">{analyticsData.operationalMetrics.failedOperations.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  {((analyticsData.operationalMetrics.failedOperations / analyticsData.operationalMetrics.totalOperations) * 100).toFixed(1)}% failure rate
                </div>
              </div>
              <div className="bg-muted rounded p-3">
                <div className="text-sm text-muted-foreground">Operations Per Second</div>
                <div className="text-2xl font-semibold">{analyticsData.operationalMetrics.operationsPerSecond}</div>
                <div className={`text-xs ${analyticsData.operationalMetrics.responseTimeChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.operationalMetrics.responseTimeChange < 0 ? '' : '+'}{analyticsData.operationalMetrics.responseTimeChange}ms response time
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {detailedMetrics && detailedMetrics.anomalies && detailedMetrics.anomalies.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              System Anomalies Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {detailedMetrics.anomalies.map((anomaly, index) => (
                <div key={index} className="bg-muted p-3 rounded flex items-start gap-3">
                  <div className={`p-2 rounded-full ${anomaly.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{anomaly.metric} anomaly detected</div>
                    <div className="text-sm text-muted-foreground">
                      Expected: {anomaly.expected}, Actual: {anomaly.actual}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(anomaly.timestamp).toLocaleString()}
                      {anomaly.resolved && <span className="ml-2 text-green-500">• Resolved</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {detailedMetrics && detailedMetrics.recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {detailedMetrics.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NeuralAnalytics;
