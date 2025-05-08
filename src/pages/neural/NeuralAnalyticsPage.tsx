
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, Line } from 'recharts';

const NeuralAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('performance');

  // Sample data for charts
  const performanceData = [
    { name: 'Jan', cpu: 65, memory: 58, errorRate: 2.5 },
    { name: 'Feb', cpu: 59, memory: 55, errorRate: 2.2 },
    { name: 'Mar', cpu: 80, memory: 78, errorRate: 3.0 },
    { name: 'Apr', cpu: 81, memory: 84, errorRate: 3.2 },
    { name: 'May', cpu: 56, memory: 68, errorRate: 2.0 },
    { name: 'Jun', cpu: 55, memory: 58, errorRate: 1.5 },
    { name: 'Jul', cpu: 40, memory: 45, errorRate: 1.0 },
  ];

  return (
    <Layout
      title="Neural Analytics"
      description="Advanced analytics for neural systems performance"
      showBreadcrumbs
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {/* This is a placeholder for the actual chart that would be rendered by recharts */}
              <div className="bg-muted rounded h-full flex items-center justify-center">
                Performance Chart (CPU, Memory Usage over time)
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent className="h-60">
                <div className="bg-muted rounded h-full flex items-center justify-center">
                  Resource Usage Chart
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Error Rates</CardTitle>
              </CardHeader>
              <CardContent className="h-60">
                <div className="bg-muted rounded h-full flex items-center justify-center">
                  Error Rate Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>System Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted rounded h-60 flex items-center justify-center">
                  User Traffic Chart
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">API Calls</h3>
                    <p className="text-3xl font-bold">1.4M</p>
                    <p className="text-sm text-muted-foreground">+12% from last month</p>
                  </div>
                  <div className="bg-card border rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Neural Processes</h3>
                    <p className="text-3xl font-bold">324K</p>
                    <p className="text-sm text-muted-foreground">+8% from last month</p>
                  </div>
                  <div className="bg-card border rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Data Processed</h3>
                    <p className="text-3xl font-bold">2.8TB</p>
                    <p className="text-sm text-muted-foreground">+15% from last month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted rounded h-60 flex items-center justify-center">
                  Anomaly Detection Chart
                </div>
                
                <h3 className="text-lg font-semibold">Recent Anomalies</h3>
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Memory usage spike</h4>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Medium</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Detected 2 hours ago</p>
                    <p className="text-sm mt-2">Sudden increase in memory usage to 92% for 5 minutes before normalizing.</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">API response time increase</h4>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">High</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Detected 5 hours ago</p>
                    <p className="text-sm mt-2">API response time increased to 1200ms for 15 minutes</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Database connection failures</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Low</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Detected yesterday</p>
                    <p className="text-sm mt-2">3 failed connection attempts detected over a 2-minute period</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NeuralAnalyticsPage;
