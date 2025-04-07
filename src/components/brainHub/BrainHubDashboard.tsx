
// Update BrainHubDashboard to use the proper type for updating config
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { brainHub, BrainHubConfig } from '@/services/neural/HermesOxumBrainHub';
import BrainHubConfig from '@/components/admin/BrainHubConfig';

const BrainHubDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  
  // Simulate system metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(Math.random() * 40 + 30);
      setMemoryUsage(Math.random() * 30 + 40);
      setRequestsPerSecond(Math.floor(Math.random() * 150));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to optimize Brain Hub
  const handleOptimize = () => {
    // Get current config
    const currentConfig = brainHub.getConfig();
    
    // Create an optimized config
    const optimizedConfig: BrainHubConfig = {
      ...currentConfig,
      psychology: {
        ...currentConfig.psychology,
        behaviourPrediction: true
      },
      physics: {
        ...currentConfig.physics,
        fluidDynamics: cpuUsage > 50 ? false : true
      },
      predictiveModulationEnabled: true
    };
    
    // Update the config
    brainHub.updateConfig(optimizedConfig);
    
    // Force memory usage down (simulation)
    setMemoryUsage(prev => Math.max(prev * 0.7, 25));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brain Hub Dashboard</h1>
        <Button onClick={handleOptimize}>Optimize Resources</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cpuUsage.toFixed(1)}%</div>
            <Progress value={cpuUsage} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memoryUsage.toFixed(1)}%</div>
            <Progress value={memoryUsage} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Requests Per Second</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestsPerSecond}</div>
            <Progress value={(requestsPerSecond / 200) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Brain Hub System Overview</h3>
              <p className="mb-4 text-muted-foreground">
                The Hermes Oxum Brain Hub system is currently operating at {(cpuUsage + memoryUsage) / 2 > 60 ? 'high' : 'normal'} load.
              </p>
              
              {/* System details would go here */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">Active Models</h4>
                <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                  <li>Emotional Analysis Engine</li>
                  <li>Content Filtering System</li>
                  <li>Regional Compliance Engine</li>
                  <li>Behavior Prediction Modeler</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="config" className="mt-4">
          <BrainHubConfig />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">System Logs</h3>
              <div className="bg-muted rounded-md p-4 font-mono text-xs h-64 overflow-y-auto">
                <div className="text-gray-500">[2025-04-07T16:32:08Z] info: HERMES API initialized in mock mode</div>
                <div className="text-gray-500">[2025-04-07T16:32:15Z] info: HERMES API initialized in mock mode</div>
                <div className="text-green-500">[2025-04-07T16:35:22Z] info: Content filtering engine started</div>
                <div className="text-green-500">[2025-04-07T16:35:24Z] info: Geo-legal restrictions applied for regions: [US, UK, EU]</div>
                <div className="text-yellow-500">[2025-04-07T16:36:01Z] warn: High CPU usage detected (76%)</div>
                <div className="text-green-500">[2025-04-07T16:36:05Z] info: Auto-scaling initiated</div>
                <div className="text-gray-500">[2025-04-07T16:36:22Z] info: Memory usage stable at 42%</div>
                <div className="text-green-500">[2025-04-07T16:37:30Z] info: Neural prediction models loaded</div>
                <div className="text-green-500">[2025-04-07T16:38:45Z] info: AI emotional states initialized</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
