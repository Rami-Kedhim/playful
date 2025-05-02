
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import MetricCard from '@/components/analytics/MetricCard';
import PerformanceChart from '@/components/neural/PerformanceChart';
import DetailedMetricView from '@/components/analytics/DetailedMetricView';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import { useToast } from '@/hooks/use-toast';
import { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import { Anomaly } from '@/types/analytics';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30 }) => {
  const { 
    analyticsData, 
    loading, 
    error, 
    refreshAnalytics,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric,
    isAutoRefreshEnabled,
    toggleAutoRefresh,
    refreshInterval: autoRefreshIntervalSecs,
    changeRefreshInterval
  } = useNeuralAnalyticsDashboard();
  
  const { toast } = useToast();
  const [isPaused, setIsPaused] = useState(false);

  const handleRefresh = () => {
    refreshAnalytics();
    toast({
      title: "Analytics refreshed",
      description: "The latest neural system analytics have been loaded.",
    });
  };

  const metrics: MetricDetail[] = [
    { 
      key: 'responseTime', 
      title: 'Response Time', 
      description: 'Average time to process neural requests'
    },
    { 
      key: 'accuracy', 
      title: 'Accuracy Rate', 
      description: 'Neural network prediction accuracy'
    },
    { 
      key: 'errorRate', 
      title: 'Error Rate', 
      description: 'Percentage of failed neural operations'
    },
    { 
      key: 'operations', 
      title: 'Operations', 
      description: 'Total neural operations processed'
    }
  ];

  // Map anomaly data to the expected format for AnomalyDetails
  const mapAnomalyData = (anomaly: Anomaly) => {
    return {
      id: anomaly.id || '',
      type: anomaly.type || 'unknown',
      severity: anomaly.severity || 'medium',
      message: anomaly.message || anomaly.description || 'Unknown anomaly detected',
      timestamp: anomaly.timestamp || new Date().toISOString(),
      metric: undefined,
      value: undefined,
      threshold: undefined,
      suggestedAction: undefined
    };
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading neural analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-destructive font-medium">Failed to load neural analytics</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">{error}</p>
            <Button onClick={refreshAnalytics} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return null;
  }

  // If a specific metric is selected, show detailed view
  if (selectedMetric) {
    const metricData = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <DetailedMetricView 
        title={selectedMetric.title}
        description={selectedMetric.description}
        value={metricData.value}
        unit={selectedMetric.key === 'accuracy' || selectedMetric.key === 'errorRate' ? '%' : ''}
        change={metricData.change}
        trendData={trendData}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Neural System Performance</h2>
        
        <AutoRefreshControl
          interval={autoRefreshIntervalSecs * 1000}
          onIntervalChange={(interval) => changeRefreshInterval(interval / 1000)}
          onRefresh={handleRefresh}
          isPaused={!isAutoRefreshEnabled}
          onPauseToggle={toggleAutoRefresh}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const { value, change } = getMetricValue(metric.key);
          return (
            <MetricCard
              key={metric.key}
              title={metric.title}
              value={value}
              change={change}
              unit={metric.key === 'accuracy' || metric.key === 'errorRate' ? '%' : ''}
              onClick={() => handleDrillDown(metric)}
            />
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <PerformanceChart
              data={analyticsData.performanceForecast}
              dataKey="date"
              lines={[
                {
                  dataKey: "metrics.predictedResponseTime",
                  name: "Response Time (ms)",
                  color: "#8b5cf6",
                  strokeWidth: 2
                },
                {
                  dataKey: "metrics.expectedLoad",
                  name: "Expected Load",
                  color: "#3b82f6",
                  strokeWidth: 2
                }
              ]}
              height={300}
              title="Neural System Performance"
              onRefresh={handleRefresh}
            />
          </div>
        </CardContent>
      </Card>

      {analyticsData.anomalies && analyticsData.anomalies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>System Anomalies Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.anomalies.slice(0, 3).map((anomaly) => (
                <AnomalyDetails
                  key={anomaly.id || Math.random().toString()}
                  anomalies={mapAnomalyData(anomaly)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NeuralAnalytics;
