import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Activity, 
  Beaker, 
  TrendingUp, 
  Cpu, 
  Zap, 
  Settings 
} from "lucide-react";
import { 
  brainHub, 
  BrainHubConfig, 
  PsychologyModel, 
  PhysicsModel, 
  RoboticsModel, 
  EconomicsModel 
} from '@/services/neural/HermesOxumBrainHub';
import { neuralHub, SystemHealthMetrics } from '@/services/neural/HermesOxumNeuralHub';

const BrainHubDashboard: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfig>(brainHub.getConfig());
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics>(neuralHub.getHealthMetrics());
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Subscribe to health metrics updates
    neuralHub.addObserver(setHealthMetrics);
    
    return () => {
      neuralHub.removeObserver(setHealthMetrics);
    };
  }, []);
  
  const updateConfig = <K extends keyof BrainHubConfig>(
    section: K, 
    value: BrainHubConfig[K]
  ) => {
    const newConfig = {
      ...config,
      [section]: value
    };
    
    setConfig(newConfig);
    brainHub.updateConfig({ [section]: value } as Partial<BrainHubConfig>);
  };
  
  const updateAcademicModel = <
    S extends keyof BrainHubConfig,
    K extends keyof BrainHubConfig[S]
  >(
    section: S,
    key: K,
    value: boolean
  ) => {
    const sectionConfig = {
      ...config[section],
      [key]: value
    };
    
    updateConfig(section, sectionConfig as any);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Brain className="h-10 w-10 mr-4 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">UberEscorts Brain Hub v1.0</h1>
          <p className="text-muted-foreground">
            Centralized neural and computational system orchestrating the platform's multi-dimensional ecosystem
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{(healthMetrics.load * 100).toFixed(1)}%</div>
            <Progress value={healthMetrics.load * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{(healthMetrics.userEngagement * 100).toFixed(1)}%</div>
            <Progress value={healthMetrics.userEngagement * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              System Stability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{(healthMetrics.stability * 100).toFixed(1)}%</div>
            <Progress value={healthMetrics.stability * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="robotics">Robotics</TabsTrigger>
          <TabsTrigger value="economics">Economics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Brain Hub Overview</CardTitle>
              <CardDescription>
                Core system controls and operational status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4" />
                      <Label htmlFor="geo-legal-filtering">Geo-Legal Filtering</Label>
                    </div>
                    <Switch
                      id="geo-legal-filtering"
                      checked={config.geoLegalFilteringEnabled}
                      onCheckedChange={(checked) => updateConfig('geoLegalFilteringEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Beaker className="h-4 w-4" />
                      <Label htmlFor="neuro-emotion">NeuroEmotion Layer</Label>
                    </div>
                    <Switch
                      id="neuro-emotion"
                      checked={config.neuroEmotionEnabled}
                      onCheckedChange={(checked) => updateConfig('neuroEmotionEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <Label htmlFor="predictive-modulation">Predictive Modulation</Label>
                    </div>
                    <Switch
                      id="predictive-modulation"
                      checked={config.predictiveModulationEnabled}
                      onCheckedChange={(checked) => updateConfig('predictiveModulationEnabled', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span>{healthMetrics.lastUpdated.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economic Balance:</span>
                        <span>{(healthMetrics.economicBalance * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Core Services:</span>
                        <span className="text-green-500">Online</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" /> Advanced
                    </Button>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-1" /> Run Diagnostics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="psychology">
          <Card>
            <CardHeader>
              <CardTitle>Psychology Degree Integration</CardTitle>
              <CardDescription>
                Configure psychological models used in AI personality generation and interaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="psychoanalytic-layer" className="flex-1">
                      <div className="font-medium">Freudian Psychoanalysis</div>
                      <div className="text-muted-foreground text-sm">Used in AI seduction logic and profile memory</div>
                    </Label>
                    <Switch
                      id="psychoanalytic-layer"
                      checked={config.psychology.psychoanalyticLayer}
                      onCheckedChange={(checked) => updateAcademicModel('psychology', 'psychoanalyticLayer', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="behavioral-learning" className="flex-1">
                      <div className="font-medium">Behavioral Psychology</div>
                      <div className="text-muted-foreground text-sm">Learning loops based on user choices</div>
                    </Label>
                    <Switch
                      id="behavioral-learning"
                      checked={config.psychology.behavioralLearning}
                      onCheckedChange={(checked) => updateAcademicModel('psychology', 'behavioralLearning', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="neuroemotional-layer" className="flex-1">
                      <div className="font-medium">Neuropsychology</div>
                      <div className="text-muted-foreground text-sm">Drives the NeuroEmotion Layer</div>
                    </Label>
                    <Switch
                      id="neuroemotional-layer"
                      checked={config.psychology.neuroEmotionalLayer}
                      onCheckedChange={(checked) => updateAcademicModel('psychology', 'neuroEmotionalLayer', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sexual-psychology" className="flex-1">
                      <div className="font-medium">Sexual Psychology</div>
                      <div className="text-muted-foreground text-sm">Creates arousal patterns and fantasy triggers</div>
                    </Label>
                    <Switch
                      id="sexual-psychology"
                      checked={config.psychology.sexualPsychologyPatterns}
                      onCheckedChange={(checked) => updateAcademicModel('psychology', 'sexualPsychologyPatterns', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="physics">
          <Card>
            <CardHeader>
              <CardTitle>Physics Degree Integration</CardTitle>
              <CardDescription>
                Configure physics models used in simulation and interaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="thermodynamics" className="flex-1">
                      <div className="font-medium">Thermodynamics</div>
                      <div className="text-muted-foreground text-sm">Applied in VR/AI energy states</div>
                    </Label>
                    <Switch
                      id="thermodynamics"
                      checked={config.physics.thermodynamicsEnabled}
                      onCheckedChange={(checked) => updateAcademicModel('physics', 'thermodynamicsEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mechanics" className="flex-1">
                      <div className="font-medium">Mechanics</div>
                      <div className="text-muted-foreground text-sm">Avatar movement prediction, animation physics</div>
                    </Label>
                    <Switch
                      id="mechanics"
                      checked={config.physics.mechanicsSimulation}
                      onCheckedChange={(checked) => updateAcademicModel('physics', 'mechanicsSimulation', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="electromagnetism" className="flex-1">
                      <div className="font-medium">Electromagnetism</div>
                      <div className="text-muted-foreground text-sm">Basis for real-world IoT interaction</div>
                    </Label>
                    <Switch
                      id="electromagnetism"
                      checked={config.physics.electromagnetismSupport}
                      onCheckedChange={(checked) => updateAcademicModel('physics', 'electromagnetismSupport', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quantum-mechanics" className="flex-1">
                      <div className="font-medium">Quantum Mechanics</div>
                      <div className="text-muted-foreground text-sm">Long-term AI state generation (future)</div>
                    </Label>
                    <Switch
                      id="quantum-mechanics"
                      checked={config.physics.quantumMechanicsLayer}
                      onCheckedChange={(checked) => updateAcademicModel('physics', 'quantumMechanicsLayer', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="robotics">
          <Card>
            <CardHeader>
              <CardTitle>Robotics Degree Integration</CardTitle>
              <CardDescription>
                Configure robotics systems for physical interaction and simulation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-control" className="flex-1">
                      <div className="font-medium">AI-Control Interfaces</div>
                      <div className="text-muted-foreground text-sm">Dialogue to movement mapping</div>
                    </Label>
                    <Switch
                      id="ai-control"
                      checked={config.robotics.aiControlInterfaces}
                      onCheckedChange={(checked) => updateAcademicModel('robotics', 'aiControlInterfaces', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sensor-response" className="flex-1">
                      <div className="font-medium">Sensor Response Modeling</div>
                      <div className="text-muted-foreground text-sm">Mapping voice, sound and motion input</div>
                    </Label>
                    <Switch
                      id="sensor-response"
                      checked={config.robotics.sensorResponseModeling}
                      onCheckedChange={(checked) => updateAcademicModel('robotics', 'sensorResponseModeling', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autonomous-feedback" className="flex-1">
                      <div className="font-medium">Autonomous Feedback Loop</div>
                      <div className="text-muted-foreground text-sm">Self-adjusting personality models</div>
                    </Label>
                    <Switch
                      id="autonomous-feedback"
                      checked={config.robotics.autonomousFeedback}
                      onCheckedChange={(checked) => updateAcademicModel('robotics', 'autonomousFeedback', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="neural-interface" className="flex-1">
                      <div className="font-medium">Neural Interface Simulation</div>
                      <div className="text-muted-foreground text-sm">Bridge with physical robotics (future)</div>
                    </Label>
                    <Switch
                      id="neural-interface"
                      checked={config.robotics.neuralInterface}
                      onCheckedChange={(checked) => updateAcademicModel('robotics', 'neuralInterface', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="economics">
          <Card>
            <CardHeader>
              <CardTitle>Economics Degree Integration</CardTitle>
              <CardDescription>
                Configure economic models for monetization and value adjustment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="game-theory" className="flex-1">
                      <div className="font-medium">Game Theory</div>
                      <div className="text-muted-foreground text-sm">Used in boosting and pricing via Oxum</div>
                    </Label>
                    <Switch
                      id="game-theory"
                      checked={config.economics.gameTheory}
                      onCheckedChange={(checked) => updateAcademicModel('economics', 'gameTheory', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="supply-demand" className="flex-1">
                      <div className="font-medium">Supply/Demand Curves</div>
                      <div className="text-muted-foreground text-sm">Algorithmic value adjustment</div>
                    </Label>
                    <Switch
                      id="supply-demand"
                      checked={config.economics.supplyDemandCurves}
                      onCheckedChange={(checked) => updateAcademicModel('economics', 'supplyDemandCurves', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monetary-flow" className="flex-1">
                      <div className="font-medium">Monetary Flow Control</div>
                      <div className="text-muted-foreground text-sm">Regulates Lucoin emission and burn</div>
                    </Label>
                    <Switch
                      id="monetary-flow"
                      checked={config.economics.monetaryFlowControl}
                      onCheckedChange={(checked) => updateAcademicModel('economics', 'monetaryFlowControl', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="predictive-econ" className="flex-1">
                      <div className="font-medium">Predictive Economic Modeling</div>
                      <div className="text-muted-foreground text-sm">Applied to user spending trends</div>
                    </Label>
                    <Switch
                      id="predictive-econ"
                      checked={config.economics.predictiveModeling}
                      onCheckedChange={(checked) => updateAcademicModel('economics', 'predictiveModeling', checked)}
                    />
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

export default BrainHubDashboard;
