
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Play, Pause, Plus, X, Clock, AlertTriangle, CheckCircle2, RefreshCw, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

type Task = {
  id: string;
  name: string;
  type: 'maintenance' | 'optimization' | 'backup' | 'monitoring';
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'paused';
  schedule: 'daily' | 'weekly' | 'monthly' | 'once';
  nextRun: Date;
  lastRun?: Date;
  duration?: number;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  autoResolve: boolean;
};

type Schedule = {
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  time?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  date?: Date;
};

const NeuralAutomationPanel = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'System Optimization',
      type: 'optimization',
      status: 'scheduled',
      schedule: 'daily',
      nextRun: new Date(Date.now() + 3600000), // 1 hour from now
      lastRun: new Date(Date.now() - 86400000), // 1 day ago
      duration: 15,
      priority: 'medium',
      description: 'Optimize neural processing queues and memory allocation',
      autoResolve: true
    },
    {
      id: '2',
      name: 'Database Backup',
      type: 'backup',
      status: 'completed',
      schedule: 'daily',
      nextRun: new Date(Date.now() + 7200000), // 2 hours from now
      lastRun: new Date(Date.now() - 3600000), // 1 hour ago
      duration: 10,
      priority: 'high',
      description: 'Back up all neural processing and learning data',
      autoResolve: true
    },
    {
      id: '3',
      name: 'System Health Check',
      type: 'monitoring',
      status: 'running',
      schedule: 'daily',
      nextRun: new Date(Date.now() + 3600000 * 24), // 24 hours from now
      lastRun: new Date(),
      duration: 5,
      priority: 'medium',
      description: 'Verify neural system health and connection status',
      autoResolve: true
    },
    {
      id: '4',
      name: 'Memory Cleanup',
      type: 'maintenance',
      status: 'failed',
      schedule: 'weekly',
      nextRun: new Date(Date.now() + 3600000 * 72), // 72 hours from now
      lastRun: new Date(Date.now() - 3600000 * 2),
      duration: 30,
      priority: 'high',
      description: 'Clean up unused neural pathways and optimize memory usage',
      autoResolve: false
    }
  ]);
  
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskType, setNewTaskType] = useState<Task['type']>('optimization');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [newTaskSchedule, setNewTaskSchedule] = useState<Schedule>({
    frequency: 'daily',
    time: '12:00'
  });
  const [newTaskDate, setNewTaskDate] = useState<Date | undefined>(new Date());
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskAutoResolve, setNewTaskAutoResolve] = useState(true);
  
  // Filter tasks based on tab
  const getFilteredTasks = () => {
    switch (selectedTab) {
      case 'upcoming':
        return tasks.filter(t => t.status === 'scheduled');
      case 'running':
        return tasks.filter(t => t.status === 'running');
      case 'completed':
        return tasks.filter(t => t.status === 'completed');
      case 'failed':
        return tasks.filter(t => t.status === 'failed');
      default:
        return tasks;
    }
  };
  
  // Handle status change
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus } 
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const statusMessages = {
        scheduled: `Task "${task.name}" has been scheduled`,
        running: `Task "${task.name}" is now running`,
        completed: `Task "${task.name}" has been completed`,
        failed: `Task "${task.name}" has failed`,
        paused: `Task "${task.name}" has been paused`
      };
      
      const variant = newStatus === 'failed' ? 'destructive' : 
                      newStatus === 'completed' ? 'success' : 'default';
      
      toast[newStatus === 'failed' ? 'error' : 
            newStatus === 'completed' ? 'success' : 'info'](statusMessages[newStatus]);
    }
  };
  
  // Create new task
  const handleCreateTask = () => {
    if (!newTaskName.trim()) {
      toast.error("Task name cannot be empty");
      return;
    }
    
    // Calculate next run time based on schedule
    let nextRun = new Date();
    
    if (newTaskSchedule.frequency === 'once' && newTaskDate) {
      nextRun = newTaskDate;
    }
    
    // Add hours and minutes if time provided
    if (newTaskSchedule.time) {
      const [hours, minutes] = newTaskSchedule.time.split(':').map(Number);
      nextRun.setHours(hours, minutes, 0, 0);
    }
    
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      name: newTaskName,
      type: newTaskType,
      status: 'scheduled',
      schedule: newTaskSchedule.frequency,
      nextRun,
      priority: newTaskPriority,
      description: newTaskDescription,
      autoResolve: newTaskAutoResolve
    };
    
    setTasks(prev => [newTask, ...prev]);
    setIsCreatingTask(false);
    resetNewTaskForm();
    toast.success(`Task "${newTaskName}" created successfully`);
  };
  
  // Delete task
  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    
    if (task) {
      toast(`Task "${task.name}" deleted`, {
        description: "The task has been removed from the schedule"
      });
    }
  };
  
  // Reset new task form
  const resetNewTaskForm = () => {
    setNewTaskName('');
    setNewTaskType('optimization');
    setNewTaskPriority('medium');
    setNewTaskSchedule({
      frequency: 'daily',
      time: '12:00'
    });
    setNewTaskDate(new Date());
    setNewTaskDescription('');
    setNewTaskAutoResolve(true);
  };
  
  // Get status style
  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'scheduled':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case 'running':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case 'completed':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case 'failed':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'paused':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Get type icon
  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'optimization':
        return <Settings className="h-4 w-4" />;
      case 'backup':
        return <Clock className="h-4 w-4" />;
      case 'monitoring':
        return <RefreshCw className="h-4 w-4" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 0) {
      return 'Overdue';
    }
    
    if (diffMins < 60) {
      return `In ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    return `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };
  
  // Get status icon
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'running':
        return <Play className="h-5 w-5 text-amber-500" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'paused':
        return <Pause className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Automation Tasks</CardTitle>
            <CardDescription>Schedule and monitor neural system tasks</CardDescription>
          </div>
          <Button 
            onClick={() => setIsCreatingTask(!isCreatingTask)} 
            size="sm"
            variant={isCreatingTask ? "secondary" : "default"}
          >
            {isCreatingTask ? "Cancel" : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                New Task
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 pb-0 overflow-hidden">
        {isCreatingTask ? (
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-name">Task Name</Label>
                <Input 
                  id="task-name" 
                  placeholder="System optimization" 
                  value={newTaskName}
                  onChange={e => setNewTaskName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-type">Type</Label>
                  <Select 
                    value={newTaskType} 
                    onValueChange={(value) => setNewTaskType(value as Task['type'])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="backup">Backup</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select 
                    value={newTaskPriority} 
                    onValueChange={(value) => setNewTaskPriority(value as Task['priority'])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Schedule</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Select 
                    value={newTaskSchedule.frequency} 
                    onValueChange={(value) => setNewTaskSchedule({...newTaskSchedule, frequency: value as Schedule['frequency']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {newTaskSchedule.frequency === 'once' ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !newTaskDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTaskDate ? format(newTaskDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTaskDate}
                          onSelect={setNewTaskDate}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input 
                      type="time"
                      value={newTaskSchedule.time}
                      onChange={e => setNewTaskSchedule({...newTaskSchedule, time: e.target.value})}
                    />
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="task-description">Description (optional)</Label>
                <Input 
                  id="task-description" 
                  placeholder="Brief description of the task" 
                  value={newTaskDescription}
                  onChange={e => setNewTaskDescription(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-resolve" 
                  checked={newTaskAutoResolve}
                  onCheckedChange={setNewTaskAutoResolve}
                />
                <Label htmlFor="auto-resolve">Auto-resolve on completion</Label>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreateTask}>Create Task</Button>
                <Button variant="outline" onClick={() => setIsCreatingTask(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab}>
              <div className="px-4">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="running">Running</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="px-4 mt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Task</span>
                  <span>Schedule</span>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <ScrollArea className="flex-grow h-[350px]">
                <div className="px-4 space-y-2 py-2">
                  {getFilteredTasks().length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <p className="text-muted-foreground">No tasks found</p>
                      <Button 
                        variant="ghost" 
                        className="mt-2" 
                        onClick={() => setIsCreatingTask(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create a task
                      </Button>
                    </div>
                  ) : (
                    getFilteredTasks().map(task => (
                      <div 
                        key={task.id} 
                        className="border rounded-md p-3 group hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md ${task.status === 'failed' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-accent'}`}>
                              {getTypeIcon(task.type)}
                            </div>
                            <div>
                              <p className="font-medium">{task.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusStyle(task.status)}>
                                  {task.status}
                                </Badge>
                                {task.priority === 'high' && (
                                  <Badge variant="outline" className="bg-red-100/50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300">
                                    High priority
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>
                                {task.status === 'scheduled' ? formatRelativeTime(task.nextRun) : 
                                 task.status === 'running' ? 'Currently running' :
                                 task.lastRun ? format(task.lastRun, 'PPp') : 'N/A'}
                              </span>
                            </div>
                            
                            <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              {task.status === 'scheduled' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => handleStatusChange(task.id, 'running')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                              
                              {task.status === 'running' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => handleStatusChange(task.id, 'paused')}
                                >
                                  <Pause className="h-3 w-3" />
                                </Button>
                              )}
                              
                              {task.status === 'paused' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => handleStatusChange(task.id, 'running')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                              
                              {task.status === 'failed' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => handleStatusChange(task.id, 'scheduled')}
                                >
                                  <RefreshCw className="h-3 w-3" />
                                </Button>
                              )}
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralAutomationPanel;
