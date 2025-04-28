
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';
import { Badge } from '@/components/ui/badge';
import { CircleIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const MetricWithChange = ({ title, value, change, icon }: { 
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
}) => {
  const formattedChange = typeof change === 'number' ? 
    `${change >= 0 ? '+' : ''}${change.toFixed(1)}%` : 
    undefined;
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {formattedChange && (
          <span className={`text-xs font-medium flex items-center ${change && change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change && change >= 0 ? 
              <ArrowUpIcon className="w-3 h-3 mr-1" /> : 
              <ArrowDownIcon className="w-3 h-3 mr-1" />}
            {formattedChange}
          </span>
        )}
      </div>
    </div>
  );
};

const NeuralAnalytics: React.FC = () => {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neural Analytics</CardTitle>
          <CardDescription>Loading neural system analytics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neural Analytics</CardTitle>
          <CardDescription className="text-red-500">Error loading analytics data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={refreshAnalytics}
              className="mt-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neural Analytics</CardTitle>
          <CardDescription>No analytics data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Format timestamp for display
  const formattedTimestamp = new Date(analyticsData.timestamp).toLocaleString();

  // Prepare data for the charts
  const usageData = analyticsData.usageMetrics.dailyUsageTrend.map(item => ({
    date: item.date,
    users: item.value,
  }));

  const serviceDistribution = analyticsData.usageMetrics.serviceTypeDistribution;
  
  // Format forecast data for the chart
  const forecastData = analyticsData.performanceForecast.map(trend => ({
    date: trend.date,
    expectedLoad: (trend.metrics.expectedLoad * 100).toFixed(1),
    responseTime: trend.metrics.predictedResponseTime.toFixed(0),
    errorRate: trend.metrics.predictedErrorRate.toFixed(2),
    confidence: (trend.metrics.confidenceScore * 100).toFixed(0),
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Neural Analytics</CardTitle>
            <CardDescription>
              System performance and usage metrics
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Last updated: {formattedTimestamp}</span>
            <button 
              onClick={refreshAnalytics}
              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricWithChange 
            title="Response Time" 
            value={`${analyticsData.operationalMetrics.averageResponseTime.toFixed(1)} ms`}
            change={analyticsData.operationalMetrics.responseTimeChange}
            icon={<CircleIcon className="w-4 h-4 fill-blue-400 text-blue-400" />}
          />
          <MetricWithChange 
            title="Accuracy" 
            value={`${(analyticsData.operationalMetrics.averageAccuracy * 100).toFixed(1)}%`}
            change={analyticsData.operationalMetrics.accuracyChange}
            icon={<CircleIcon className="w-4 h-4 fill-green-400 text-green-400" />}
          />
          <MetricWithChange 
            title="Error Rate" 
            value={`${analyticsData.operationalMetrics.errorRate.toFixed(2)}%`}
            change={analyticsData.operationalMetrics.errorRateChange}
            icon={<CircleIcon className="w-4 h-4 fill-red-400 text-red-400" />}
          />
          <MetricWithChange 
            title="Operations" 
            value={analyticsData.operationalMetrics.totalOperations.toLocaleString()}
            change={analyticsData.operationalMetrics.operationsChange}
            icon={<CircleIcon className="w-4 h-4 fill-violet-400 text-violet-400" />}
          />
        </div>

        {/* Service status summary */}
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-3">Neural Service Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analyticsData.serviceMetrics.map(service => (
              <div key={service.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <div>
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="text-xs text-muted-foreground">{service.type}</div>
                </div>
                <Badge 
                  className={
                    service.status === 'active' ? 'bg-green-500' : 
                    service.status === 'inactive' ? 'bg-slate-500' : 
                    'bg-amber-500'
                  }
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="usage">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4 pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    name="Daily Users"
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Service Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Usage %" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">User Metrics</h4>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Active Users:</span>
                    <span className="text-sm font-medium">
                      {analyticsData.usageMetrics.dailyActiveUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Active Users:</span>
                    <span className="text-sm font-medium">
                      {analyticsData.usageMetrics.monthlyActiveUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sessions Per User:</span>
                    <span className="text-sm font-medium">
                      {analyticsData.usageMetrics.sessionsPerUser.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Session Duration:</span>
                    <span className="text-sm font-medium">
                      {analyticsData.usageMetrics.averageSessionDuration.toFixed(0)}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Retention Rate:</span>
                    <span className="text-sm font-medium">
                      {(analyticsData.usageMetrics.retentionRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Model Performance</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.modelPerformance.mapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="key" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Bar dataKey="value" name="Score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Advanced Metrics</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.advancedMetrics.mapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="key" tick={{fontSize: 10}} />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Bar dataKey="value" name="Score" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">System Metrics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">CPU</div>
                  <div className="text-lg font-bold">{analyticsData.systemMetrics.cpuUtilization.toFixed(1)}%</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Memory</div>
                  <div className="text-lg font-bold">{analyticsData.systemMetrics.memoryUtilization.toFixed(1)}%</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Req/s</div>
                  <div className="text-lg font-bold">{analyticsData.systemMetrics.requestsPerSecond.toFixed(0)}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Response</div>
                  <div className="text-lg font-bold">{analyticsData.systemMetrics.responseTimeMs.toFixed(0)}ms</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Error Rate</div>
                  <div className="text-lg font-bold">{analyticsData.systemMetrics.errorRate.toFixed(2)}%</div>
                </div>
              </div>
            </div>
            
            {analyticsData.anomalies.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Detected Anomalies</h4>
                <div className="border rounded-md overflow-hidden">
                  {analyticsData.anomalies.map((anomaly, index) => (
                    <div 
                      key={anomaly.id || index} 
                      className={`p-3 ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900' : ''} flex justify-between items-center`}
                    >
                      <div>
                        <div className="font-medium text-sm">{anomaly.type}</div>
                        <div className="text-xs text-muted-foreground">{anomaly.description}</div>
                      </div>
                      <Badge 
                        className={
                          anomaly.severity === 'high' ? 'bg-red-500' : 
                          anomaly.severity === 'medium' ? 'bg-amber-500' : 
                          'bg-yellow-500'
                        }
                      >
                        {anomaly.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="forecast" className="pt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">7-Day Performance Forecast</h4>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="expectedLoad" 
                      name="Expected Load (%)" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="confidence" 
                      name="Confidence (%)" 
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="responseTime" 
                      name="Response Time (ms)" 
                      stroke="#ff7300"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommendations</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-4">
                <ul className="space-y-2 list-disc pl-5">
                  {analyticsData.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalytics;
