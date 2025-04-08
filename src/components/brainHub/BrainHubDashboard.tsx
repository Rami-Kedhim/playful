
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Settings, 
  Activity, 
  BarChart, 
  AlertCircle, 
  CheckCircle, 
  Database, 
  RefreshCw,
  Sliders,
  Bot,
  User,
  Rocket
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { brainHub } from "@/services/neural/HermesOxumBrainHub";

const BrainHubDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [autonomyEnabled, setAutonomyEnabled] = useState(false);
  const [autonomyLevel, setAutonomyLevel] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    requestsPerMinute: 0,
    lastOptimized: 0
  });
  const [capabilities, setCapabilities] = useState<any>({});
  const [configExpanded, setConfigExpanded] = useState(false);
  const [decisionLogs, setDecisionLogs] = useState<any[]>([]);
  const [testRegion, setTestRegion] = useState("global");
  const [testNSFW, setTestNSFW] = useState(false);
  const [testQuality, setTestQuality] = useState<'basic' | 'premium'>('basic');
  const [recommendedProvider, setRecommendedProvider] = useState<any>(null);

  // Initialize data from Brain Hub
  useEffect(() => {
    // Get autonomy status
    const autonomyStatus = brainHub.getAutonomyStatus();
    setAutonomyEnabled(autonomyStatus.enabled);
    setAutonomyLevel(autonomyStatus.level);
    
    // Get system status
    setSystemStatus(brainHub.getSystemStatus());
    
    // Get capabilities
    setCapabilities(brainHub.getCapabilities());
    
    // Get decision logs
    setDecisionLogs(brainHub.getDecisionLogs(10));
    
    // Refresh data every 10 seconds
    const interval = setInterval(() => {
      setSystemStatus(brainHub.getSystemStatus());
      setDecisionLogs(brainHub.getDecisionLogs(10));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Update Brain Hub autonomy settings
  const handleAutonomyChange = (enabled: boolean) => {
    brainHub.setAutonomy(enabled, autonomyLevel);
    setAutonomyEnabled(enabled);
    
    toast({
      title: enabled ? "Brain Hub Autonomy Enabled" : "Brain Hub Autonomy Disabled",
      description: `Autonomy level: ${autonomyLevel}%`,
    });
  };
  
  // Update autonomy level
  const handleAutonomyLevelChange = (value: number[]) => {
    const level = value[0];
    brainHub.setAutonomy(autonomyEnabled, level);
    setAutonomyLevel(level);
  };
  
  // Toggle capabilities
  const toggleCapability = (category: string, capability: string, enabled: boolean) => {
    brainHub.toggleCapability(category as any, capability as any, enabled);
    
    // Update local state
    setCapabilities(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [capability]: enabled
      }
    }));
    
    toast({
      title: `Capability ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${category}.${capability} is now ${enabled ? 'active' : 'inactive'}`,
    });
  };
  
  // Test provider recommendation
  const testProviderRecommendation = () => {
    const result = brainHub.getRecommendedProvider({
      isNSFW: testNSFW,
      userRegion: testRegion,
      quality: testQuality
    });
    
    setRecommendedProvider(result);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Brain Hub Control Center</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant={autonomyEnabled ? "default" : "outline"} className="py-1 px-3">
            {autonomyEnabled ? `Autonomy: ${autonomyLevel}%` : "Manual Mode"}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setSystemStatus(brainHub.getSystemStatus())}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="capabilities">
            <Sliders className="h-4 w-4 mr-2" />
            Capabilities
          </TabsTrigger>
          <TabsTrigger value="intelligence">
            <Bot className="h-4 w-4 mr-2" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Database className="h-4 w-4 mr-2" />
            Decision Logs
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Load</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStatus.cpuUsage}%</div>
                <p className="text-xs text-muted-foreground">CPU Utilization</p>
                <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${systemStatus.cpuUsage > 70 ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${systemStatus.cpuUsage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStatus.memoryUsage}%</div>
                <p className="text-xs text-muted-foreground">RAM Utilization</p>
                <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${systemStatus.memoryUsage > 80 ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${systemStatus.memoryUsage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Request Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStatus.requestsPerMinute}</div>
                <p className="text-xs text-muted-foreground">Requests per minute</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Autonomy Status</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{autonomyEnabled ? 'Enabled' : 'Disabled'}</div>
                <p className="text-xs text-muted-foreground">Level: {autonomyLevel}%</p>
                <div className="mt-4 flex items-center space-x-2">
                  <Switch
                    checked={autonomyEnabled}
                    onCheckedChange={handleAutonomyChange}
                  />
                  <Label>Toggle Autonomy</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Autonomy Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Autonomy Level: {autonomyLevel}%</Label>
                  <span className={autonomyLevel > 70 ? 'text-destructive' : 'text-muted-foreground'}>
                    {autonomyLevel < 30 ? 'Conservative' : autonomyLevel < 70 ? 'Balanced' : 'Aggressive'}
                  </span>
                </div>
                <Slider
                  value={[autonomyLevel]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={handleAutonomyLevelChange}
                  disabled={!autonomyEnabled}
                />
                <p className="text-sm text-muted-foreground">
                  Controls how much the Brain Hub can act without human oversight. Higher values allow more autonomous decisions.
                </p>
              </div>
              
              {autonomyLevel > 70 && (
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>High Autonomy Warning</AlertTitle>
                  <AlertDescription>
                    At this level, Brain Hub will make significant decisions with minimal human oversight. 
                    Monitor system logs closely.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="capabilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Project Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.projectManagement && Object.entries(capabilities.projectManagement).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                    <Switch 
                      checked={value} 
                      onCheckedChange={(enabled) => toggleCapability('projectManagement', key, enabled)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Platform Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.platformOptimization && Object.entries(capabilities.platformOptimization).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                    <Switch 
                      checked={value} 
                      onCheckedChange={(enabled) => toggleCapability('platformOptimization', key, enabled)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.userIntelligence && Object.entries(capabilities.userIntelligence).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                    <Switch 
                      checked={value} 
                      onCheckedChange={(enabled) => toggleCapability('userIntelligence', key, enabled)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Growth Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.growthEngagement && Object.entries(capabilities.growthEngagement).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                    <Switch 
                      checked={value} 
                      onCheckedChange={(enabled) => toggleCapability('growthEngagement', key, enabled)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="intelligence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider Recommendation Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>User Region</Label>
                  <Input 
                    value={testRegion} 
                    onChange={(e) => setTestRegion(e.target.value)}
                    placeholder="e.g., us, eu, global"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      checked={testNSFW}
                      onCheckedChange={setTestNSFW}
                    />
                    <span>NSFW Content</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Quality</Label>
                  <div className="flex items-center space-x-4 pt-2">
                    <Toggle
                      pressed={testQuality === 'basic'}
                      onPressedChange={() => setTestQuality('basic')}
                      variant="outline"
                    >
                      Basic
                    </Toggle>
                    <Toggle
                      pressed={testQuality === 'premium'}
                      onPressedChange={() => setTestQuality('premium')}
                      variant="outline"
                    >
                      Premium
                    </Toggle>
                  </div>
                </div>
              </div>
              
              <Button onClick={testProviderRecommendation}>
                Test Provider Recommendation
              </Button>
              
              {recommendedProvider && (
                <Alert className={recommendedProvider.nsfwAllowed ? "border-amber-500" : "border-green-500"}>
                  {recommendedProvider.nsfwAllowed ? 
                    <AlertCircle className="h-4 w-4 text-amber-500" /> : 
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  }
                  <AlertTitle>Recommended Provider: {recommendedProvider.provider}</AlertTitle>
                  <AlertDescription>
                    <p>Reason: {recommendedProvider.reason}</p>
                    <p>NSFW Content: {recommendedProvider.nsfwAllowed ? "Allowed" : "Not Allowed"}</p>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Decision Logs</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setDecisionLogs(brainHub.getDecisionLogs(10))}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {decisionLogs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No decision logs available</p>
                ) : (
                  decisionLogs.map((log, index) => (
                    <div key={index} className="border rounded-md p-3 space-y-1">
                      <div className="flex justify-between">
                        <Badge variant="outline">{log.decision}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm truncate">
                        {JSON.stringify(log.context).substring(0, 100)}
                        {JSON.stringify(log.context).length > 100 ? '...' : ''}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brain Hub Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Geo-Legal Filtering</Label>
                  <Switch checked={true} disabled />
                </div>
                <p className="text-xs text-muted-foreground">
                  Ensures content complies with regional legal requirements.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Neuro-Emotion Processing</Label>
                  <Switch checked={true} disabled />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enables emotional context detection in AI interactions.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Predictive Modulation</Label>
                  <Switch checked={false} disabled />
                </div>
                <p className="text-xs text-muted-foreground">
                  Advanced algorithm adjustment based on predictive models.
                </p>
              </div>
              
              <Button variant="outline" onClick={() => setConfigExpanded(!configExpanded)}>
                {configExpanded ? "Hide Advanced Config" : "Show Advanced Config"}
              </Button>
              
              {configExpanded && (
                <div className="mt-4 border rounded-md p-4 space-y-4">
                  <h3 className="text-lg font-medium">Advanced Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    These settings require administrative approval to modify.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Psychology Model</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Emotional Analysis</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Personality Modeling</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Behaviour Prediction</span>
                          <Switch checked={false} disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Economics Model</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Dynamic Pricing</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Demand Forecasting</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Market Simulation</span>
                          <Switch checked={false} disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
