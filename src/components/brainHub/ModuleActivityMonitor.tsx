
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Code, CreditCard, Shield, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';
import { AutonomyModule } from '@/services/neural/BrainHubAutonomyEngine';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import { Progress } from '@/components/ui/progress';

interface ModuleActivityMonitorProps {
  moduleId?: string;
}

const ModuleActivityMonitor: React.FC<ModuleActivityMonitorProps> = ({ moduleId }) => {
  const [activeModule, setActiveModule] = useState<AutonomyModule | null>(null);
  const [recentDecisions, setRecentDecisions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    decisionsPerHour: 0,
    successRate: 0,
  });

  useEffect(() => {
    if (!moduleId) return;
    
    const module = autonomyEngine.getModule(moduleId);
    if (module) {
      setActiveModule(module);
      
      // Simulate fetching decisions
      setRecentDecisions(autonomyEngine.getRecentDecisions(5).filter(d => d.moduleId === moduleId));
      
      // Simulate metrics
      setMetrics({
        cpuUsage: Math.floor(Math.random() * 40) + 10,
        memoryUsage: Math.floor(Math.random() * 30) + 20,
        decisionsPerHour: Math.floor(module.config.maxDecisionsPerHour * (Math.random() * 0.8)),
        successRate: module.successRate * 100,
      });
    }
    
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(5, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(5, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 3)),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [moduleId]);
  
  if (!activeModule) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Module Activity</CardTitle>
          <CardDescription>Select a module to view detailed activity</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-muted-foreground">
          No module selected
        </CardContent>
      </Card>
    );
  }
  
  // Format timestamp to readable date
  const formatTimestamp = (timestamp: Date | undefined) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString();
  };
  
  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'strategy-core':
        return <Brain className="h-4 w-4" />;
      case 'code-generator':
        return <Code className="h-4 w-4" />;
      case 'lucoin-governor':
        return <CreditCard className="h-4 w-4" />;
      case 'reputation-monitor':
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'learning':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Learning</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100">Inactive</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {getModuleIcon(activeModule.id)}
            <CardTitle>{activeModule.name}</CardTitle>
            {getStatusBadge(activeModule.status)}
          </div>
          <div className="text-sm text-muted-foreground">
            Last executed: {formatTimestamp(activeModule.lastExecuted)}
          </div>
        </div>
        <CardDescription>{activeModule.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decisions">Recent Decisions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">CPU Usage</div>
                <div className="flex items-center">
                  <Progress value={metrics.cpuUsage} className="h-2" />
                  <span className="ml-2 text-sm">{metrics.cpuUsage.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Memory Usage</div>
                <div className="flex items-center">
                  <Progress value={metrics.memoryUsage} className="h-2" />
                  <span className="ml-2 text-sm">{metrics.memoryUsage.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Success Rate</div>
                <div className="flex items-center">
                  <Progress 
                    value={metrics.successRate} 
                    className={`h-2 ${metrics.successRate > 70 ? 'bg-emerald-600' : 
                                      metrics.successRate > 40 ? 'bg-amber-600' : 
                                      'bg-red-600'}`} 
                  />
                  <span className="ml-2 text-sm">{metrics.successRate.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Decision Rate</div>
                <div className="flex items-center">
                  <div className="text-xl font-bold">{metrics.decisionsPerHour}</div>
                  <span className="ml-2 text-sm text-muted-foreground">/ {activeModule.config.maxDecisionsPerHour} per hour</span>
                </div>
              </div>
              
              <div className="col-span-2">
                <div className="text-sm font-medium mb-2">Module Performance</div>
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Confidence Threshold</div>
                      <div className="text-sm text-muted-foreground">Minimum confidence required for autonomous decisions</div>
                    </div>
                    <div className="text-sm font-bold">{(activeModule.config.confidenceThreshold * 100).toFixed(0)}%</div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Learning Rate</div>
                      <div className="text-sm text-muted-foreground">How quickly the module adapts to new data</div>
                    </div>
                    <div className="text-sm font-bold">{(activeModule.config.learningRate * 100).toFixed(0)}%</div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Oversight Level</div>
                      <div className="text-sm text-muted-foreground">Level of human verification required</div>
                    </div>
                    <div className="text-sm font-bold capitalize">{activeModule.config.oversightLevel}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="decisions">
            {recentDecisions.length > 0 ? (
              <div className="space-y-3">
                {recentDecisions.map((decision, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{decision.description}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(decision.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge 
                          variant="outline" 
                          className={`${
                            decision.outcome === 'success' ? 'bg-green-100 text-green-800' : 
                            decision.outcome === 'failure' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100'
                          }`}
                        >
                          {decision.outcome ? decision.outcome : 'Pending'}
                        </Badge>
                        {decision.outcome === 'success' ? 
                          <CheckCircle className="h-4 w-4 ml-2 text-green-600" /> : 
                          decision.outcome === 'failure' ? 
                          <XCircle className="h-4 w-4 ml-2 text-red-600" /> :
                          <AlertTriangle className="h-4 w-4 ml-2 text-amber-500" />
                        }
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs">
                        Confidence: <span className="font-medium">{(decision.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-xs">
                        Impact: <span className="font-medium capitalize">{decision.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No decisions have been recorded for this module
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 border rounded-md p-3">
                  <h3 className="font-medium">Module Configuration</h3>
                  <div className="text-sm text-muted-foreground mt-1 mb-3">
                    Technical configuration of the autonomy module
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Feedback Loop:</span>
                      <span className="font-medium">{activeModule.config.feedbackLoopEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Learning Rate:</span>
                      <span className="font-medium">{activeModule.config.learningRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence Threshold:</span>
                      <span className="font-medium">{activeModule.config.confidenceThreshold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Decisions Per Hour:</span>
                      <span className="font-medium">{activeModule.config.maxDecisionsPerHour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Oversight Level:</span>
                      <span className="font-medium capitalize">{activeModule.config.oversightLevel}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">
                    This module has made <span className="font-bold">{activeModule.decisionsMade}</span> decisions with a success rate of <span className="font-bold">{(activeModule.successRate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModuleActivityMonitor;
