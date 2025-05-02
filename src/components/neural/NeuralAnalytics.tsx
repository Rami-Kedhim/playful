
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { neuralMetrics } from '@/services/neural/reporting/neuralMetrics';
import { RefreshCw, Brain, Server, Activity } from 'lucide-react';

const NeuralAnalytics: React.FC = () => {
  const [performanceReport, setPerformanceReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = () => {
    setIsLoading(true);
    try {
      const report = neuralMetrics.generatePerformanceReport();
      setPerformanceReport(report);
    } catch (error) {
      console.error("Error generating neural metrics report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate sample data for charts
  const getActivityData = () => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now);
      hour.setHours(now.getHours() - (23 - i));
      return {
        time: hour.getHours() + ':00',
        neuralLoad: Math.random() * 100,
        responseTime: Math.random() * 200,
        accuracy: 70 + Math.random() * 30,
      };
    });
  };

  const getServicePerformance = () => {
    const services = performanceReport?.services || {};
    return Object.keys(services).map(serviceId => ({
      name: serviceId,
      errorRate: (services[serviceId].metrics.errorRate || 0) * 100,
      latency: services[serviceId].metrics.latency || 0,
      usage: services[serviceId].metrics.operationsCount || 0
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Neural System Analytics</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateReport} 
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="services">Service Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                  Overall Health
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {performanceReport?.overallHealth || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  System performing within optimal parameters
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Server className="h-4 w-4 mr-2 text-green-500" />
                  Active Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {performanceReport?.services ? Object.keys(performanceReport.services).length : 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Neural modules running
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-500" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {performanceReport?.systemMetrics?.responseTime.toFixed(2) || 0} ms
                </div>
                <p className="text-xs text-muted-foreground">
                  Average neural processing time
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">System Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="space-y-1">
                {performanceReport?.recommendations?.map((recommendation: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{recommendation}</span>
                  </li>
                )) || (
                  <li className="text-sm text-muted-foreground">No recommendations at this time</li>
                )}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">System Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getActivityData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="neuralLoad" stroke="#8884d8" />
                  <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Service Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getServicePerformance()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="latency" fill="#8884d8" />
                  <Bar dataKey="errorRate" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceReport?.services && Object.keys(performanceReport.services).map((serviceId) => {
              const service = performanceReport.services[serviceId];
              return (
                <Card key={serviceId}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-primary" />
                        {serviceId}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Operations: <span className="font-medium">{service.metrics.operationsCount || 0}</span></div>
                      <div>Latency: <span className="font-medium">{service.metrics.latency || 0} ms</span></div>
                      <div>Error rate: <span className="font-medium">{((service.metrics.errorRate || 0) * 100).toFixed(2)}%</span></div>
                      <div>Success rate: <span className="font-medium">{((service.metrics.successRate || 0) * 100).toFixed(2)}%</span></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Neural Activity (24h)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getActivityData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="neuralLoad" stroke="#8884d8" />
                  <Line type="monotone" dataKey="responseTime" stroke="#ff8042" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>{performanceReport?.systemMetrics?.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${performanceReport?.systemMetrics?.cpuUsage || 0}%` }} 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>{performanceReport?.systemMetrics?.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${performanceReport?.systemMetrics?.memoryUsage || 0}%` }} 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Operations Per Second</span>
                    <span>{performanceReport?.systemMetrics?.operationsPerSecond || 0}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${(performanceReport?.systemMetrics?.operationsPerSecond || 0) / 10}%` }} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
