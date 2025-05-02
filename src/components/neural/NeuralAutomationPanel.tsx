
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Calendar, Clock, Play, Pause, Trash2, Plus } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  schedule: string;
  lastRun?: string;
  nextRun: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
}

const NeuralAutomationPanel: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      name: 'Neural Model Optimization',
      schedule: 'Daily at 2:00 AM',
      lastRun: '2025-05-01T02:00:00Z',
      nextRun: '2025-05-02T02:00:00Z',
      status: 'active'
    },
    {
      id: 'task-2',
      name: 'System Health Check',
      schedule: 'Every 4 hours',
      lastRun: '2025-05-01T16:00:00Z',
      nextRun: '2025-05-01T20:00:00Z',
      status: 'active'
    },
    {
      id: 'task-3',
      name: 'Data Backup',
      schedule: 'Weekly on Sunday',
      lastRun: '2025-04-28T01:00:00Z',
      nextRun: '2025-05-05T01:00:00Z',
      status: 'paused'
    }
  ]);
  
  const [automationSettings, setAutomationSettings] = useState({
    autoScaling: true,
    autoRecovery: true,
    learningEnabled: true,
    alertsEnabled: true,
    optimizationLevel: 'balanced' // 'aggressive', 'balanced', 'conservative'
  });

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'active' ? 'paused' : 'active';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleSetting = (setting: keyof typeof automationSettings) => {
    if (typeof automationSettings[setting] === 'boolean') {
      setAutomationSettings({
        ...automationSettings,
        [setting]: !automationSettings[setting]
      });
    }
  };
  
  const formatDateRelative = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) return 'Overdue';
    if (diffMins < 60) return `In ${diffMins} minutes`;
    if (diffMins < 1440) return `In ${Math.round(diffMins / 60)} hours`;
    return `In ${Math.round(diffMins / 1440)} days`;
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled Tasks</TabsTrigger>
          <TabsTrigger value="history">Task History</TabsTrigger>
          <TabsTrigger value="settings">Automation Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scheduled" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Scheduled Neural Tasks</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Task
            </Button>
          </div>
          
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground mb-4">No scheduled tasks found</p>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{task.name}</h4>
                          <Badge variant={task.status === 'active' ? 'default' : 'secondary'}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> 
                            {task.schedule}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> 
                            {formatDateRelative(task.nextRun)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTaskStatus(task.id)}
                          title={task.status === 'active' ? 'Pause task' : 'Resume task'}
                        >
                          {task.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Execution History</CardTitle>
              <CardDescription>Record of all automated task executions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th className="px-6 py-3">Task Name</th>
                      <th className="px-6 py-3">Started</th>
                      <th className="px-6 py-3">Duration</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4">Neural Model Optimization</td>
                      <td className="px-6 py-4">May 1, 2025 2:00 AM</td>
                      <td className="px-6 py-4">45 minutes</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">System Health Check</td>
                      <td className="px-6 py-4">May 1, 2025 12:00 PM</td>
                      <td className="px-6 py-4">3 minutes</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">System Health Check</td>
                      <td className="px-6 py-4">May 1, 2025 8:00 AM</td>
                      <td className="px-6 py-4">2 minutes</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">Model Retraining</td>
                      <td className="px-6 py-4">April 30, 2025 3:15 PM</td>
                      <td className="px-6 py-4">1 hour 23 minutes</td>
                      <td className="px-6 py-4">
                        <Badge variant="destructive">Failed</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Data Backup</td>
                      <td className="px-6 py-4">April 28, 2025 1:00 AM</td>
                      <td className="px-6 py-4">37 minutes</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Automation Settings</CardTitle>
              <CardDescription>Configure how the neural system automation works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-scaling">Auto Scaling</Label>
                    <Switch 
                      id="auto-scaling" 
                      checked={automationSettings.autoScaling}
                      onCheckedChange={() => toggleSetting('autoScaling')}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically scale resources based on system load
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-recovery">Auto Recovery</Label>
                    <Switch 
                      id="auto-recovery" 
                      checked={automationSettings.autoRecovery}
                      onCheckedChange={() => toggleSetting('autoRecovery')}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically recover from system failures
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="continuous-learning">Continuous Learning</Label>
                    <Switch 
                      id="continuous-learning" 
                      checked={automationSettings.learningEnabled}
                      onCheckedChange={() => toggleSetting('learningEnabled')}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enable models to learn from new data automatically
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-alerts">Automated Alerts</Label>
                    <Switch 
                      id="auto-alerts" 
                      checked={automationSettings.alertsEnabled}
                      onCheckedChange={() => toggleSetting('alertsEnabled')}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Send alerts for critical system events
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label>Optimization Level</Label>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant={automationSettings.optimizationLevel === 'conservative' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAutomationSettings({...automationSettings, optimizationLevel: 'conservative'})}
                      className="flex-1"
                    >
                      Conservative
                    </Button>
                    <Button 
                      variant={automationSettings.optimizationLevel === 'balanced' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAutomationSettings({...automationSettings, optimizationLevel: 'balanced'})}
                      className="flex-1"
                    >
                      Balanced
                    </Button>
                    <Button 
                      variant={automationSettings.optimizationLevel === 'aggressive' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAutomationSettings({...automationSettings, optimizationLevel: 'aggressive'})}
                      className="flex-1"
                    >
                      Aggressive
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAutomationPanel;
