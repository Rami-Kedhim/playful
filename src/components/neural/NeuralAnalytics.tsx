
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, Check, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30000 }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const { 
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(true);
  const [currentInterval, setCurrentInterval] = useState<number>(refreshInterval);

  // Auto refresh effect
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isAutoRefreshEnabled && currentInterval > 0) {
      intervalId = window.setInterval(() => {
        refreshAnalytics();
      }, currentInterval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRefreshEnabled, currentInterval, refreshAnalytics]);

  const handleManualRefresh = () => {
    refreshAnalytics();
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefreshEnabled(prev => !prev);
  };

  const changeRefreshInterval = (interval: number) => {
    setCurrentInterval(interval);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !analyticsData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading neural analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error loading analytics data</AlertTitle>
        <AlertDescription>
          Failed to load neural system analytics. Please try again later.
        </AlertDescription>
        <Button variant="outline" size="sm" onClick={refreshAnalytics} className="mt-2">
          Retry
        </Button>
      </Alert>
    );
  }
  
  // When a specific metric is selected for drill-down
  if (selectedMetric) {
    return (
      <DetailedMetricView
        metric={selectedMetric}
        data={getTrendDataForMetric(selectedMetric.key)}
        value={getMetricValue(selectedMetric.key)}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Activity className="mr-2 h-5 w-5 text-primary" />
            Neural System Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor performance metrics and neural system health
          </p>
        </div>
        
        <AutoRefreshControl
          interval={currentInterval}
          onIntervalChange={changeRefreshInterval}
          onRefresh={handleManualRefresh}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={analyticsData?.systemMetrics?.responseTimeMs || 0}
          unit="ms"
          change={analyticsData?.operationalMetrics?.responseTimeChange || 0}
          icon={<Clock className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'responseTime',
            title: 'Response Time',
            description: 'Average time to process neural operations'
          })}
        />
        
        <DrillableMetricCard
          title="Accuracy"
          value={(analyticsData?.modelPerformance?.accuracy * 100) || 0}
          unit="%"
          change={analyticsData?.operationalMetrics?.accuracyChange || 0}
          icon={<Check className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'accuracy',
            title: 'Neural Accuracy',
            description: 'Precision of neural processing operations'
          })}
        />
        
        <DrillableMetricCard
          title="Error Rate"
          value={analyticsData?.systemMetrics?.errorRate || 0}
          unit="%"
          change={analyticsData?.operationalMetrics?.errorRateChange || 0}
          isNegative={true}
          icon={<AlertTriangle className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'errorRate',
            title: 'Error Rate',
            description: 'Failed operations percentage'
          })}
        />
        
        <DrillableMetricCard
          title="Operations"
          value={analyticsData?.operationalMetrics?.totalOperations || 0}
          unit=""
          change={analyticsData?.operationalMetrics?.operationsChange || 0}
          icon={<Zap className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'operations',
            title: 'Total Operations',
            description: 'Volume of neural processing operations'
          })}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neural Processing Performance</CardTitle>
              <CardDescription>System efficiency and response metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData?.performanceForecast || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      minTickGap={30}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value) => [`${value}`, '']}
                      labelFormatter={(label) => formatDate(label as string)}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="metrics.predictedResponseTime" 
                      stroke="#8884d8" 
                      name="Response Time (ms)" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="metrics.expectedLoad" 
                      stroke="#82ca9d" 
                      name="Load" 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey={(d) => (1 - d.metrics.predictedErrorRate) * 100} 
                      stroke="#ff7300" 
                      name="Accuracy (%)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">{analyticsData?.systemMetrics?.cpuUsage || 0}%</span>
                    </div>
                    <Progress value={analyticsData?.systemMetrics?.cpuUsage || 0} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">{analyticsData?.systemMetrics?.memoryUsage || 0}%</span>
                    </div>
                    <Progress value={analyticsData?.systemMetrics?.memoryUsage || 0} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: 'Accuracy',
                          value: (analyticsData?.modelPerformance?.accuracy || 0) * 100
                        },
                        {
                          name: 'Precision',
                          value: (analyticsData?.modelPerformance?.precision || 0) * 100
                        },
                        {
                          name: 'Recall',
                          value: (analyticsData?.modelPerformance?.recall || 0) * 100
                        },
                        {
                          name: 'F1 Score',
                          value: (analyticsData?.modelPerformance?.f1Score || 0) * 100
                        }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, '']} />
                      <Bar dataKey="value" fill="#8884d8" name="Score (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neural Operations Metrics</CardTitle>
              <CardDescription>Processing volume and success rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Operations</p>
                  <p className="text-2xl font-bold mt-1">
                    {analyticsData?.operationalMetrics?.totalOperations?.toLocaleString() || 0}
                  </p>
                  <p className={`text-xs mt-2 ${analyticsData?.operationalMetrics?.operationsChange && analyticsData?.operationalMetrics?.operationsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData?.operationalMetrics?.operationsChange && analyticsData?.operationalMetrics?.operationsChange > 0 ? '+' : ''}
                    {analyticsData?.operationalMetrics?.operationsChange || 0}% from last period
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold mt-1">
                    {analyticsData?.operationalMetrics?.successfulOperations && analyticsData?.operationalMetrics?.totalOperations
                      ? ((analyticsData?.operationalMetrics?.successfulOperations / analyticsData?.operationalMetrics?.totalOperations) * 100).toFixed(1)
                      : 0}%
                  </p>
                  <p className="text-xs mt-2 text-green-500">
                    {analyticsData?.operationalMetrics?.successfulOperations?.toLocaleString() || 0} successful
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Failed Operations</p>
                  <p className="text-2xl font-bold mt-1">
                    {analyticsData?.operationalMetrics?.failedOperations?.toLocaleString() || 0}
                  </p>
                  <p className="text-xs mt-2 text-red-500">
                    {analyticsData?.operationalMetrics?.errorRate?.toFixed(2) || 0}% error rate
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold mt-1">
                    {analyticsData?.operationalMetrics?.averageResponseTime?.toFixed(0) || 0}ms
                  </p>
                  <p className={`text-xs mt-2 ${analyticsData?.operationalMetrics?.responseTimeChange && analyticsData?.operationalMetrics?.responseTimeChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData?.operationalMetrics?.responseTimeChange && analyticsData?.operationalMetrics?.responseTimeChange < 0 ? '' : '+'}
                    {analyticsData?.operationalMetrics?.responseTimeChange?.toFixed(1) || 0}% from last period
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Historical Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={detailedMetrics?.timeSeriesData || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp"
                      tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="metrics.requestsPerSecond" stroke="#8884d8" name="Requests/s" />
                    <Line type="monotone" dataKey="metrics.responseTimeMs" stroke="#82ca9d" name="Response Time (ms)" />
                    <Line type="monotone" dataKey={(d) => d.metrics.errorRate * 100} stroke="#ff7300" name="Error Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Detected Anomalies</CardTitle>
                <CardDescription>Unusual patterns in neural system behavior</CardDescription>
              </div>
              <Badge variant={detailedMetrics?.anomalies?.length ? "destructive" : "outline"}>
                {detailedMetrics?.anomalies?.length || 0} Anomalies
              </Badge>
            </CardHeader>
            <CardContent>
              {detailedMetrics?.anomalies?.length ? (
                <div className="space-y-4">
                  {detailedMetrics.anomalies.map((anomaly, index) => (
                    <AnomalyDetails key={index} anomaly={anomaly} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 bg-muted/30 rounded-lg">
                  <Check className="h-10 w-10 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">No anomalies detected</h3>
                  <p className="text-muted-foreground text-sm mt-1">All systems operating within normal parameters</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {detailedMetrics?.recommendations?.length ? (
                  detailedMetrics.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 border rounded-md flex gap-2">
                      <Zap className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <p>{rec}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-muted/30 rounded-md text-center">
                    <p className="text-muted-foreground">No recommendations available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Health Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">System Trends</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 border rounded-md">
                      <p className="text-xs text-muted-foreground">CPU Trend</p>
                      <p className="font-medium capitalize">{detailedMetrics?.trendsAnalysis?.cpuTrend || "stable"}</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-xs text-muted-foreground">Memory Trend</p>
                      <p className="font-medium capitalize">{detailedMetrics?.trendsAnalysis?.memoryTrend || "stable"}</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-xs text-muted-foreground">Response Trend</p>
                      <p className="font-medium capitalize">{detailedMetrics?.trendsAnalysis?.responseTrend || "stable"}</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-xs text-muted-foreground">Error Rate Trend</p>
                      <p className="font-medium capitalize">{detailedMetrics?.trendsAnalysis?.errorRateTrend || "stable"}</p>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">System Health Status</h4>
                  <div className={`p-4 rounded-md ${
                    analyticsData?.systemHealth?.status === 'healthy' ? 'bg-green-50 border-green-200' :
                    analyticsData?.systemHealth?.status === 'warning' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {analyticsData?.systemHealth?.status === 'healthy' ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                      <p className="font-medium capitalize">
                        {analyticsData?.systemHealth?.status || "Unknown"}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      System uptime: {analyticsData?.systemHealth?.uptimeHours || 0} hours
                    </p>
                    <p className="text-xs mt-2">
                      Last maintenance: {analyticsData?.systemHealth?.lastMaintenanceDate ? 
                        new Date(analyticsData.systemHealth.lastMaintenanceDate).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
