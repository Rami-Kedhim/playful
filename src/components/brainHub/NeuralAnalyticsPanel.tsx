
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleHelp, RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface NeuralAnalyticsPanelProps {
  className?: string;
}

const NeuralAnalyticsPanel: React.FC<NeuralAnalyticsPanelProps> = ({ className = '' }) => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics(60000); // 1 minute refresh

  const formatMetricValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };
  
  const formatPercentage = (value: number): string => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const prepareMapData = (mapData?: Array<{key: string; value: number}>): Array<{name: string; value: number}> => {
    if (!mapData) return [];
    return mapData.map(item => ({
      name: item.key,
      value: item.value
    }));
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-80">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground">Loading neural analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !analyticsData) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-80">
          <div className="text-center">
            <h3 className="text-lg font-medium text-red-500 mb-2">Analytics Error</h3>
            <p className="text-muted-foreground">{error || "Failed to load neural analytics"}</p>
            <Button className="mt-4" onClick={refreshAnalytics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const {
    timestamp,
    serviceMetrics,
    systemMetrics,
    anomalies,
    trends,
    recommendations,
    modelPerformance,
    operationalMetrics,
    usageMetrics,
    advancedMetrics,
    correlationMatrix,
    performanceForecast
  } = analyticsData;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1">
          <CardTitle>Neural Analytics</CardTitle>
          <CardDescription>
            Comprehensive view of system metrics and performance
          </CardDescription>
        </div>
        <Button size="sm" variant="outline" onClick={refreshAnalytics}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
              <TabsTrigger value="usage" className="flex-1">Usage</TabsTrigger>
              <TabsTrigger value="forecast" className="flex-1">Forecast</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-md mb-3">System Metrics</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground text-sm mb-1">CPU Utilization</div>
                        <div className="text-lg font-medium">{systemMetrics.cpuUtilization.toFixed(1)}%</div>
                      </div>
                      <div className="bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground text-sm mb-1">Memory</div>
                        <div className="text-lg font-medium">{systemMetrics.memoryUtilization.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground text-sm mb-1">Requests/Sec</div>
                        <div className="text-lg font-medium">{systemMetrics.requestsPerSecond}</div>
                      </div>
                      <div className="bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground text-sm mb-1">Response Time</div>
                        <div className="text-lg font-medium">{systemMetrics.responseTimeMs}ms</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-3">Key Metrics</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div>
                        <div className="text-muted-foreground text-sm">Error Rate</div>
                        <div className="text-lg font-medium">{systemMetrics.errorRate.toFixed(2)}%</div>
                      </div>
                      <div className={`text-sm flex items-center ${operationalMetrics.errorRateChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {formatPercentage(operationalMetrics.errorRateChange)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div>
                        <div className="text-muted-foreground text-sm">Operations</div>
                        <div className="text-lg font-medium">{formatMetricValue(operationalMetrics.totalOperations)}</div>
                      </div>
                      <div className={`text-sm flex items-center ${operationalMetrics.operationsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatPercentage(operationalMetrics.operationsChange)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div>
                        <div className="text-muted-foreground text-sm">Response Time</div>
                        <div className="text-lg font-medium">{operationalMetrics.averageResponseTime}ms</div>
                      </div>
                      <div className={`text-sm flex items-center ${operationalMetrics.responseTimeChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatPercentage(operationalMetrics.responseTimeChange)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-md mb-3">Service Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceMetrics.map((service) => (
                    <div key={service.id} className="bg-background p-4 rounded-md border">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{service.name}</div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          service.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          service.status === 'maintenance' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{service.type}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Accuracy</div>
                          <div className="font-medium">{typeof service.metrics.accuracy === 'number' ? `${(service.metrics.accuracy * 100).toFixed(1)}%` : 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Latency</div>
                          <div className="font-medium">{service.metrics.latency}ms</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Throughput</div>
                          <div className="font-medium">{service.metrics.throughput}/min</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {anomalies.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-md mb-3">Detected Anomalies</h3>
                  <div className="bg-background p-4 rounded-md border">
                    <ul className="space-y-3">
                      {anomalies.map((anomaly, idx) => (
                        <li key={anomaly.id || idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                            anomaly.severity === 'high' ? 'bg-red-500' :
                            anomaly.severity === 'medium' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-sm">{anomaly.type}</div>
                            <div className="text-xs text-muted-foreground">{anomaly.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-md mb-3">Recommendations</h3>
                <div className="bg-background p-4 rounded-md border">
                  <ul className="space-y-2">
                    {recommendations.map((recommendation, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-primary mr-2">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            {/* Performance Tab */}
            <TabsContent value="performance">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-md mb-3">Model Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareMapData(modelPerformance.mapData)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {prepareMapData(modelPerformance.mapData).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-md mb-3">Processing Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Accuracy</div>
                        <div className="font-medium">{(modelPerformance.accuracy * 100).toFixed(1)}%</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Precision</div>
                        <div className="font-medium">{(modelPerformance.precision * 100).toFixed(1)}%</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Recall</div>
                        <div className="font-medium">{(modelPerformance.recall * 100).toFixed(1)}%</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">F1 Score</div>
                        <div className="font-medium">{(modelPerformance.f1Score * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-md mb-3">System Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Latency</div>
                        <div className="font-medium">{modelPerformance.latency}ms</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Throughput</div>
                        <div className="font-medium">{formatMetricValue(modelPerformance.throughput)}/sec</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">P95 Response Time</div>
                        <div className="font-medium">{operationalMetrics.p95ResponseTime}ms</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">P99 Response Time</div>
                        <div className="font-medium">{operationalMetrics.p99ResponseTime}ms</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-3">Advanced Efficiency Metrics</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareMapData(advancedMetrics.mapData)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [(value * 100).toFixed(1) + '%', 'Efficiency']}
                        />
                        <Legend />
                        <Bar dataKey="value" name="Efficiency Score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-3 flex items-center">
                    <span>Correlation Matrix</span>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <CircleHelp className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Shows the correlation between different metrics from -1 to 1</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="bg-background p-3 rounded-md border overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="p-2"></th>
                          {correlationMatrix.labels.map(label => (
                            <th key={label} className="p-2 font-medium">{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {correlationMatrix.labels.map((rowLabel, rowIndex) => (
                          <tr key={rowLabel}>
                            <th className="p-2 font-medium text-left">{rowLabel}</th>
                            {correlationMatrix.values[rowIndex].map((value, colIndex) => (
                              <td 
                                key={colIndex} 
                                className="p-2 text-center"
                                style={{
                                  backgroundColor: value > 0 
                                    ? `rgba(34, 197, 94, ${Math.abs(value) * 0.5})` 
                                    : `rgba(239, 68, 68, ${Math.abs(value) * 0.5})`
                                }}
                              >
                                {value.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Max Correlation</div>
                      <div className="font-medium">{correlationMatrix.maxCorrelation.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Min Correlation</div>
                      <div className="font-medium">{correlationMatrix.minCorrelation.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Avg Correlation</div>
                      <div className="font-medium">{correlationMatrix.averageCorrelation.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Usage Tab */}
            <TabsContent value="usage">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-md mb-3">Daily Usage Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={usageMetrics.dailyUsageTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="value" name="Daily Active Users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-md mb-3">User Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Daily Active Users</div>
                        <div className="font-medium">{formatMetricValue(usageMetrics.dailyActiveUsers)}</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Monthly Active Users</div>
                        <div className="font-medium">{formatMetricValue(usageMetrics.monthlyActiveUsers)}</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Total Users</div>
                        <div className="font-medium">{formatMetricValue(usageMetrics.totalUsers)}</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Retention Rate</div>
                        <div className="font-medium">{(usageMetrics.retentionRate * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-md mb-3">Session Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Sessions Per User</div>
                        <div className="font-medium">{usageMetrics.sessionsPerUser}</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Avg Session Duration</div>
                        <div className="font-medium">{usageMetrics.averageSessionDuration}s</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Active Connections</div>
                        <div className="font-medium">{operationalMetrics.activeConnections}</div>
                      </div>
                      <div className="flex justify-between bg-background p-3 rounded-md border">
                        <div className="text-muted-foreground">Requests Per Minute</div>
                        <div className="font-medium">{formatMetricValue(operationalMetrics.requestsPerMinute)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-md mb-3">Service Type Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={usageMetrics.serviceTypeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {usageMetrics.serviceTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-md mb-3">Resource Allocation</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={usageMetrics.resourceAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {usageMetrics.resourceAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-3">Request Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Total Requests</div>
                      <div className="font-medium">{formatMetricValue(operationalMetrics.totalRequests)}</div>
                    </div>
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Successful Requests</div>
                      <div className="font-medium">{formatMetricValue(operationalMetrics.successfulRequests)}</div>
                    </div>
                    <div className="flex justify-between bg-background p-3 rounded-md border">
                      <div className="text-muted-foreground">Failed Requests</div>
                      <div className="font-medium">{formatMetricValue(operationalMetrics.failedRequests)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Forecast Tab */}
            <TabsContent value="forecast">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-md mb-3">Performance Forecast (7-day)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceForecast}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="metrics.expectedLoad" name="Expected Load (0-1)" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="left" type="monotone" dataKey="metrics.predictedErrorRate" name="Error Rate (%)" stroke="#ff7300" />
                        <Line yAxisId="right" type="monotone" dataKey="metrics.predictedResponseTime" name="Response Time (ms)" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-3">Forecast Data</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left">Date</th>
                          <th className="p-2 text-left">Expected Load</th>
                          <th className="p-2 text-left">Predicted Response</th>
                          <th className="p-2 text-left">Error Rate</th>
                          <th className="p-2 text-left">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceForecast.map((day, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                            <td className="p-2 border">{day.date}</td>
                            <td className="p-2 border">{(day.metrics.expectedLoad * 100).toFixed(1)}%</td>
                            <td className="p-2 border">{day.metrics.predictedResponseTime.toFixed(1)}ms</td>
                            <td className="p-2 border">{day.metrics.predictedErrorRate.toFixed(2)}%</td>
                            <td className="p-2 border">{(day.metrics.confidenceScore * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-md border">
                  <h3 className="font-medium text-md mb-2">Forecast Interpretation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This forecast predicts system performance based on historical trends and patterns. Use these projections to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Proactively scale resources during expected high-load periods</li>
                    <li>Schedule maintenance during projected low-utilization windows</li>
                    <li>Prepare for potential performance degradations</li>
                    <li>Set appropriate expectations for response times</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                    <strong>Note:</strong> Confidence scores &lt; 80% indicate higher uncertainty in the prediction.
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsPanel;
