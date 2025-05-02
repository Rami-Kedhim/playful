
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RefreshCcw, Clock, Settings, Check, AlertTriangle } from 'lucide-react';
import neuralAutomation, { AutomationTask } from '@/services/neural/automation/NeuralAutomationService';

const NeuralAutomationPanel: React.FC = () => {
  const [tasks, setTasks] = useState<AutomationTask[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  useEffect(() => {
    // Load tasks on component mount
    refreshTasks();
  }, []);
  
  const refreshTasks = () => {
    setTasks(neuralAutomation.getTasks());
  };
  
  const toggleTask = (taskId: string, isActive: boolean) => {
    const task = neuralAutomation.getTask(taskId);
    if (!task) return;
    
    neuralAutomation.updateTask(taskId, {
      schedule: {
        ...task.schedule,
        isActive
      }
    });
    
    refreshTasks();
  };
  
  const runTask = async (taskId: string) => {
    await neuralAutomation.executeTask(taskId);
    refreshTasks();
  };
  
  const formatNextRun = (date: Date | null) => {
    if (!date) return 'Not scheduled';
    
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Due now';
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCcw className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.type === activeTab);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Neural Automation</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => neuralAutomation.startAllTasks()}
            >
              <Play className="h-4 w-4 mr-1" />
              Start All
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={() => neuralAutomation.stopAllTasks()}
            >
              <Pause className="h-4 w-4 mr-1" />
              Stop All
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={refreshTasks}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="resource-optimization">Resources</TabsTrigger>
            <TabsTrigger value="health-check">Health</TabsTrigger>
            <TabsTrigger value="auto-scaling">Scaling</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                <p className="text-muted-foreground">No automation tasks found</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-accent/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(task.status)}`}></div>
                      <h3 className="text-sm font-medium">{task.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {task.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-xs space-x-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          Next: {formatNextRun(task.schedule.nextRun)}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => runTask(task.id)}
                        disabled={task.status === 'running'}
                      >
                        <Play className="h-3.5 w-3.5" />
                      </Button>
                      <Switch 
                        checked={task.schedule.isActive} 
                        onCheckedChange={(checked) => toggleTask(task.id, checked)}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {task.description}
                  </p>
                  
                  {task.status === 'failed' && task.error && (
                    <div className="mt-2 text-xs px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded">
                      Error: {task.error}
                    </div>
                  )}
                  
                  {task.results && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs mt-2"
                      onClick={() => console.log('Task results:', task.results)}
                    >
                      View Results
                    </Button>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralAutomationPanel;
