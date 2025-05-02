
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowUpRight, BarChart3, Brain, ChevronLeft, LineChart, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { toast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import DrillableMetricCard from "@/components/analytics/DrillableMetricCard";
import PerformanceChart from "@/components/neural/PerformanceChart";
import AnomalyDetails from "@/components/analytics/AnomalyDetails";
import useNeuralAnalyticsDashboard from "@/hooks/useNeuralAnalyticsDashboard";

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

  const [activeTab, setActiveTab] = useState<string>("overview");
  // Initialize with a properly defined DateRange object
  const [dateSelection, setDateSelection] = useState<DateRange | undefined>(undefined);

  // Format change percentages with sign and decimal precision
  const formatChangePercent = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  // Effect to update refresh interval when the prop changes
  useEffect(() => {
    changeRefreshInterval(refreshInterval);
  }, [refreshInterval, changeRefreshInterval]);

  // Handle date range selection
  const handleDateSelection = (range: DateRange | undefined) => {
    setDateSelection(range);
    if (range?.from) {
      handleDateChange(range.from, range.to);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    refreshAnalytics();
    toast({
      title: "Analytics Refreshed",
      description: "The neural analytics data has been updated.",
    });
  };

  // If error, display error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-destructive text-lg font-semibold mb-2">Error Loading Data</p>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={refreshAnalytics} variant="outline" className="mt-4">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If data is loading, display loading state
  if (loading || !analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-48 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If a specific metric is selected, show detailed view
  if (selectedMetric) {
    const metricData = getMetricValue(selectedMetric.key);
    const trendData = getTrendDataForMetric(selectedMetric.key);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={handleBackToOverview} 
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Overview</span>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">{selectedMetric.title} Details</h2>
            {selectedMetric.description && (
              <p className="text-muted-foreground">{selectedMetric.description}</p>
            )}
          </div>
          
          <DatePickerWithRange 
            className="w-full md:w-auto" 
            dateRange={dateSelection}
            onUpdate={handleDateSelection}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={trendData}
              dataKey="value"
              title={selectedMetric.title}
              onRefresh={refreshAnalytics}
            />
          </CardContent>
        </Card>
        
        {/* Additional metric specific information would go here */}
        {selectedMetric.key === 'errorRate' && analyticsData.anomalies && analyticsData.anomalies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.anomalies.slice(0, 3).map((anomaly) => (
                  <AnomalyDetails 
                    key={anomaly.id} 
                    anomalies={anomaly}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <DatePickerWithRange 
            className="flex-grow md:flex-grow-0" 
            dateRange={dateSelection}
            onUpdate={handleDateSelection}
          />
          
          <Button onClick={handleRefresh} size="icon" variant="outline" title="Refresh data">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TabsContent value="overview" className="space-y-6 mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Response Time Metric */}
          <DrillableMetricCard
            title="Response Time"
            value={getMetricValue('responseTime').value}
            unit="ms"
            change={getMetricValue('responseTime').change}
            icon={<Activity className="h-4 w-4 mr-2" />}
            onClick={() => handleDrillDown({
              key: 'responseTime',
              title: 'Response Time',
              description: 'Average time taken to process neural requests'
            })}
          />
          
          {/* Accuracy Metric */}
          <DrillableMetricCard
            title="Accuracy"
            value={getMetricValue('accuracy').value}
            unit="%"
            change={getMetricValue('accuracy').change}
            icon={<Brain className="h-4 w-4 mr-2" />}
            onClick={() => handleDrillDown({
              key: 'accuracy',
              title: 'Neural Accuracy',
              description: 'Precision of neural processing outcomes'
            })}
          />
          
          {/* Error Rate Metric */}
          <DrillableMetricCard
            title="Error Rate"
            value={getMetricValue('errorRate').value}
            unit="%"
            change={getMetricValue('errorRate').change}
            isNegative={true}
            icon={<Zap className="h-4 w-4 mr-2" />}
            onClick={() => handleDrillDown({
              key: 'errorRate',
              title: 'Error Rate',
              description: 'Percentage of failed neural operations'
            })}
          />
          
          {/* Operations Metric */}
          <DrillableMetricCard
            title="Operations"
            value={getMetricValue('operations').value}
            unit="ops"
            change={getMetricValue('operations').change}
            icon={<BarChart3 className="h-4 w-4 mr-2" />}
            onClick={() => handleDrillDown({
              key: 'operations',
              title: 'Neural Operations',
              description: 'Total number of neural processing operations'
            })}
          />
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Performance</CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                checked={isAutoRefreshEnabled}
                onCheckedChange={toggleAutoRefresh}
                id="auto-refresh"
              />
              <Label htmlFor="auto-refresh">Auto Refresh</Label>
            </div>
          </CardHeader>
          <CardContent>
            <PerformanceChart 
              data={analyticsData.performanceForecast.map(item => ({
                date: item.date,
                value: item.metrics.predictedResponseTime
              }))}
              dataKey="value"
              onRefresh={refreshAnalytics}
            />
          </CardContent>
        </Card>
        
        {analyticsData.systemMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">CPU Utilization</span>
                      <span className="text-sm">
                        {typeof analyticsData.systemMetrics.cpuUtilization === 'number' 
                          ? analyticsData.systemMetrics.cpuUtilization.toFixed(1) 
                          : analyticsData.systemMetrics.cpuUtilization}%
                      </span>
                    </div>
                    <Progress value={analyticsData.systemMetrics.cpuUtilization} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Memory Utilization</span>
                      <span className="text-sm">
                        {typeof analyticsData.systemMetrics.memoryUtilization === 'number' 
                          ? analyticsData.systemMetrics.memoryUtilization.toFixed(1) 
                          : analyticsData.systemMetrics.memoryUtilization}%
                      </span>
                    </div>
                    <Progress value={analyticsData.systemMetrics.memoryUtilization} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Request Rate</span>
                      <span className="text-sm">
                        {analyticsData.systemMetrics.requestsPerSecond} req/s
                      </span>
                    </div>
                    <Progress value={analyticsData.systemMetrics.requestsPerSecond / 10 * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.serviceMetrics
                    .filter(service => service.enabled)
                    .map(service => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={service.status === 'active' ? 'default' : 'outline'}>
                            {service.status}
                          </Badge>
                          <span>{service.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Last active: {new Date(service.lastActivity).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {analyticsData.recommendations && analyticsData.recommendations.length > 0 && (
          <Alert>
            <AlertDescription>
              <div className="font-medium mb-2">System Recommendations</div>
              <ul className="list-disc pl-5 space-y-1">
                {analyticsData.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>
      
      <TabsContent value="performance" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Detailed performance analysis view will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="anomalies" className="space-y-6 mt-0">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>System Anomalies</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {analyticsData.anomalies && analyticsData.anomalies.length > 0 ? (
              <div className="space-y-4">
                {analyticsData.anomalies.map((anomaly) => (
                  <AnomalyDetails 
                    key={anomaly.id} 
                    anomalies={anomaly}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No anomalies detected in the system</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="forecasts" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Neural System Forecasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Predictive analytics forecasts will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default NeuralAnalytics;
