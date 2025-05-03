
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

/**
 * Project Assessment Dashboard
 * Provides an overview of the project's completion status
 */
const ProjectAssessmentDashboard: React.FC = () => {
  // Module completion percentages
  const moduleStatus = {
    core: 90,
    neural: 85,
    booking: 80,
    content: 75,
    wallet: 70,
    authentication: 95,
  };

  // System health metrics
  const systemHealth = {
    cpuUsage: 45,
    memoryUsage: 60,
    responseTime: 120,
    errorRate: 0.02,
  };

  // Outstanding tasks
  const outstandingTasks = [
    { name: "State management optimization", priority: "high", status: "in-progress" },
    { name: "Performance tuning for neural systems", priority: "high", status: "pending" },
    { name: "End-to-end integration tests", priority: "medium", status: "pending" },
    { name: "API standardization", priority: "medium", status: "in-progress" },
    { name: "Enhanced error handling", priority: "low", status: "pending" },
  ];

  // Calculate overall project completion
  const overallCompletion = 
    Object.values(moduleStatus).reduce((sum, val) => sum + val, 0) / 
    Object.values(moduleStatus).length;

  // Helper to determine status indicator
  const StatusIndicator = ({ percentage }: { percentage: number }) => {
    if (percentage >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (percentage >= 70) return <Clock className="h-5 w-5 text-blue-500" />;
    if (percentage >= 50) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  // Helper to format the progress color
  const getProgressColor = (value: number): string => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper for task priority badge
  const PriorityBadge = ({ priority }: { priority: string }) => {
    const classes = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${classes[priority as keyof typeof classes]}`}>
        {priority}
      </span>
    );
  };

  // Helper for task status badge
  const StatusBadge = ({ status }: { status: string }) => {
    const classes = {
      "completed": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "pending": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${classes[status as keyof typeof classes]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">UberEscorts Project Assessment</h1>
          <p className="text-muted-foreground">Comprehensive overview of project completion and health</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{overallCompletion.toFixed(0)}%</span>
          <StatusIndicator percentage={overallCompletion} />
        </div>
      </div>
      
      <Tabs defaultValue="completion">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="completion">Module Completion</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="tasks">Outstanding Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Module Completion Status</CardTitle>
              <CardDescription>
                Current completion percentage of major system modules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(moduleStatus).map(([module, percentage]) => (
                <div key={module} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIndicator percentage={percentage} />
                      <span className="capitalize">{module}</span>
                    </div>
                    <span>{percentage}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={getProgressColor(percentage)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>System Health Metrics</CardTitle>
              <CardDescription>
                Current system performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>CPU Usage</span>
                  <span>{systemHealth.cpuUsage}%</span>
                </div>
                <Progress 
                  value={systemHealth.cpuUsage} 
                  className={systemHealth.cpuUsage > 80 ? 'bg-red-500' : 'bg-green-500'}
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Memory Usage</span>
                  <span>{systemHealth.memoryUsage}%</span>
                </div>
                <Progress 
                  value={systemHealth.memoryUsage} 
                  className={systemHealth.memoryUsage > 80 ? 'bg-red-500' : 'bg-green-500'}
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span>{systemHealth.responseTime} ms</span>
                </div>
                <Progress 
                  value={Math.min(systemHealth.responseTime / 5, 100)} 
                  className={systemHealth.responseTime > 200 ? 'bg-yellow-500' : 'bg-green-500'}
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Error Rate</span>
                  <span>{(systemHealth.errorRate * 100).toFixed(2)}%</span>
                </div>
                <Progress 
                  value={Math.min(systemHealth.errorRate * 1000, 100)} 
                  className={systemHealth.errorRate > 0.05 ? 'bg-red-500' : 'bg-green-500'}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Tasks</CardTitle>
              <CardDescription>
                Tasks that need to be completed for project finalization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Task</th>
                    <th className="pb-2">Priority</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {outstandingTasks.map((task, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{task.name}</td>
                      <td className="py-3">
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td className="py-3">
                        <StatusBadge status={task.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Modular architecture with clear separation of concerns</li>
                <li>Advanced neural system integration</li>
                <li>Comprehensive user flows for bookings and content</li>
                <li>Secure authentication and verification system</li>
                <li>Responsive UI with modern component library</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enhanced state management across components</li>
                <li>Improved error handling and recovery</li>
                <li>Performance optimization for neural systems</li>
                <li>API standardization for cleaner data access</li>
                <li>Comprehensive integration tests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAssessmentDashboard;
