
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart, Settings, Zap, AlertCircle, Database, Gauge, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
import hermesOxumIntegration from '@/services/integration/HermesOxumIntegration';
import { useHermesMode } from '@/hooks/auth/useHermesMode';
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';
import { debugObject } from '@/utils/debugUtils';

const HermesDebugPanel: React.FC = () => {
  const { toggleMode, isEnabled, settings, updateSettings } = useHermesMode();
  const { analyzeUser } = useUnifiedBehavioral();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMetrics, setSystemMetrics] = useState<any>({
    load: 0,
    stability: 0,
    userEngagement: 0,
    economicBalance: 0,
    lastUpdated: new Date()
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [modelParams, setModelParams] = useState(neuralHub.getModelParameters());
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [autoOptimize, setAutoOptimize] = useState(true);
  
  // Load initial data
  useEffect(() => {
    setSystemMetrics(neuralHub.getHealthMetrics());
    
    const metricsObserver = (metrics: any) => {
      setSystemMetrics(metrics);
      generateAiSuggestions(metrics);
    };
    
    neuralHub.addObserver(metricsObserver);
    
    return () => {
      neuralHub.removeObserver(metricsObserver);
    };
  }, []);
  
  // Auto-optimization effect
  useEffect(() => {
    if (!autoOptimize) return;
    
    const intervalId = setInterval(() => {
      if (systemMetrics.load > 0.8) {
        handleOptimizeSystem();
        toast({
          title: "Auto-Optimization Triggered",
          description: "System load exceeded threshold, automatic tuning applied",
          variant: "default"
        });
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [autoOptimize, systemMetrics.load]);
  
  const handleOptimizeSystem = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      // Adjust model parameters for optimal performance
      const optimizedParams = { ...modelParams };
      
      if (systemMetrics.load > 0.7) {
        // Reduce computational load
        optimizedParams.harmonicCount = Math.max(1, modelParams.harmonicCount - 1);
        optimizedParams.randomnessFactor = modelParams.randomnessFactor * 0.8;
      }
      
      if (systemMetrics.stability < 0.5) {
        // Improve stability
        optimizedParams.attractorStrength = modelParams.attractorStrength * 1.2;
        optimizedParams.noiseLevel = modelParams.noiseLevel * 0.7;
      }
      
      if (systemMetrics.userEngagement < 0.6) {
        // Boost user engagement
        optimizedParams.growthFactor = modelParams.growthFactor * 1.1;
        optimizedParams.cyclePeriod = Math.min(24, modelParams.cyclePeriod * 0.9);
      }
      
      // Apply optimization
      neuralHub.updateModelParameters(optimizedParams);
      setModelParams(optimizedParams);
      
      // Update user profile with optimized model
      analyzeUser();
      
      setIsOptimizing(false);
      
      toast({
        title: "System Optimization Complete",
        description: "Neural hub parameters have been tuned for optimal performance",
        variant: "default"
      });
    }, 2000);
  };
  
  const generateAiSuggestions = (metrics: any) => {
    // Generate AI suggestions based on system metrics
    const suggestions: string[] = [];
    
    if (metrics.load > 0.8) {
      suggestions.push("System load is high. Consider scaling resources or optimizing algorithms.");
    }
    
    if (metrics.stability < 0.6) {
      suggestions.push("System stability is below optimal levels. Tune non-linear dynamics parameters.");
    }
    
    if (metrics.userEngagement < 0.5) {
      suggestions.push("User engagement metrics are low. Review content strategy and UX flow.");
    }
    
    if (metrics.economicBalance < 0.7) {
      suggestions.push("Economic balance is suboptimal. Review monetization strategy.");
    }
    
    // Add more contextual suggestions
    if (new Date().getHours() >= 18 && new Date().getHours() <= 23) {
      suggestions.push("Peak usage hours detected. System resources prioritized for user engagement.");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("All systems operating within optimal parameters.");
    }
    
    setAiSuggestions(suggestions);
  };
  
  const handleParamChange = (param: string, value: number) => {
    const newParams = { ...modelParams, [param]: value };
    setModelParams(newParams);
    neuralHub.updateModelParameters(newParams);
    
    toast({
      title: "Parameter Updated",
      description: `${param} has been set to ${value}`,
      variant: "default"
    });
  };
  
  const handleResetSystem = () => {
    neuralHub.resetSystem();
    setModelParams(neuralHub.getModelParameters());
    
    toast({
      title: "System Reset",
      description: "Neural hub has been reset to default parameters",
      variant: "default"
    });
  };
  
  const handleSystemModeToggle = () => {
    toggleMode();
    
    toast({
      title: isEnabled ? "HERMES Mode Disabled" : "HERMES Mode Enabled",
      description: isEnabled 
        ? "System will use neutral response patterns"
        : "System will use enhanced behavioral analysis",
      variant: "default"
    });
  };
  
  const getSeverityColor = (value: number, inverse: boolean = false) => {
    const adjustedValue = inverse ? 1 - value : value;
    
    if (adjustedValue > 0.8) return "text-green-500";
    if (adjustedValue > 0.6) return "text-blue-500";
    if (adjustedValue > 0.4) return "text-amber-500";
    return "text-red-500";
  };
  
  const formatMetricValue = (value: number) => {
    return (value * 100).toFixed(0) + '%';
  };
  
  const getSystemStatusText = () => {
    const avgMetric = (systemMetrics.stability + systemMetrics.userEngagement + systemMetrics.economicBalance) / 3;
    
    if (avgMetric > 0.8) return "Optimal";
    if (avgMetric > 0.6) return "Stable";
    if (avgMetric > 0.4) return "Needs Attention";
    return "Critical";
  };
  
  const getSystemStatusColor = () => {
    const avgMetric = (systemMetrics.stability + systemMetrics.userEngagement + systemMetrics.economicBalance) / 3;
    
    if (avgMetric > 0.8) return "text-green-500";
    if (avgMetric > 0.6) return "text-blue-500";
    if (avgMetric > 0.4) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6" />
            HERMES Debug Panel
          </h2>
          <p className="text-muted-foreground">
            AI-driven system monitoring and management
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            debugObject(systemMetrics, 'System Metrics');
            toast({
              title: "Debug Info",
              description: "Check console for detailed system metrics",
            });
          }}>
            <Database className="mr-2 h-4 w-4" />
            Debug Info
          </Button>
          
          <Button onClick={handleOptimizeSystem} disabled={isOptimizing}>
            {isOptimizing ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Auto-Tune System
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <span className={getSystemStatusColor()}>{getSystemStatusText()}</span>
              </div>
              <Badge className={
                systemMetrics.load > 0.8 ? "bg-red-500" : 
                systemMetrics.load > 0.6 ? "bg-amber-500" : 
                "bg-green-500"
              }>
                {formatMetricValue(systemMetrics.load)} Load
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(systemMetrics.lastUpdated).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${getSeverityColor(systemMetrics.stability)}`}>
                {formatMetricValue(systemMetrics.stability)}
              </div>
            </div>
            <Progress value={systemMetrics.stability * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${getSeverityColor(systemMetrics.userEngagement)}`}>
                {formatMetricValue(systemMetrics.userEngagement)}
              </div>
            </div>
            <Progress value={systemMetrics.userEngagement * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Economic Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${getSeverityColor(systemMetrics.economicBalance)}`}>
                {formatMetricValue(systemMetrics.economicBalance)}
              </div>
            </div>
            <Progress value={systemMetrics.economicBalance * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>System-generated insights and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-2 pb-2 border-b last:border-0">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="parameters">System Parameters</TabsTrigger>
          <TabsTrigger value="modes">HERMES Modes</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>HERMES-OXUM System Overview</CardTitle>
              <CardDescription>
                Neural hub performance and behavioral analysis metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-4">System Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">HERMES Neural Hub</h4>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Core mathematical modeling using ODE, PDE, and non-linear dynamics for behavioral analysis.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">OXUM Fair Rotation</h4>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Equitable distribution system with time-based decay algorithms.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Chase Hughes Framework</h4>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Behavioral Table of Elements and Chain of Influence analysis.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Enhanced Behavioral Profiling</h4>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Comprehensive psychographic profiling and marketing optimization systems.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-4">System Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Response Latency</h4>
                        <Badge variant="outline">23ms avg</Badge>
                      </div>
                      <Progress value={23} max={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Processing Throughput</h4>
                        <Badge variant="outline">892 ops/sec</Badge>
                      </div>
                      <Progress value={89.2} max={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Memory Utilization</h4>
                        <Badge variant="outline">376MB</Badge>
                      </div>
                      <Progress value={37.6} max={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Cache Hit Rate</h4>
                        <Badge variant="outline">94.2%</Badge>
                      </div>
                      <Progress value={94.2} max={100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="parameters">
          <Card>
            <CardHeader>
              <CardTitle>Neural Hub Parameters</CardTitle>
              <CardDescription>
                Advanced mathematical model configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">ODE Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Decay Constant</Label>
                          <span className="text-sm">{modelParams.decayConstant.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.decayConstant]}
                          max={1}
                          step={0.01}
                          onValueChange={(values) => handleParamChange('decayConstant', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Controls visibility decay rate over time
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Growth Factor</Label>
                          <span className="text-sm">{modelParams.growthFactor.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.growthFactor]}
                          max={3}
                          step={0.1}
                          onValueChange={(values) => handleParamChange('growthFactor', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Adjusts engagement growth multiplier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Fourier Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Cycle Period</Label>
                          <span className="text-sm">{modelParams.cyclePeriod.toFixed(1)} hours</span>
                        </div>
                        <Slider
                          value={[modelParams.cyclePeriod]}
                          max={48}
                          min={1}
                          step={0.5}
                          onValueChange={(values) => handleParamChange('cyclePeriod', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Base time period for cyclical patterns
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Harmonic Count</Label>
                          <span className="text-sm">{modelParams.harmonicCount}</span>
                        </div>
                        <Slider
                          value={[modelParams.harmonicCount]}
                          max={10}
                          min={1}
                          step={1}
                          onValueChange={(values) => handleParamChange('harmonicCount', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Number of harmonics in time-based models
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Nonlinear Dynamics Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Bifurcation Point</Label>
                          <span className="text-sm">{modelParams.bifurcationPoint.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.bifurcationPoint]}
                          max={1}
                          step={0.01}
                          onValueChange={(values) => handleParamChange('bifurcationPoint', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Stability transition threshold
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Attractor Strength</Label>
                          <span className="text-sm">{modelParams.attractorStrength.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.attractorStrength]}
                          max={1}
                          step={0.01}
                          onValueChange={(values) => handleParamChange('attractorStrength', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Controls pull toward stable states
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Stochastic Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Randomness Factor</Label>
                          <span className="text-sm">{modelParams.randomnessFactor.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.randomnessFactor]}
                          max={1}
                          step={0.01}
                          onValueChange={(values) => handleParamChange('randomnessFactor', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Controls variance in behavior models
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Noise Level</Label>
                          <span className="text-sm">{modelParams.noiseLevel.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[modelParams.noiseLevel]}
                          max={0.5}
                          step={0.01}
                          onValueChange={(values) => handleParamChange('noiseLevel', values[0])}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Background noise in predictions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="destructive" onClick={handleResetSystem}>
                    Reset All Parameters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modes">
          <Card>
            <CardHeader>
              <CardTitle>HERMES Mode Configuration</CardTitle>
              <CardDescription>
                Behavioral response system and tone settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">HERMES Response System</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enable/disable the behavioral response system
                    </p>
                  </div>
                  <Switch checked={isEnabled} onCheckedChange={handleSystemModeToggle} />
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-4">Response Mode</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.responseMode === 'emotional' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ responseMode: 'emotional' })}
                    >
                      <h4 className="font-medium">Emotional</h4>
                      <p className="text-xs text-muted-foreground mt-1">Full emotional engagement</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.responseMode === 'protective' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ responseMode: 'protective' })}
                    >
                      <h4 className="font-medium">Protective</h4>
                      <p className="text-xs text-muted-foreground mt-1">Limited emotional investment</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.responseMode === 'neutral' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ responseMode: 'neutral' })}
                    >
                      <h4 className="font-medium">Neutral</h4>
                      <p className="text-xs text-muted-foreground mt-1">Standard response patterns</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.responseMode === 'premium' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ responseMode: 'premium' })}
                    >
                      <h4 className="font-medium">Premium</h4>
                      <p className="text-xs text-muted-foreground mt-1">Enhanced engagement for VIPs</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-4">Tone Filter</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.toneFilter === 'authentic' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ toneFilter: 'authentic' })}
                    >
                      <h4 className="font-medium">Authentic</h4>
                      <p className="text-xs text-muted-foreground mt-1">Full emotional range</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.toneFilter === 'restrained' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ toneFilter: 'restrained' })}
                    >
                      <h4 className="font-medium">Restrained</h4>
                      <p className="text-xs text-muted-foreground mt-1">Limited emotional expression</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.toneFilter === 'generic' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ toneFilter: 'generic' })}
                    >
                      <h4 className="font-medium">Generic</h4>
                      <p className="text-xs text-muted-foreground mt-1">Standard responses</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${settings.toneFilter === 'enhanced' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => updateSettings({ toneFilter: 'enhanced' })}
                    >
                      <h4 className="font-medium">Enhanced</h4>
                      <p className="text-xs text-muted-foreground mt-1">Deep personalization</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Response Speed</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Control the artificial delay in system responses
                  </p>
                  
                  <div className="flex justify-between mb-2">
                    <Label>Delay (ms)</Label>
                    <span className="text-sm">{settings.responseSpeed}ms</span>
                  </div>
                  <Slider
                    value={[settings.responseSpeed]}
                    max={5000}
                    step={100}
                    onValueChange={(values) => updateSettings({ responseSpeed: values[0] })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>AI Automation Controls</CardTitle>
              <CardDescription>
                Configure autonomous system behaviors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Auto-Optimization</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automatically tune system parameters based on load and performance
                    </p>
                  </div>
                  <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Optimization Triggers</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">System Load Threshold</Label>
                        <div className="flex items-center mt-2">
                          <span className="text-sm mr-2">80%</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Stability Threshold</Label>
                        <div className="flex items-center mt-2">
                          <span className="text-sm mr-2">50%</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Engagement Threshold</Label>
                        <div className="flex items-center mt-2">
                          <span className="text-sm mr-2">40%</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Time-based Optimization</Label>
                        <div className="flex items-center mt-2">
                          <span className="text-sm mr-2">4 hours</span>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">AI-Driven Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure automated alerts based on system events
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Critical System Events</Label>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">User Behavior Changes</Label>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Performance Degradation</Label>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Optimization Opportunities</Label>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Automatic User Analysis</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Analysis Frequency</h4>
                        <div className="text-sm text-muted-foreground">Every 30 minutes</div>
                      </div>
                      <Switch checked={true} className="mt-2" />
                    </div>
                    
                    <div className="border rounded-md p-3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Event Triggers</h4>
                        <div className="text-sm text-muted-foreground">On significant events</div>
                      </div>
                      <Switch checked={true} className="mt-2" />
                    </div>
                    
                    <div className="border rounded-md p-3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Neural Hub Integration</h4>
                        <div className="text-sm text-muted-foreground">Process all behavior events</div>
                      </div>
                      <Switch checked={true} className="mt-2" />
                    </div>
                    
                    <div className="border rounded-md p-3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Chase Hughes Analysis</h4>
                        <div className="text-sm text-muted-foreground">Run advanced analysis</div>
                      </div>
                      <Switch checked={true} className="mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HermesDebugPanel;
