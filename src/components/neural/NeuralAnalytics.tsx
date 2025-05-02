
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  Clock,
  Activity,
  Zap,
  BarChart,
  LineChart,
  AlertTriangle,
  ArrowLeft,
  Brain,
  Gauge
} from 'lucide-react';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import DrillableMetricCard from '@/components/analytics/DrillableMetricCard';
import AnomalyDetails from '@/components/analytics/AnomalyDetails';
import PerformanceChart from '@/components/neural/PerformanceChart';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({
  refreshInterval = 30,
}) => {
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

  useEffect(() => {
    // Set up initial refresh interval
    changeRefreshInterval(refreshInterval);
  }, [refreshInterval, changeRefreshInterval]);

  // Format date range for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
    }
    return 'All time';
  };

  // Handle refresh button click
  const handleRefresh = () => {
    refreshAnalytics();
  };

  // Handle refresh interval change
  const handleIntervalChange = (value: string) => {
    changeRefreshInterval(parseInt(value));
  };

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertTriangle />
            <div>
              <h3 className="font-medium">Error loading analytics</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4" onClick={refreshAnalytics}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Render detailed view for a selected metric
  if (selectedMetric) {
    const metricData = getTrendDataForMetric(selectedMetric.key);
    const { value, change } = getMetricValue(selectedMetric.key);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBackToOverview} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="ml-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedMetric.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedMetric.description || `Detailed analytics for ${selectedMetric.title.toLowerCase()}`}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <h3 className="text-3xl font-bold">{typeof value === 'number' ? value.toFixed(2) : value}</h3>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Change</p>
                  <h4 className={`text-xl font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change >= 0 ? '+' : ''}{typeof change === 'number' ? change.toFixed(2) : change}
                  </h4>
                </div>
              </div>
            </div>
            
            <div className="h-96">
              <PerformanceChart
                data={metricData}
                lines={[
                  {
                    dataKey: 'value',
                    name: selectedMetric.title,
                    color: '#3b82f6',
                    strokeWidth: 3
                  }
                ]}
                dataKey="date"
                height="100%"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Neural System Analytics</h2>
              <p className="text-muted-foreground text-sm">Real-time insights and performance metrics</p>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <DatePickerWithRange 
                className="max-w-72" 
                dateRange={dateRange} 
                onUpdate={(range) => {
                  if (range?.from && range?.to) {
                    handleDateChange(range.from, range.to);
                  }
                }} 
              />
              
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-refresh" 
                checked={isAutoRefreshEnabled}
                onCheckedChange={toggleAutoRefresh}
              />
              <Label htmlFor="auto-refresh" className="font-medium">
                Auto Refresh
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="refresh-interval" className="text-sm">
                Interval:
              </Label>
              <Select 
                defaultValue={refreshInterval.toString()}
                onValueChange={handleIntervalChange}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DrillableMetricCard
          title="Response Time"
          value={getMetricValue('responseTime').value}
          unit="ms"
          change={getMetricValue('responseTime').change}
          metricKey="responseTime"
          onDrillDown={handleDrillDown}
          icon={<Clock className="h-4 w-4" />}
          description="Average response time for neural operations"
        />
        
        <DrillableMetricCard
          title="Accuracy"
          value={getMetricValue('accuracy').value}
          unit="%"
          change={getMetricValue('accuracy').change}
          metricKey="accuracy"
          onDrillDown={handleDrillDown}
          icon={<Activity className="h-4 w-4" />}
          description="Neural processing accuracy rate"
        />
        
        <DrillableMetricCard
          title="Error Rate"
          value={getMetricValue('errorRate').value}
          unit="%"
          change={getMetricValue('errorRate').change}
          isNegative={true}
          metricKey="errorRate"
          onDrillDown={handleDrillDown}
          icon={<AlertTriangle className="h-4 w-4" />}
          description="Percentage of failed operations"
        />
        
        <DrillableMetricCard
          title="Operations"
          value={getMetricValue('operations').value}
          unit=""
          change={getMetricValue('operations').change}
          metricKey="operations"
          onDrillDown={handleDrillDown}
          icon={<Zap className="h-4 w-4" />}
          description="Total neural operations processed"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Anomalies</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {analyticsData && (
                  <PerformanceChart 
                    data={analyticsData.performanceForecast.slice(0, 12)}
                    lines={[
                      {
                        dataKey: 'metrics.predictedResponseTime',
                        name: 'Response Time (ms)',
                        color: '#3b82f6',
                        type: 'monotone'
                      },
                      {
                        dataKey: 'metrics.predictedErrorRate',
                        name: 'Error Rate (%)',
                        color: '#ef4444',
                        type: 'monotone'
                      }
                    ]}
                    dataKey="date"
                    height="100%"
                  />
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>CPU & Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {analyticsData && (
                    <PerformanceChart 
                      data={analyticsData.performanceForecast.slice(0, 12)}
                      lines={[
                        {
                          dataKey: 'metrics.expectedLoad',
                          name: 'System Load (%)',
                          color: '#8b5cf6',
                          type: 'monotone'
                        }
                      ]}
                      dataKey="date"
                      height="100%"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>System Status</CardTitle>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-sm font-medium text-green-500">
                      Operational
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-medium">System Load</div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '35%' }} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">35% - Normal</div>
                  </div>
                  
                  <div>
                    <div className="mb-2 text-sm font-medium">Memory Usage</div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '42%' }} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">42% - Normal</div>
                  </div>
                  
                  <div>
                    <div className="mb-2 text-sm font-medium">Network</div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: '28%' }} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">28% - Optimal</div>
                  </div>
                  
                  <div>
                    <div className="mb-2 text-sm font-medium">Error Rate</div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: '8%' }} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">0.8% - Within threshold</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Neural Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {analyticsData && (
                  <PerformanceChart 
                    data={analyticsData.performanceForecast}
                    lines={[
                      {
                        dataKey: 'metrics.predictedResponseTime',
                        name: 'Response Time (ms)',
                        color: '#3b82f6',
                        type: 'monotone'
                      },
                      {
                        dataKey: 'metrics.confidenceScore',
                        name: 'Confidence Score',
                        color: '#10b981',
                        type: 'monotone'
                      }
                    ]}
                    dataKey="date"
                    height="100%"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Usage & Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {analyticsData && (
                  <PerformanceChart 
                    data={analyticsData.performanceForecast}
                    lines={[
                      {
                        dataKey: 'metrics.expectedLoad',
                        name: 'Expected Load',
                        color: '#8b5cf6',
                        type: 'monotone'
                      }
                    ]}
                    dataKey="date"
                    height="100%"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Detected Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.anomalies?.length > 0 ? (
                    analyticsData.anomalies.map((anomaly, index) => (
                      <AnomalyDetails 
                        key={anomaly.id || index} 
                        anomalies={anomaly} 
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-32 p-4 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                      <div>
                        <Brain className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
                        <p>No anomalies detected</p>
                        <p className="text-sm">All neural systems functioning within normal parameters</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
