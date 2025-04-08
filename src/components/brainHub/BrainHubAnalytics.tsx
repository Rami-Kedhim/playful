
import React from 'react';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Gauge, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BrainHubAnalytics: React.FC = () => {
  const { analytics, updateAnalytics } = useBrainHubHealth();
  const { toast } = useToast();

  // Format utilization trend data for charts
  const utilizationData = analytics.utilizationTrend.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    utilization: (item.value * 100).toFixed(1),
  }));

  // Prepare trend data for recommendations chart
  const recommendationCategories = {
    'performance': 0,
    'memory': 0,
    'scaling': 0,
    'security': 0,
    'optimization': 0
  };

  // Count occurrences of each recommendation category
  analytics.recommendations.forEach(rec => {
    if (rec.toLowerCase().includes('performance')) recommendationCategories.performance++;
    if (rec.toLowerCase().includes('memory')) recommendationCategories.memory++;
    if (rec.toLowerCase().includes('scal')) recommendationCategories.scaling++;
    if (rec.toLowerCase().includes('secur')) recommendationCategories.security++;
    if (rec.toLowerCase().includes('optim')) recommendationCategories.optimization++;
  });

  const recommendationsData = Object.entries(recommendationCategories).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    count
  }));

  // Sample operation data (in a real app, this would come from the API)
  const operationsData = [
    { name: '00:00', operations: Math.round(analytics.dailyOperations * 0.02) },
    { name: '03:00', operations: Math.round(analytics.dailyOperations * 0.01) },
    { name: '06:00', operations: Math.round(analytics.dailyOperations * 0.05) },
    { name: '09:00', operations: Math.round(analytics.dailyOperations * 0.20) },
    { name: '12:00', operations: Math.round(analytics.dailyOperations * 0.25) },
    { name: '15:00', operations: Math.round(analytics.dailyOperations * 0.30) },
    { name: '18:00', operations: Math.round(analytics.dailyOperations * 0.12) },
    { name: '21:00', operations: Math.round(analytics.dailyOperations * 0.05) },
  ];

  const handleRefresh = () => {
    updateAnalytics();
    toast({
      title: "Analytics Refreshed",
      description: "The latest analytics data has been loaded",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            BrainHub Analytics
          </h2>
          <p className="text-muted-foreground">
            Detailed metrics and performance analysis
          </p>
        </div>
        <Button onClick={handleRefresh}>
          Refresh Analytics
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.dailyOperations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total operations processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageResponseTime.toFixed(2)} ms</div>
            <p className="text-xs text-muted-foreground">Average API response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(analytics.errorRate * 100).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Percentage of failed operations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Optimizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.recommendations.length}</div>
            <p className="text-xs text-muted-foreground">Suggested optimizations</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="utilization" className="w-full">
        <TabsList>
          <TabsTrigger value="utilization">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Utilization Trend
          </TabsTrigger>
          <TabsTrigger value="operations">
            <BarChart3 className="h-4 w-4 mr-2" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Gauge className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="utilization" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Utilization Trend</CardTitle>
              <CardDescription>
                How system resources are utilized over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="utilization" 
                      stroke="#8884d8" 
                      name="Utilization (%)" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Operations Distribution</CardTitle>
              <CardDescription>
                Daily operations distribution by time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="operations" fill="#82ca9d" name="Operations" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Categories</CardTitle>
              <CardDescription>
                Optimization recommendations by category
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recommendationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Recommendations" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations List */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>
            Suggested actions to improve system performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.recommendations.length > 0 ? (
            <ul className="space-y-2">
              {analytics.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                  <Gauge className="h-4 w-4 mt-0.5 text-primary" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recommendations available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainHubAnalytics;
