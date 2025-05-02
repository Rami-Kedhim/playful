
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Copy,
  Edit,
  Repeat,
  Trash2,
  PlayCircle,
  PauseCircle,
  Plus,
  Sparkles,
  Clock4,
  RefreshCw,
  AlarmClock
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScheduledTask {
  id: string;
  name: string;
  description: string;
  schedule: {
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    time: string;
    days?: string[];
    date?: string;
    expression?: string; 
  };
  enabled: boolean;
  type: 'maintenance' | 'backup' | 'optimization' | 'report' | 'cleanup';
  lastRun?: string;
  nextRun: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

const tasks: ScheduledTask[] = [
  {
    id: 'task-1',
    name: 'Neural Cache Optimization',
    description: 'Cleans and optimizes the neural memory cache',
    schedule: {
      type: 'daily',
      time: '03:00',
    },
    enabled: true,
    type: 'optimization',
    lastRun: '2023-05-01T03:00:00Z',
    nextRun: '2023-05-02T03:00:00Z',
    status: 'completed'
  },
  {
    id: 'task-2',
    name: 'Model Accuracy Check',
    description: 'Performs analysis on model accuracy and drift',
    schedule: {
      type: 'weekly',
      time: '04:30',
      days: ['Monday', 'Thursday'],
    },
    enabled: true,
    type: 'maintenance',
    lastRun: '2023-04-27T04:30:00Z',
    nextRun: '2023-05-04T04:30:00Z',
    status: 'idle'
  },
  {
    id: 'task-3',
    name: 'System Health Report',
    description: 'Generates comprehensive system health report',
    schedule: {
      type: 'weekly',
      time: '08:00',
      days: ['Friday'],
    },
    enabled: true,
    type: 'report',
    lastRun: '2023-04-28T08:00:00Z',
    nextRun: '2023-05-05T08:00:00Z',
    status: 'idle'
  },
  {
    id: 'task-4',
    name: 'Data Backup',
    description: 'Creates backup of all neural training data',
    schedule: {
      type: 'monthly',
      time: '01:00',
      date: '1',
    },
    enabled: true,
    type: 'backup',
    lastRun: '2023-04-01T01:00:00Z',
    nextRun: '2023-05-01T01:00:00Z',
    status: 'idle'
  },
  {
    id: 'task-5',
    name: 'Log Rotation',
    description: 'Rotates and archives system logs',
    schedule: {
      type: 'custom',
      time: '00:15',
      expression: '0 15 0 * * *',
    },
    enabled: false,
    type: 'cleanup',
    lastRun: '2023-04-30T00:15:00Z',
    nextRun: '2023-05-01T00:15:00Z',
    status: 'idle'
  }
];

const NeuralAutomationPanel: React.FC = () => {
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(tasks);
  const [activeTab, setActiveTab] = useState('all');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Filter tasks based on active tab
  const getFilteredTasks = () => {
    if (activeTab === 'all') return scheduledTasks;
    return scheduledTasks.filter(task => task.type === activeTab);
  };
  
  // Toggle task enabled state
  const toggleTaskEnabled = (id: string) => {
    setScheduledTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, enabled: !task.enabled } : task
      )
    );
    
    const task = scheduledTasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.enabled ? "Task disabled" : "Task enabled",
        description: `${task.name} has been ${task.enabled ? 'disabled' : 'enabled'}.`,
      });
    }
  };
  
  // Run task now
  const runTaskNow = (id: string) => {
    const task = scheduledTasks.find(t => t.id === id);
    
    if (task) {
      // Update task status to running
      setScheduledTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === id ? { ...t, status: 'running' } : t
        )
      );
      
      toast({
        title: "Task started",
        description: `${task.name} is now running.`,
      });
      
      // Simulate task completion after a delay
      setTimeout(() => {
        setScheduledTasks(prevTasks => 
          prevTasks.map(t => 
            t.id === id ? { 
              ...t, 
              status: 'completed',
              lastRun: new Date().toISOString() 
            } : t
          )
        );
        
        toast({
          title: "Task completed",
          description: `${task.name} has completed successfully.`,
          variant: "default",
        });
      }, 3000);
    }
  };
  
  // Delete task
  const deleteTask = (id: string) => {
    const task = scheduledTasks.find(t => t.id === id);
    
    if (task) {
      setScheduledTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      
      toast({
        title: "Task deleted",
        description: `${task.name} has been deleted.`,
      });
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Running</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">Idle</Badge>;
    }
  };
  
  // Get task type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Badge variant="outline" className="border-blue-200 text-blue-800 dark:text-blue-300">Maintenance</Badge>;
      case 'optimization':
        return <Badge variant="outline" className="border-green-200 text-green-800 dark:text-green-300">Optimization</Badge>;
      case 'backup':
        return <Badge variant="outline" className="border-purple-200 text-purple-800 dark:text-purple-300">Backup</Badge>;
      case 'report':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 dark:text-amber-300">Report</Badge>;
      case 'cleanup':
        return <Badge variant="outline" className="border-gray-200 text-gray-800 dark:text-gray-300">Cleanup</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  // Format schedule for display
  const formatSchedule = (schedule: ScheduledTask['schedule']) => {
    switch (schedule.type) {
      case 'daily':
        return `Daily at ${schedule.time}`;
      case 'weekly':
        return `Weekly on ${schedule.days?.join(', ')} at ${schedule.time}`;
      case 'monthly':
        return `Monthly on day ${schedule.date} at ${schedule.time}`;
      case 'custom':
        return `Custom (${schedule.expression})`;
      default:
        return 'Unknown schedule';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Neural System Automation</CardTitle>
              <CardDescription>Schedule automated tasks for system maintenance and optimization</CardDescription>
            </div>
            <Button onClick={() => setIsCreatingTask(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="backup">Backups</TabsTrigger>
              <TabsTrigger value="report">Reports</TabsTrigger>
              <TabsTrigger value="cleanup">Cleanup</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              {getFilteredTasks().length > 0 ? (
                getFilteredTasks().map((task) => (
                  <Card key={task.id} className={`${!task.enabled ? 'opacity-60' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CardTitle>{task.name}</CardTitle>
                          {getTypeBadge(task.type)}
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={task.enabled} 
                            onCheckedChange={() => toggleTaskEnabled(task.id)}
                            aria-label={`Enable ${task.name}`}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => runTaskNow(task.id)}
                            disabled={task.status === 'running' || !task.enabled}
                          >
                            {task.status === 'running' ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <PlayCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(task.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-muted-foreground" />
                          <span>{formatSchedule(task.schedule)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Last run: {task.lastRun ? formatDate(task.lastRun) : 'Never'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Next run: {formatDate(task.nextRun)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <AlarmClock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg">No scheduled tasks</h3>
                    <p className="text-muted-foreground mb-4">
                      {activeTab === 'all' 
                        ? "There are no scheduled tasks. Create a new task to get started." 
                        : `There are no ${activeTab} tasks. Select a different category or create a new task.`}
                    </p>
                    <Button onClick={() => setIsCreatingTask(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock4 className="h-5 w-5" />
              <span>Schedule Templates</span>
            </CardTitle>
            <CardDescription>Common automation schedules for neural systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                <div>
                  <h4 className="font-medium">Neural Cache Optimization</h4>
                  <p className="text-sm text-muted-foreground">Daily at 3:00 AM</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Apply
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                <div>
                  <h4 className="font-medium">Weekly Health Report</h4>
                  <p className="text-sm text-muted-foreground">Fridays at 8:00 AM</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Apply
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                <div>
                  <h4 className="font-medium">Model Performance Analysis</h4>
                  <p className="text-sm text-muted-foreground">Mondays and Thursdays at 4:30 AM</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Apply
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                <div>
                  <h4 className="font-medium">Full System Backup</h4>
                  <p className="text-sm text-muted-foreground">1st day of month at 1:00 AM</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Automation Statistics</span>
            </CardTitle>
            <CardDescription>Performance metrics for automated tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded-md">
                <div className="text-2xl font-bold">14</div>
                <div className="text-sm text-muted-foreground">Total Tasks Run</div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-2xl font-bold">24.3min</div>
                <div className="text-sm text-muted-foreground">Avg. Duration</div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-2xl font-bold">4.2hr</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cache optimization reduced response time by 18%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Auto-healing resolved 7 potential issues</span>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Log rotation task failed on previous run - check permissions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isCreatingTask && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Automated Task</CardTitle>
            <CardDescription>Set up a new scheduled task for the neural system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input id="task-name" placeholder="Enter task name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Input id="task-description" placeholder="Enter task description" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-type">Task Type</Label>
                  <Select>
                    <SelectTrigger id="task-type">
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="backup">Backup</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="cleanup">Cleanup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Schedule</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-type">Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="schedule-type">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom (CRON)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input id="schedule-time" type="time" defaultValue="03:00" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="task-enabled" defaultChecked />
                  <Label htmlFor="task-enabled">Enable task</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsCreatingTask(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsCreatingTask(false);
              toast({
                title: "Task created",
                description: "New task has been created and scheduled.",
              });
            }}>
              Create Task
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default NeuralAutomationPanel;
