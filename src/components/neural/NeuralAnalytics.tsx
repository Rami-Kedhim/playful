
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Zap, Clock, AlertTriangle, CheckCircle, Activity, LucideProps, Brain, Cpu, BarChart3, PieChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    dateRange,
    handleDateChange,
    isAutoRefreshEnabled,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();

  // Set up auto-refresh
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (isAutoRefreshEnabled && refreshInterval > 0) {
      intervalId = setInterval(() => {
        refreshAnalytics();
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRefreshEnabled, refreshInterval, refreshAnalytics]);

  // Format data for charts
  const formatChartData = useCallback((data: any) => {
    if (!data) return [];
    return data.map((item: any) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString(),
    }));
  }, []);

  // Handle date range selection
  const handleDateRangeChange = useCallback((range: { from: Date; to: Date }) => {
    if (range.from && range.to) {
      handleDateChange(range.from, range.to);
    }
  }, [handleDateChange]);

  // Helper for metric cards
  const renderMetricCard = (
    metricKey: 'responseTime' | 'accuracy' | 'errorRate' | 'operations',
    title: string,
    unit: string,
    icon: React.ReactNode,
    isNegative: boolean = false
  ) => {
    const data = getMetricValue(metricKey);
    
    return (
      <DrillableMetricCard
        title={title}
        value={data.value}
        unit={unit}
        change={data.change}
        metricKey={metricKey}
        onDrillDown={handleDrillDown}
        icon={icon}
        isNegative={isNegative}
      />
    );
  };

  // Show loading state
  if (loading && !analyticsData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <Brain className="h-12 w-12 text-primary/30" />
              <p className="mt-2 text-muted-foreground">Loading neural analytics...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="w-full border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
            <h3 className="text-lg font-medium">Failed to load neural analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
            <Button onClick={refreshAnalytics} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If we're showing a specific metric detail
  if (selectedMetric) {
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToOverview}
              className="mb-2"
            >
              ← Back to Overview
            </Button>
            <CardTitle>{selectedMetric.title} Analysis</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshAnalytics}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">{selectedMetric.title} Trend</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          name={selectedMetric.title} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedMetric.key === 'errorRate' && analyticsData?.anomalies?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Detected Anomalies</h3>
                <div className="grid gap-4">
                  {analyticsData.anomalies.map((anomaly: any) => (
                    <AnomalyDetails 
                      key={anomaly.id} 
                      anomalies={anomaly} 
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{selectedMetric.description}</p>
                  
                  {selectedMetric.key === 'responseTime' && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Average Response Time</span>
                          <span className="text-2xl font-bold">
                            {analyticsData?.systemMetrics?.responseTimeMs}ms
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">99th Percentile</span>
                          <span className="text-2xl font-bold">
                            {analyticsData?.systemMetrics?.p99ResponseTime}ms
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedMetric.key === 'accuracy' && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Model Accuracy</span>
                          <span className="text-2xl font-bold">
                            {(analyticsData?.modelPerformance?.accuracy * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Precision</span>
                          <span className="text-2xl font-bold">
                            {(analyticsData?.modelPerformance?.precision * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main dashboard view
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Neural System Dashboard</CardTitle>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Auto-refresh:</span>
              <Switch checked={isAutoRefreshEnabled} onCheckedChange={toggleAutoRefresh} />
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                value={String(refreshInterval)}
                onValueChange={(val) => changeRefreshInterval(Number(val))}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Refresh Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Every 10s</SelectItem>
                  <SelectItem value="30">Every 30s</SelectItem>
                  <SelectItem value="60">Every 1m</SelectItem>
                  <SelectItem value="300">Every 5m</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm" onClick={refreshAnalytics}>
              Refresh Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <DatePickerWithRange 
                onChange={handleDateRangeChange} 
                className="w-auto" 
              />
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">
                Last updated: {analyticsData?.lastUpdated ? 
                  new Date(analyticsData.lastUpdated).toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {renderMetricCard('responseTime', 'Response Time', 'ms', <Clock className="h-4 w-4" />)}
            {renderMetricCard('accuracy', 'Accuracy', '%', <CheckCircle className="h-4 w-4" />)}
            {renderMetricCard('errorRate', 'Error Rate', '%', <AlertTriangle className="h-4 w-4" />, true)}
            {renderMetricCard('operations', 'Operations', '', <Activity className="h-4 w-4" />)}
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="utilization" className="flex items-center gap-1">
                <Cpu className="h-4 w-4" />
                <span>Utilization</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Trends</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Response Time Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formatChartData(analyticsData?.performanceTrend)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="responseTime" 
                            stroke="#8884d8" 
                            name="Response Time (ms)" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Error Rate Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formatChartData(analyticsData?.performanceTrend)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="errorRate" 
                            stroke="#ff8042" 
                            name="Error Rate (%)" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="utilization">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">CPU & Memory Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formatChartData(analyticsData?.utilizationTrend)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="cpuUsage" 
                            stroke="#8884d8" 
                            name="CPU Usage (%)" 
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="memoryUsage" 
                            stroke="#82ca9d" 
                            name="Memory Usage (%)" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Request Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formatChartData(analyticsData?.utilizationTrend)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="requestCount" 
                            fill="#8884d8" 
                            name="Requests" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Performance Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formatChartData(analyticsData?.performanceForecast)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="metrics.predictedResponseTime" 
                            stroke="#8884d8" 
                            name="Predicted Response Time" 
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="metrics.predictedErrorRate" 
                            stroke="#ff8042" 
                            name="Predicted Error Rate" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Expected Load</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formatChartData(analyticsData?.performanceForecast)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="metrics.expectedLoad" 
                            fill="#82ca9d" 
                            name="Expected Load" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {analyticsData?.recommendations?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {analyticsData.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Brain className="h-5 w-5 text-primary mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          
          {analyticsData?.anomalies?.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Detected Anomalies</h3>
                <Button variant="outline" size="sm">
                  View All Anomalies
                </Button>
              </div>
              
              <div className="space-y-4">
                {analyticsData.anomalies.slice(0, 2).map((anomaly: any) => (
                  <AnomalyDetails 
                    key={anomaly.id}
                    anomalies={anomaly}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralAnalytics;
