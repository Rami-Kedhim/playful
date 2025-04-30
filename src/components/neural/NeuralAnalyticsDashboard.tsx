
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, RefreshCwIcon } from 'lucide-react';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';
import PerformanceChart from './PerformanceChart';

const NeuralAnalyticsDashboard = () => {
  const { 
    analyticsData, 
    loading,
    error,
    refreshAnalytics,
    dateRange,
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

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !analyticsData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Failed to load neural analytics</p>
          <Button onClick={refreshAnalytics} variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // If a specific metric is selected, show detailed view
  if (selectedMetric) {
    const metricData = getTrendDataForMetric(selectedMetric.key);
    const { value, change } = getMetricValue(selectedMetric.key);
    
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" onClick={handleBackToOverview} className="mb-2">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Overview
            </Button>
            <CardTitle>{selectedMetric.title} Details</CardTitle>
            <CardDescription>{selectedMetric.description}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshAnalytics}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{value.toFixed(2)}</p>
              <p className={`text-sm ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {change > 0 ? '+' : ''}{change.toFixed(2)}% from last period
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Select defaultValue="7d">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <PerformanceChart data={metricData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-1">
                  {analyticsData?.recommendations?.slice(0, 3).map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Related Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-1">
                  {['Accuracy', 'Throughput', 'System Load'].map((metric, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>{metric}</span>
                      <span className="font-mono">{(Math.random() * 100).toFixed(2)}%</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Configure Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Overview dashboard
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Neural Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor neural network performance and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isAutoRefreshEnabled ? "secondary" : "outline"} 
            size="sm" 
            onClick={toggleAutoRefresh}
          >
            {isAutoRefreshEnabled ? "Auto-refresh On" : "Auto-refresh Off"}
          </Button>
          <Button onClick={refreshAnalytics} size="sm" variant="outline">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'responseTime', title: 'Response Time', icon: '⚡' },
              { key: 'accuracy', title: 'Model Accuracy', icon: '🎯' },
              { key: 'errorRate', title: 'Error Rate', icon: '⚠️' },
              { key: 'operations', title: 'Operations', icon: '🔄' }
            ].map((metric) => {
              const { value, change } = getMetricValue(metric.key);
              return (
                <Card key={metric.key} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <span className="text-lg">{metric.icon}</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.key === 'errorRate' ? (value * 100).toFixed(2) + '%' : 
                       metric.key === 'accuracy' ? value.toFixed(2) + '%' : 
                       metric.key === 'responseTime' ? value.toFixed(2) + 'ms' : 
                       value.toFixed(0)}
                    </div>
                    <p className={`text-xs ${change > 0 ? 
                      (metric.key === 'errorRate' ? 'text-red-500' : 'text-green-500') : 
                      change < 0 ? 
                      (metric.key === 'errorRate' ? 'text-green-500' : 'text-red-500') : 
                      'text-muted-foreground'}`}>
                      {change > 0 ? '+' : ''}{change.toFixed(2)}% from last period
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/5 flex items-center justify-center"
                      onClick={() => handleDrillDown(metric)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Overall neural network performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PerformanceChart data={analyticsData.performanceTrend || []} />
            </CardContent>
          </Card>
          
          {/* Recommendations & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analyticsData.recommendations?.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.systemMetrics || {}).map(([key, value], idx) => {
                    if (['responseTimeMs', 'errorRate', 'throughput'].includes(key)) return null;
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-mono">
                          {typeof value === 'number' ? (value * 100).toFixed(2) + '%' : value?.toString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed neural system performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Select a metric from the overview tab to view detailed performance analysis.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Neural Predictions</CardTitle>
              <CardDescription>AI-generated forecasts and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Forecasting module is initializing. Check back soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalyticsDashboard;
