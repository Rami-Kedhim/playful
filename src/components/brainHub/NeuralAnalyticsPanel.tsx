
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, AlertTriangle, BarChart2, Brain, LineChart as LineChartIcon,
  RefreshCw, TrendingUp, TrendingDown, Clock, Zap 
} from 'lucide-react';

// Helper function to format date strings
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Helper function to determine trend color
const getTrendColor = (value: number): string => {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
};

// Helper function to get trend icon
const TrendIcon = ({ value }: { value: number }) => {
  if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
  return null;
};

// Define color palette for charts
const CHART_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe',
  '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
];

const NeuralAnalyticsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Neural Analytics
          </CardTitle>
          <CardDescription>
            Loading analytics data...
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Processing neural data metrics...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Analytics Error
          </CardTitle>
          <CardDescription>
            Failed to load neural analytics data
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={refreshAnalytics}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Neural Analytics
          </CardTitle>
          <CardDescription>
            No data available
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <Button variant="outline" onClick={refreshAnalytics}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Load Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-primary" />
              Neural Analytics Panel
            </CardTitle>
            <CardDescription>
              Advanced metrics and insights from the BrainHub neural system
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 md:mt-0"
            onClick={refreshAnalytics}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage Metrics</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            {/* System Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="CPU"
                value={`${analyticsData.systemMetrics.cpuUtilization.toFixed(1)}%`}
                icon={<LineChartIcon className="h-4 w-4 text-blue-500" />}
                trend="Up by 2.3%"
                trend2="vs Last Hour"
              />
              <MetricCard
                title="Memory"
                value={`${analyticsData.systemMetrics.memoryUtilization.toFixed(1)}%`}
                icon={<BarChart2 className="h-4 w-4 text-indigo-500" />}
                trend="Down by 0.8%"
                trend2="vs Last Hour"
              />
              <MetricCard
                title="Requests"
                value={analyticsData.systemMetrics.requestsPerSecond}
                icon={<Activity className="h-4 w-4 text-green-500" />}
                trend="Up by 12%"
                trend2="vs Last Hour"
              />
              <MetricCard
                title="Response Time"
                value={`${analyticsData.systemMetrics.responseTimeMs}ms`}
                icon={<Clock className="h-4 w-4 text-amber-500" />}
                trend="Down by 3.2%"
                trend2="vs Last Hour"
              />
            </div>

            {/* Operational Metrics Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Operational Metrics</CardTitle>
                <CardDescription>
                  System performance over the last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={analyticsData.usageMetrics.dailyUsageTrend}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Operations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Anomalies */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    Anomalies Detected ({analyticsData.anomalies.length})
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.anomalies.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.anomalies.map((anomaly, index) => (
                      <div key={index} className="flex items-start p-3 border rounded-md">
                        <div className="mr-4">
                          {anomaly.severity === 'high' ? (
                            <div className="rounded-full bg-red-100 p-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                          ) : anomaly.severity === 'medium' ? (
                            <div className="rounded-full bg-amber-100 p-2">
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-blue-100 p-2">
                              <AlertTriangle className="h-5 w-5 text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{anomaly.type}</p>
                            <Badge variant={
                              anomaly.severity === 'high' ? 'destructive' : 
                              anomaly.severity === 'medium' ? 'default' : 'outline'
                            }>
                              {anomaly.severity}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{anomaly.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-muted-foreground">
                              {anomaly.timestamp && new Date(anomaly.timestamp).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {anomaly.relatedComponentId && `Component ID: ${anomaly.relatedComponentId}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No anomalies detected</p>
                    <p className="text-sm">System is operating within normal parameters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analyticsData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="h-5 w-5 mr-2 text-amber-500 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PERFORMANCE TAB */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Model Performance */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Model Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={analyticsData.modelPerformance.mapData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                        <XAxis dataKey="key" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8">
                          {analyticsData.modelPerformance.mapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Accuracy</p>
                      <p className="text-2xl font-bold">{(analyticsData.modelPerformance.accuracy * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">F1 Score</p>
                      <p className="text-2xl font-bold">{(analyticsData.modelPerformance.f1Score * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Latency</p>
                      <p className="text-2xl font-bold">{analyticsData.modelPerformance.latency}ms</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Throughput</p>
                      <p className="text-2xl font-bold">{analyticsData.modelPerformance.throughput}/s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Advanced Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={analyticsData.advancedMetrics.mapData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                        <XAxis dataKey="key" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d">
                          {analyticsData.advancedMetrics.mapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Resource Utilization</p>
                      <p className="text-2xl font-bold">{(analyticsData.advancedMetrics.resourceUtilization * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Efficient Use Score</p>
                      <p className="text-2xl font-bold">{(analyticsData.advancedMetrics.efficientUseScore * 100).toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Correlation Matrix */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Correlation Matrix</CardTitle>
                <CardDescription>
                  Relationships between key metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  {analyticsData.correlationMatrix.metricsList.map((item, index) => (
                    <Badge 
                      key={index} 
                      variant={item.value > 0.5 ? 'default' : (item.value < -0.5 ? 'destructive' : 'outline')}
                      className="text-xs"
                    >
                      {item.name}: {item.value.toFixed(2)}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Strongest correlation:</span> {
                      analyticsData.correlationMatrix.metricsList.reduce(
                        (max, item) => Math.abs(item.value) > Math.abs(max.value) ? item : max, 
                        {name: 'None', value: 0}
                      ).name
                    } ({analyticsData.correlationMatrix.maxCorrelation.toFixed(2)})
                  </p>
                  <p>
                    <span className="font-medium">Average correlation:</span> {analyticsData.correlationMatrix.averageCorrelation.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USAGE METRICS TAB */}
          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Daily Active Users</p>
                      <p className="text-2xl font-bold">{analyticsData.usageMetrics.dailyActiveUsers.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Active Users</p>
                      <p className="text-2xl font-bold">{analyticsData.usageMetrics.monthlyActiveUsers.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Sessions Per User</p>
                      <p className="text-2xl font-bold">{analyticsData.usageMetrics.sessionsPerUser}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Retention Rate</p>
                      <p className="text-2xl font-bold">{(analyticsData.usageMetrics.retentionRate * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={analyticsData.usageMetrics.dailyUsageTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} name="Daily Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Service Type Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Service Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={analyticsData.usageMetrics.serviceTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.usageMetrics.serviceTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Resource Allocation */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={analyticsData.usageMetrics.resourceAllocation}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Allocation Percentage">
                      {analyticsData.usageMetrics.resourceAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Operational Metrics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Operational Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricWithChange
                    title="Total Operations"
                    value={analyticsData.operationalMetrics.totalOperations.toLocaleString()}
                    change={analyticsData.operationalMetrics.operationsChange}
                  />
                  <MetricWithChange
                    title="Average Accuracy"
                    value={`${(analyticsData.operationalMetrics.averageAccuracy * 100).toFixed(1)}%`}
                    change={analyticsData.operationalMetrics.accuracyChange}
                  />
                  <MetricWithChange
                    title="Response Time"
                    value={`${analyticsData.operationalMetrics.averageResponseTime}ms`}
                    change={analyticsData.operationalMetrics.responseTimeChange}
                  />
                  <MetricWithChange
                    title="Error Rate"
                    value={`${(analyticsData.operationalMetrics.errorRate).toFixed(2)}%`}
                    change={analyticsData.operationalMetrics.errorRateChange}
                    reverseColors={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FORECAST TAB */}
          <TabsContent value="forecast" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Performance Forecast</CardTitle>
                <CardDescription>
                  Predicted system performance for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={analyticsData.performanceForecast}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="metrics.expectedLoad" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorLoad)"
                      name="Expected Load"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="metrics.predictedResponseTime" 
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorResponse)"
                      name="Response Time (ms)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="metrics.predictedErrorRate" 
                      stroke="#ffc658" 
                      fillOpacity={1} 
                      fill="url(#colorError)"
                      name="Error Rate (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Forecast Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Confidence Scores</CardTitle>
                  <CardDescription>
                    Prediction confidence by date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.performanceForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="metrics.confidenceScore" fill="#8884d8" name="Confidence Score">
                        {analyticsData.performanceForecast.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.metrics.confidenceScore > 0.8 ? '#4ade80' : 
                                  entry.metrics.confidenceScore > 0.6 ? '#facc15' : '#f87171'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Detailed Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[250px]">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-2 font-medium text-sm">Date</th>
                          <th className="text-left py-2 font-medium text-sm">Load</th>
                          <th className="text-left py-2 font-medium text-sm">Response</th>
                          <th className="text-left py-2 font-medium text-sm">Error</th>
                          <th className="text-left py-2 font-medium text-sm">Conf.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.performanceForecast.map((day, index) => (
                          <tr key={index} className="border-t">
                            <td className="py-2 text-sm">{day.date}</td>
                            <td className="py-2 text-sm">{(day.metrics.expectedLoad * 100).toFixed(0)}%</td>
                            <td className="py-2 text-sm">{day.metrics.predictedResponseTime.toFixed(0)}ms</td>
                            <td className="py-2 text-sm">{day.metrics.predictedErrorRate.toFixed(2)}%</td>
                            <td className="py-2 text-sm">
                              <div className="flex items-center">
                                <div 
                                  className={`w-2 h-2 rounded-full mr-1 ${
                                    day.metrics.confidenceScore > 0.8 ? 'bg-green-500' : 
                                    day.metrics.confidenceScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                ></div>
                                {(day.metrics.confidenceScore * 100).toFixed(0)}%
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Component for displaying a metric card with trend
const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trend2 = ""
}: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  trend?: string;
  trend2?: string; 
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend}
            {trend2 && <span className="ml-1">{trend2}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Component for displaying a metric with change indicator
const MetricWithChange = ({ 
  title, 
  value, 
  change,
  reverseColors = false
}: { 
  title: string; 
  value: string;
  change: number;
  reverseColors?: boolean;
}) => {
  const isGood = reverseColors ? change < 0 : change > 0;
  const textColor = isGood ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500';
  
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      <div className={`flex items-center ${textColor}`}>
        {change > 0 && <TrendingUp className="h-3 w-3 mr-1" />}
        {change < 0 && <TrendingDown className="h-3 w-3 mr-1" />}
        <span className="text-xs font-medium">
          {change > 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default NeuralAnalyticsPanel;
