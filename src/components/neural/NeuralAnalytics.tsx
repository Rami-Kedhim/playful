
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { Separator } from '@/components/ui/separator';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnalyticsExportOptions from '@/components/analytics/AnalyticsExportOptions';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import { InfoIcon, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const NeuralAnalytics: React.FC = () => {
  const {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    handleDateChange,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  } = useNeuralAnalyticsDashboard();

  // Handle manual refresh
  const handleRefresh = () => {
    refreshAnalytics();
    toast.success("Analytics data refreshed");
  };

  if (loading && !analyticsData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto mb-4 border-t-2 border-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading neural analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4" 
            onClick={refreshAnalytics}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // If a specific metric is selected, show the detailed view
  if (selectedMetric) {
    const metricData = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    let unit = '';
    switch(selectedMetric.key) {
      case 'responseTime': unit = 'ms'; break;
      case 'accuracy': unit = '%'; break;
      case 'errorRate': unit = '%'; break;
      case 'operations': unit = ''; break;
    }
    
    return (
      <DetailedMetricView
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={metricData.value}
        unit={unit}
        change={metricData.change}
        trendData={trendData}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <DateRangeFilter onDateChange={handleDateChange} onRefresh={handleRefresh} />
        
        <div className="flex items-center space-x-2">
          <AutoRefreshControl 
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            refreshInterval={refreshInterval}
            onToggleAutoRefresh={toggleAutoRefresh}
            onChangeInterval={changeRefreshInterval}
          />
          
          {analyticsData && (
            <AnalyticsExportOptions data={analyticsData} filename="neural-analytics" />
          )}
        </div>
      </div>
      
      {analyticsData?.systemMetrics && (
        <>
          <Alert className="bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-800" />
            <AlertDescription className="text-blue-800">
              System is operating at {analyticsData.systemMetrics.cpuUtilization.toFixed(1)}% CPU utilization and {analyticsData.systemMetrics.memoryUtilization.toFixed(1)}% memory utilization.
            </AlertDescription>
          </Alert>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Key Performance Metrics</h2>
          <Separator className="mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DrillableMetricCard
              title="Response Time"
              value={getMetricValue('responseTime').value}
              change={getMetricValue('responseTime').change}
              unit="ms"
              metricKey="responseTime"
              description="Average time to respond to neural processing requests"
              onDrillDown={handleDrillDown}
            />
            
            <DrillableMetricCard
              title="Accuracy"
              value={getMetricValue('accuracy').value}
              change={getMetricValue('accuracy').change}
              unit="%"
              metricKey="accuracy"
              description="Overall accuracy of neural processing operations"
              onDrillDown={handleDrillDown}
            />
            
            <DrillableMetricCard
              title="Error Rate"
              value={getMetricValue('errorRate').value}
              change={getMetricValue('errorRate').change}
              unit="%"
              metricKey="errorRate"
              description="Percentage of failed neural processing operations"
              onDrillDown={handleDrillDown}
            />
            
            <DrillableMetricCard
              title="Total Operations"
              value={getMetricValue('operations').value}
              change={getMetricValue('operations').change}
              unit=""
              metricKey="operations"
              description="Total number of neural processing operations"
              onDrillDown={handleDrillDown}
            />
          </div>
          
          {analyticsData.anomalies && analyticsData.anomalies.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Detected Anomalies</h2>
              <Separator className="mb-4" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-600">System Anomalies Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analyticsData.anomalies.map((anomaly, index) => (
                      <li key={anomaly.id || index} className="flex items-start">
                        <span className={`inline-block h-2 w-2 rounded-full mr-2 mt-2 ${
                          anomaly.severity === 'high' ? 'bg-red-500' :
                          anomaly.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-400'
                        }`}></span>
                        <div>
                          <p className="font-medium">{anomaly.type}</p>
                          <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          
          {analyticsData.recommendations && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
              <Separator className="mb-4" />
              
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {analyticsData.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-2"></span>
                        <p>{recommendation}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NeuralAnalytics;
