
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Clock, 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  AlertOctagon, 
  CheckCircle2, 
  Code,
  Settings,
  Save,
  PlayCircle
} from 'lucide-react';
import { format } from 'date-fns';

const NeuralAutomationPanel: React.FC = () => {
  // Automation tasks
  const [tasks, setTasks] = useState([
    {
      id: '1',
      name: 'Memory Optimization',
      schedule: 'Daily at 3:00 AM',
      lastRun: '2025-05-01T03:00:00',
      nextRun: '2025-05-02T03:00:00',
      status: 'active',
      description: 'Automatically optimize memory usage and clear unused cache'
    },
    {
      id: '2',
      name: 'Performance Analysis',
      schedule: 'Weekly on Sunday',
      lastRun: '2025-04-27T09:00:00',
      nextRun: '2025-05-04T09:00:00',
      status: 'active',
      description: 'Run comprehensive performance analysis and generate reports'
    },
    {
      id: '3',
      name: 'Neural Model Update',
      schedule: 'Monthly on 1st',
      lastRun: '2025-04-01T06:00:00',
      nextRun: '2025-05-01T06:00:00',
      status: 'disabled',
      description: 'Check for and apply neural model updates if available'
    }
  ]);
  
  // New task form
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    schedule: 'daily',
    time: '03:00',
    day: '',
    description: '',
    status: 'active'
  });
  
  // Date for scheduling
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Add a new automation task
  const addNewTask = () => {
    const nextId = String(tasks.length + 1);
    let nextRunDate = new Date();
    
    // Calculate next run date based on schedule
    if (newTask.schedule === 'daily') {
      const [hours, minutes] = newTask.time.split(':').map(Number);
      nextRunDate.setHours(hours, minutes, 0, 0);
      if (nextRunDate < new Date()) {
        nextRunDate.setDate(nextRunDate.getDate() + 1);
      }
    } else if (newTask.schedule === 'weekly' && newTask.day) {
      const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const targetDay = daysOfWeek.indexOf(newTask.day);
      const currentDay = nextRunDate.getDay();
      const daysToAdd = (targetDay + 7 - currentDay) % 7;
      nextRunDate.setDate(nextRunDate.getDate() + daysToAdd);
      const [hours, minutes] = newTask.time.split(':').map(Number);
      nextRunDate.setHours(hours, minutes, 0, 0);
    } else if (newTask.schedule === 'monthly' && date) {
      nextRunDate = new Date(date);
      const [hours, minutes] = newTask.time.split(':').map(Number);
      nextRunDate.setHours(hours, minutes, 0, 0);
    }
    
    const task = {
      id: nextId,
      name: newTask.name,
      schedule: newTask.schedule === 'daily' ? `Daily at ${newTask.time}` :
                newTask.schedule === 'weekly' ? `Weekly on ${newTask.day}` :
                `Monthly on ${date?.getDate()}`,
      lastRun: '-',
      nextRun: nextRunDate.toISOString(),
      status: newTask.status,
      description: newTask.description
    };
    
    setTasks([...tasks, task]);
    setShowNewTask(false);
    setNewTask({
      name: '',
      schedule: 'daily',
      time: '03:00',
      day: '',
      description: '',
      status: 'active'
    });
  };
  
  // Toggle task status
  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'active' ? 'disabled' : 'active' } : task
    ));
  };
  
  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Run task now
  const runTaskNow = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, lastRun: new Date().toISOString() } : task
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Neural Automation Control
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure and schedule automated tasks for neural system maintenance and optimization
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Button>
          <Button onClick={() => setShowNewTask(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      
      {showNewTask && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Automation Task</CardTitle>
            <CardDescription>Configure schedule and parameters for automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input 
                    id="task-name" 
                    placeholder="Enter task name" 
                    value={newTask.name}
                    onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-schedule">Schedule</Label>
                  <Select 
                    defaultValue={newTask.schedule} 
                    onValueChange={(value) => setNewTask({...newTask, schedule: value})}
                  >
                    <SelectTrigger id="task-schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                {newTask.schedule === 'daily' && (
                  <div className="space-y-2">
                    <Label htmlFor="task-time">Time</Label>
                    <Input 
                      id="task-time" 
                      type="time" 
                      value={newTask.time}
                      onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    />
                  </div>
                )}
                
                {newTask.schedule === 'weekly' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-day">Day</Label>
                      <Select 
                        defaultValue={newTask.day} 
                        onValueChange={(value) => setNewTask({...newTask, day: value})}
                      >
                        <SelectTrigger id="task-day">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-time">Time</Label>
                      <Input 
                        id="task-time" 
                        type="time" 
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                
                {newTask.schedule === 'monthly' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Day of Month</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-time">Time</Label>
                      <Input 
                        id="task-time" 
                        type="time" 
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea 
                  id="task-description" 
                  placeholder="Enter task description" 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewTask(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewTask} disabled={!newTask.name}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <div className="bg-muted/30 p-8 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">No automation tasks configured</h3>
            <p className="text-muted-foreground mb-4">
              Add your first automation task to optimize system performance
            </p>
            <Button onClick={() => setShowNewTask(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className={task.status === 'disabled' ? 'opacity-70' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {task.name}
                    </CardTitle>
                    <CardDescription>
                      {task.description}
                    </CardDescription>
                  </div>
                  <Badge variant={task.status === 'active' ? 'default' : 'outline'}>
                    {task.status === 'active' ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Schedule:</span>
                      <span className="text-sm ml-2">{task.schedule}</span>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" className="h-8" onClick={() => toggleTaskStatus(task.id)}>
                        {task.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                      <Button size="sm" variant="outline" className="h-8" onClick={() => runTaskNow(task.id)}>
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Run Now
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-destructive hover:text-destructive" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center mb-1">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Last Run:</span>
                      </div>
                      <p className="text-sm">
                        {task.lastRun === '-' ? 'Never' : new Date(task.lastRun).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center mb-1">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Next Run:</span>
                      </div>
                      <p className="text-sm">
                        {task.status === 'active' ? new Date(task.nextRun).toLocaleString() : 'Disabled'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Code className="h-5 w-5 mr-2 text-primary" />
            Custom Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertOctagon className="h-4 w-4" />
              <AlertDescription>
                Custom automation scripts require administrative approval
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label htmlFor="script-editor">Automation Script</Label>
              <Textarea 
                id="script-editor"
                placeholder="// Enter neural automation script"
                className="font-mono h-32"
                disabled
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  Advanced feature requiring security clearance
                </span>
              </div>
              <Button disabled>Request Access</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralAutomationPanel;
