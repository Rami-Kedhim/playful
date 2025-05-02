
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, Calendar, Settings, CheckCircle2, AlertCircle, PlayCircle, PauseCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NeuralAutomationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Neural System Automation</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="automation-toggle" className="text-sm">Automation</Label>
              <Switch 
                id="automation-toggle" 
                checked={isAutomationEnabled} 
                onCheckedChange={setIsAutomationEnabled} 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scheduled">
                <Clock className="mr-2 h-4 w-4" />
                Scheduled
              </TabsTrigger>
              <TabsTrigger value="history">
                <Calendar className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <TabsContent value="scheduled">
                <div className="space-y-4">
                  <AutomationTask 
                    name="Neural Model Optimization" 
                    schedule="Daily at 03:00" 
                    status="active" 
                    lastRun="2025-05-01 03:00"
                    nextRun="2025-05-02 03:00"
                  />
                  
                  <AutomationTask 
                    name="System Backup" 
                    schedule="Weekly on Sunday" 
                    status="active" 
                    lastRun="2025-04-28 01:00"
                    nextRun="2025-05-05 01:00"
                  />
                  
                  <AutomationTask 
                    name="Performance Analytics" 
                    schedule="Hourly" 
                    status="active" 
                    lastRun="2025-05-01 15:00"
                    nextRun="2025-05-01 16:00"
                  />
                  
                  <AutomationTask 
                    name="Anomaly Detection" 
                    schedule="Every 15 minutes" 
                    status="active" 
                    lastRun="2025-05-01 15:45"
                    nextRun="2025-05-01 16:00"
                  />
                  
                  <Button variant="outline" className="w-full mt-2">
                    <Clock className="mr-2 h-4 w-4" />
                    Add New Task
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="space-y-4">
                  <HistoryItem 
                    name="Neural Model Optimization" 
                    status="completed"
                    startTime="2025-05-01 03:00:00"
                    endTime="2025-05-01 03:12:45"
                    message="All models optimized successfully"
                  />
                  
                  <HistoryItem 
                    name="Performance Analytics" 
                    status="completed"
                    startTime="2025-05-01 14:00:00"
                    endTime="2025-05-01 14:01:12"
                    message="Analytics generated and stored"
                  />
                  
                  <HistoryItem 
                    name="Anomaly Detection" 
                    status="warning"
                    startTime="2025-05-01 14:45:00"
                    endTime="2025-05-01 14:45:32"
                    message="Detected memory usage anomaly, threshold exceeded"
                  />
                  
                  <HistoryItem 
                    name="System Resource Check" 
                    status="error"
                    startTime="2025-05-01 13:00:00"
                    endTime="2025-05-01 13:00:21"
                    message="Failed to check disk space, permission denied"
                  />
                  
                  <Button variant="outline" className="w-full mt-2">
                    View Full History
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="notification-level">Notification Level</Label>
                    <Select defaultValue="warnings">
                      <SelectTrigger id="notification-level">
                        <SelectValue placeholder="Select notification level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="warnings">Warnings & Errors</SelectItem>
                        <SelectItem value="errors">Errors Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="auto-recovery">Enable Auto-Recovery</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-recovery" defaultChecked />
                      <Label htmlFor="auto-recovery" className="text-sm text-muted-foreground">
                        Automatically recover from system failures when possible
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-optimization">Resource Optimization</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="resource-optimization" defaultChecked />
                      <Label htmlFor="resource-optimization" className="text-sm text-muted-foreground">
                        Automatically optimize system resources
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-window">Maintenance Window</Label>
                    <Select defaultValue="night">
                      <SelectTrigger id="maintenance-window">
                        <SelectValue placeholder="Select maintenance window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="night">Night (1am - 5am)</SelectItem>
                        <SelectItem value="morning">Morning (5am - 9am)</SelectItem>
                        <SelectItem value="weekend">Weekends Only</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface AutomationTaskProps {
  name: string;
  schedule: string;
  status: 'active' | 'paused' | 'disabled';
  lastRun: string;
  nextRun: string;
}

const AutomationTask: React.FC<AutomationTaskProps> = ({ name, schedule, status, lastRun, nextRun }) => {
  const [taskStatus, setTaskStatus] = useState(status);
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{schedule}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTaskStatus(taskStatus === 'active' ? 'paused' : 'active')}
        >
          {taskStatus === 'active' ? (
            <PauseCircle className="h-5 w-5 text-muted-foreground" />
          ) : (
            <PlayCircle className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div>
          <p className="text-muted-foreground">Last Run</p>
          <p>{lastRun}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Next Run</p>
          <p>{nextRun}</p>
        </div>
      </div>
    </div>
  );
};

interface HistoryItemProps {
  name: string;
  status: 'completed' | 'warning' | 'error';
  startTime: string;
  endTime: string;
  message: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ name, status, startTime, endTime, message }) => {
  const statusColors = {
    completed: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500"
  };
  
  const statusIcons = {
    completed: <CheckCircle2 className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{name}</h3>
        <span className={`flex items-center ${statusColors[status]}`}>
          {statusIcons[status]}
          <span className="ml-1 text-xs capitalize">{status}</span>
        </span>
      </div>
      <div className="mt-2">
        <div className="text-xs text-muted-foreground">
          {startTime} - {endTime}
        </div>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export default NeuralAutomationPanel;
