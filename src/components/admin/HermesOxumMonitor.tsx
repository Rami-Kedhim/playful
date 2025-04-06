
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAIModelGenerator } from '@/hooks/ai/useAIModelGenerator';
import { Bot, BarChart3, Zap, Cpu, RefreshCcw, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  max: number;
}

const HermesOxumMonitor: React.FC = () => {
  const { fetchOptimizationMetrics, optimizationMetrics } = useAIModelGenerator();
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 42, status: 'healthy', max: 100 },
    { name: 'Memory Usage', value: 68, status: 'warning', max: 100 },
    { name: 'API Requests', value: 1362, status: 'healthy', max: 5000 },
    { name: 'Queue Size', value: 23, status: 'healthy', max: 500 },
    { name: 'Error Rate', value: 0.5, status: 'healthy', max: 5 }
  ]);
  
  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Update metrics with random values
      setSystemMetrics(metrics => 
        metrics.map(metric => {
          let newValue: number;
          
          if (metric.name === 'Error Rate') {
            newValue = Math.random() * 2;
          } else if (metric.name === 'API Requests') {
            newValue = Math.floor(Math.random() * 3000) + 500;
          } else if (metric.name === 'Queue Size') {
            newValue = Math.floor(Math.random() * 100) + 10;
          } else {
            newValue = Math.floor(Math.random() * 90) + 10;
          }
          
          const status = 
            newValue > metric.max * 0.8 ? 'critical' :
            newValue > metric.max * 0.6 ? 'warning' : 'healthy';
            
          return { ...metric, value: newValue, status };
        })
      );
      
      // Fetch fresh optimization metrics
      await fetchOptimizationMetrics();
      
      toast({
        title: "Metrics Refreshed",
        description: "The Hermes + Oxum system metrics have been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to update system metrics.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-primary" />
              Hermes + Oxum Monitor
            </CardTitle>
            <CardDescription>
              AI model generation and optimization system
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshMetrics}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {systemMetrics.map((metric) => (
                <div key={metric.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label>{metric.name}</Label>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      metric.status === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {metric.name === 'Error Rate' ? `${metric.value.toFixed(1)}%` : 
                      metric.name === 'CPU Usage' || metric.name === 'Memory Usage' ? 
                        `${Math.round(metric.value)}%` : 
                        metric.value.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.max) * 100} 
                    className={`h-2 ${
                      metric.status === 'healthy' ? 'bg-green-100' :
                      metric.status === 'warning' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}
                  />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Bot className="mr-2 h-4 w-4" />
                  Active AI Models
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Models</span>
                    <span className="font-medium">487</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Now</span>
                    <span className="font-medium">312</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In Generation</span>
                    <span className="font-medium">24</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  System Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg. Generation Time</span>
                    <span className="font-medium">12.4s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Response Time</span>
                    <span className="font-medium">0.8s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Request Success Rate</span>
                    <span className="font-medium">99.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-4 mt-4">
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  AI Model Performance Metrics
                </h4>
                
                {optimizationMetrics ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Conversion Rate</span>
                        <span className="text-sm font-medium">
                          {(optimizationMetrics.conversionRate * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={optimizationMetrics.conversionRate * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Engagement Score</span>
                        <span className="text-sm font-medium">
                          {optimizationMetrics.engagementScore.toFixed(1)}/100
                        </span>
                      </div>
                      <Progress value={optimizationMetrics.engagementScore} className="h-2" />
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Recommended Optimizations:</h5>
                      <ul className="space-y-1 text-sm">
                        {optimizationMetrics.recommendedChanges.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No optimization metrics available. Click refresh to fetch the latest data.
                  </div>
                )}
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => fetchOptimizationMetrics()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh Metrics
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" value="••••••••••••••••" disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input id="endpoint" value="https://api.hermes-oxum.uberescorts.com/v1" disabled />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model-quota">Daily Model Generation Quota</Label>
                  <Input id="model-quota" type="number" value="500" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content-quota">Daily Content Generation Quota</Label>
                  <Input id="content-quota" type="number" value="2500" />
                </div>
              </div>
              
              <Button className="w-full mt-2">
                <Settings className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-1">
        <p className="text-xs text-muted-foreground w-full text-center">
          Hermes + Oxum System v1.2.4 • Last Updated: {new Date().toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default HermesOxumMonitor;
