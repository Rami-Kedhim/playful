
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NeuralAnalyticsDashboard from './NeuralAnalyticsDashboard';
import { Brain, Activity, Database } from 'lucide-react';

const NeuralAnalytics: React.FC = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span>Neural Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Neural Health</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6">
            <NeuralAnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Resource allocation metrics and optimization tools will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Neural Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced neural health metrics and diagnostics will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalytics;
