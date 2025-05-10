
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NeuralMetricsDisplay, { NeuralMetricItem } from './NeuralMetricsDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NeuralAnalyticsPage: React.FC = () => {
  // Transform the metrics into the correct format
  const performanceMetrics: NeuralMetricItem[] = [
    { title: "Accuracy", value: 94, unit: "%", change: 2.5, timespan: "7d" },
    { title: "Speed", value: 87, unit: "%", change: -1.2, timespan: "7d" },
    { title: "Completeness", value: 91, unit: "%", change: 3.8, timespan: "7d" },
    { title: "Consistency", value: 89, unit: "%", change: 1.5, timespan: "7d" }
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Neural System Analytics</h1>
      
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeuralMetricsDisplay 
              metrics={performanceMetrics}
              period="7d"
              refreshInterval={60}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Processing Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Visualization of neural processing pipeline performance.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Neural System Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Usage statistics will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Training progress and dataset information will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalyticsPage;
