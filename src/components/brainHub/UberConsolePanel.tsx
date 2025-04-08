import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { 
  ActivitySquare, 
  Cpu, 
  Globe, 
  Zap, 
  MonitorPlay, 
  Users, 
  MessageSquare, 
  LineChart,
  AlertTriangle,
  Mic,
  Target
} from 'lucide-react';

/**
 * UberConsolePanel - Implements the "God Panel Dashboard" described in the technical report
 * Central control suite for managing the entire AI system
 */
const UberConsolePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  
  // Simulated data for regions
  const regionData = [
    { id: 'na', name: 'North America', activity: 78, trend: 'up', status: 'normal' },
    { id: 'eu', name: 'Europe', activity: 65, trend: 'up', status: 'normal' },
    { id: 'as', name: 'Asia', activity: 83, trend: 'up', status: 'alert' },
    { id: 'sa', name: 'South America', activity: 42, trend: 'down', status: 'normal' },
    { id: 'au', name: 'Australia', activity: 38, trend: 'stable', status: 'normal' },
  ];
  
  // Simulated system commands
  const systemCommands = [
    { id: 'cmd1', name: 'Global Engagement Boost', description: 'Increase activity across all regions' },
    { id: 'cmd2', name: 'Emergency Slowdown', description: 'Reduce system load during peak times' },
    { id: 'cmd3', name: 'Content Reinforcement', description: 'Strengthen popular content visibility' },
    { id: 'cmd4', name: 'AI Behavior Reset', description: 'Reset AI Companions to baseline' },
    { id: 'cmd5', name: 'Targeted Promotion', description: 'Run targeted promotion campaign' },
  ];
  
  // Simulated active alerts
  const systemAlerts = [
    { id: 'alert1', level: 'warning', message: 'Unusual traffic spike in Asia region', time: '10m ago' },
    { id: 'alert2', level: 'info', message: 'AI Companion System updated to version 2.3.1', time: '1h ago' },
    { id: 'alert3', level: 'error', message: 'Payment processing delays detected', time: '2h ago' },
    { id: 'alert4', level: 'info', message: 'New content moderation rules active', time: '3h ago' },
  ];
  
  // Execute system command
  const executeCommand = (commandId: string) => {
    setIsExecuting(true);
    
    setTimeout(() => {
      setIsExecuting(false);
      
      toast({
        title: 'Command Executed',
        description: `System command ${commandId} has been executed successfully`,
      });
    }, 1500);
  };
  
  // Simulate voice command
  const handleVoiceCommand = () => {
    toast({
      title: 'Voice Command Mode',
      description: 'Voice command processing is not available in this demo',
    });
  };
  
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <ActivitySquare className="h-5 w-5 mr-2 text-primary" />
              UberConsole Central Command
            </CardTitle>
            <CardDescription>Global system management and control center</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleVoiceCommand}>
              <Mic className="h-4 w-4 mr-2" />
              Voice Command
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Precision Mode
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="controls">System Controls</TabsTrigger>
            <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div>
              <h3 className="text-sm font-medium mb-3">Global Activity Heatmap</h3>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                {regionData.map(region => (
                  <Card key={region.id} className={region.status === 'alert' ? 'border-amber-500/50' : ''}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">{region.name}</CardTitle>
                        {region.status === 'alert' && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">{region.activity}%</div>
                          <div className="text-xs text-muted-foreground">Activity Level</div>
                        </div>
                        <div className={`text-lg ${
                          region.trend === 'up' 
                            ? 'text-green-500' 
                            : region.trend === 'down' 
                              ? 'text-red-500' 
                              : 'text-amber-500'
                        }`}>
                          {region.trend === 'up' ? '↑' : region.trend === 'down' ? '↓' : '→'}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-1 mt-4">
                        {Array(4).fill(0).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-primary/10 h-1 rounded-sm" 
                            style={{ 
                              opacity: Math.random() * 0.5 + 0.5,
                              height: `${Math.random() * 10 + 5}px`
                            }} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      User Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Users</span>
                      <Badge variant="outline">7,823</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Session</span>
                      <Badge variant="outline">18m 40s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <Badge variant="outline">4.8%</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      AI Interaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Chats</span>
                      <Badge variant="outline">1,244</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Message Volume</span>
                      <Badge variant="outline">12.3K/hr</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sentiment Score</span>
                      <Badge variant="outline">8.7/10</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <LineChart className="h-4 w-4 mr-2" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Load</span>
                      <Badge variant="outline">68%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <Badge variant="outline">74%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Time</span>
                      <Badge variant="outline">127ms</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-sm font-medium mt-6 mb-3">System Alerts</h3>
              <div className="space-y-2">
                {systemAlerts.map(alert => (
                  <Alert key={alert.id} variant={alert.level === 'error' ? 'destructive' : 'default'}>
                    <div className="flex justify-between">
                      <AlertDescription>
                        {alert.message}
                      </AlertDescription>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </Alert>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="controls">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-3">Global System Commands</h3>
              
              <div className="space-y-2">
                {systemCommands.map(command => (
                  <div 
                    key={command.id} 
                    className="border p-3 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{command.name}</div>
                      <div className="text-sm text-muted-foreground">{command.description}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={isExecuting}
                      onClick={() => executeCommand(command.id)}
                    >
                      {isExecuting ? (
                        <div className="h-4 w-4 border-2 border-current border-r-transparent animate-spin mr-2" />
                      ) : (
                        <Zap className="h-4 w-4 mr-2" />
                      )}
                      Execute
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      AI Subsystem Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      Reset Companion Learning Parameters
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Retrain Recommendation Models
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Optimize Neural Pathways
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Content Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      Refresh Content Libraries
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Adjust Content Distribution
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Launch Global Campaign
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center">
                    <MonitorPlay className="h-4 w-4 mr-2" />
                    Live Events Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" size="sm">Launch New Event</Button>
                    <Button variant="outline" size="sm">Modify Active Events</Button>
                    <Button variant="outline" size="sm">Event Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-3">System Health Dashboard</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Processor Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full border-8 border-primary flex items-center justify-center text-2xl font-bold">
                        68%
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-center">CPU Load average over last 15 minutes</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Memory Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full border-8 border-primary flex items-center justify-center text-2xl font-bold">
                        74%
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-center">Memory utilization across all subsystems</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Subsystem Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Neural Processing Engine</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-600">Optimal</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Content Distribution Network</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-600">Optimal</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>AI Companion System</span>
                      <Badge variant="outline" className="bg-amber-500/20 text-amber-600">High Load</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Payment Processing</span>
                      <Badge variant="outline" className="bg-red-500/20 text-red-600">Warning</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>User Authentication</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-600">Optimal</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Database Cluster</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-600">Optimal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UberConsolePanel;
