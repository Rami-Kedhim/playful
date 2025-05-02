
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Clock,
  AlarmClock,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  PlayCircle,
  PauseCircle,
  RefreshCcw,
  PlusCircle,
  Repeat,
  AlertTriangle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Task {
  id: string;
  name: string;
  description: string;
  schedule: string;
  type: string;
  lastRun: string;
  nextRun: string;
  status: 'active' | 'paused' | 'failed' | 'completed';
  outcome?: string;
}

const NeuralAutomationPanel: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const mockTasks: Task[] = [
    {
      id: 'task-1',
      name: 'Neural Network Optimization',
      description: 'Automatically optimize neural network parameters based on system performance metrics',
      schedule: 'Daily at 2:00 AM',
      type: 'optimization',
      lastRun: '2025-05-01 02:00:00',
      nextRun: '2025-05-02 02:00:00',
      status: 'active',
    },
    {
      id: 'task-2',
      name: 'System Backup',
      description: 'Create a complete backup of all neural system configurations and data',
      schedule: 'Weekly on Sunday at 1:00 AM',
      type: 'backup',
      lastRun: '2025-04-28 01:00:00',
      nextRun: '2025-05-05 01:00:00',
      status: 'active',
    },
    {
      id: 'task-3',
      name: 'Error Log Analysis',
      description: 'Analyze system error logs and generate report of potential issues',
      schedule: 'Daily at 6:00 AM',
      type: 'monitoring',
      lastRun: '2025-05-01 06:00:00',
      nextRun: '2025-05-02 06:00:00',
      status: 'active',
    },
    {
      id: 'task-4',
      name: 'Security Scan',
      description: 'Perform comprehensive security scan of all neural modules and APIs',
      schedule: 'Daily at 12:00 PM',
      type: 'security',
      lastRun: '2025-05-01 12:00:00',
      nextRun: '2025-05-02 12:00:00',
      status: 'failed',
      outcome: 'Timeout while scanning external API connections'
    },
    {
      id: 'task-5',
      name: 'Performance Report Generation',
      description: 'Generate daily performance report with key metrics and recommendations',
      schedule: 'Daily at 8:00 AM',
      type: 'reporting',
      lastRun: '2025-05-01 08:00:00',
      nextRun: '2025-05-02 08:00:00',
      status: 'active',
    },
    {
      id: 'task-6',
      name: 'Cache Cleanup',
      description: 'Clean up expired cache entries to optimize system performance',
      schedule: 'Every 6 hours',
      type: 'optimization',
      lastRun: '2025-05-01 18:00:00',
      nextRun: '2025-05-02 00:00:00',
      status: 'completed',
      outcome: 'Freed 2.3GB of memory'
    },
  ];
  
  const getFilteredTasks = () => {
    if (activeFilter === 'all') return mockTasks;
    return mockTasks.filter(task => task.status === activeFilter);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-amber-500';
      case 'failed': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'backup': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'monitoring': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'reporting': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Scheduled Tasks</CardTitle>
                <CardDescription>Automated processes and maintenance</CardDescription>
              </div>
              <div>
                <Button variant="default" size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  New Task
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Tabs 
                defaultValue={activeFilter} 
                onValueChange={setActiveFilter}
                className="w-full md:w-auto"
              >
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="paused">Paused</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="hidden md:flex items-center space-x-2">
                <Select defaultValue="sort-next">
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="sort-next">Next run time</SelectItem>
                      <SelectItem value="sort-last">Last run time</SelectItem>
                      <SelectItem value="sort-name">Task name</SelectItem>
                      <SelectItem value="sort-type">Task type</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {getFilteredTasks().map((task) => (
                <Card key={task.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(task.status)}`}></div>
                          <h3 className="font-medium">{task.name}</h3>
                          <Badge variant="outline" className={`text-xs ${getTypeColor(task.type)}`}>
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Schedule</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs">{task.schedule}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={task.status === 'active' ? "ghost" : "outline"} 
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            {task.status === 'active' ? (
                              <PauseCircle className="h-4 w-4" />
                            ) : (
                              <PlayCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {task.status === 'failed' && task.outcome && (
                      <div className="mt-2 p-2 bg-red-100/50 dark:bg-red-900/20 rounded-md flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div className="text-xs text-red-800 dark:text-red-300">
                          {task.outcome}
                        </div>
                      </div>
                    )}
                    
                    {task.status === 'completed' && task.outcome && (
                      <div className="mt-2 p-2 bg-green-100/50 dark:bg-green-900/20 rounded-md flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="text-xs text-green-800 dark:text-green-300">
                          {task.outcome}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Task automation calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
            
            <div className="mt-4 space-y-3">
              <h3 className="text-sm font-medium">May 2, 2025</h3>
              
              <div className="space-y-2">
                {mockTasks.slice(0, 3).map((task, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlarmClock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{task.schedule.split(' at ')[1]}</span>
                    </div>
                    <span className="text-xs truncate max-w-[150px]">{task.name}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Run All Active Tasks
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <PauseCircle className="h-4 w-4 mr-2" />
                  Pause All Tasks
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Repeat className="h-4 w-4 mr-2" />
                  Reset Failed Tasks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Automation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Automation</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Recovery</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Optimization</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Schedule Updates</span>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Optimization</span>
                <span className="text-xs">2 tasks</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[33%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Backup</span>
                <span className="text-xs">1 task</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[17%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Monitoring</span>
                <span className="text-xs">1 task</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[17%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Security</span>
                <span className="text-xs">1 task</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[17%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Reporting</span>
                <span className="text-xs">1 task</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[17%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Task Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Successful</span>
                </div>
                <span>42</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Failed</span>
                </div>
                <span>3</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Total Runtime</span>
                </div>
                <span>23.4h</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Average Duration</span>
                </div>
                <span>3.2m</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlarmClock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Next 24h Tasks</span>
                </div>
                <span>8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralAutomationPanel;
