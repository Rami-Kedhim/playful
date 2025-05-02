import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import MetricCard from '@/components/analytics/MetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import useNeuralAnalyticsDashboard, { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const {
    analyticsData,
    loading,
    error,
    selectedMetric,
    isAutoRefreshEnabled,
    refreshInterval: dashboardRefreshInterval,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric,
    toggleAutoRefresh,
    changeRefreshInterval,
    refreshAnalytics
  } = useNeuralAnalyticsDashboard();

  const [activeTab, setActiveTab] = useState<string>("overview");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading neural analytics data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="border-red-300">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-medium">Error Loading Analytics</h3>
          </div>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button variant="outline" className="mt-4" onClick={refreshAnalytics}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (!analyticsData) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6">
          <p className="text-center text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }
  
  if (selectedMetric) {
    const metricValue = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={metricValue.value}
        unit={selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : 'ms'}
        change={metricValue.change}
        data={trendData}
        onBack={handleBackToOverview}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Neural System Analytics</h2>
          <p className="text-muted-foreground">Performance metrics and neural processing insights</p>
        </div>
        
        <AutoRefreshControl
          interval={dashboardRefreshInterval * 1000}
          onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
          onRefresh={refreshAnalytics}
          isPaused={!isAutoRefreshEnabled}
          onPauseToggle={toggleAutoRefresh}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <MetricCard
              key="responseTime"
              title="Response Time"
              value={analyticsData.systemMetrics.responseTimeMs}
              change={analyticsData.operationalMetrics.responseTimeChange}
              unit="ms"
              onClick={() => handleDrillDown({
                key: 'responseTime',
                title: 'Neural Response Time',
                description: 'Average processing time for neural operations'
              })}
            />
            
            <MetricCard
              key="accuracy"
              title="Model Accuracy"
              value={analyticsData.modelPerformance.accuracy * 100}
              change={analyticsData.operationalMetrics.accuracyChange}
              unit="%"
              onClick={() => handleDrillDown({
                key: 'accuracy',
                title: 'Model Accuracy',
                description: 'Precision of neural processing results'
              })}
            />
            
            <MetricCard
              key="errorRate"
              title="Error Rate"
              value={analyticsData.systemMetrics.errorRate}
              change={analyticsData.operationalMetrics.errorRateChange}
              unit="%"
              onClick={() => handleDrillDown({
                key: 'errorRate',
                title: 'Error Rate',
                description: 'Percentage of neural operations resulting in errors'
              })}
            />
            
            <MetricCard
              key="operations"
              title="Operations"
              value={analyticsData.operationalMetrics.totalOperations}
              change={analyticsData.operationalMetrics.operationsChange}
              unit=""
              onClick={() => handleDrillDown({
                key: 'operations',
                title: 'Neural Operations',
                description: 'Total number of neural processing operations'
              })}
            />
          </div>
          
          <Separator className="my-6" />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">CPU Utilization</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${analyticsData.systemMetrics.cpuUtilization}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1">{analyticsData.systemMetrics.cpuUtilization}%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Memory Utilization</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${analyticsData.systemMetrics.memoryUtilization}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1">{analyticsData.systemMetrics.memoryUtilization}%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Request Rate</p>
                    <p className="text-lg font-bold">{analyticsData.systemMetrics.requestsPerSecond.toFixed(1)} req/sec</p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium mb-2">System Recommendations</h4>
                    <ul className="space-y-2">
                      {analyticsData.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Health Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be implemented here */}
        <TabsContent value="performance">
          <Card className="mt-6">
            <CardContent className="pt-6">
              <p>Performance data would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies">
          <Card className="mt-6">
            <CardContent className="pt-6">
              <p>Anomaly detection data would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
