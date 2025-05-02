
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Cog, 
  Calendar, 
  Clock, 
  Zap, 
  Brain, 
  RefreshCw, 
  Cpu, 
  BarChart4,
  ArrowUpCircle,
  Scale,
  History,
  Wand2,
  AlertCircle
} from 'lucide-react';

const NeuralAutomationPanel = () => {
  const [scheduledTasks, setScheduledTasks] = useState([
    {
      id: 1,
      name: 'System Health Check',
      schedule: 'Every 15 minutes',
      lastRun: '2025-05-02 09:45',
      status: 'active',
      type: 'health'
    },
    {
      id: 2,
      name: 'Performance Optimization',
      schedule: 'Daily at 02:00',
      lastRun: '2025-05-01 02:00',
      status: 'active',
      type: 'optimization'
    },
    {
      id: 3,
      name: 'Neural Model Update',
      schedule: 'Weekly on Saturday',
      lastRun: '2025-04-27 03:00',
      status: 'active',
      type: 'model'
    },
    {
      id: 4,
      name: 'Resource Scaling',
      schedule: 'On demand',
      lastRun: '2025-05-01 14:22',
      status: 'active',
      type: 'scaling'
    }
  ]);

  const [automationSettings, setAutomationSettings] = useState({
    resourceOptimization: true,
    performanceMonitoring: true,
    learningCycle: true,
    anomalyDetection: true,
    maintenanceWindow: 'sunday-03:00',
    thresholdSensitivity: 75,
    autoScalingEnabled: true,
    scalingAggressiveness: 60,
    modelUpdateApproval: false,
    backupFrequency: 'daily',
  });

  const [newTask, setNewTask] = useState({
    name: '',
    schedule: 'hourly',
    type: 'health'
  });

  const handleSettingChange = (settingName, value) => {
    setAutomationSettings(prev => ({
      ...prev,
      [settingName]: value
    }));
  };

  const handleTaskToggle = (taskId) => {
    setScheduledTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'active' ? 'paused' : 'active'
        };
      }
      return task;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name.trim()) return;
    
    setScheduledTasks(prev => [...prev, {
      id: Math.max(0, ...prev.map(t => t.id)) + 1,
      name: newTask.name,
      schedule: newTask.schedule,
      lastRun: 'Never',
      status: 'active',
      type: newTask.type
    }]);
    
    setNewTask({
      name: '',
      schedule: 'hourly',
      type: 'health'
    });
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'health': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'optimization': return <Wand2 className="h-4 w-4 text-purple-500" />;
      case 'model': return <Brain className="h-4 w-4 text-green-500" />;
      case 'scaling': return <Scale className="h-4 w-4 text-amber-500" />;
      default: return <Cog className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="tasks" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Scheduled Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1.5">
            <Cog className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1.5">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automation Tasks</CardTitle>
              <CardDescription>
                Configure scheduled tasks for neural system management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md divide-y">
                  {scheduledTasks.map(task => (
                    <div key={task.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        {getTaskIcon(task.type)}
                        <div>
                          <h4 className="font-medium">{task.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{task.schedule}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Last run: {task.lastRun}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant={task.status === 'active' ? 'outline' : 'default'} 
                          size="sm"
                          onClick={() => handleTaskToggle(task.id)}
                        >
                          {task.status === 'active' ? 'Pause' : 'Resume'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Add New Task</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddTask} className="space-y-3">
                      <div className="grid gap-2">
                        <Label htmlFor="task-name">Task Name</Label>
                        <Input 
                          id="task-name" 
                          placeholder="Enter task name"
                          value={newTask.name}
                          onChange={e => setNewTask({...newTask, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="task-schedule">Schedule</Label>
                          <Select 
                            value={newTask.schedule}
                            onValueChange={value => setNewTask({...newTask, schedule: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="task-type">Task Type</Label>
                          <Select 
                            value={newTask.type}
                            onValueChange={value => setNewTask({...newTask, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="health">Health Check</SelectItem>
                              <SelectItem value="optimization">Optimization</SelectItem>
                              <SelectItem value="model">Model Update</SelectItem>
                              <SelectItem value="scaling">Resource Scaling</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">Add Task</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>
                Configure how the neural system autonomously operates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    Core Features
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="resource-optimization" className="flex-1">
                        <div>Resource Optimization</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically optimize resource allocation based on workloads
                        </div>
                      </Label>
                      <Switch 
                        id="resource-optimization"
                        checked={automationSettings.resourceOptimization} 
                        onCheckedChange={(checked) => handleSettingChange('resourceOptimization', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="performance-monitoring" className="flex-1">
                        <div>Performance Monitoring</div>
                        <div className="text-sm text-muted-foreground">
                          Continuous monitoring of system performance metrics
                        </div>
                      </Label>
                      <Switch 
                        id="performance-monitoring"
                        checked={automationSettings.performanceMonitoring} 
                        onCheckedChange={(checked) => handleSettingChange('performanceMonitoring', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="learning-cycle" className="flex-1">
                        <div>Continuous Learning</div>
                        <div className="text-sm text-muted-foreground">
                          Allow system to learn from new data and improve over time
                        </div>
                      </Label>
                      <Switch 
                        id="learning-cycle"
                        checked={automationSettings.learningCycle} 
                        onCheckedChange={(checked) => handleSettingChange('learningCycle', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="anomaly-detection" className="flex-1">
                        <div>Anomaly Detection</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically detect and alert on system anomalies
                        </div>
                      </Label>
                      <Switch 
                        id="anomaly-detection"
                        checked={automationSettings.anomalyDetection} 
                        onCheckedChange={(checked) => handleSettingChange('anomalyDetection', checked)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Scale className="h-4 w-4 text-primary" />
                    Auto-Scaling Configuration
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-scaling" className="flex-1">Auto-scaling Enabled</Label>
                      <Switch 
                        id="auto-scaling"
                        checked={automationSettings.autoScalingEnabled} 
                        onCheckedChange={(checked) => handleSettingChange('autoScalingEnabled', checked)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="scaling-aggressiveness">Scaling Aggressiveness</Label>
                        <span className="text-sm">
                          {automationSettings.scalingAggressiveness}%
                        </span>
                      </div>
                      <Slider
                        id="scaling-aggressiveness"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[automationSettings.scalingAggressiveness]}
                        onValueChange={(value) => handleSettingChange('scalingAggressiveness', value[0])}
                        disabled={!automationSettings.autoScalingEnabled}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="threshold-sensitivity">Threshold Sensitivity</Label>
                        <span className="text-sm">
                          {automationSettings.thresholdSensitivity}%
                        </span>
                      </div>
                      <Slider
                        id="threshold-sensitivity"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[automationSettings.thresholdSensitivity]}
                        onValueChange={(value) => handleSettingChange('thresholdSensitivity', value[0])}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Wand2 className="h-4 w-4 text-primary" />
                    Advanced Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="maintenance-window">Maintenance Window</Label>
                      <Select
                        value={automationSettings.maintenanceWindow}
                        onValueChange={(value) => handleSettingChange('maintenanceWindow', value)}
                      >
                        <SelectTrigger id="maintenance-window">
                          <SelectValue placeholder="Select maintenance window" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday-03:00">Sunday, 03:00</SelectItem>
                          <SelectItem value="monday-01:00">Monday, 01:00</SelectItem>
                          <SelectItem value="wednesday-02:00">Wednesday, 02:00</SelectItem>
                          <SelectItem value="saturday-04:00">Saturday, 04:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select
                        value={automationSettings.backupFrequency}
                        onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                      >
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox 
                        id="model-approval" 
                        checked={automationSettings.modelUpdateApproval}
                        onCheckedChange={(checked) => handleSettingChange('modelUpdateApproval', checked)}
                      />
                      <Label htmlFor="model-approval">
                        Require approval for model updates
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation History</CardTitle>
              <CardDescription>
                Recent automation actions and system operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  icon={<ArrowUpCircle className="h-4 w-4 text-green-500" />}
                  title="Auto-scaling triggered"
                  timestamp="Today, 10:42"
                  description="Memory usage reached 82%, additional resources allocated."
                />
                <ActivityItem
                  icon={<RefreshCw className="h-4 w-4 text-blue-500" />}
                  title="Resources optimized"
                  timestamp="Today, 08:15"
                  description="Idle resources reassigned to high-demand services."
                />
                <ActivityItem
                  icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
                  title="Anomaly detected"
                  timestamp="Yesterday, 23:05"
                  description="Brief latency spike detected and automatically resolved."
                />
                <ActivityItem
                  icon={<BarChart4 className="h-4 w-4 text-purple-500" />}
                  title="Performance report generated"
                  timestamp="Yesterday, 15:30"
                  description="Weekly performance analysis completed."
                />
                <ActivityItem
                  icon={<Brain className="h-4 w-4 text-indigo-500" />}
                  title="Model optimization completed"
                  timestamp="May 1, 03:15"
                  description="Neural model parameters tuned for improved efficiency."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  description: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  timestamp,
  description
}) => {
  return (
    <div className="flex gap-3 items-start p-3 border rounded-lg">
      <div className="mt-0.5">{icon}</div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default NeuralAutomationPanel;
