
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRange } from 'react-day-picker';
import { Activity, AlertTriangle, AlertCircle, Cpu, BarChart3 } from 'lucide-react';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import PerformanceChart from '@/components/neural/PerformanceChart';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import useNeuralAnalyticsDashboard, { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import { Anomaly } from '@/types/analytics';
import { toast } from '@/components/ui/use-toast';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 60 }) => {
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

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [dateSelection, setDateSelection] = useState<DateRange | undefined>(undefined);

  // Handle date range selection
  const handleDateSelection = (range: DateRange | undefined) => {
    setDateSelection(range);
    if (range?.from) {
      handleDateChange(range.from, range.to);
    }
  };

  // Update refresh interval when prop changes
  useEffect(() => {
    changeRefreshInterval(refreshInterval);
  }, [refreshInterval, changeRefreshInterval]);

  // Handle refresh button click
  const handleRefresh = async () => {
    await refreshAnalytics();
    toast({
      title: "Data refreshed",
      description: "Neural analytics data has been updated.",
    });
  };

  // Handle anomaly selection
  const handleAnomalySelect = (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setActiveTab('anomalies');
  };

  if (error) {
    return (
      <Card className="border-red-300 dark:border-red-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-medium">Error loading neural analytics</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button onClick={refreshAnalytics} className="mt-4" variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If a specific metric is selected, show detailed view
  if (selectedMetric) {
    const { value, change } = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={value}
        unit={selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : 
              selectedMetric.key === 'responseTime' ? 'ms' : ''}
        change={change}
        trendData={trendData}
        onBack={handleBackToOverview}
      />
    );
  }

  // If showing anomaly details
  if (selectedAnomaly && activeTab === 'anomalies') {
    return (
      <AnomalyDetails
        anomaly={selectedAnomaly}
        onBack={() => setSelectedAnomaly(null)}
      />
    );
  }

  // Loading state
  if (loading && !analyticsData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control panel with date range and auto-refresh */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <DatePickerWithRange
              className="w-full md:w-auto"
              dateRange={dateSelection}
              onUpdate={handleDateSelection}
            />
            
            <div className="flex flex-col sm:flex-row gap-2">
              <AutoRefreshControl
                isEnabled={isAutoRefreshEnabled}
                toggleEnabled={toggleAutoRefresh}
                interval={refreshInterval}
                changeInterval={changeRefreshInterval}
              />
              <Button onClick={handleRefresh} variant="outline" size="sm" className="ml-auto sm:ml-0">
                Refresh Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main analytics content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>
        
        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DrillableMetricCard
              title="Response Time"
              value={analyticsData?.systemMetrics.responseTimeMs || 0}
              unit="ms"
              change={analyticsData?.operationalMetrics.responseTimeChange || 0}
              icon={<Activity className="h-4 w-4 mr-2" />}
              isNegative={true}
              onClick={() => handleDrillDown({
                key: 'responseTime',
                title: 'Neural Response Time',
                description: 'Average time taken to process requests'
              })}
            />
            
            <DrillableMetricCard
              title="Accuracy"
              value={analyticsData?.modelPerformance.accuracy * 100 || 0}
              unit="%"
              change={analyticsData?.operationalMetrics.accuracyChange || 0}
              icon={<Cpu className="h-4 w-4 mr-2" />}
              onClick={() => handleDrillDown({
                key: 'accuracy',
                title: 'Neural Accuracy',
                description: 'Overall accuracy of neural processing'
              })}
            />
            
            <DrillableMetricCard
              title="Error Rate"
              value={analyticsData?.systemMetrics.errorRate || 0}
              unit="%"
              change={analyticsData?.operationalMetrics.errorRateChange || 0}
              icon={<AlertTriangle className="h-4 w-4 mr-2" />}
              isNegative={true}
              onClick={() => handleDrillDown({
                key: 'errorRate',
                title: 'Error Rate',
                description: 'Percentage of requests resulting in errors'
              })}
            />
            
            <DrillableMetricCard
              title="Operations"
              value={analyticsData?.operationalMetrics.totalOperations || 0}
              unit=""
              change={analyticsData?.operationalMetrics.operationsChange || 0}
              icon={<BarChart3 className="h-4 w-4 mr-2" />}
              onClick={() => handleDrillDown({
                key: 'operations',
                title: 'Neural Operations',
                description: 'Total number of neural operations processed'
              })}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Neural System Performance</CardTitle>
              <CardDescription>
                Real-time performance metrics for neural processing systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData?.performanceForecast || []}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.expectedLoad", name: "Load", color: "#8884d8" },
                  { dataKey: "metrics.predictedResponseTime", name: "Response Time", color: "#82ca9d" }
                ]}
                height={300}
                title="System Performance Trends"
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Performance Metrics</CardTitle>
              <CardDescription>
                Detailed performance analytics for neural models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm font-medium mb-2">Precision</div>
                  <div className="text-2xl font-bold">{(analyticsData?.modelPerformance.precision * 100 || 0).toFixed(1)}%</div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm font-medium mb-2">Recall</div>
                  <div className="text-2xl font-bold">{(analyticsData?.modelPerformance.recall * 100 || 0).toFixed(1)}%</div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm font-medium mb-2">F1 Score</div>
                  <div className="text-2xl font-bold">{(analyticsData?.modelPerformance.f1Score * 100 || 0).toFixed(1)}%</div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm font-medium mb-2">Throughput</div>
                  <div className="text-2xl font-bold">{analyticsData?.modelPerformance.throughput || 0}/s</div>
                </div>
              </div>
              
              <PerformanceChart 
                data={analyticsData?.performanceForecast || []}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.predictedErrorRate", name: "Error Rate", color: "#ff6b6b" },
                  { dataKey: "metrics.confidenceScore", name: "Confidence", color: "#5c6bc0" }
                ]}
                height={300}
                onRefresh={refreshAnalytics}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Anomalies tab */}
        <TabsContent value="anomalies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detected Anomalies</CardTitle>
              <CardDescription>
                System anomalies detected in neural processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsData?.anomalies && analyticsData.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.anomalies.map((anomaly, index) => (
                    <div 
                      key={anomaly.id || index} 
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleAnomalySelect(anomaly)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            anomaly.severity === 'high' ? 'bg-red-100 text-red-700' :
                            anomaly.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{anomaly.type}</h4>
                            <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          {anomaly.timestamp ? new Date(anomaly.timestamp).toLocaleString() : 'Unknown time'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-fit mb-4">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No anomalies detected</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    All neural systems are functioning within expected parameters
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Forecasts tab */}
        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Neural System Forecasts</CardTitle>
              <CardDescription>
                Predictive analytics for future system performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PerformanceChart 
                data={analyticsData?.performanceForecast || []}
                dataKey="date"
                lines={[
                  { dataKey: "metrics.expectedLoad", name: "Expected Load", color: "#8884d8" },
                  { dataKey: "metrics.predictedResponseTime", name: "Predicted Response Time", color: "#82ca9d" },
                  { dataKey: "metrics.predictedErrorRate", name: "Predicted Error Rate", color: "#ff6b6b", strokeWidth: 1 }
                ]}
                height={300}
                title="7-Day Performance Forecast"
                onRefresh={refreshAnalytics}
              />
              
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">System Recommendations</h4>
                <div className="space-y-2">
                  {analyticsData?.recommendations.length ? (
                    analyticsData.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2 pb-2 border-b last:border-0">
                        <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                          <Cpu className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recommendations at this time.</p>
                  )}
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
