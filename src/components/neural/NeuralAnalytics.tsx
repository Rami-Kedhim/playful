
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Separator } from '@/components/ui/separator';
import { Activity, ArrowLeft, BarChart3, Bell, Clock } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import PerformanceChart from '@/components/neural/PerformanceChart';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import { Anomaly } from '@/types/analytics';
import { toast } from '@/components/ui/toast';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);
  const [dateSelection, setDateSelection] = useState<DateRange | undefined>(undefined);
  
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  
  const handleDateSelection = (date: DateRange | undefined) => {
    setDateSelection(date);
  };
  
  const handleRefresh = async () => {
    try {
      await refreshAnalytics();
      toast({
        title: "Analytics refreshed",
        description: "The analytics data has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not refresh analytics data. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const metricDetails: MetricDetail[] = [
    { key: 'responseTime', title: 'Response Time' },
    { key: 'accuracy', title: 'Accuracy' },
    { key: 'errorRate', title: 'Error Rate' },
    { key: 'operations', title: 'Operations' }
  ];
  
  const renderDrillDownView = () => {
    if (!selectedMetric) return null;
    
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToOverview}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
          <h3 className="text-xl font-semibold">{selectedMetric.title} Details</h3>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={trendData}
              dataKey="date"
              lines={[
                { dataKey: 'value', name: selectedMetric.title, color: '#4f46e5' }
              ]}
              height={350}
              title={`${selectedMetric.title} Trend`}
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderAnomalyDetails = () => {
    if (!selectedAnomalyId || !analyticsData) return null;
    
    const anomaly = analyticsData.anomalies.find(a => a.id === selectedAnomalyId);
    
    if (!anomaly) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedAnomalyId(null)}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
          <h3 className="text-xl font-semibold">Anomaly Details</h3>
        </div>
        
        <AnomalyDetails 
          anomalies={{
            id: anomaly.id || '',
            type: anomaly.type || '',
            severity: (anomaly.severity as 'low' | 'medium' | 'high' | 'critical') || 'medium',
            message: anomaly.description || '',
            timestamp: anomaly.timestamp || new Date().toISOString(),
            metric: 'Neural Response Time',
            value: 350,
            threshold: 200,
            suggestedAction: 'Check system load and consider scaling resources'
          }}
        />
      </div>
    );
  };
  
  if (selectedAnomalyId) {
    return renderAnomalyDetails();
  }
  
  if (selectedMetric) {
    return renderDrillDownView();
  }
  
  if (loading || !analyticsData) {
    return <Card className="p-8 flex items-center justify-center"><p>Loading analytics data...</p></Card>;
  }
  
  if (error) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading analytics data</p>
          <Button onClick={refreshAnalytics}>Retry</Button>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Neural Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor and analyze neural processing performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange
            dateRange={dateSelection}
            onUpdate={handleDateSelection}
          />
          
          <AutoRefreshControl 
            interval={refreshInterval * 1000} 
            onIntervalChange={(interval) => console.log('Interval changed:', interval)}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricDetails.map((metric, idx) => {
          const { value, change } = getMetricValue(metric.key);
          
          let unit = '';
          if (metric.key === 'responseTime') unit = 'ms';
          else if (metric.key === 'accuracy' || metric.key === 'errorRate') unit = '%';
          else unit = 'ops';
          
          return (
            <DrillableMetricCard
              key={idx}
              title={metric.title}
              value={value}
              unit={unit}
              change={change}
              isNegative={metric.key === 'errorRate' || metric.key === 'responseTime'}
              onClick={() => handleDrillDown(metric)}
              icon={
                metric.key === 'responseTime' ? <Clock className="h-4 w-4 mr-1.5" /> :
                metric.key === 'accuracy' ? <Activity className="h-4 w-4 mr-1.5" /> :
                metric.key === 'errorRate' ? <Bell className="h-4 w-4 mr-1.5" /> :
                <BarChart3 className="h-4 w-4 mr-1.5" />
              }
            />
          );
        })}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions & Forecasts</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData.performanceForecast}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.predictedResponseTime", name: "Response Time (ms)", color: "#2563eb" },
                  { dataKey: "metrics.expectedLoad", name: "System Load", color: "#16a34a" }
                ]}
                height={350}
                title="System Performance Metrics"
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={analyticsData.performanceForecast}
                  dataKey="date"
                  lines={[
                    { dataKey: "metrics.predictedErrorRate", name: "Error Rate", color: "#dc2626", strokeWidth: 2 }
                  ]}
                  height={250}
                  onRefresh={handleRefresh}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Operational Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Operations</p>
                      <h3 className="text-2xl font-bold">{analyticsData.operationalMetrics.totalOperations.toLocaleString()}</h3>
                      <p className={`text-xs ${analyticsData.operationalMetrics.operationsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {analyticsData.operationalMetrics.operationsChange > 0 ? '+' : ''}{analyticsData.operationalMetrics.operationsChange.toFixed(1)}% from previous period
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <h3 className="text-2xl font-bold">{(analyticsData.operationalMetrics.successfulRequests / analyticsData.operationalMetrics.totalRequests * 100).toFixed(1)}%</h3>
                      <p className="text-xs text-muted-foreground">
                        {analyticsData.operationalMetrics.successfulRequests.toLocaleString()} / {analyticsData.operationalMetrics.totalRequests.toLocaleString()} requests
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                      <h3 className="text-2xl font-bold">{analyticsData.operationalMetrics.averageResponseTime.toFixed(1)} ms</h3>
                      <p className="text-xs text-muted-foreground">p95: {analyticsData.operationalMetrics.p95ResponseTime} ms</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                      <h3 className="text-2xl font-bold">{analyticsData.operationalMetrics.activeConnections.toLocaleString()}</h3>
                      <p className="text-xs text-muted-foreground">{analyticsData.operationalMetrics.requestsPerMinute} req/min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Forecasted Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData.performanceForecast}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.expectedLoad", name: "Load Forecast", color: "#0891b2" },
                  { dataKey: "metrics.predictedResponseTime", name: "Response Time Forecast", color: "#8b5cf6" }
                ]}
                height={350}
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Prediction Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData.performanceForecast}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.confidenceScore", name: "Confidence Score", color: "#f59e0b" }
                ]}
                height={250}
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Detected Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.anomalies.map((anomaly, idx) => (
                    <Card 
                      key={idx} 
                      className="border-yellow-200 cursor-pointer hover:border-yellow-400"
                      onClick={() => setSelectedAnomalyId(anomaly.id)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">{anomaly.type}</h4>
                          <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium
                          ${anomaly.severity === 'low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                        }>
                          {anomaly.severity}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No anomalies detected</p>
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
