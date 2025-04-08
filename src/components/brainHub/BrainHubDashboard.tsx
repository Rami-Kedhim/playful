
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { BrainHubConfig } from '@/types/brainHub';
import BrainHubConfigPanel from '@/components/admin/BrainHubConfig';
import { nsfwAIProviderService } from '@/services/ai/NSFWAIProviderService';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoCircledIcon, PlayIcon, StopIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const BrainHubDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  const [providers, setProviders] = useState(nsfwAIProviderService.getProviders());
  const [brainHubConfig, setBrainHubConfig] = useState(brainHub.getConfig());
  const [autonomyEnabled, setAutonomyEnabled] = useState(false);
  const [autonomyLevel, setAutonomyLevel] = useState(50);
  const [capabilities, setCapabilities] = useState<any>({}); // Will store Brain Hub capabilities
  const [decisionLogs, setDecisionLogs] = useState<any[]>([]); // Store decision logs
  
  // Load initial status from Brain Hub
  useEffect(() => {
    // Get autonomy status
    const autonomyStatus = brainHub.getAutonomyStatus();
    setAutonomyEnabled(autonomyStatus.enabled);
    setAutonomyLevel(autonomyStatus.level);
    
    // Get capabilities
    setCapabilities(brainHub.getCapabilities());
    
    // Get decision logs
    setDecisionLogs(brainHub.getDecisionLogs(20));
  }, []);
  
  // Simulate system metrics
  useEffect(() => {
    const timer = setInterval(() => {
      const status = brainHub.getSystemStatus();
      setCpuUsage(status.cpuUsage);
      setMemoryUsage(status.memoryUsage);
      setRequestsPerSecond(Math.floor(status.requestsPerMinute / 60));
      
      // Get latest decision logs
      setDecisionLogs(brainHub.getDecisionLogs(20));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to optimize Brain Hub
  const handleOptimize = () => {
    brainHub.optimizeSystem();
    
    // Update config state
    setBrainHubConfig(brainHub.getConfig());
    
    // Get updated system status
    const status = brainHub.getSystemStatus();
    setCpuUsage(status.cpuUsage);
    setMemoryUsage(status.memoryUsage);
  };

  // Toggle Brain Hub autonomy mode
  const toggleAutonomy = () => {
    const newState = !autonomyEnabled;
    brainHub.setAutonomy(newState, autonomyLevel);
    setAutonomyEnabled(newState);
  };
  
  // Update autonomy level
  const handleAutonomyLevelChange = (value: number[]) => {
    const level = value[0];
    setAutonomyLevel(level);
    brainHub.setAutonomy(autonomyEnabled, level);
  };
  
  // Toggle a specific capability
  const toggleCapability = (category: string, capability: string, enabled: boolean) => {
    brainHub.toggleCapability(category as any, capability, enabled);
    setCapabilities(brainHub.getCapabilities());
  };
  
  // Test provider recommendation
  const testProviderRecommendation = (isNSFW: boolean, region: string) => {
    const recommendation = brainHub.getRecommendedProvider({
      isNSFW,
      userRegion: region,
      quality: 'premium'
    });
    
    console.log('Provider recommendation:', recommendation);
    return recommendation;
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
            and resource allocation. Current autonomy level: {autonomyLevel}%
          </AlertDescription>
          <div className="mt-4">
            <Label>Autonomy Level</Label>
            <Slider
              defaultValue={[autonomyLevel]}
              max={100}
              step={1}
              className="mt-2"
              onValueChange={handleAutonomyLevelChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low Autonomy</span>
              <span>High Autonomy</span>
            </div>
          </div>
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
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
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
                
                {/* Provider Recommendation Test */}
                <div className="mt-6 p-4 border rounded-md bg-muted/20">
                  <h4 className="font-medium mb-2">Provider Recommendation Test</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Button 
                        onClick={() => testProviderRecommendation(false, 'us')}
                        size="sm"
                        className="mb-2"
                      >
                        Test SFW Content (US)
                      </Button>
                      <Button 
                        onClick={() => testProviderRecommendation(true, 'us')}
                        size="sm"
                        variant="destructive"
                      >
                        Test NSFW Content (US)
                      </Button>
                    </div>
                    <div>
                      <Button 
                        onClick={() => testProviderRecommendation(false, 'jp')}
                        size="sm"
                        className="mb-2"
                      >
                        Test SFW Content (JP)
                      </Button>
                      <Button 
                        onClick={() => testProviderRecommendation(true, 'jp')}
                        size="sm"
                        variant="destructive"
                      >
                        Test NSFW Content (JP)
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Check browser console for recommendation results
                  </p>
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
        
        <TabsContent value="capabilities" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Brain Hub Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(capabilities).length > 0 ? (
                <div className="space-y-6">
                  {/* Project Management Capabilities */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Project Management</h3>
                    <div className="space-y-4">
                      {Object.entries(capabilities.projectManagement).map(([key, enabled]) => (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable autonomous project management capabilities
                            </p>
                          </div>
                          <Switch 
                            checked={enabled as boolean}
                            onCheckedChange={(checked) => 
                              toggleCapability('projectManagement', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Platform Optimization Capabilities */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Platform Optimization</h3>
                    <div className="space-y-4">
                      {Object.entries(capabilities.platformOptimization).map(([key, enabled]) => (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable autonomous platform optimization capabilities
                            </p>
                          </div>
                          <Switch 
                            checked={enabled as boolean}
                            onCheckedChange={(checked) => 
                              toggleCapability('platformOptimization', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* User Intelligence Capabilities */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">User Intelligence</h3>
                    <div className="space-y-4">
                      {Object.entries(capabilities.userIntelligence).map(([key, enabled]) => (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable advanced user analysis and personalization
                            </p>
                          </div>
                          <Switch 
                            checked={enabled as boolean}
                            onCheckedChange={(checked) => 
                              toggleCapability('userIntelligence', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Growth & Engagement Capabilities */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Growth & Engagement</h3>
                    <div className="space-y-4">
                      {Object.entries(capabilities.growthEngagement).map(([key, enabled]) => (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable growth optimization and user engagement features
                            </p>
                          </div>
                          <Switch 
                            checked={enabled as boolean}
                            onCheckedChange={(checked) => 
                              toggleCapability('growthEngagement', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading capabilities...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="config" className="mt-4">
          <BrainHubConfigPanel />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">System Logs & Decisions</h3>
              <div className="bg-muted rounded-md p-4 font-mono text-xs h-64 overflow-y-auto">
                {decisionLogs.map((log, index) => (
                  <div key={index} className="text-green-500 mb-1">
                    [{new Date(log.timestamp).toISOString()}] {log.decision}: {JSON.stringify(log.context)}
                  </div>
                ))}
                
                {/* Fallback logs if no decision logs yet */}
                {decisionLogs.length === 0 && (
                  <>
                    <div className="text-gray-500">[2025-04-07T16:32:08Z] info: HERMES API initialized in mock mode</div>
                    <div className="text-green-500">[2025-04-07T16:35:22Z] info: Content filtering engine started</div>
                    <div className="text-green-500">[2025-04-07T16:35:24Z] info: Geo-legal restrictions applied for regions: [US, UK, EU]</div>
                    <div className="text-yellow-500">[2025-04-07T16:36:01Z] warn: High CPU usage detected (76%)</div>
                    <div className="text-green-500">[2025-04-07T16:36:05Z] info: Auto-scaling initiated</div>
                    <div className="text-gray-500">[2025-04-07T16:36:22Z] info: Memory usage stable at 42%</div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
