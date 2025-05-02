import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Activity, AlertTriangle, ArrowLeft, Brain, Calendar, 
  ChevronRight, CpuIcon, LineChart, RefreshCw, Settings 
} from 'lucide-react';
import { PerformanceChart } from '@/components/neural/PerformanceChart';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import { useNeuralAnalyticsDashboard, MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import { Anomaly } from '@/types/analytics';
import { useToast } from '@/hooks/use-toast';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const { toast } = useToast();
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
  
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [refreshIntervalMs, setRefreshIntervalMs] = useState<number>(refreshInterval * 1000);
  
  useEffect(() => {
    if (refreshInterval) {
      setRefreshIntervalMs(refreshInterval * 1000);
    }
  }, [refreshInterval]);
  
  const handleRefreshClick = async () => {
    try {
      await refreshAnalytics();
      toast({
        title: "Analytics refreshed",
        description: "The neural analytics data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not refresh analytics data. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleAnomalyClick = (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
  };
  
  const handleBackFromAnomaly = () => {
    setSelectedAnomaly(null);
  };
  
  // Loading state
  if (loading && !analyticsData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p>Loading neural analytics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-semibold">Failed to load analytics</p>
            <p className="text-sm">{error.toString()}</p>
            <Button variant="outline" className="mt-4" onClick={refreshAnalytics}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If an anomaly is selected, show its details
  if (selectedAnomaly) {
    // Map the Anomaly to the structure expected by AnomalyDetails
    const anomalyForDetails = {
      id: selectedAnomaly.id || 'unknown',
      type: selectedAnomaly.type || 'Unknown',
      severity: (selectedAnomaly.severity as 'low' | 'medium' | 'high' | 'critical') || 'medium',
      message: selectedAnomaly.description || 'No description available',
      timestamp: selectedAnomaly.timestamp || new Date().toISOString(),
      metric: 'System Performance',
      value: 0,
      threshold: 0
    };
    
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="flex items-center mb-4" 
          onClick={handleBackFromAnomaly}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Overview
        </Button>
        <AnomalyDetails anomalies={anomalyForDetails} />
      </div>
    );
  }
  
  // If a specific metric is selected, show its detailed view
  if (selectedMetric) {
    const trendData = getTrendDataForMetric(selectedMetric.key);
    const metricValue = getMetricValue(selectedMetric.key);
    
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 flex items-center gap-1 mb-4"
          onClick={handleBackToOverview}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Overview
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedMetric.title} Details</CardTitle>
              <AutoRefreshControl 
                isPaused={!isAutoRefreshEnabled}
                onPauseToggle={toggleAutoRefresh}
                interval={autoRefreshInterval * 1000}
                onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
                onRefresh={handleRefresh}
              />
            </div>
          </CardHeader>
          <CardContent>
            {selectedMetric.description && (
              <p className="text-muted-foreground mb-4">{selectedMetric.description}</p>
            )}
            
            <PerformanceChart 
              data={trendData} 
              dataKey="date"
              title={`${selectedMetric.title} Trend`}
              onRefresh={handleRefresh}
              lines={[
                {
                  dataKey: "value",
                  name: selectedMetric.title,
                  color: "#0ea5e9",
                  strokeWidth: 2
                }
              ]}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Historical Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">Historical data visualization will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!analyticsData) return null;
  
  return (
    <div className="space-y-8">
      {/* Auto refresh control */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Neural System Analytics</h3>
        </div>
        <div className="flex items-center gap-2">
          <AutoRefreshControl 
            interval={refreshIntervalMs}
            onIntervalChange={(interval) => setRefreshIntervalMs(interval)}
            onRefresh={refreshAnalytics}
            isPaused={!isAutoRefreshEnabled}
            onPauseToggle={toggleAutoRefresh}
          />
          <Button variant="outline" size="sm" onClick={handleRefreshClick} className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={getMetricValue('responseTime').value}
          unit="ms"
          change={getMetricValue('responseTime').change}
          isNegative={true}
          icon={<Activity className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'responseTime',
            title: 'Response Time',
            description: 'Average time taken to respond to requests'
          })}
        />
        
        <DrillableMetricCard
          title="Accuracy"
          value={getMetricValue('accuracy').value}
          unit="%"
          change={getMetricValue('accuracy').change}
          icon={<Brain className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'accuracy',
            title: 'Model Accuracy',
            description: 'Overall model prediction accuracy'
          })}
        />
        
        <DrillableMetricCard
          title="Error Rate"
          value={getMetricValue('errorRate').value}
          unit="%"
          change={getMetricValue('errorRate').change}
          isNegative={true}
          icon={<AlertTriangle className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'errorRate',
            title: 'Error Rate',
            description: 'Percentage of requests resulting in errors'
          })}
        />
        
        <DrillableMetricCard
          title="Operations"
          value={getMetricValue('operations').value}
          unit=""
          change={getMetricValue('operations').change}
          icon={<CpuIcon className="h-4 w-4" />}
          onClick={() => handleDrillDown({
            key: 'operations',
            title: 'Total Operations',
            description: 'Number of neural operations processed'
          })}
        />
      </div>
      
      {/* Performance charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={analyticsData.usageMetrics.dailyUsageTrend} 
              dataKey="date"
              title="System Usage Trend"
              onRefresh={refreshAnalytics}
              lines={[
                { dataKey: 'value', name: 'Usage', color: '#0ea5e9' }
              ]}
              height={350}
            />
          </CardContent>
        </Card>
        
        {/* System metrics & anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={analyticsData.performanceForecast} 
                  dataKey="date"
                  lines={[
                    { 
                      dataKey: "metrics.predictedResponseTime", 
                      name: "Response Time (ms)", 
                      color: "#2563eb" 
                    },
                    { 
                      dataKey: "metrics.confidenceScore", 
                      name: "Confidence", 
                      color: "#16a34a",
                      strokeWidth: 2
                    }
                  ]}
                  height={300}
                  onRefresh={refreshAnalytics}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                  <div className="flex items-center justify-between">
                    <span>System Anomalies</span>
                    {analyticsData.anomalies && analyticsData.anomalies.length > 0 && (
                      <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 text-xs px-2 py-1 rounded-full">
                        {analyticsData.anomalies.length} detected
                      </div>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.anomalies && analyticsData.anomalies.length > 0 ? (
                  <div className="space-y-4">
                    {analyticsData.anomalies.map((anomaly, index) => (
                      <div 
                        key={anomaly.id || `anomaly-${index}`}
                        className="p-3 border border-amber-200 dark:border-amber-800 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/30 cursor-pointer transition-colors"
                        onClick={() => handleAnomalyClick(anomaly)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{anomaly.type || 'Unknown Issue'}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {anomaly.description || 'No details available'}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
                      <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-center">No anomalies detected</p>
                    <p className="text-xs text-center">System operating within normal parameters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralAnalytics;
