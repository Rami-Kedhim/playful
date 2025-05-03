
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ArrowDownRight, ArrowUpRight, BarChart2, Brain, Download, LineChart, PieChart } from 'lucide-react';

const NeuralAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [exportLoading, setExportLoading] = useState(false);

  const handleExportData = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
    }, 2000);
  };

  // Mock data for visualization placeholders
  const metrics = [
    {
      name: "Neural Engagement",
      value: "87.2%",
      change: "+2.1%",
      increasing: true
    },
    {
      name: "Response Accuracy",
      value: "94.6%",
      change: "+1.8%",
      increasing: true
    },
    {
      name: "Processing Latency",
      value: "12.4ms",
      change: "-3.2%",
      increasing: false
    },
    {
      name: "Anomaly Detection",
      value: "0.08%",
      change: "+0.01%",
      increasing: true
    }
  ];

  return (
    <MainLayout
      title="Neural Analytics"
      description="Advanced analytics powered by our neural network"
      showBreadcrumbs
    >
      <div className="py-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Neural Network Performance</h2>
            <p className="text-muted-foreground">Detailed analytics on neural processing and outcomes</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExportData} disabled={exportLoading}>
              {exportLoading ? (
                <>
                  <LineChart className="animate-spin h-4 w-4 mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-sm ${metric.increasing ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.increasing ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {metric.change} since last {timeRange}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 text-primary mr-2" />
                    Neural Activity Over Time
                  </CardTitle>
                  <CardDescription>
                    Processing efficiency and response patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2 text-primary/40" />
                    <p>Line chart visualization will render here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 text-primary mr-2" />
                    Resource Allocation
                  </CardTitle>
                  <CardDescription>
                    Distribution of computational resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2 text-primary/40" />
                    <p>Pie chart visualization will render here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-primary mr-2" />
                  Processing Performance
                </CardTitle>
                <CardDescription>
                  Detailed metrics on neural network performance
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center bg-muted/20">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="h-16 w-16 mx-auto mb-2 text-primary/40" />
                  <p>Bar chart visualization will render here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accuracy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 text-primary mr-2" />
                  Neural Accuracy Assessment
                </CardTitle>
                <CardDescription>
                  Evaluation of neural network accuracy and reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center bg-muted/20">
                <div className="text-center text-muted-foreground">
                  <Brain className="h-16 w-16 mx-auto mb-2 text-primary/40" />
                  <p>Accuracy visualization will render here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>
                  Forward-looking predictions based on neural patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center bg-muted/20">
                <div className="text-center text-muted-foreground">
                  <AlertCircle className="h-16 w-16 mx-auto mb-2 text-primary/40" />
                  <p>Predictive visualization will render here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsPage;
