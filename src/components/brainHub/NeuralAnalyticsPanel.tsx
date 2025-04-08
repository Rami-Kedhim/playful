
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  RefreshCw, 
  Zap, 
  ArrowUp, 
  ArrowDown, 
  Brain, 
  AlertTriangle
} from "lucide-react";

import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';

interface NeuralAnalyticsPanelProps {
  advancedMode?: boolean;
}

const NeuralAnalyticsPanel: React.FC<NeuralAnalyticsPanelProps> = ({ advancedMode = false }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [timeRange, setTimeRange] = useState('7d');
  const { analyticsData, forecastData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  
  // Color scheme for charts
  const COLORS = ['#4338ca', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6'];
  
  // Format numbers for display
  const formatNumber = (num: number): string => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };
  
  // Format percentage with sign
  const formatPercentChange = (value: number): string => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };
  
  // Generate model comparison data
  const getModelComparisonData = () => {
    if (!analyticsData || !analyticsData.modelPerformance) {
      return [];
    }
    
    return analyticsData.modelPerformance.map(model => ({
      name: model.name,
      accuracy: model.metrics.accuracy * 100,
      latency: model.metrics.latency,
      efficiency: model.metrics.efficiency * 100,
      usage: model.metrics.usageRate * 100
    }));
  };
  
  // Format tooltip for charts
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}
              {entry.name.toLowerCase().includes('percent') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center text-destructive">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p>Failed to load analytics data: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Neural Analytics Dashboard</h3>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={refreshAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {analyticsData && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Operations */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Operations</p>
                    <h3 className="text-2xl font-bold">
                      {formatNumber(analyticsData.operationalMetrics.totalOperations)}
                    </h3>
                    <p className={`text-sm flex items-center ${
                      analyticsData.operationalMetrics.operationsChange >= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {analyticsData.operationalMetrics.operationsChange >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {formatPercentChange(analyticsData.operationalMetrics.operationsChange)}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Average Accuracy */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                    <h3 className="text-2xl font-bold">
                      {(analyticsData.operationalMetrics.averageAccuracy * 100).toFixed(1)}%
                    </h3>
                    <p className={`text-sm flex items-center ${
                      analyticsData.operationalMetrics.accuracyChange >= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {analyticsData.operationalMetrics.accuracyChange >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {formatPercentChange(analyticsData.operationalMetrics.accuracyChange)}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                    <h3 className="text-2xl font-bold">
                      {analyticsData.operationalMetrics.averageResponseTime.toFixed(1)}ms
                    </h3>
                    <p className={`text-sm flex items-center ${
                      analyticsData.operationalMetrics.responseTimeChange <= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {analyticsData.operationalMetrics.responseTimeChange <= 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      )}
                      {formatPercentChange(analyticsData.operationalMetrics.responseTimeChange)}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChartIcon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Error Rate */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Error Rate</p>
                    <h3 className="text-2xl font-bold">
                      {(analyticsData.operationalMetrics.errorRate * 100).toFixed(2)}%
                    </h3>
                    <p className={`text-sm flex items-center ${
                      analyticsData.operationalMetrics.errorRateChange <= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {analyticsData.operationalMetrics.errorRateChange <= 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      )}
                      {formatPercentChange(analyticsData.operationalMetrics.errorRateChange)}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chart Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="usage">Usage Distribution</TabsTrigger>
              <TabsTrigger value="forecast">Future Forecast</TabsTrigger>
              {advancedMode && <TabsTrigger value="advanced">Advanced Metrics</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getModelComparisonData()}
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip content={renderCustomTooltip} />
                        <Legend />
                        <Bar dataKey="accuracy" name="Accuracy (%)" fill={COLORS[0]} />
                        <Bar dataKey="efficiency" name="Efficiency (%)" fill={COLORS[2]} />
                        <Bar dataKey="usage" name="Usage Rate (%)" fill={COLORS[4]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Response Time by Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={analyticsData.modelPerformance.map(model => ({
                          name: model.name,
                          responseTime: model.metrics.latency,
                          threshold: model.metrics.targetLatency
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={renderCustomTooltip} />
                        <Legend />
                        <Line type="monotone" dataKey="responseTime" name="Response Time (ms)" stroke={COLORS[1]} strokeWidth={2} />
                        <Line type="monotone" dataKey="threshold" name="Target Threshold (ms)" stroke={COLORS[3]} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Service Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.usageMetrics.serviceTypeDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {analyticsData.usageMetrics.serviceTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resource Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.usageMetrics.resourceAllocation}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {analyticsData.usageMetrics.resourceAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage Trend (Past 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={analyticsData.usageMetrics.dailyUsageTrend}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={renderCustomTooltip} />
                        <Legend />
                        <Line type="monotone" dataKey="operations" name="Operations" stroke={COLORS[0]} />
                        <Line type="monotone" dataKey="activeModels" name="Active Models" stroke={COLORS[2]} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="forecast" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Forecast (Next 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={forecastData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          domain={[0, 100]} 
                          tickFormatter={(value) => `${value}%`} 
                        />
                        <Tooltip content={renderCustomTooltip} />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="operations" 
                          name="Predicted Operations" 
                          stroke={COLORS[0]} 
                          strokeWidth={2} 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="accuracy" 
                          name="Predicted Accuracy" 
                          stroke={COLORS[1]} 
                          strokeWidth={2} 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="efficiency" 
                          name="Predicted Efficiency" 
                          stroke={COLORS[2]} 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">System Recommendations</CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    AI Generated
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analyticsData.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <Brain className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {advancedMode && (
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analyticsData.advancedMetrics.map((metric, index) => (
                        <div key={index} className="p-4 border rounded-md">
                          <p className="text-sm text-muted-foreground">{metric.name}</p>
                          <p className="text-xl font-semibold">{metric.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Model Performance Correlation Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left p-2">Metric</th>
                            {analyticsData.correlationMatrix.metrics.map((metric, index) => (
                              <th key={index} className="p-2">{metric}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.correlationMatrix.metrics.map((metric, rowIndex) => (
                            <tr key={rowIndex}>
                              <th className="text-left p-2">{metric}</th>
                              {analyticsData.correlationMatrix.values[rowIndex].map((value, colIndex) => (
                                <td 
                                  key={colIndex} 
                                  className="p-2 text-center"
                                  style={{
                                    backgroundColor: 
                                      rowIndex === colIndex ? 'rgba(67, 56, 202, 0.1)' :
                                      value > 0.7 ? 'rgba(16, 185, 129, 0.1)' :
                                      value < -0.7 ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
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
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default NeuralAnalyticsPanel;
