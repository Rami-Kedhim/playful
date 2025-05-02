
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ArrowUpRight, Brain, Clock, BarChart2, Activity, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const NeuralAnalytics: React.FC = () => {
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // in seconds
  const [selectedMetricTab, setSelectedMetricTab] = useState<string>("system");
  const [activeAnomalies, setActiveAnomalies] = useState<any[]>([]);
  
  // Auto-refresh logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (isAutoRefreshEnabled && refreshInterval > 0) {
      intervalId = setInterval(() => {
        refreshAnalytics();
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoRefreshEnabled, refreshInterval, refreshAnalytics]);
  
  // Extract relevant anomalies from the data
  useEffect(() => {
    if (detailedMetrics?.anomalies) {
      setActiveAnomalies(detailedMetrics.anomalies.filter(a => !a.resolved));
    }
  }, [detailedMetrics]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle acknowledging an anomaly
  const handleAcknowledgeAnomaly = (id: string) => {
    setActiveAnomalies(prev => prev.filter(a => a.id !== id));
    toast.success("Anomaly acknowledged and will be resolved");
  };

  // Handle drill down into metrics
  const handleDrillDown = (metric: any) => {
    setSelectedMetricTab("detailed");
    toast.info(`Showing detailed analysis for ${metric.title}`);
  };

  // Extract and format metric values properly
  const getMetricValue = (metricKey: string): number => {
    if (!analyticsData) return 0;
    
    switch(metricKey) {
      case 'responseTime':
        return analyticsData.systemMetrics.responseTimeMs;
      case 'accuracy':
        return analyticsData.modelPerformance.accuracy * 100;
      case 'errorRate':
        return analyticsData.systemMetrics.errorRate;
      case 'operations':
        return analyticsData.operationalMetrics.totalOperations;
      default:
        return 0;
    }
  };

  // Extract and format metric change values
  const getMetricChange = (metricKey: string): number => {
    if (!analyticsData) return 0;
    
    switch(metricKey) {
      case 'responseTime':
        return analyticsData.operationalMetrics.responseTimeChange;
      case 'accuracy':
        return analyticsData.operationalMetrics.accuracyChange;
      case 'errorRate':
        return analyticsData.operationalMetrics.errorRateChange;
      case 'operations':
        return analyticsData.operationalMetrics.operationsChange;
      default:
        return 0;
    }
  };
  
  // Format time series data for charts
  const formatTimeSeriesData = (data: any[]) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      time: formatDate(item.timestamp),
      value: item.metrics.cpuUsage
    }));
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <Brain className="h-12 w-12 text-primary animate-pulse" />
              <p className="mt-4 text-muted-foreground">Loading neural analytics...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <p className="mt-4 text-destructive font-semibold">Error loading neural analytics</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
              <Button variant="outline" className="mt-4" onClick={refreshAnalytics}>
                Retry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-center">
              <p className="text-muted-foreground">No data available</p>
              <Button variant="outline" className="mt-4" onClick={refreshAnalytics}>
                Load Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Neural System Analytics</h2>
          <p className="text-muted-foreground">
            Last updated: {new Date(analyticsData.timestamp).toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-refresh" 
                checked={isAutoRefreshEnabled}
                onCheckedChange={setIsAutoRefreshEnabled}
              />
              <label 
                htmlFor="auto-refresh" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Auto-refresh
              </label>
            </div>

            <Select 
              value={refreshInterval.toString()} 
              onValueChange={(value) => setRefreshInterval(parseInt(value))}
              disabled={!isAutoRefreshEnabled}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Refresh rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Every 10s</SelectItem>
                <SelectItem value="30">Every 30s</SelectItem>
                <SelectItem value="60">Every 1m</SelectItem>
                <SelectItem value="300">Every 5m</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="icon" onClick={refreshAnalytics}>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={getMetricValue('responseTime')}
          unit="ms"
          change={getMetricChange('responseTime')}
          metricKey="responseTime"
          description="Neural system response time metrics and trends"
          onDrillDown={handleDrillDown}
          icon={<Clock className="h-4 w-4" />}
          isNegative={true}
        />
        
        <DrillableMetricCard
          title="Accuracy"
          value={getMetricValue('accuracy')}
          unit="%"
          change={getMetricChange('accuracy')}
          metricKey="accuracy"
          description="Model accuracy performance and trends"
          onDrillDown={handleDrillDown}
          icon={<Brain className="h-4 w-4" />}
        />
        
        <DrillableMetricCard
          title="Error Rate"
          value={getMetricValue('errorRate')}
          unit="%"
          change={getMetricChange('errorRate')}
          metricKey="errorRate"
          description="System error rate metrics and anomalies"
          onDrillDown={handleDrillDown}
          icon={<AlertTriangle className="h-4 w-4" />}
          isNegative={true}
        />
        
        <DrillableMetricCard
          title="Operations"
          value={getMetricValue('operations')}
          unit=""
          change={getMetricChange('operations')}
          metricKey="operations"
          description="Total neural processing operations"
          onDrillDown={handleDrillDown}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="system" value={selectedMetricTab} onValueChange={setSelectedMetricTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="system">System Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="anomalies">
              Anomalies
              {activeAnomalies.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeAnomalies.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="detailed">Detailed Metrics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="system" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health Status</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${analyticsData.systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      <p className="font-semibold capitalize">{analyticsData.systemHealth.status}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-right">
                    <p className="text-sm font-medium">Uptime</p>
                    <p className="font-semibold">{analyticsData.systemHealth.uptimeHours} hours</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">System Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">CPU Usage</p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{analyticsData.systemMetrics.cpuUsage}%</p>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${analyticsData.systemMetrics.cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Memory Usage</p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{analyticsData.systemMetrics.memoryUsage}%</p>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${analyticsData.systemMetrics.memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Operational Summary</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Successful Operations</p>
                    <p className="text-xl font-bold">
                      {analyticsData.operationalMetrics.successfulOperations.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({Math.round(analyticsData.operationalMetrics.successfulOperations / analyticsData.operationalMetrics.totalOperations * 100)}%)
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Failed Operations</p>
                    <p className="text-xl font-bold">
                      {analyticsData.operationalMetrics.failedOperations.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({Math.round(analyticsData.operationalMetrics.failedOperations / analyticsData.operationalMetrics.totalOperations * 100)}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.performanceForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={formatDate}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value: any) => [`${typeof value === 'number' ? value.toFixed(2) : value}`, '']}
                        labelFormatter={(label: string) => formatDate(label)}
                      />
                      <Line 
                        type="monotone" 
                        name="Expected Load" 
                        dataKey="metrics.predictedLoad" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        name="Response Time" 
                        dataKey="metrics.predictedResponseTime" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-2xl font-bold">{(analyticsData.modelPerformance.accuracy * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precision</p>
                    <p className="text-2xl font-bold">{(analyticsData.modelPerformance.precision * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recall</p>
                    <p className="text-2xl font-bold">{(analyticsData.modelPerformance.recall * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                    <p className="text-2xl font-bold">{(analyticsData.modelPerformance.f1Score * 100).toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium mb-3">Performance Trend</p>
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: `${analyticsData.modelPerformance.accuracy * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailedMetrics?.timeSeriesData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={formatDate}
                    />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip labelFormatter={(label) => formatDate(label)} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="metrics.cpuUsage" 
                      name="CPU Usage" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="metrics.memoryUsage" 
                      name="Memory Usage" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="metrics.responseTimeMs" 
                      name="Response Time (ms)" 
                      stroke="#ff7300" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="metrics.errorRate" 
                      name="Error Rate (%)" 
                      stroke="#ff0000" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="mt-6">
          <AnomalyDetails
            anomalies={activeAnomalies}
            onAcknowledge={handleAcknowledgeAnomaly}
          />
        </TabsContent>
        
        <TabsContent value="detailed" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {detailedMetrics && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4">System Recommendations</h3>
                    <ul className="space-y-2 pl-6 list-disc">
                      {detailedMetrics.recommendations.map((rec, i) => (
                        <li key={i} className="text-muted-foreground">{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Trends Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">CPU Trend</p>
                        <p className="font-medium capitalize">{detailedMetrics.trendsAnalysis.cpuTrend}</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">Memory Trend</p>
                        <p className="font-medium capitalize">{detailedMetrics.trendsAnalysis.memoryTrend}</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">Response Trend</p>
                        <p className="font-medium capitalize">{detailedMetrics.trendsAnalysis.responseTrend}</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">Error Rate Trend</p>
                        <p className="font-medium capitalize">{detailedMetrics.trendsAnalysis.errorRateTrend}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
