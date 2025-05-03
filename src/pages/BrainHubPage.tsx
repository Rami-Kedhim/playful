
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Brain, 
  Cpu, 
  Database, 
  Network, 
  Settings, 
  Zap 
} from 'lucide-react';

const BrainHubPage = () => {
  return (
    <MainLayout
      title="Brain Hub"
      description="Neural network monitoring and management platform"
      showBreadcrumbs
    >
      <div className="py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="models">Neural Models</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    System Health
                  </CardTitle>
                  <CardDescription>Neural network status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Core Stability</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>76%</span>
                      </div>
                      <Progress value={76} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Response Time</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="mr-2 h-5 w-5 text-primary" />
                    Active Models
                  </CardTitle>
                  <CardDescription>Currently operating neural models</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-green-500" />
                        <span>Companion Core v3.5</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-green-500" />
                        <span>Emotion Engine v2.1</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Reality Generator v1.8</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Standby</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Network className="mr-2 h-5 w-5 text-primary" />
                    Network Status
                  </CardTitle>
                  <CardDescription>Neural network connectivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Core Nodes</span>
                      </div>
                      <span className="font-semibold">24/24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-purple-500" />
                        <span>Data Clusters</span>
                      </div>
                      <span className="font-semibold">8/8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Processing Units</span>
                      </div>
                      <span className="font-semibold">16/18</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Detailed Network View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Recent neural network events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <div className="h-full w-px bg-border"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Model Training Completed</p>
                        <p className="text-xs text-muted-foreground">Emotion Engine v2.2 training completed with 98.7% accuracy</p>
                        <p className="text-xs text-muted-foreground mt-1">Today, 09:32 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="h-full w-px bg-border"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">System Self-Optimization</p>
                        <p className="text-xs text-muted-foreground">Neural pathways optimized, 12% performance improvement achieved</p>
                        <p className="text-xs text-muted-foreground mt-1">Today, 06:17 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="h-full w-px bg-border"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Data Integration</p>
                        <p className="text-xs text-muted-foreground">15.8GB of new training data integrated into knowledge base</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday, 11:43 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-full w-px bg-border"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Load Balancer Alert</p>
                        <p className="text-xs text-muted-foreground">High usage detected, automatic scaling initiated</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday, 08:21 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="models">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neural Models Management</CardTitle>
                  <CardDescription>Manage and deploy neural models</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    This section allows you to manage all active and available neural models.
                    Deploy, manage, and monitor model performance and integration.
                  </p>
                  
                  <div className="text-center py-10">
                    <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Models Management Interface</h3>
                    <p className="text-muted-foreground mt-2">
                      Full interface coming soon in the next update
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="training">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neural Network Training</CardTitle>
                  <CardDescription>Train and optimize neural models</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Train new models using custom data sets, fine-tune existing models,
                    and monitor training progress in real-time.
                  </p>
                  
                  <div className="text-center py-10">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Training Interface</h3>
                    <p className="text-muted-foreground mt-2">
                      Full interface coming soon in the next update
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neural System Settings</CardTitle>
                  <CardDescription>Configure system parameters and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Configure global settings, security parameters, and system
                    preferences for the Brain Hub ecosystem.
                  </p>
                  
                  <div className="text-center py-10">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Settings Interface</h3>
                    <p className="text-muted-foreground mt-2">
                      Full interface coming soon in the next update
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BrainHubPage;
