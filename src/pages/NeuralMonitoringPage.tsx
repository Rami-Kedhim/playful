
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, BarChart2, Brain, CheckCircle, Database, Server, Settings } from 'lucide-react';

const NeuralMonitoringPage = () => {
  const [isSystemHealthy, setIsSystemHealthy] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for neural network performance
  const systemStatus = {
    cpuUsage: 32,
    memoryUsage: 45,
    networkLatency: 12,
    activeUsers: 1287,
    requestsPerSecond: 124,
    errorRate: 0.12,
    uptime: "99.98%"
  };

  const neuralSystems = [
    { name: "Oxum Core", status: "Operational", health: 98, lastSync: "2 mins ago" },
    { name: "Hermes API", status: "Operational", health: 99.5, lastSync: "1 min ago" },
    { name: "Orus Security", status: "Operational", health: 97.8, lastSync: "5 mins ago" },
    { name: "Lucie NLP", status: "Operational", health: 99.2, lastSync: "3 mins ago" }
  ];

  const refreshStatus = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <MainLayout
      title="Neural Monitoring"
      description="Real-time monitoring of neural network performance"
      showBreadcrumbs
    >
      <div className="py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isSystemHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-semibold">System Status: {isSystemHealthy ? 'Healthy' : 'Issues Detected'}</h2>
          </div>
          
          <Button 
            onClick={refreshStatus} 
            disabled={isRefreshing}
            variant="outline"
          >
            {isRefreshing ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <Activity className="mr-2 h-4 w-4" />
                Refresh Status
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-1">
                <Server className="h-4 w-4 text-primary mr-1" />
                <span>CPU Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.cpuUsage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${systemStatus.cpuUsage}%` }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Database className="h-4 w-4 text-primary mr-1" />
                <span>Memory Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.memoryUsage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${systemStatus.memoryUsage}%` }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Activity className="h-4 w-4 text-primary mr-1" />
                <span>Network Latency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.networkLatency} ms</div>
              <div className="text-xs text-muted-foreground mt-1">Avg over last 5 minutes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <BarChart2 className="h-4 w-4 text-primary mr-1" />
                <span>Error Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.errorRate}%</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Below threshold
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 text-primary mr-2" />
              Neural Subsystems Status
            </CardTitle>
            <CardDescription>
              Performance metrics for core neural systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">System Name</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Health Score</th>
                    <th className="text-left py-3 px-4">Last Synchronization</th>
                  </tr>
                </thead>
                <tbody>
                  {neuralSystems.map((system, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">{system.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          {system.status}
                        </div>
                      </td>
                      <td className="py-3 px-4">{system.health}%</td>
                      <td className="py-3 px-4">{system.lastSync}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 text-primary mr-2" />
              System Configuration
            </CardTitle>
            <CardDescription>
              Advanced configuration options for neural monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-scaling</h4>
                  <p className="text-sm text-muted-foreground">Automatically scale resources based on load</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Alert Thresholds</h4>
                  <p className="text-sm text-muted-foreground">Set custom thresholds for system alerts</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Logging Level</h4>
                  <p className="text-sm text-muted-foreground">Configure verbosity of system logs</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium text-yellow-800">System Notice</h3>
              <p className="text-sm text-yellow-700">
                Scheduled maintenance planned for neural systems on May 5th, 2025 at 02:00 UTC. 
                Expect potential service interruptions for approximately 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
