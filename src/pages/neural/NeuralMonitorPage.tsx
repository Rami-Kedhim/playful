
import React, { useState, useEffect, ReactNode } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, BarChart, Brain, Grid, Settings, Shield } from 'lucide-react';
import { hermesOrusOxum } from '@/core/HermesOrusOxum';

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: 'success' | 'warning' | 'error' | 'default';
  delta?: string;
  icon: ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, status = 'default', delta, icon }) => {
  const statusColors = {
    success: 'text-green-500',
    warning: 'text-amber-500',
    error: 'text-red-500',
    default: 'text-blue-500'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={statusColors[status]}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {delta && (
          <p className={`text-xs ${delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {delta}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const NeuralMonitorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemHealth, setSystemHealth] = useState({
    status: 'Operational',
    uptime: '99.98%',
    avgResponseTime: '324ms',
    queueDepth: 12,
    activeThreads: 48,
    cpu: 34,
    memory: 41,
    storage: 26,
    trafficLevel: 'Medium',
    aiLoadBalancing: 'Optimal'
  });
  
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      type: 'warning',
      message: 'Unusual traffic pattern detected in Asian region',
      timestamp: Date.now() - 25 * 60 * 1000
    },
    {
      id: 'alert-2',
      type: 'info',
      message: 'Daily neural snapshot scheduled for 02:00 UTC',
      timestamp: Date.now() - 2 * 60 * 60 * 1000
    }
  ]);
  
  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.floor(30 + Math.random() * 10),
        memory: Math.floor(38 + Math.random() * 8),
        queueDepth: Math.floor(8 + Math.random() * 10),
        activeThreads: Math.floor(45 + Math.random() * 8)
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  const getOptimalTime = (): string => {
    const window = hermesOrusOxum.getOptimalTimeWindow();
    return `${window.start}:00 - ${window.end}:00`;
  };
  
  return (
    <Layout
      title="Neural Monitor"
      description="Monitor and optimize the neural networks powering the platform"
      showBreadcrumbs
    >
      <div className="mb-6">
        <Alert variant={systemHealth.status === 'Operational' ? 'default' : 'destructive'}>
          <div className="flex items-center">
            {systemHealth.status === 'Operational' ? (
              <Brain className="h-4 w-4 mr-2" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-2" />
            )}
            <AlertTitle>System Status: {systemHealth.status}</AlertTitle>
            <Button variant="link" className="ml-auto">
              View Details
            </Button>
          </div>
          <AlertDescription>
            Current uptime: {systemHealth.uptime} • Average response time: {systemHealth.avgResponseTime}
          </AlertDescription>
        </Alert>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Threads"
              value={systemHealth.activeThreads}
              icon={<Activity className="h-4 w-4" />}
              status={systemHealth.activeThreads > 75 ? 'warning' : 'default'}
            />
            <MetricCard
              title="Queue Depth"
              value={systemHealth.queueDepth}
              icon={<Grid className="h-4 w-4" />}
              status={systemHealth.queueDepth > 25 ? 'warning' : 'default'}
            />
            <MetricCard
              title="Neural Health"
              value="Optimal"
              icon={<Brain className="h-4 w-4" />}
              status="success"
            />
            <MetricCard
              title="Security Status"
              value="Secure"
              icon={<Shield className="h-4 w-4" />}
              status="success"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">Resource Utilization</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">CPU: {systemHealth.cpu}%</span>
                        <span className={`text-xs ${systemHealth.cpu > 80 ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {systemHealth.cpu > 80 ? 'High' : 'Normal'}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${systemHealth.cpu > 80 ? 'bg-red-500' : 'bg-primary'}`} 
                          style={{ width: `${systemHealth.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Memory: {systemHealth.memory}%</span>
                        <span className="text-xs text-muted-foreground">Normal</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${systemHealth.memory}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Storage: {systemHealth.storage}%</span>
                        <span className="text-xs text-muted-foreground">Normal</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${systemHealth.storage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Neural System Status</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm">
                      <span>Traffic Level:</span>
                      <span className="font-medium">{systemHealth.trafficLevel}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>AI Load Balancing:</span>
                      <span className="font-medium">{systemHealth.aiLoadBalancing}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Optimal Boost Time:</span>
                      <span className="font-medium">{getOptimalTime()}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Active Profiles:</span>
                      <span className="font-medium">3,482</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Boost Queue Length:</span>
                      <span className="font-medium">{hermesOrusOxum.getBoostQueue().activeBoosts}</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full mt-4">Run Diagnostic</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                System Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed metrics visualization would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Neural System Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>System settings and configuration options would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <ul className="space-y-3">
                  {alerts.map(alert => (
                    <li key={alert.id} className="flex items-start pb-3 border-b">
                      <div className={`p-1 rounded-full mr-3 ${
                        alert.type === 'error' ? 'bg-red-100 text-red-600' : 
                        alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(alert.timestamp)}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">No alerts to display</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NeuralMonitorPage;
