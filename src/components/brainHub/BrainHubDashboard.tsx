import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import AutonomyModulesPanel from './AutonomyModulesPanel';
import SecurityModulesPanel from './SecurityModulesPanel';
import BusinessIntelligencePanel from './BusinessIntelligencePanel';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import securityEngine from '@/services/neural/BrainHubSecurityEngine';
import {
  Brain,
  BarChart,
  Settings,
  Lock,
  MessageSquare,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  Cpu,
  CheckCircle,
  XCircle,
  PlayCircle,
  Zap,
  Shield,
  DollarSign,
  Lightbulb
} from 'lucide-react';

interface ModuleCapabilities {
  [key: string]: boolean;
}

const BrainHubDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [brainHubConfig, setBrainHubConfig] = useState(brainHub.getConfig());
  const [systemStatus, setSystemStatus] = useState(brainHub.getSystemStatus());
  const [autonomyStatus, setAutonomyStatus] = useState(brainHub.getAutonomyStatus());
  const [capabilities, setCapabilities] = useState(brainHub.getCapabilities());
  const [decisionLogs, setDecisionLogs] = useState<{timestamp: number, decision: string, context: any}[]>([]);
  const [enhancedSystemMetrics, setEnhancedSystemMetrics] = useState<any>(null);
  
  const [testRegion, setTestRegion] = useState("global");
  const [testNSFW, setTestNSFW] = useState(false);
  const [testQuality, setTestQuality] = useState<'basic' | 'premium'>('basic');
  const [providerResult, setProviderResult] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(brainHub.getSystemStatus());
      
      try {
        if (typeof brainHub.getEnhancedSystemMetrics === 'function') {
          setEnhancedSystemMetrics(brainHub.getEnhancedSystemMetrics());
        }
      } catch (e) {
        console.log('Enhanced metrics not available');
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchLogs = () => {
      setDecisionLogs(brainHub.getDecisionLogs());
    };
    
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAutonomyChange = (value: number[]) => {
    const level = value[0];
    brainHub.setAutonomy(autonomyStatus.enabled, level);
    
    if (autonomyEngine) {
      autonomyEngine.setAutonomyLevel(level);
    }
    
    setAutonomyStatus(brainHub.getAutonomyStatus());
    toast({
      title: "Autonomy Level Updated",
      description: `Brain Hub autonomy level set to ${level}%`,
    });
  };
  
  const toggleAutonomy = () => {
    const newState = !autonomyStatus.enabled;
    brainHub.setAutonomy(newState, autonomyStatus.level);
    
    if (autonomyEngine) {
      if (newState) {
        autonomyEngine.start();
      } else {
        autonomyEngine.stop();
      }
    }
    
    setAutonomyStatus(brainHub.getAutonomyStatus());
    toast({
      title: autonomyStatus.enabled ? "Autonomy Disabled" : "Autonomy Enabled",
      description: autonomyStatus.enabled 
        ? "Brain Hub will now operate in manual mode" 
        : `Brain Hub will now operate autonomously at ${autonomyStatus.level}% autonomy level`,
    });
  };
  
  const toggleCapability = (category: string, capability: string, enabled: boolean) => {
    brainHub.toggleCapability(category as any, capability as any, enabled);
    setCapabilities(brainHub.getCapabilities());
    toast({
      title: `Capability ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${category}.${capability} is now ${enabled ? 'active' : 'inactive'}`,
    });
  };
  
  const testProviderRecommendation = () => {
    const result = brainHub.getRecommendedProvider({
      isNSFW: testNSFW,
      userRegion: testRegion,
      quality: testQuality
    });
    
    setProviderResult(result);
    toast({
      title: "Provider Recommendation",
      description: `Recommended provider: ${result.provider} (${result.reason})`,
    });
  };
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  useEffect(() => {
    if (securityEngine && !securityEngine.getMonitoringStatus()) {
      securityEngine.startMonitoring();
    }
  }, []);
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Brain className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">HERMES-OXUM Brain Hub</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${
            autonomyStatus.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {autonomyStatus.enabled 
              ? <CheckCircle className="h-4 w-4" /> 
              : <XCircle className="h-4 w-4" />
            }
            <span className="font-medium">
              {autonomyStatus.enabled 
                ? `Autonomous (${autonomyStatus.level}%)` 
                : 'Manual Control'
              }
            </span>
          </div>
          <Button
            variant={autonomyStatus.enabled ? "destructive" : "default"}
            onClick={toggleAutonomy}
          >
            {autonomyStatus.enabled ? 'Disable Autonomy' : 'Enable Autonomy'}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-8 mb-8">
          <TabsTrigger value="status">
            <BarChart className="h-4 w-4 mr-2" />
            System Status
          </TabsTrigger>
          <TabsTrigger value="capabilities">
            <Cpu className="h-4 w-4 mr-2" />
            Capabilities
          </TabsTrigger>
          <TabsTrigger value="autonomy">
            <Zap className="h-4 w-4 mr-2" />
            Autonomy
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="intelligence">
            <Lightbulb className="h-4 w-4 mr-2" />
            Intelligence
          </TabsTrigger>
          <TabsTrigger value="ai-providers">
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Providers
          </TabsTrigger>
          <TabsTrigger value="decisions">
            <Database className="h-4 w-4 mr-2" />
            Decision Log
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{systemStatus.cpuUsage}%</div>
                <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      systemStatus.cpuUsage > 80 ? 'bg-red-500' : 
                      systemStatus.cpuUsage > 60 ? 'bg-amber-500' : 
                      'bg-emerald-500'
                    }`} 
                    style={{width: `${systemStatus.cpuUsage}%`}}
                  ></div>
                </div>
                {enhancedSystemMetrics && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Predicted: {enhancedSystemMetrics.predictive.predictedLoadIn1Hour.toFixed(1)}% in 1hr
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{systemStatus.memoryUsage}%</div>
                <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      systemStatus.memoryUsage > 80 ? 'bg-red-500' : 
                      systemStatus.memoryUsage > 60 ? 'bg-amber-500' : 
                      'bg-emerald-500'
                    }`} 
                    style={{width: `${systemStatus.memoryUsage}%`}}
                  ></div>
                </div>
                {enhancedSystemMetrics && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Predicted: {enhancedSystemMetrics.predictive.predictedMemoryIn1Hour.toFixed(1)}% in 1hr
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Requests/min</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{systemStatus.requestsPerMinute}</div>
                <div className="text-sm text-muted-foreground">
                  Last optimized: {new Date(systemStatus.lastOptimized).toLocaleTimeString()}
                </div>
                {enhancedSystemMetrics && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Predicted: {enhancedSystemMetrics.predictive.predictedRequestsIn1Hour.toFixed(1)} in 1hr
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Autonomy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-3xl font-bold ${autonomyStatus.enabled ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {autonomyStatus.level}%
                  </div>
                  <Switch 
                    checked={autonomyStatus.enabled}
                    onCheckedChange={toggleAutonomy}
                  />
                </div>
                <Slider
                  value={[autonomyStatus.level]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={handleAutonomyChange}
                  disabled={!autonomyStatus.enabled}
                />
              </CardContent>
            </Card>
          </div>
          
          {enhancedSystemMetrics && enhancedSystemMetrics.predictive.optimizationOpportunities.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {enhancedSystemMetrics.predictive.optimizationOpportunities.map((opportunity: string, index: number) => (
                    <li key={index} className="text-amber-800">{opportunity}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t border-amber-200 pt-2">
                <Button variant="outline" className="text-amber-800 border-amber-300 hover:bg-amber-100">
                  Apply Optimizations
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Real-time status of all Brain Hub services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-primary" />
                    <span>Core Processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <span>Geo-Legal Filtering</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    <span>Neuro-Emotion Engine</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    <span>Security Engine</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    <span>Autonomy Engine</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${autonomyStatus.enabled ? 'bg-emerald-500' : 'bg-amber-500'} mr-2`}></div>
                    <span className="text-sm">{autonomyStatus.enabled ? 'Active' : 'Paused'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="capabilities" className="space-y-6">
          {Object.entries(capabilities).map(([category, moduleCapabilities]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">{category.replace(/([A-Z])/g, ' $1')}</CardTitle>
                <CardDescription>Toggle individual capabilities in this module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(moduleCapabilities as ModuleCapabilities).map(([capability, enabled]) => (
                    <div key={capability} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <span className="capitalize">{capability.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <Switch 
                        checked={enabled}
                        onCheckedChange={(checked) => toggleCapability(category, capability, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="autonomy" className="space-y-6">
          <AutonomyModulesPanel />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <SecurityModulesPanel />
        </TabsContent>
        
        <TabsContent value="intelligence" className="space-y-6">
          <BusinessIntelligencePanel />
        </TabsContent>
        
        <TabsContent value="ai-providers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider Recommendation Tester</CardTitle>
              <CardDescription>Test how provider selection works in different scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testRegion">User Region</Label>
                  <Select value={testRegion} onValueChange={setTestRegion}>
                    <SelectTrigger id="testRegion">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testQuality">Quality Tier</Label>
                  <Select 
                    value={testQuality} 
                    onValueChange={(value) => setTestQuality(value as 'basic' | 'premium')}
                  >
                    <SelectTrigger id="testQuality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="testNSFW"
                      checked={testNSFW}
                      onCheckedChange={setTestNSFW}
                    />
                    <Label htmlFor="testNSFW">NSFW Content</Label>
                  </div>
                </div>
              </div>
              
              <Button onClick={testProviderRecommendation} className="w-full">
                Test Provider Selection
              </Button>
              
              {providerResult && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Provider</p>
                      <p className="font-medium">{providerResult.provider}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reason</p>
                      <p className="font-medium">{providerResult.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NSFW Allowed</p>
                      <p className="font-medium">{providerResult.nsfwAllowed ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available AI Providers</CardTitle>
              <CardDescription>Connected AI providers and their capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-3">O</div>
                    <div>
                      <h4 className="font-medium">OpenAI</h4>
                      <p className="text-sm text-muted-foreground">Safe, compliant content generation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Connected</div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold mr-3">N</div>
                    <div>
                      <h4 className="font-medium">Nomi</h4>
                      <p className="text-sm text-muted-foreground">Premium NSFW conversation engine</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">API Key Required</div>
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold mr-3">K</div>
                    <div>
                      <h4 className="font-medium">KoboldAI</h4>
                      <p className="text-sm text-muted-foreground">Standard NSFW content generation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">API Key Required</div>
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">Refresh Status</Button>
              <Button variant="default">Connect New Provider</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="decisions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Decision Log</CardTitle>
              <CardDescription>Historical record of decisions made by Brain Hub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {decisionLogs.length > 0 ? (
                  decisionLogs.map((log, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium capitalize">{log.decision.replace(/_/g, ' ')}</span>
                        <span className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                      </div>
                      <div className="mt-1 text-sm">
                        <pre className="whitespace-pre-wrap bg-muted p-2 rounded text-xs overflow-hidden">
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    No decisions have been logged yet
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button variant="outline" onClick={() => setDecisionLogs(brainHub.getDecisionLogs())}>
                Refresh Log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure core Brain Hub settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Geo-Legal Filtering</h4>
                  <p className="text-sm text-muted-foreground">Enable region-specific content filtering</p>
                </div>
                <Switch 
                  checked={brainHubConfig.geoLegalFilteringEnabled}
                  onCheckedChange={(checked) => {
                    const newConfig = { ...brainHubConfig, geoLegalFilteringEnabled: checked };
                    brainHub.updateConfig(newConfig);
                    setBrainHubConfig(newConfig);
                    
                    toast({
                      title: checked ? "Geo-Legal Filtering Enabled" : "Geo-Legal Filtering Disabled",
                      description: checked 
                        ? "Content will be filtered based on regional restrictions"
                        : "No regional content filtering will be applied",
                    });
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Neuro-Emotion Processing</h4>
                  <p className="text-sm text-muted-foreground">Enable emotional context analysis</p>
                </div>
                <Switch 
                  checked={brainHubConfig.neuroEmotionEnabled}
                  onCheckedChange={(checked) => {
                    const newConfig = { ...brainHubConfig, neuroEmotionEnabled: checked };
                    brainHub.updateConfig(newConfig);
                    setBrainHubConfig(newConfig);
                    
                    toast({
                      title: checked ? "Neuro-Emotion Processing Enabled" : "Neuro-Emotion Processing Disabled",
                      description: checked 
                        ? "Emotional context will be analyzed for better responses"
                        : "No emotional context analysis will be performed",
                    });
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Predictive Modulation</h4>
                  <p className="text-sm text-muted-foreground">Enable predictive algorithm enhancements</p>
                </div>
                <Switch 
                  checked={brainHubConfig.predictiveModulationEnabled}
                  onCheckedChange={(checked) => {
                    const newConfig = { ...brainHubConfig, predictiveModulationEnabled: checked };
                    brainHub.updateConfig(newConfig);
                    setBrainHubConfig(newConfig);
                    
                    toast({
                      title: checked ? "Predictive Modulation Enabled" : "Predictive Modulation Disabled",
                      description: checked 
                        ? "Algorithms will be enhanced with predictive models"
                        : "No predictive enhancements will be applied",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubDashboard;
