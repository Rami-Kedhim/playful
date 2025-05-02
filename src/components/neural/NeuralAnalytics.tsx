
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  BarChart3, 
  Brain, 
  Clock, 
  LineChart, 
  Loader2, 
  Percent, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import PerformanceChart from '@/components/neural/PerformanceChart';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import useNeuralAnalyticsDashboard, { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
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
    isAutoRefreshEnabled,
    refreshInterval: autoRefreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();
  
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  
  // Auto-refresh on component mount or when interval changes
  useEffect(() => {
    refreshAnalytics();
  }, [refreshInterval]);
  
  const handleRefresh = async () => {
    try {
      await refreshAnalytics();
      toast({
        title: "Refreshed",
        description: "Analytics data has been updated.",
      });
    } catch (err) {
      toast({
        title: "Refresh failed",
        description: "Could not update analytics data.",
        variant: "destructive",
      });
    }
  };
  
  // Format dates for display
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM dd, HH:mm');
  };
  
  if (loading && !analyticsData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading neural analytics data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="text-lg font-semibold">Failed to load analytics data</h3>
            <p className="text-muted-foreground mb-4">{error.toString()}</p>
            <Button onClick={refreshAnalytics}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Show anomaly details when selected
  if (selectedAnomaly) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 flex items-center gap-1 mb-4"
          onClick={() => setSelectedAnomaly(null)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Analytics
        </Button>
        
        <AnomalyDetails anomalies={selectedAnomaly} />
      </div>
    );
  }
  
  // Show detailed metric view when selected
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
  
  // Main dashboard view
  return (
    <div className="space-y-6">
      {analyticsData && (
        <>
          {/* Header with refresh controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Neural System Analytics</h2>
              <p className="text-muted-foreground">
                Last updated: {formatDate(analyticsData.timestamp)}
              </p>
            </div>
            
            <AutoRefreshControl 
              isPaused={!isAutoRefreshEnabled}
              onPauseToggle={toggleAutoRefresh}
              interval={autoRefreshInterval * 1000}
              onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
              onRefresh={handleRefresh}
            />
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DrillableMetricCard
              title="Response Time"
              value={getMetricValue('responseTime').value}
              change={getMetricValue('responseTime').change}
              unit="ms"
              icon={<Clock className="h-4 w-4 mr-2" />}
              isNegative={true}
              onClick={() => handleDrillDown({
                key: 'responseTime',
                title: 'Response Time',
                description: 'Average time it takes for the neural system to process a request and return a response.'
              })}
            />
            
            <DrillableMetricCard
              title="Accuracy"
              value={getMetricValue('accuracy').value}
              change={getMetricValue('accuracy').change}
              unit="%"
              icon={<Percent className="h-4 w-4 mr-2" />}
              onClick={() => handleDrillDown({
                key: 'accuracy',
                title: 'Accuracy',
                description: 'Overall accuracy of neural system predictions and processing.'
              })}
            />
            
            <DrillableMetricCard
              title="Error Rate"
              value={getMetricValue('errorRate').value}
              change={getMetricValue('errorRate').change}
              unit="%"
              icon={<AlertTriangle className="h-4 w-4 mr-2" />}
              isNegative={true}
              onClick={() => handleDrillDown({
                key: 'errorRate',
                title: 'Error Rate',
                description: 'Percentage of requests that resulted in errors or failed processing.'
              })}
            />
            
            <DrillableMetricCard
              title="Operations"
              value={getMetricValue('operations').value}
              change={getMetricValue('operations').change}
              unit="ops"
              icon={<BarChart3 className="h-4 w-4 mr-2" />}
              onClick={() => handleDrillDown({
                key: 'operations',
                title: 'Operations',
                description: 'Total number of neural operations processed by the system.'
              })}
            />
          </div>
          
          {/* Performance chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Neural System Performance</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={analyticsData.performanceForecast} 
                dataKey="date"
                lines={[
                  {
                    dataKey: "metrics.predictedResponseTime",
                    name: "Response Time (ms)",
                    color: "#0ea5e9",
                    strokeWidth: 2
                  },
                  {
                    dataKey: "metrics.expectedLoad",
                    name: "Expected Load",
                    color: "#f97316",
                    strokeWidth: 2
                  }
                ]}
                height={300}
              />
            </CardContent>
          </Card>
          
          {/* Tabs for additional analytics views */}
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 md:w-[400px] mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>Models</span>
              </TabsTrigger>
              <TabsTrigger value="anomalies" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span>Anomalies</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Resource Utilization</h4>
                      <div className="h-60 flex items-center justify-center bg-muted/30 rounded-md">
                        <p className="text-muted-foreground">Resource utilization chart will appear here</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">System Availability</h4>
                      <div className="h-60 flex items-center justify-center bg-muted/30 rounded-md">
                        <p className="text-muted-foreground">System availability chart will appear here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle>Neural Model Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                          <h3 className="text-sm font-medium">Primary Model</h3>
                          <div className="text-2xl font-bold mt-2">{(analyticsData.modelPerformance.accuracy * 100).toFixed(1)}%</div>
                          <p className="text-xs text-muted-foreground mt-1">Accuracy rate</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                          <h3 className="text-sm font-medium">Secondary Model</h3>
                          <div className="text-2xl font-bold mt-2">{(analyticsData.modelPerformance.accuracy * 0.95).toFixed(1)}%</div>
                          <p className="text-xs text-muted-foreground mt-1">Accuracy rate</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                          <h3 className="text-sm font-medium">Tertiary Model</h3>
                          <div className="text-2xl font-bold mt-2">{(analyticsData.modelPerformance.accuracy * 0.92).toFixed(1)}%</div>
                          <p className="text-xs text-muted-foreground mt-1">Accuracy rate</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-60 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">Model training progress will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle>Detected Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsData.anomalies && analyticsData.anomalies.length > 0 ? (
                    <div className="space-y-4">
                      {analyticsData.anomalies.map((anomaly) => (
                        <Card 
                          key={anomaly.id} 
                          className="border-amber-200 dark:border-amber-800/40 cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                          onClick={() => setSelectedAnomaly(anomaly)}
                        >
                          <CardContent className="p-4 flex gap-3 items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <div>
                              <div className="font-medium">{anomaly.type}</div>
                              <div className="text-sm text-muted-foreground">{anomaly.description}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {new Date(anomaly.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium">No anomalies detected</h3>
                      <p className="text-muted-foreground">The neural system is operating within normal parameters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default NeuralAnalytics;
