
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Brain, 
  AlertTriangle, 
  Settings, 
  BarChart, 
  Code, 
  Coins, 
  Shield, 
  TrendingUp, 
  Users,
  CheckCircle,
  XCircle, 
  Info
} from "lucide-react";

import autonomyEngine, { 
  AutonomyModule, 
  AutonomyModuleConfig,
  Decision
} from '@/services/neural/BrainHubAutonomyEngine';

// Helper components
const ModuleStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    learning: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      statusStyles[status as keyof typeof statusStyles] || statusStyles.inactive
    }`}>
      {status}
    </span>
  );
};

const ModuleIcon: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const icons = {
    'strategy-core': <Brain className="h-5 w-5" />,
    'code-generator': <Code className="h-5 w-5" />,
    'lucoin-governor': <Coins className="h-5 w-5" />,
    'reputation-monitor': <Shield className="h-5 w-5" />,
    'growth-hacker': <TrendingUp className="h-5 w-5" />,
    'persona-trainer': <Users className="h-5 w-5" />
  };
  
  return icons[moduleId as keyof typeof icons] || <Settings className="h-5 w-5" />;
};

const AutonomyModulesPanel: React.FC = () => {
  const [modules, setModules] = useState<AutonomyModule[]>([]);
  const [autonomyStatus, setAutonomyStatus] = useState<{ level: number; isRunning: boolean }>({ level: 50, isRunning: false });
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  
  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Initialize with data
  useEffect(() => {
    setModules(autonomyEngine.getModules());
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
    
    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      setModules(autonomyEngine.getModules());
      setAutonomyStatus(autonomyEngine.getAutonomyStatus());
      setDecisions(autonomyEngine.getRecentDecisions());
    }, 5000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Toggle a module
  const handleToggleModule = (moduleId: string, active: boolean) => {
    autonomyEngine.toggleModule(moduleId, active);
    setModules(autonomyEngine.getModules());
  };
  
  // Toggle autonomy engine
  const handleToggleAutonomy = () => {
    if (autonomyStatus.isRunning) {
      autonomyEngine.stop();
    } else {
      autonomyEngine.start();
    }
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
  };
  
  // Update autonomy level
  const handleAutonomyLevelChange = (value: number[]) => {
    autonomyEngine.setAutonomyLevel(value[0]);
    setAutonomyStatus(autonomyEngine.getAutonomyStatus());
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                Brain Hub Autonomy Engine
              </CardTitle>
              <CardDescription>Control the autonomous behavior of the Brain Hub</CardDescription>
            </div>
            <div>
              <Button
                variant={autonomyStatus.isRunning ? "destructive" : "default"}
                onClick={handleToggleAutonomy}
              >
                {autonomyStatus.isRunning ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Disable Autonomy
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enable Autonomy
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Autonomy Level</div>
              <div className="text-xs text-muted-foreground">
                Controls how much the system can act without human oversight
              </div>
            </div>
            <div className="w-1/3">
              <Slider
                value={[autonomyStatus.level]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleAutonomyLevelChange}
                disabled={!autonomyStatus.isRunning}
              />
            </div>
            <div className="text-xl font-bold">{autonomyStatus.level}%</div>
          </div>
          
          {autonomyStatus.level > 75 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Autonomy Warning</AlertTitle>
              <AlertDescription>
                At this autonomy level, the system may make significant decisions with minimal human oversight.
                Only use this level in trusted environments with proper safeguards.
              </AlertDescription>
            </Alert>
          )}
          
          {!autonomyStatus.isRunning && (
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertTitle>Autonomy Disabled</AlertTitle>
              <AlertDescription>
                The autonomy engine is currently disabled. Enable it to allow the Brain Hub to make autonomous decisions.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module Management */}
        <Card>
          <CardHeader>
            <CardTitle>Autonomy Modules</CardTitle>
            <CardDescription>Enable or disable specific autonomous capabilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map(module => (
              <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="mr-3 text-primary">
                    <ModuleIcon moduleId={module.id} />
                  </div>
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-xs text-muted-foreground">{module.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ModuleStatusBadge status={module.status} />
                  <Switch
                    checked={module.status === 'active'}
                    onCheckedChange={(checked) => handleToggleModule(module.id, checked)}
                    disabled={!autonomyStatus.isRunning}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Module Details and Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Module Configuration</CardTitle>
            <CardDescription>Configure behavior of individual autonomy modules</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="strategy-core" onValueChange={setSelectedModule}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="strategy-core">Strategy</TabsTrigger>
                <TabsTrigger value="lucoin-governor">Lucoin</TabsTrigger>
                <TabsTrigger value="persona-trainer">Persona</TabsTrigger>
              </TabsList>
              
              {modules.map(module => (
                <TabsContent key={module.id} value={module.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <ModuleIcon moduleId={module.id} />
                        {module.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <ModuleStatusBadge status={module.status} />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Learning Rate</label>
                      <Slider
                        value={[module.config.learningRate * 100]}
                        min={0}
                        max={100}
                        step={5}
                        disabled={!autonomyStatus.isRunning || module.status !== 'active'}
                        onValueChange={(value) => {
                          autonomyEngine.updateModuleConfig(module.id, {
                            ...module.config,
                            learningRate: value[0] / 100
                          });
                          setModules(autonomyEngine.getModules());
                        }}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Conservative</span>
                        <span>Adaptive</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Confidence Threshold</label>
                      <Slider
                        value={[module.config.confidenceThreshold * 100]}
                        min={0}
                        max={100}
                        step={5}
                        disabled={!autonomyStatus.isRunning || module.status !== 'active'}
                        onValueChange={(value) => {
                          autonomyEngine.updateModuleConfig(module.id, {
                            ...module.config,
                            confidenceThreshold: value[0] / 100
                          });
                          setModules(autonomyEngine.getModules());
                        }}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>More Decisions</span>
                        <span>Higher Quality</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Feedback Loop</label>
                        <Switch
                          checked={module.config.feedbackLoopEnabled}
                          disabled={!autonomyStatus.isRunning || module.status !== 'active'}
                          onCheckedChange={(checked) => {
                            autonomyEngine.updateModuleConfig(module.id, {
                              ...module.config,
                              feedbackLoopEnabled: checked
                            });
                            setModules(autonomyEngine.getModules());
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Learn from past decisions to improve future performance
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Module Performance</div>
                        <div className="text-xs text-muted-foreground">
                          {module.decisionsMade} decisions made
                          {module.lastExecuted && ` (Last: ${formatTimestamp(module.lastExecuted)})`}
                        </div>
                      </div>
                      <div className="text-lg font-bold">
                        {(module.successRate * 100).toFixed(1)}%
                        <span className="text-xs text-muted-foreground"> success</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Decisions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Autonomous Decisions</CardTitle>
          <CardDescription>
            History of decisions made by the autonomy engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {decisions.length > 0 ? (
              decisions.map((decision, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{decision.description}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        decision.impact === 'high' ? 'destructive' : 
                        decision.impact === 'medium' ? 'default' : 
                        'outline'
                      }>
                        {decision.impact} impact
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatTimestamp(decision.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-xs flex justify-between">
                    <span className="text-muted-foreground">
                      {modules.find(m => m.id === decision.moduleId)?.name || decision.moduleId}
                    </span>
                    <span>
                      Confidence: <span className="font-medium">{(decision.confidence * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No autonomous decisions have been made yet
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button variant="outline" onClick={() => setDecisions(autonomyEngine.getRecentDecisions())}>
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AutonomyModulesPanel;
