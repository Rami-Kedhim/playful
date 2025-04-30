
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, ChevronLeft, Clock, LineChart, AlertOctagon, Zap } from 'lucide-react';
import useNeuralAnalyticsDashboard, { MetricDetail } from '@/hooks/useNeuralAnalyticsDashboard';
import PerformanceChart from './PerformanceChart';

const NeuralAnalyticsDashboard: React.FC = () => {
  const { 
    analyticsData, 
    loading, 
    error, 
    refreshAnalytics, 
    isAutoRefreshEnabled,
    toggleAutoRefresh,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue
  } = useNeuralAnalyticsDashboard();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  if (loading) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading neural analytics data...</p>
        </div>
      </Card>
    );
  }
  
  if (error || !analyticsData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <AlertOctagon size={20} />
            <span>Analytics Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {error || "Failed to load neural analytics data. Please try again later."}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={refreshAnalytics}
          >
            <RefreshCw size={16} className="mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // If we're viewing a specific metric
  if (selectedMetric) {
    const metricData = getMetricValue(selectedMetric.key);
    
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={handleBackToOverview}
            >
              <ChevronLeft size={16} />
              <span>Back to Overview</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={refreshAnalytics}
            >
              <RefreshCw size={16} />
            </Button>
          </div>
          <CardTitle className="mt-4">{selectedMetric.title}</CardTitle>
          {selectedMetric.description && (
            <p className="text-sm text-muted-foreground">{selectedMetric.description}</p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {metricData.value.toFixed(2)}
                  {selectedMetric.key === 'responseTime' && 'ms'}
                  {selectedMetric.key === 'accuracy' && '%'}
                  {selectedMetric.key === 'errorRate' && '%'}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  {metricData.change >= 0 ? '+' : ''}{metricData.change.toFixed(2)}
                  {selectedMetric.key === 'responseTime' && 'ms'}
                  {selectedMetric.key === 'accuracy' && '%'}
                  {selectedMetric.key === 'errorRate' && '%'}
                  <span className={metricData.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {metricData.change >= 0 ? '↑' : '↓'}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="text-sm">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            
            <div className="h-[350px] mt-4">
              <PerformanceChart metricKey={selectedMetric.key as 'responseTime' | 'accuracy' | 'errorRate' | 'operations'} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Main overview dashboard
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Neural System Analytics</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-1 ${isAutoRefreshEnabled ? 'bg-primary/10' : ''}`}
              onClick={toggleAutoRefresh}
            >
              <Clock size={16} />
              <span>{isAutoRefreshEnabled ? 'Auto-refresh On' : 'Auto-refresh Off'}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={refreshAnalytics}
            >
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="overview">Performance Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Response Time Card */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Clock size={18} />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">
                        {getMetricValue('responseTime').value.toFixed(2)}ms
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        {getMetricValue('responseTime').change >= 0 ? '+' : ''}
                        {getMetricValue('responseTime').change.toFixed(2)}ms
                        <span className={getMetricValue('responseTime').change < 0 ? 'text-green-500' : 'text-red-500'}>
                          {getMetricValue('responseTime').change < 0 ? ' ↓' : ' ↑'}
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDrillDown({
                        key: 'responseTime',
                        title: 'Response Time',
                        description: 'Average time to process neural requests'
                      })}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Accuracy Card */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <LineChart size={18} />
                    Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">
                        {getMetricValue('accuracy').value.toFixed(2)}%
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        {getMetricValue('accuracy').change >= 0 ? '+' : ''}
                        {getMetricValue('accuracy').change.toFixed(2)}%
                        <span className={getMetricValue('accuracy').change >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {getMetricValue('accuracy').change >= 0 ? ' ↑' : ' ↓'}
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDrillDown({
                        key: 'accuracy',
                        title: 'Accuracy',
                        description: 'Precision of neural processing results'
                      })}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Error Rate Card */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <AlertOctagon size={18} />
                    Error Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">
                        {(getMetricValue('errorRate').value * 100).toFixed(2)}%
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        {getMetricValue('errorRate').change >= 0 ? '+' : ''}
                        {(getMetricValue('errorRate').change * 100).toFixed(2)}%
                        <span className={getMetricValue('errorRate').change >= 0 ? 'text-red-500' : 'text-green-500'}>
                          {getMetricValue('errorRate').change >= 0 ? ' ↑' : ' ↓'}
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDrillDown({
                        key: 'errorRate',
                        title: 'Error Rate',
                        description: 'Frequency of neural processing errors'
                      })}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Operations Card */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Zap size={18} />
                    Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">
                        {getMetricValue('operations').value.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        {getMetricValue('operations').change >= 0 ? '+' : ''}
                        {getMetricValue('operations').change.toLocaleString()}
                        <span className={getMetricValue('operations').change >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {getMetricValue('operations').change >= 0 ? ' ↑' : ' ↓'}
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDrillDown({
                        key: 'operations',
                        title: 'Operations',
                        description: 'Total neural operations processed'
                      })}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-[300px]">
              <PerformanceChart />
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Additional metric cards could go here */}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsDashboard;
