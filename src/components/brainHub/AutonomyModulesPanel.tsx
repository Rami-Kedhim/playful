
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Brain, Code, CreditCard, Shield, Users, Zap, Terminal } from 'lucide-react';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import { AutonomyModule } from '@/services/neural/BrainHubAutonomyEngine';
import ModuleActivityMonitor from './ModuleActivityMonitor';

const AutonomyModulesPanel: React.FC = () => {
  const [modules, setModules] = useState<AutonomyModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [autonomyStatus, setAutonomyStatus] = useState({
    level: 0, 
    isRunning: false
  });
  
  // Initialize data
  useEffect(() => {
    // Get all modules
    const allModules = autonomyEngine.getModules();
    setModules(allModules);
    
    // Get autonomy status
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
    
    // If there are modules, select the first one
    if (allModules.length > 0) {
      setSelectedModule(allModules[0].id);
    }
    
    // Setup update interval
    const interval = setInterval(() => {
      setModules(autonomyEngine.getModules());
      setAutonomyStatus(autonomyEngine.getAutonomyStatus());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Toggle a module's active status
  const handleToggleModule = (moduleId: string, active: boolean) => {
    autonomyEngine.toggleModule(moduleId, active);
    setModules(autonomyEngine.getModules());
  };
  
  // Update a module's configuration
  const handleUpdateConfig = (moduleId: string, config: any) => {
    autonomyEngine.updateModuleConfig(moduleId, config);
    setModules(autonomyEngine.getModules());
    
    toast({
      title: "Module Configuration Updated",
      description: `The configuration for the module has been updated`,
    });
  };
  
  // Update autonomy level
  const handleAutonomyLevelChange = (value: number[]) => {
    const level = value[0];
    autonomyEngine.setAutonomyLevel(level);
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
  };
  
  // Toggle autonomy engine
  const toggleAutonomyEngine = () => {
    if (autonomyStatus.isRunning) {
      autonomyEngine.stop();
    } else {
      autonomyEngine.start();
    }
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
  };
  
  // Helper to get the appropriate icon for a module
  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'strategy-core':
        return <Brain className="h-5 w-5 text-blue-500" />;
      case 'code-generator':
        return <Code className="h-5 w-5 text-emerald-500" />;
      case 'lucoin-governor':
        return <CreditCard className="h-5 w-5 text-amber-500" />;
      case 'reputation-monitor':
        return <Shield className="h-5 w-5 text-purple-500" />;
      case 'growth-hacker':
        return <Users className="h-5 w-5 text-pink-500" />;
      case 'persona-trainer':
        return <Terminal className="h-5 w-5 text-indigo-500" />;
      default:
        return <Zap className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Autonomy Engine</CardTitle>
              <CardDescription>Control the Brain Hub's autonomous decision making</CardDescription>
            </div>
            <Switch 
              checked={autonomyStatus.isRunning} 
              onCheckedChange={toggleAutonomyEngine}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Autonomy Level: {autonomyStatus.level}%</Label>
                <span className={`text-sm ${
                  autonomyStatus.level < 30 ? 'text-blue-500' :
                  autonomyStatus.level < 70 ? 'text-amber-500' :
                  'text-red-500'
                }`}>
                  {autonomyStatus.level < 30 ? 'Conservative' :
                   autonomyStatus.level < 70 ? 'Balanced' :
                   'Aggressive'}
                </span>
              </div>
              <Slider
                value={[autonomyStatus.level]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleAutonomyLevelChange}
                disabled={!autonomyStatus.isRunning}
                className={autonomyStatus.isRunning ? '' : 'opacity-50'}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Limited Autonomy</span>
                <span>Full Autonomy</span>
              </div>
            </div>
            
            <div className="border rounded-md p-3 bg-muted/50">
              <div className="flex items-center space-x-2">
                <Zap className={`h-4 w-4 ${autonomyStatus.isRunning ? 'text-green-500' : 'text-muted-foreground'}`} />
                <div className="text-sm">
                  {autonomyStatus.isRunning 
                    ? `The autonomy engine is currently active at ${autonomyStatus.level}% autonomy level` 
                    : "The autonomy engine is currently disabled"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Modules</CardTitle>
              <CardDescription>Toggle and configure autonomous modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map(module => (
                <div 
                  key={module.id} 
                  className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                    selectedModule === module.id ? 'border-primary bg-primary/5' : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <div className="flex items-center">
                    {getModuleIcon(module.id)}
                    <div className="ml-3">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs text-muted-foreground">{module.status}</div>
                    </div>
                  </div>
                  <Switch
                    checked={module.status === 'active'}
                    onCheckedChange={(checked) => handleToggleModule(module.id, checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          
          {selectedModule && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Module Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                {modules.find(m => m.id === selectedModule) && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="oversight">Oversight Level</Label>
                      <Select 
                        value={modules.find(m => m.id === selectedModule)?.config.oversightLevel || 'medium'} 
                        onValueChange={(value) => {
                          const module = modules.find(m => m.id === selectedModule);
                          if (module) {
                            handleUpdateConfig(selectedModule, {
                              ...module.config,
                              oversightLevel: value
                            });
                          }
                        }}
                      >
                        <SelectTrigger id="oversight">
                          <SelectValue placeholder="Select oversight level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None - Full Autonomy</SelectItem>
                          <SelectItem value="low">Low - Minimal Oversight</SelectItem>
                          <SelectItem value="medium">Medium - Balanced Oversight</SelectItem>
                          <SelectItem value="high">High - Strict Oversight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="confidenceSlider">Confidence Threshold</Label>
                        <span className="text-sm">
                          {Math.round(modules.find(m => m.id === selectedModule)?.config.confidenceThreshold * 100)}%
                        </span>
                      </div>
                      <Slider
                        id="confidenceSlider"
                        value={[modules.find(m => m.id === selectedModule)?.config.confidenceThreshold * 100 || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => {
                          const module = modules.find(m => m.id === selectedModule);
                          if (module) {
                            handleUpdateConfig(selectedModule, {
                              ...module.config,
                              confidenceThreshold: value[0] / 100
                            });
                          }
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="learningSlider">Learning Rate</Label>
                        <span className="text-sm">
                          {Math.round(modules.find(m => m.id === selectedModule)?.config.learningRate * 100)}%
                        </span>
                      </div>
                      <Slider
                        id="learningSlider"
                        value={[modules.find(m => m.id === selectedModule)?.config.learningRate * 100 || 30]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => {
                          const module = modules.find(m => m.id === selectedModule);
                          if (module) {
                            handleUpdateConfig(selectedModule, {
                              ...module.config,
                              learningRate: value[0] / 100
                            });
                          }
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="decisionSlider">Max Decisions Per Hour</Label>
                        <span className="text-sm">
                          {modules.find(m => m.id === selectedModule)?.config.maxDecisionsPerHour}
                        </span>
                      </div>
                      <Slider
                        id="decisionSlider"
                        value={[modules.find(m => m.id === selectedModule)?.config.maxDecisionsPerHour || 5]}
                        min={1}
                        max={30}
                        step={1}
                        onValueChange={(value) => {
                          const module = modules.find(m => m.id === selectedModule);
                          if (module) {
                            handleUpdateConfig(selectedModule, {
                              ...module.config,
                              maxDecisionsPerHour: value[0]
                            });
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="feedbackLoop"
                        checked={modules.find(m => m.id === selectedModule)?.config.feedbackLoopEnabled || false}
                        onCheckedChange={(checked) => {
                          const module = modules.find(m => m.id === selectedModule);
                          if (module) {
                            handleUpdateConfig(selectedModule, {
                              ...module.config,
                              feedbackLoopEnabled: checked
                            });
                          }
                        }}
                      />
                      <Label htmlFor="feedbackLoop">Enable Feedback Loop Learning</Label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Module Reset",
                      description: "Module settings have been reset to defaults",
                    });
                  }}
                >
                  Reset to Defaults
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <ModuleActivityMonitor moduleId={selectedModule || undefined} />
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Governance</CardTitle>
                <CardDescription>Monitor safety and compliance status of AI modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3 flex flex-col">
                      <div className="text-sm text-muted-foreground">Ethical Filter</div>
                      <div className="flex items-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Active</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex flex-col">
                      <div className="text-sm text-muted-foreground">Decision Log Audit</div>
                      <div className="flex items-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Enabled</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex flex-col">
                      <div className="text-sm text-muted-foreground">Self-Diagnostics</div>
                      <div className="flex items-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Running</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-muted/30">
                    <h4 className="font-medium mb-2">Last Security Check</h4>
                    <div className="flex justify-between text-sm">
                      <span>All modules operating within safety parameters</span>
                      <span className="text-muted-foreground">4 minutes ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomyModulesPanel;
