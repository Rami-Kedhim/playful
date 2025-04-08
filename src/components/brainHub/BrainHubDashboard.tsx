
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { BrainHubConfig } from '@/types/brainHub';
import BrainHubConfigPanel from '@/components/admin/BrainHubConfig';
import { nsfwAIProviderService } from '@/services/ai/NSFWAIProviderService';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoCircledIcon, PlayIcon, StopIcon } from '@radix-ui/react-icons';

const BrainHubDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  const [providers, setProviders] = useState(nsfwAIProviderService.getProviders());
  const [brainHubConfig, setBrainHubConfig] = useState(brainHub.getConfig());
  const [autonomyEnabled, setAutonomyEnabled] = useState(false);
  
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
      economics: currentConfig.economics,
      robotics: currentConfig.robotics,
      geoLegalFilteringEnabled: currentConfig.geoLegalFilteringEnabled,
      neuroEmotionEnabled: currentConfig.neuroEmotionEnabled,
      predictiveModulationEnabled: true
    };
    
    // Update the config
    brainHub.updateConfig(optimizedConfig);
    setBrainHubConfig(optimizedConfig);
    
    // Force memory usage down (simulation)
    setMemoryUsage(prev => Math.max(prev * 0.7, 25));
  };

  // Toggle Brain Hub autonomy mode
  const toggleAutonomy = () => {
    setAutonomyEnabled(prev => !prev);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Brain Hub Dashboard</h1>
          <p className="text-muted-foreground">Hermes + Oxum Neural System Integration</p>
        </div>
        <div className="space-x-2">
          <Button onClick={handleOptimize} variant="outline">Optimize Resources</Button>
          <Button 
            onClick={toggleAutonomy} 
            variant={autonomyEnabled ? "destructive" : "default"}
          >
            {autonomyEnabled ? (
              <>
                <StopIcon className="mr-2 h-4 w-4" /> Disable Autonomy
              </>
            ) : (
              <>
                <PlayIcon className="mr-2 h-4 w-4" /> Enable Autonomy
              </>
            )}
          </Button>
        </div>
      </div>
      
      {autonomyEnabled && (
        <Alert variant="warning">
          <InfoCircledIcon className="h-4 w-4" />
          <AlertTitle>Autonomy Mode Enabled</AlertTitle>
          <AlertDescription>
            Brain Hub is now operating in autonomous mode with minimal human oversight. 
            The system will self-optimize and make decisions about AI model selection, content filtering,
            and resource allocation.
          </AlertDescription>
        </Alert>
      )}
      
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
          <TabsTrigger value="aiProviders">AI Providers</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Brain Hub System Overview</h3>
              <p className="mb-4 text-muted-foreground">
                The Hermes Oxum Brain Hub system is currently operating at {(cpuUsage + memoryUsage) / 2 > 60 ? 'high' : 'normal'} load.
                {autonomyEnabled && ' The system is in autonomous mode, making decisions with minimal human intervention.'}
              </p>
              
              {/* System details */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">Active Models</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {brainHubConfig.psychology.emotionalAnalysis && <Badge>Emotional Analysis</Badge>}
                  {brainHubConfig.psychology.personalityModeling && <Badge>Personality Modeling</Badge>}
                  {brainHubConfig.psychology.behaviourPrediction && <Badge>Behavior Prediction</Badge>}
                  {brainHubConfig.psychology.sentimentAnalysis && <Badge>Sentiment Analysis</Badge>}
                  {brainHubConfig.neuroEmotionEnabled && <Badge variant="secondary">Neuro-Emotion</Badge>}
                  {brainHubConfig.geoLegalFilteringEnabled && <Badge variant="outline">Geo-Legal Filter</Badge>}
                </div>
                
                <h4 className="font-medium mb-2">Available AI Providers</h4>
                <div className="flex flex-wrap gap-2">
                  {providers.map((provider) => (
                    <Badge 
                      key={provider.id}
                      variant={provider.nsfwAllowed ? "destructive" : "default"}
                    >
                      {provider.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="aiProviders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <Card key={provider.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-md">{provider.name}</CardTitle>
                        <Badge variant={provider.nsfwAllowed ? "destructive" : "default"}>
                          {provider.nsfwAllowed ? 'NSFW' : 'SFW'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Model ID:</span>
                        <span>{provider.modelId}</span>
                        <span className="text-muted-foreground">Temperature:</span>
                        <span>{provider.temperature}</span>
                        <span className="text-muted-foreground">Max Tokens:</span>
                        <span>{provider.maxTokens}</span>
                        <span className="text-muted-foreground">Capabilities:</span>
                        <span>{provider.supportedCapabilities.join(', ')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="config" className="mt-4">
          <BrainHubConfigPanel />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">System Logs</h3>
              <div className="bg-muted rounded-md p-4 font-mono text-xs h-64 overflow-y-auto">
                <div className="text-gray-500">[2025-04-07T16:32:08Z] info: HERMES API initialized in mock mode</div>
                <div className="text-green-500">[2025-04-07T16:35:22Z] info: Content filtering engine started</div>
                <div className="text-green-500">[2025-04-07T16:35:24Z] info: Geo-legal restrictions applied for regions: [US, UK, EU]</div>
                <div className="text-yellow-500">[2025-04-07T16:36:01Z] warn: High CPU usage detected (76%)</div>
                <div className="text-green-500">[2025-04-07T16:36:05Z] info: Auto-scaling initiated</div>
                <div className="text-gray-500">[2025-04-07T16:36:22Z] info: Memory usage stable at 42%</div>
                <div className="text-green-500">[2025-04-07T16:37:30Z] info: Neural prediction models loaded</div>
                <div className="text-red-500">[2025-04-07T16:37:45Z] error: NSFW content blocked in restricted region</div>
                <div className="text-green-500">[2025-04-07T16:38:45Z] info: AI emotional states initialized</div>
                <div className="text-blue-500">[2025-04-07T16:39:00Z] info: Autonomous mode {autonomyEnabled ? 'enabled' : 'disabled'}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
