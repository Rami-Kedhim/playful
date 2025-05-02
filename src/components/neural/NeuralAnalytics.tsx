
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Activity, AlertTriangle, ArrowLeft, LineChart, RefreshCcw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import PerformanceChart from '@/components/neural/PerformanceChart';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { Anomaly } from '@/types/analytics';
import { useToast } from '@/hooks/use-toast';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const { 
    analyticsData, 
    loading, 
    error, 
    refreshAnalytics, 
    isAutoRefreshEnabled, 
    toggleAutoRefresh,
    refreshInterval: autoRefreshIntervalSecs,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();

  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const { toast } = useToast();
  
  const handleRefresh = useCallback(() => {
    refreshAnalytics();
    toast({
      title: "Analytics Refreshed",
      description: "Neural analytics data has been updated",
      variant: "success"
    });
  }, [refreshAnalytics, toast]);
  
  // Go back to main view from anomaly detail
  const handleBackFromAnomaly = () => {
    setSelectedAnomaly(null);
  };
  
  // Show anomaly details
  const handleViewAnomaly = (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
  };
  
  if (loading && !analyticsData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div role="status">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium">Loading analytics data...</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium">Error Loading Data</h3>
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Show anomaly detail view
  if (selectedAnomaly) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleBackFromAnomaly} className="mb-4 -ml-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analytics
        </Button>
        <AnomalyDetails anomalies={selectedAnomaly as any} />
      </div>
    );
  }
  
  // Show detailed metric view
  if (selectedMetric) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleBackToOverview} className="mb-4 -ml-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{selectedMetric.title}</h2>
          <AutoRefreshControl
            interval={autoRefreshIntervalSecs * 1000}
            onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
            isPaused={!isAutoRefreshEnabled}
            onPauseToggle={toggleAutoRefresh}
            onRefresh={handleRefresh}
          />
        </div>
        
        {selectedMetric.description && (
          <p className="text-muted-foreground">{selectedMetric.description}</p>
        )}
        
        <Card className="w-full">
          <CardContent className="pt-6">
            <PerformanceChart
              data={getTrendDataForMetric(selectedMetric.key)}
              dataKey="date"
              lines={[
                {
                  dataKey: "value",
                  name: selectedMetric.title,
                  color: "#2563eb",
                  strokeWidth: 3
                }
              ]}
              height={400}
              title={`${selectedMetric.title} Trend`}
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Main analytics dashboard view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Neural System Analytics</h2>
        <div className="flex items-center gap-2">
          <Badge variant={analyticsData?.systemHealthStatus === 'optimal' ? 'success' : 'warning'} className="px-2 py-0.5">
            <div className="w-2 h-2 rounded-full bg-current mr-1"></div>
            {analyticsData?.systemHealthStatus || 'Unknown'} 
          </Badge>
          
          <AutoRefreshControl
            interval={autoRefreshIntervalSecs * 1000}
            onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
            isPaused={!isAutoRefreshEnabled}
            onPauseToggle={toggleAutoRefresh}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard 
          title="Response Time" 
          value={getMetricValue('responseTime').value} 
          unit="ms" 
          change={getMetricValue('responseTime').change}
          icon={<Activity className="h-4 w-4 mr-1 text-muted-foreground" />}
          onClick={() => handleDrillDown({
            key: 'responseTime', 
            title: 'Response Time',
            description: 'Average response time of neural operations in milliseconds'
          })}
        />
        
        <DrillableMetricCard 
          title="Accuracy" 
          value={getMetricValue('accuracy').value} 
          unit="%" 
          change={getMetricValue('accuracy').change}
          onClick={() => handleDrillDown({
            key: 'accuracy', 
            title: 'Accuracy',
            description: 'Neural processing accuracy percentage'
          })}
        />
        
        <DrillableMetricCard 
          title="Error Rate" 
          value={getMetricValue('errorRate').value} 
          unit="%" 
          change={getMetricValue('errorRate').change}
          isNegative={true}
          onClick={() => handleDrillDown({
            key: 'errorRate', 
            title: 'Error Rate',
            description: 'Percentage of operations resulting in errors'
          })}
        />
        
        <DrillableMetricCard 
          title="Operations" 
          value={getMetricValue('operations').value} 
          unit="/min" 
          change={getMetricValue('operations').change}
          onClick={() => handleDrillDown({
            key: 'operations', 
            title: 'Operations',
            description: 'Number of neural operations per minute'
          })}
        />
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="anomalies">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Anomalies</span>
              {analyticsData?.anomalies && analyticsData.anomalies.length > 0 && (
                <span className="ml-1.5 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {analyticsData.anomalies.length}
                </span>
              )}
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <Card className="w-full">
            <CardContent className="pt-6">
              <PerformanceChart
                data={analyticsData?.performanceTrend || []}
                dataKey="timestamp"
                lines={[
                  {
                    dataKey: "responseTime",
                    name: "Response Time (ms)",
                    color: "#2563eb",
                    strokeWidth: 2
                  },
                  {
                    dataKey: "accuracy",
                    name: "Accuracy (%)",
                    color: "#10b981",
                    strokeWidth: 2
                  }
                ]}
                height={350}
                title="System Performance"
                onRefresh={handleRefresh}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              {analyticsData?.anomalies && analyticsData.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.anomalies.map((anomaly) => (
                    <div 
                      key={anomaly.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleViewAnomaly(anomaly)}
                    >
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mr-2.5 ${
                          anomaly.severity === 'high' ? 'bg-red-500' : 
                          anomaly.severity === 'medium' ? 'bg-amber-500' : 
                          'bg-blue-400'
                        }`}></div>
                        <div>
                          <div className="font-medium">{anomaly.type}</div>
                          <div className="text-xs text-muted-foreground">
                            {anomaly.description || anomaly.message || 'No description available'}
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        anomaly.severity === 'high' ? 'destructive' : 
                        anomaly.severity === 'medium' ? 'warning' : 
                        'default'
                      } className="ml-2">
                        {anomaly.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-1">All Systems Normal</h3>
                  <p className="text-muted-foreground">No anomalies detected in the neural system</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: {analyticsData?.lastUpdated ? new Date(analyticsData.lastUpdated).toLocaleString() : 'Unknown'}
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh} className="h-auto py-0">
          <RefreshCcw className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">Refresh</span>
        </Button>
      </div>
    </div>
  );
};

export default NeuralAnalytics;
