
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const NeuralAnalyticsPanel = () => {
  const { analyticsReport, isLoading, error } = useNeuralAnalytics();
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading neural analytics...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading analytics: {error}</div>;
  }

  if (!analyticsReport) {
    return <div className="p-8 text-center">No analytics data available</div>;
  }
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Format percentage change with sign
  const formatChange = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`;
  };
  
  // Get appropriate color for trend indicators
  const getTrendColor = (value: number, inverse: boolean = false) => {
    if (value === 0) return 'text-gray-500';
    if (inverse) {
      return value > 0 ? 'text-red-500' : 'text-green-500';
    }
    return value > 0 ? 'text-green-500' : 'text-red-500';
  };

  // Get appropriate chevron for trend
  const getTrendArrow = (value: number) => {
    if (value === 0) return '⟷';
    return value > 0 ? '↗' : '↘';
  };

  // Convert model performance metrics for charts
  const modelPerformanceData = analyticsReport.modelPerformance.mapData.map((item) => {
    return {
      name: item.key,
      value: item.value
    };
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Neural Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="correlation">Correlations</TabsTrigger>
            </TabsList>
            
            {/* PERFORMANCE TAB */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Model Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={modelPerformanceData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
                          <Tooltip 
                            formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                          />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Latency & Throughput</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Latency</span>
                          <span className="font-medium">{analyticsReport.modelPerformance.latency}ms</span>
                        </div>
                        <Progress value={100 - (analyticsReport.modelPerformance.latency / 5)} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Throughput</span>
                          <span className="font-medium">{analyticsReport.modelPerformance.throughput} ops/sec</span>
                        </div>
                        <Progress value={(analyticsReport.modelPerformance.throughput / 20)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">CPU</div>
                      <div className="text-2xl font-bold">{analyticsReport.systemMetrics.cpuUtilization.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Memory</div>
                      <div className="text-2xl font-bold">{analyticsReport.systemMetrics.memoryUtilization.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Requests/s</div>
                      <div className="text-2xl font-bold">{analyticsReport.systemMetrics.requestsPerSecond}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Error Rate</div>
                      <div className="text-2xl font-bold">{analyticsReport.systemMetrics.errorRate.toFixed(2)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* OPERATIONAL TAB */}
            <TabsContent value="operational" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        {analyticsReport.operationalMetrics.totalOperations.toLocaleString()}
                      </div>
                      <div className={`flex items-center ${getTrendColor(analyticsReport.operationalMetrics.operationsChange)}`}>
                        <span className="text-xl mr-1">{getTrendArrow(analyticsReport.operationalMetrics.operationsChange)}</span>
                        <span className="text-sm font-medium">
                          {formatChange(analyticsReport.operationalMetrics.operationsChange)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Operations Change (24h)
                        {analyticsReport.operationalMetrics.operationsChange > 0 ? 
                          " - Growth" : analyticsReport.operationalMetrics.operationsChange < 0 ? 
                          " - Decline" : " - Stable"}
                      </div>
                      <Progress 
                        value={50 + (analyticsReport.operationalMetrics.operationsChange * 5)} 
                        className={analyticsReport.operationalMetrics.operationsChange >= 0 ? 
                          "bg-green-100" : "bg-red-100"}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        {(analyticsReport.operationalMetrics.averageAccuracy * 100).toFixed(1)}%
                      </div>
                      <div className={`flex items-center ${getTrendColor(analyticsReport.operationalMetrics.accuracyChange)}`}>
                        <span className="text-xl mr-1">{getTrendArrow(analyticsReport.operationalMetrics.accuracyChange)}</span>
                        <span className="text-sm font-medium">
                          {formatChange(analyticsReport.operationalMetrics.accuracyChange)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Accuracy Change (24h)
                        {analyticsReport.operationalMetrics.accuracyChange > 0 ? 
                          " - Improvement" : analyticsReport.operationalMetrics.accuracyChange < 0 ? 
                          " - Degradation" : " - Stable"}
                      </div>
                      <Progress 
                        value={50 + (analyticsReport.operationalMetrics.accuracyChange * 5)} 
                        className={analyticsReport.operationalMetrics.accuracyChange >= 0 ? 
                          "bg-green-100" : "bg-red-100"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        {analyticsReport.operationalMetrics.averageResponseTime.toFixed(1)}ms
                      </div>
                      <div className={`flex items-center ${getTrendColor(analyticsReport.operationalMetrics.responseTimeChange, true)}`}>
                        <span className="text-xl mr-1">{getTrendArrow(analyticsReport.operationalMetrics.responseTimeChange)}</span>
                        <span className="text-sm font-medium">
                          {formatChange(analyticsReport.operationalMetrics.responseTimeChange)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Response Time Change (24h)
                        {analyticsReport.operationalMetrics.responseTimeChange > 0 ? 
                          " - Slower" : analyticsReport.operationalMetrics.responseTimeChange < 0 ? 
                          " - Faster" : " - Stable"}
                      </div>
                      <Progress 
                        value={50 - (analyticsReport.operationalMetrics.responseTimeChange * 5)} 
                        className={analyticsReport.operationalMetrics.responseTimeChange <= 0 ? 
                          "bg-green-100" : "bg-red-100"}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        {(analyticsReport.operationalMetrics.errorRate * 100).toFixed(2)}%
                      </div>
                      <div className={`flex items-center ${getTrendColor(analyticsReport.operationalMetrics.errorRateChange, true)}`}>
                        <span className="text-xl mr-1">{getTrendArrow(analyticsReport.operationalMetrics.errorRateChange)}</span>
                        <span className="text-sm font-medium">
                          {formatChange(analyticsReport.operationalMetrics.errorRateChange)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Error Rate Change (24h)
                        {analyticsReport.operationalMetrics.errorRateChange > 0 ? 
                          " - Increased" : analyticsReport.operationalMetrics.errorRateChange < 0 ? 
                          " - Decreased" : " - Stable"}
                      </div>
                      <Progress 
                        value={50 - (analyticsReport.operationalMetrics.errorRateChange * 5)} 
                        className={analyticsReport.operationalMetrics.errorRateChange <= 0 ? 
                          "bg-green-100" : "bg-red-100"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Request Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total</div>
                      <div className="text-xl font-medium">{analyticsReport.operationalMetrics.totalRequests.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Successful</div>
                      <div className="text-xl font-medium text-green-600">
                        {analyticsReport.operationalMetrics.successfulRequests.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Failed</div>
                      <div className="text-xl font-medium text-red-600">
                        {analyticsReport.operationalMetrics.failedRequests.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* USAGE TAB */}
            <TabsContent value="usage" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {analyticsReport.usageMetrics.dailyActiveUsers.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {analyticsReport.usageMetrics.monthlyActiveUsers.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {(analyticsReport.usageMetrics.retentionRate * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Service Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsReport.usageMetrics.serviceTypeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {analyticsReport.usageMetrics.serviceTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsReport.usageMetrics.resourceAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {analyticsReport.usageMetrics.resourceAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Daily Usage Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={analyticsReport.usageMetrics.dailyUsageTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* ADVANCED TAB */}
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Resource Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold">
                        {(analyticsReport.advancedMetrics.resourceUtilization * 100).toFixed(1)}%
                      </div>
                      <div>
                        <Badge className={
                          analyticsReport.advancedMetrics.resourceUtilization > 0.8 ? "bg-green-500" :
                          analyticsReport.advancedMetrics.resourceUtilization > 0.6 ? "bg-yellow-500" :
                          "bg-red-500"
                        }>
                          {analyticsReport.advancedMetrics.resourceUtilization > 0.8 ? "Excellent" :
                          analyticsReport.advancedMetrics.resourceUtilization > 0.6 ? "Good" :
                          "Needs Improvement"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Efficiency Score</div>
                      <Progress value={analyticsReport.advancedMetrics.efficientUseScore * 100} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Algorithmic Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold">
                        {(analyticsReport.advancedMetrics.algorithmicEfficiency * 100).toFixed(1)}%
                      </div>
                      <div>
                        <Badge className={
                          analyticsReport.advancedMetrics.algorithmicEfficiency > 0.8 ? "bg-green-500" :
                          analyticsReport.advancedMetrics.algorithmicEfficiency > 0.6 ? "bg-yellow-500" :
                          "bg-red-500"
                        }>
                          {analyticsReport.advancedMetrics.algorithmicEfficiency > 0.8 ? "Optimal" :
                          analyticsReport.advancedMetrics.algorithmicEfficiency > 0.6 ? "Good" :
                          "Needs Optimization"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Load Balancing</div>
                      <Progress value={analyticsReport.advancedMetrics.loadBalancingEfficiency * 100} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Advanced Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analyticsReport.advancedMetrics.mapData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key" angle={-45} textAnchor="end" height={70} />
                        <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
                        <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                        <Bar dataKey="value" fill="#82ca9d">
                          {analyticsReport.advancedMetrics.mapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* CORRELATION TAB */}
            <TabsContent value="correlation">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Correlation Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Key Correlations</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {analyticsReport.correlationMatrix.metricsList.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                          <div className="text-sm font-medium">{metric.name}</div>
                          <div className={
                            metric.value > 0.7 || metric.value < -0.7 ? "text-amber-500 font-bold" :
                            metric.value > 0.4 || metric.value < -0.4 ? "text-blue-500 font-medium" :
                            "text-gray-500"
                          }>
                            {metric.value.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Correlation Statistics</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Maximum Correlation:</span>
                          <span className="font-medium">{analyticsReport.correlationMatrix.maxCorrelation.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Minimum Correlation:</span>
                          <span className="font-medium">{analyticsReport.correlationMatrix.minCorrelation.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Average Correlation:</span>
                          <span className="font-medium">{analyticsReport.correlationMatrix.averageCorrelation.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Correlation Legend</div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                          <span className="text-sm">Strong Correlation (> 0.7 or &lt; -0.7)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                          <span className="text-sm">Moderate Correlation (0.4 to 0.7 or -0.4 to -0.7)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                          <span className="text-sm">Weak or No Correlation (-0.4 to 0.4)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralAnalyticsPanel;
