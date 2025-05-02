
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  Clock, 
  RotateCcw, 
  PlayCircle, 
  AlertTriangle, 
  Check, 
  Brain, 
  Zap, 
  Save, 
  MoonStar, 
  BadgeCheck, 
  RefreshCw,
  ChevronRight,
  Activity
} from 'lucide-react';

const NeuralAutomationPanel = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isSaving, setIsSaving] = useState(false);
  
  // Automation settings state
  const [automationSettings, setAutomationSettings] = useState({
    systemAutomatedHealing: true,
    dailyBackups: true,
    resourceOptimization: true,
    offHoursScaling: true,
    anomalyDetection: true,
    autonomousPatching: false,
    autoScaling: {
      enabled: true,
      threshold: 75,
      maxNodes: 5
    },
    maintenanceWindow: {
      enabled: true,
      dayOfWeek: 'Sunday',
      hour: '02:00 AM'
    }
  });
  
  // Toggle a boolean setting
  const toggleSetting = (key: string) => {
    setAutomationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };
  
  // Tasks data
  const scheduledTasks = [
    {
      id: 'task-1',
      name: 'System Health Check',
      description: 'Comprehensive check of all neural system components',
      schedule: 'Every 3 hours',
      lastRun: '2025-05-02T08:00:00',
      status: 'active',
      nextRun: '2025-05-02T11:00:00'
    },
    {
      id: 'task-2',
      name: 'Memory Optimization',
      description: 'Clean up unused memory and optimize allocation',
      schedule: 'Daily at 02:00 AM',
      lastRun: '2025-05-01T02:00:00',
      status: 'active',
      nextRun: '2025-05-02T02:00:00'
    },
    {
      id: 'task-3',
      name: 'Neural Model Retraining',
      description: 'Partial retraining of neural models with new data',
      schedule: 'Weekly on Sunday',
      lastRun: '2025-04-28T03:00:00',
      status: 'active',
      nextRun: '2025-05-05T03:00:00'
    },
    {
      id: 'task-4',
      name: 'System Backup',
      description: 'Full backup of all neural system configurations and models',
      schedule: 'Daily at 01:00 AM',
      lastRun: '2025-05-01T01:00:00',
      status: 'error',
      nextRun: '2025-05-02T01:00:00',
      error: 'Insufficient storage space'
    }
  ];
  
  // Recent activities data
  const recentActivities = [
    {
      id: 'activity-1',
      action: 'Automated scaling',
      description: 'System automatically added 1 neural processing node due to high load',
      timestamp: '2025-05-02T09:15:32',
      type: 'system'
    },
    {
      id: 'activity-2',
      action: 'Memory optimization',
      description: 'Scheduled task completed successfully. Freed 1.2GB memory.',
      timestamp: '2025-05-02T02:00:15',
      type: 'scheduled'
    },
    {
      id: 'activity-3',
      action: 'Error recovery',
      description: 'System detected and recovered from request handling errors in node-3',
      timestamp: '2025-05-01T18:42:03',
      type: 'alert'
    },
    {
      id: 'activity-4',
      action: 'Cache cleaning',
      description: 'Removed outdated response cache entries to improve accuracy',
      timestamp: '2025-05-01T14:30:00',
      type: 'scheduled'
    }
  ];
  
  // Update automation setting
  const updateThreshold = (value: number) => {
    setAutomationSettings(prev => ({
      ...prev,
      autoScaling: {
        ...prev.autoScaling,
        threshold: value
      }
    }));
  };
  
  const updateMaxNodes = (value: number) => {
    setAutomationSettings(prev => ({
      ...prev,
      autoScaling: {
        ...prev.autoScaling,
        maxNodes: value
      }
    }));
  };
  
  const handleRunTaskNow = (taskId: string) => {
    toast({
      title: "Task initiated",
      description: "The task has been scheduled to run immediately.",
    });
  };
  
  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your automation settings have been updated.",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="tasks" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Scheduled Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>Automation Settings</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Recent Activity</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-6 pt-4">
          <div className="space-y-4">
            {scheduledTasks.map(task => (
              <Card key={task.id} className={task.status === 'error' ? 'border-red-300 dark:border-red-800' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {task.name}
                        {task.status === 'error' && (
                          <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium px-2 py-0.5 rounded-full">
                            Error
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleRunTaskNow(task.id)}
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span className="sr-only">Run now</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Schedule</p>
                      <p className="font-medium flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {task.schedule}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Last run</p>
                      <p className="font-medium flex items-center">
                        <RotateCcw className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {formatDate(task.lastRun)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Next run</p>
                      <p className="font-medium flex items-center">
                        <ChevronRight className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {formatDate(task.nextRun)}
                      </p>
                    </div>
                  </div>
                  
                  {task.status === 'error' && task.error && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-md flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{task.error}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add New Task</CardTitle>
              <CardDescription>Configure a new scheduled task for your system</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Create New Task
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Neural System Automation</CardTitle>
              <CardDescription>Configure how the system manages itself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">System Automated Healing</h4>
                    <p className="text-xs text-muted-foreground">
                      Automatically detect and recover from system errors
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.systemAutomatedHealing}
                    onCheckedChange={() => toggleSetting('systemAutomatedHealing')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">Daily Backups</h4>
                    <p className="text-xs text-muted-foreground">
                      Create daily backups of system configuration and models
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.dailyBackups}
                    onCheckedChange={() => toggleSetting('dailyBackups')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">Resource Optimization</h4>
                    <p className="text-xs text-muted-foreground">
                      Optimize memory and processing resource allocation
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.resourceOptimization}
                    onCheckedChange={() => toggleSetting('resourceOptimization')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">Off-hours Scaling</h4>
                    <p className="text-xs text-muted-foreground">
                      Reduce resource allocation during typical low-usage periods
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.offHoursScaling}
                    onCheckedChange={() => toggleSetting('offHoursScaling')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">Anomaly Detection</h4>
                    <p className="text-xs text-muted-foreground">
                      Monitor for unusual patterns and notify administrators
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.anomalyDetection}
                    onCheckedChange={() => toggleSetting('anomalyDetection')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div>
                    <h4 className="text-sm font-medium">Autonomous Patching</h4>
                    <p className="text-xs text-muted-foreground">
                      Automatically apply security and stability patches
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.autonomousPatching}
                    onCheckedChange={() => toggleSetting('autonomousPatching')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auto-Scaling Configuration</CardTitle>
              <CardDescription>Configure how the system scales with demand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h4 className="text-sm font-medium">Enable Auto-Scaling</h4>
                  <p className="text-xs text-muted-foreground">
                    Automatically adjust resources based on demand
                  </p>
                </div>
                <Switch
                  checked={automationSettings.autoScaling.enabled}
                  onCheckedChange={() => {
                    setAutomationSettings(prev => ({
                      ...prev,
                      autoScaling: {
                        ...prev.autoScaling,
                        enabled: !prev.autoScaling.enabled
                      }
                    }));
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Scale-up Threshold</label>
                    <span className="text-sm text-muted-foreground">{automationSettings.autoScaling.threshold}%</span>
                  </div>
                  <Slider 
                    disabled={!automationSettings.autoScaling.enabled}
                    value={[automationSettings.autoScaling.threshold]} 
                    min={50} 
                    max={95} 
                    step={5}
                    onValueChange={(values) => updateThreshold(values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    System will scale up when resource utilization exceeds this threshold
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Maximum Nodes</label>
                    <span className="text-sm text-muted-foreground">{automationSettings.autoScaling.maxNodes}</span>
                  </div>
                  <Slider 
                    disabled={!automationSettings.autoScaling.enabled}
                    value={[automationSettings.autoScaling.maxNodes]} 
                    min={1} 
                    max={10} 
                    step={1}
                    onValueChange={(values) => updateMaxNodes(values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of processing nodes the system can scale to
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={saveSettings}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Automation Settings
              </>
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Automation Activity</CardTitle>
              <CardDescription>History of system automated actions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-start gap-3">
                    <div className={`p-2 rounded-full shrink-0 ${
                      activity.type === 'system' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      activity.type === 'alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {activity.type === 'system' ? (
                        <Zap className="h-4 w-4" />
                      ) : activity.type === 'alert' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <span className="text-xs text-muted-foreground">{getTimeSince(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline" size="sm">
                View Full History
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Impact</CardTitle>
              <CardDescription>How automation has improved system performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/40 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MoonStar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Off-hours Savings</div>
                      <div className="text-2xl font-bold">32%</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Resource reduction during low usage periods</p>
                </div>
                
                <div className="p-4 bg-muted/40 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Error Reduction</div>
                      <div className="text-2xl font-bold">47%</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Reduction in errors since enabling auto-healing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAutomationPanel;
