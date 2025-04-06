
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart4, 
  Sliders, 
  BarChart, 
  Brain, 
  Activity, 
  RefreshCw,
  AlertTriangle,
  Zap,
  Settings
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { 
  neuralHub, 
  SystemHealthMetrics, 
  ModelParameters 
} from "@/services/neural/HermesOxumNeuralHub";

// Simple line chart component for system metrics visualization
const MetricsChart = ({ data, title }: { data: number[], title: string }) => {
  // In a real implementation, this would use a proper chart library like recharts
  // For simplicity, we're using a simplified visualization
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">
          Current: {data[data.length - 1].toFixed(2)}
        </span>
      </div>
      <div className="h-24 flex items-end justify-between border rounded-md p-2">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div 
              key={index}
              className="bg-primary w-1 transition-all duration-300 ease-in-out"
              style={{ height: `${Math.max(5, height)}%` }}
              title={`Value: ${value.toFixed(2)}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const HermesOxumControl = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics | null>(null);
  const [modelParams, setModelParams] = useState<ModelParameters | null>(null);
  
  // Metrics history for charts
  const [loadHistory, setLoadHistory] = useState<number[]>(Array(30).fill(0.5));
  const [stabilityHistory, setStabilityHistory] = useState<number[]>(Array(30).fill(0.7));
  const [engagementHistory, setEngagementHistory] = useState<number[]>(Array(30).fill(0.6));
  const [economicHistory, setEconomicHistory] = useState<number[]>(Array(30).fill(0.8));
  
  // Loading states
  const [isResetting, setIsResetting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize data on component mount
  useEffect(() => {
    // Get initial model parameters
    const initialParams = neuralHub.getModelParameters();
    setModelParams(initialParams);
    
    // Get initial health metrics
    const initialMetrics = neuralHub.getHealthMetrics();
    setHealthMetrics(initialMetrics);
    
    // Subscribe to metrics updates
    const updateMetrics = (metrics: SystemHealthMetrics) => {
      setHealthMetrics(metrics);
      
      // Update history arrays
      setLoadHistory(prev => [...prev.slice(1), metrics.load]);
      setStabilityHistory(prev => [...prev.slice(1), metrics.stability]);
      setEngagementHistory(prev => [...prev.slice(1), metrics.userEngagement]);
      setEconomicHistory(prev => [...prev.slice(1), metrics.economicBalance]);
    };
    
    neuralHub.addObserver(updateMetrics);
    
    // Cleanup on unmount
    return () => {
      neuralHub.removeObserver(updateMetrics);
    };
  }, []);
  
  const handleParameterChange = (
    paramName: keyof ModelParameters, 
    value: number | number[]
  ) => {
    if (!modelParams) return;
    
    // Update local state
    setModelParams({
      ...modelParams,
      [paramName]: Array.isArray(value) ? value[0] : value
    });
  };
  
  const handleSaveParameters = async () => {
    if (!modelParams) return;
    
    setIsSaving(true);
    
    try {
      // Update neural hub with new parameters
      neuralHub.updateModelParameters(modelParams);
      
      toast({
        title: "Parameters saved",
        description: "HERMES-OXUM parameters have been updated successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving parameters",
        description: "Failed to update HERMES-OXUM parameters."
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleResetSystem = async () => {
    setIsResetting(true);
    
    try {
      // Reset neural hub to defaults
      neuralHub.resetSystem();
      
      // Update local state with defaults
      setModelParams(neuralHub.getModelParameters());
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Failed to reset HERMES-OXUM system."
      });
    } finally {
      setIsResetting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">HERMES-OXUM Control</h2>
          <p className="text-muted-foreground">
            Advanced mathematical system management
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleResetSystem}
            disabled={isResetting}
            className="flex items-center gap-2"
          >
            {isResetting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Reset System
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Neural Hub Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMetrics ? (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>System Load</span>
                      <span className={`font-medium ${
                        healthMetrics.load > 0.8 ? "text-red-500" : 
                        healthMetrics.load > 0.6 ? "text-amber-500" : "text-green-500"
                      }`}>{(healthMetrics.load * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={healthMetrics.load * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Stability Score</span>
                      <span className={`font-medium ${
                        healthMetrics.stability < 0.5 ? "text-red-500" : 
                        healthMetrics.stability < 0.7 ? "text-amber-500" : "text-green-500"
                      }`}>{(healthMetrics.stability * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={healthMetrics.stability * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>User Engagement</span>
                        <span className="font-medium">
                          {(healthMetrics.userEngagement * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={healthMetrics.userEngagement * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Economic Balance</span>
                        <span className="font-medium">
                          {(healthMetrics.economicBalance * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={healthMetrics.economicBalance * 100} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Last updated: {healthMetrics.lastUpdated.toLocaleTimeString()}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[140px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMetrics ? (
                <>
                  <div className="text-xs mb-1">Real-time metrics (last 30 updates)</div>
                  <div className="grid grid-cols-2 gap-4">
                    <MetricsChart data={loadHistory} title="System Load" />
                    <MetricsChart data={stabilityHistory} title="Stability" />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <MetricsChart data={engagementHistory} title="User Engagement" />
                    <MetricsChart data={economicHistory} title="Economic Health" />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[220px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart4 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="parameters" className="flex items-center gap-1">
            <Sliders className="h-4 w-4" /> Parameters
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>HERMES-OXUM Overview</CardTitle>
              <CardDescription>
                State-of-the-art mathematical engine powering visibility and self-regulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert variant="default">
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    The HERMES-OXUM engine is currently active and optimizing the platform using
                    advanced mathematical models based on Zill differential modeling.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Active Components</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        ODE User Growth Modeling
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Fourier Series Activity Analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Nonlinear Dynamical System Controls
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        PDE Visibility Diffusion
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Enhanced Application Areas</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        Profile Visibility & Boosting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        Content Recommendation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        Economic Balancing (Pending)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        Metaverse Adaptation (Pending)
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Mathematical Model Status</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-xs text-muted-foreground">Active Models</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Bifurcation Points</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-2xl font-bold">24h</div>
                      <div className="text-xs text-muted-foreground">Fourier Period</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-2xl font-bold">0.2</div>
                      <div className="text-xs text-muted-foreground">Decay Constant</div>
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
              <CardTitle>Model Parameters</CardTitle>
              <CardDescription>
                Configure the mathematical parameters of the HERMES-OXUM system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {modelParams ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">ODE Parameters</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="decayConstant" className="text-sm">Decay Constant</label>
                          <span className="text-sm font-medium">{modelParams.decayConstant.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="decayConstant"
                          min={0.05}
                          max={0.5}
                          step={0.01}
                          value={[modelParams.decayConstant]}
                          onValueChange={(value) => handleParameterChange('decayConstant', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Controls how quickly visibility decays over time
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="growthFactor" className="text-sm">Growth Factor</label>
                          <span className="text-sm font-medium">{modelParams.growthFactor.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="growthFactor"
                          min={0.5}
                          max={3}
                          step={0.1}
                          value={[modelParams.growthFactor]}
                          onValueChange={(value) => handleParameterChange('growthFactor', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Controls how quickly user engagement grows
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Fourier Parameters</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="cyclePeriod" className="text-sm">Cycle Period (hours)</label>
                          <span className="text-sm font-medium">{modelParams.cyclePeriod.toFixed(0)}</span>
                        </div>
                        <Slider
                          id="cyclePeriod"
                          min={6}
                          max={48}
                          step={1}
                          value={[modelParams.cyclePeriod]}
                          onValueChange={(value) => handleParameterChange('cyclePeriod', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Base period for activity cycles
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="harmonicCount" className="text-sm">Harmonic Count</label>
                          <span className="text-sm font-medium">{modelParams.harmonicCount.toFixed(0)}</span>
                        </div>
                        <Slider
                          id="harmonicCount"
                          min={1}
                          max={5}
                          step={1}
                          value={[modelParams.harmonicCount]}
                          onValueChange={(value) => handleParameterChange('harmonicCount', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Number of harmonics in the Fourier analysis
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Nonlinear Dynamics</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="bifurcationPoint" className="text-sm">Bifurcation Point</label>
                          <span className="text-sm font-medium">{modelParams.bifurcationPoint.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="bifurcationPoint"
                          min={0.3}
                          max={0.9}
                          step={0.05}
                          value={[modelParams.bifurcationPoint]}
                          onValueChange={(value) => handleParameterChange('bifurcationPoint', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Critical point where system behavior changes
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="attractorStrength" className="text-sm">Attractor Strength</label>
                          <span className="text-sm font-medium">{modelParams.attractorStrength.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="attractorStrength"
                          min={0.1}
                          max={0.9}
                          step={0.05}
                          value={[modelParams.attractorStrength]}
                          onValueChange={(value) => handleParameterChange('attractorStrength', value)}
                        />
                        <div className="text-xs text-muted-foreground">
                          Strength of attraction to stable points
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={handleResetSystem}
                      disabled={isResetting}
                    >
                      Reset to Defaults
                    </Button>
                    <Button 
                      onClick={handleSaveParameters}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Parameters'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
              <CardDescription>
                Advanced analytics for the HERMES-OXUM system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <div className="text-center space-y-3">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Analytics Coming Soon</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Advanced analytics capabilities for the HERMES-OXUM system are
                    currently in development. Check back soon for detailed insights
                    and predictive modeling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HermesOxumControl;
