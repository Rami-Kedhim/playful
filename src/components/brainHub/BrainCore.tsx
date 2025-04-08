
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import useBrainHub from '@/hooks/useBrainHub';

import { Brain, Cpu, Zap, HeartPulse, AlertTriangle, CheckCircle } from 'lucide-react';

// Define module status interface
interface ModuleStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  lastAction?: string;
  autonomyLevel: number;
  health: number;
  processingLoad: number;
}

// Define autonomous action interface
interface AutonomousAction {
  id: string;
  timestamp: Date;
  module: string;
  action: string;
  status: 'pending' | 'completed' | 'failed';
  impact: 'low' | 'medium' | 'high';
  confidence: number;
}

const BrainCore: React.FC = () => {
  const [systemLoad, setSystemLoad] = useState(0);
  const [autonomyLevel, setAutonomyLevel] = useState(50);
  const [modules, setModules] = useState<ModuleStatus[]>([]);
  const [recentActions, setRecentActions] = useState<AutonomousAction[]>([]);
  const [activeCommunications, setActiveCommunications] = useState(0);
  const [pendingDecisions, setPendingDecisions] = useState(0);
  const { isConnected } = useBrainHub('brain-core');

  // Simulate initialization
  useEffect(() => {
    // Initialize system with mock data
    setModules([
      { 
        id: 'economic-engine', 
        name: 'Economic Engine', 
        status: 'active', 
        lastAction: 'Dynamic pricing adjustment for US market',
        autonomyLevel: 65,
        health: 92,
        processingLoad: 45
      },
      { 
        id: 'content-generation', 
        name: 'Content Generation', 
        status: 'active', 
        lastAction: 'Created 3 new AI profiles with personalities',
        autonomyLevel: 70,
        health: 88,
        processingLoad: 60
      },
      { 
        id: 'strategic-planning', 
        name: 'Strategic Planning', 
        status: 'active', 
        lastAction: 'Market analysis for Eastern Europe expansion',
        autonomyLevel: 55,
        health: 95,
        processingLoad: 30
      },
      { 
        id: 'autodevops', 
        name: 'AutoDevOps', 
        status: 'idle', 
        lastAction: 'Module check complete - no missing components',
        autonomyLevel: 40,
        health: 100,
        processingLoad: 10
      }
    ]);

    // Initialize with mock recent actions
    setRecentActions([
      {
        id: '1',
        timestamp: new Date(),
        module: 'Economic Engine',
        action: 'Adjusted dynamic pricing for premium content in APAC region (+5%)',
        status: 'completed',
        impact: 'medium',
        confidence: 85
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 15 * 60000),
        module: 'Content Generation',
        action: 'Generated 4 new AI profiles based on trending user preferences',
        status: 'completed',
        impact: 'medium',
        confidence: 92
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 35 * 60000),
        module: 'Strategic Planning',
        action: 'Initiated SEO campaign for newly identified keywords',
        status: 'completed',
        impact: 'high',
        confidence: 78
      }
    ]);

    // Simulate system load
    const interval = setInterval(() => {
      setSystemLoad(prevLoad => {
        const newLoad = Math.min(100, Math.max(10, prevLoad + (Math.random() * 10 - 5)));
        return Math.round(newLoad);
      });
      
      setActiveCommunications(Math.floor(Math.random() * 15) + 5);
      setPendingDecisions(Math.floor(Math.random() * 4));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  // Simulate Brain Hub autonomy level change
  const handleAutonomyChange = (newLevel: number) => {
    setAutonomyLevel(newLevel);
    brainHub.setAutonomy(true, newLevel);
  };
  
  // Connect to module
  const connectToModule = (moduleId: string) => {
    // In a real implementation, this would establish a connection to the specified module
    console.log(`Connecting Brain Core to ${moduleId}`);
  };
  
  // Emergency shutdown simulation
  const emergencyShutdown = () => {
    if (confirm('Are you sure you want to perform an emergency shutdown of all autonomous systems?')) {
      // In a real implementation, this would shut down autonomous operations
      console.log('Emergency shutdown initiated');
      handleAutonomyChange(0);
      
      // Update modules to idle
      setModules(modules.map(module => ({
        ...module,
        status: 'idle' as const,
        autonomyLevel: 0
      })));
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-primary mr-2" />
            <div>
              <CardTitle>Brain Core</CardTitle>
              <CardDescription>
                Unified control center for autonomous operations
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Cpu className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm font-medium">Load: {systemLoad}%</span>
            </div>
            <div className="flex items-center">
              <HeartPulse className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm font-medium">Status: {isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={emergencyShutdown}
            >
              Emergency Shutdown
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="modules">Connected Modules</TabsTrigger>
            <TabsTrigger value="decisions">Autonomous Decisions</TabsTrigger>
            <TabsTrigger value="settings">Core Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm">Autonomy Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{autonomyLevel}%</div>
                  <Progress value={autonomyLevel} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm">Active Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{modules.filter(m => m.status === 'active').length} / {modules.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm">Active Communications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeCommunications}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm">Pending Decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingDecisions}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Module Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map(module => (
                      <div key={module.id} className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <div 
                              className={`w-3 h-3 rounded-full mr-2 ${
                                module.status === 'active' ? 'bg-green-500' : 
                                module.status === 'idle' ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                            ></div>
                            <span className="font-medium">{module.name}</span>
                          </div>
                          {module.lastAction && (
                            <div className="text-xs text-muted-foreground mt-0.5">{module.lastAction}</div>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => connectToModule(module.id)}
                        >
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Recent Autonomous Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActions.map(action => (
                      <div key={action.id} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{action.module}</span>
                          <Badge variant={
                            action.impact === 'high' ? 'default' : 
                            action.impact === 'medium' ? 'secondary' : 'outline'
                          }>
                            {action.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{action.action}</p>
                        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                          <span>
                            {action.timestamp.toLocaleTimeString()} · {' '}
                            {action.status === 'completed' ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-0.5" /> Complete
                              </span>
                            ) : action.status === 'failed' ? (
                              <span className="text-red-600 flex items-center">
                                <AlertTriangle className="h-3 w-3 mr-0.5" /> Failed
                              </span>
                            ) : (
                              <span className="text-amber-600">Pending</span>
                            )}
                          </span>
                          <span>Confidence: {action.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map(module => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{module.name}</CardTitle>
                      <Badge variant={
                        module.status === 'active' ? 'default' : 
                        module.status === 'idle' ? 'secondary' : 'destructive'
                      }>
                        {module.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Autonomy Level: {module.autonomyLevel}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Health</span>
                          <span>{module.health}%</span>
                        </div>
                        <Progress value={module.health} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Processing Load</span>
                          <span>{module.processingLoad}%</span>
                        </div>
                        <Progress value={module.processingLoad} className="h-2" />
                      </div>
                      
                      {module.lastAction && (
                        <div className="text-sm">
                          <span className="font-medium">Last Action:</span> {module.lastAction}
                        </div>
                      )}
                      
                      <div className="pt-2 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => connectToModule(module.id)}
                        >
                          Connect
                        </Button>
                        
                        <Button 
                          variant={module.status === 'active' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => {
                            // Toggle module status
                            setModules(modules.map(m => 
                              m.id === module.id 
                                ? {...m, status: m.status === 'active' ? 'idle' : 'active'} 
                                : m
                            ));
                          }}
                        >
                          {module.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="decisions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Decision History</CardTitle>
                <CardDescription>
                  Recent autonomous decisions made by the Brain Core
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActions.map((action, index) => (
                    <div key={action.id} className={`pb-6 ${index < recentActions.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">{action.module}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {action.timestamp.toLocaleTimeString()} - {action.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="mt-2">{action.action}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <Badge variant={
                            action.impact === 'high' ? 'default' : 
                            action.impact === 'medium' ? 'secondary' : 'outline'
                          }>
                            {action.impact} impact
                          </Badge>
                          <span className="ml-2 text-sm">
                            Confidence: {action.confidence}%
                          </span>
                        </div>
                        <Badge variant={
                          action.status === 'completed' ? 'outline' : 
                          action.status === 'failed' ? 'destructive' : 'secondary'
                        }>
                          {action.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Autonomy Configuration</CardTitle>
                <CardDescription>
                  Configure the level of autonomous decision making for the Brain Core
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Global Autonomy Level</span>
                    <span>{autonomyLevel}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAutonomyChange(Math.max(0, autonomyLevel - 10))}
                    >
                      -10%
                    </Button>
                    <Progress value={autonomyLevel} className="flex-grow h-2" />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAutonomyChange(Math.min(100, autonomyLevel + 10))}
                    >
                      +10%
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {autonomyLevel < 30 ? 
                      'Low autonomy: Brain Core will request human approval for all significant decisions' : 
                      autonomyLevel < 70 ? 
                      'Medium autonomy: Brain Core will operate independently for routine tasks, but request approval for high-impact decisions' : 
                      'High autonomy: Brain Core will operate with minimal human intervention, only alerting for critical issues'
                    }
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Module-Specific Autonomy Levels</h3>
                  {modules.map(module => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span>{module.name}</span>
                        <span>{module.autonomyLevel}%</span>
                      </div>
                      <Progress value={module.autonomyLevel} className="h-2 mt-2" />
                      <div className="flex justify-end mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Update module's autonomy level
                            setModules(modules.map(m => 
                              m.id === module.id 
                                ? {...m, autonomyLevel: Math.min(100, m.autonomyLevel + 10)} 
                                : m
                            ));
                          }}
                        >
                          Increase
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button onClick={() => {
                    // Save all settings
                    console.log('Saving Brain Core settings');
                    
                    // In a real implementation, this would send the settings to the backend
                    modules.forEach(module => {
                      console.log(`Setting ${module.name} autonomy to ${module.autonomyLevel}%`);
                    });
                  }}>
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BrainCore;
