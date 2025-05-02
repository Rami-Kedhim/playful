
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Activity, 
  Power, 
  Zap, 
  Shield, 
  BarChart, 
  Settings, 
  Cpu, 
  Database, 
  RefreshCw, 
  AlertTriangle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const NeuralSystemControls: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'maintenance'>('online');
  const [processingPower, setProcessingPower] = useState(75);
  const [responseThreshold, setResponseThreshold] = useState(85);
  const [resourceAllocation, setResourceAllocation] = useState(60);
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [autonomousMode, setAutonomousMode] = useState(false);
  const [securityMode, setSecurityMode] = useState('standard');

  // System metrics
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 42,
    memoryUsage: 38,
    requestRate: 156,
    responseTime: 120,
    throughput: 85,
    errorRate: 0.8
  });

  // Handle system power toggle
  const toggleSystemStatus = () => {
    if (systemStatus === 'online') {
      setSystemStatus('offline');
    } else {
      setSystemStatus('online');
    }
  };
  
  // Handle system maintenance mode
  const toggleMaintenanceMode = () => {
    if (systemStatus === 'maintenance') {
      setSystemStatus('online');
    } else {
      setSystemStatus('maintenance');
    }
  };
  
  // Refresh system metrics
  const refreshMetrics = () => {
    setSystemMetrics({
      cpuUsage: Math.round(35 + Math.random() * 15),
      memoryUsage: Math.round(30 + Math.random() * 20),
      requestRate: Math.round(140 + Math.random() * 40),
      responseTime: Math.round(100 + Math.random() * 40),
      throughput: Math.round(75 + Math.random() * 20),
      errorRate: Math.round((0.5 + Math.random() * 0.8) * 10) / 10
    });
  };
  
  // Handle security mode change
  const changeSecurityMode = (mode: string) => {
    setSecurityMode(mode);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Neural System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      systemStatus === 'online' ? 'bg-green-500' : 
                      systemStatus === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium capitalize">{systemStatus}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {systemStatus === 'online' 
                      ? 'System is operational and processing requests' 
                      : systemStatus === 'maintenance'
                      ? 'System is in maintenance mode'
                      : 'System is currently offline'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={systemStatus === 'maintenance' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={toggleMaintenanceMode}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Maintenance
                  </Button>
                  <Button 
                    variant={systemStatus === 'online' ? 'default' : 'outline'}
                    onClick={toggleSystemStatus}
                  >
                    <Power className="h-4 w-4 mr-1" />
                    {systemStatus === 'online' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label className="text-xs">CPU Usage</Label>
                    <span className="text-xs font-medium">{systemMetrics.cpuUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label className="text-xs">Memory Usage</Label>
                    <span className="text-xs font-medium">{systemMetrics.memoryUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label className="text-xs">Request Rate</Label>
                    <span className="text-xs font-medium">{systemMetrics.requestRate}/s</span>
                  </div>
                  <Progress value={(systemMetrics.requestRate / 200) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label className="text-xs">Response Time</Label>
                    <span className="text-xs font-medium">{systemMetrics.responseTime}ms</span>
                  </div>
                  <Progress value={(systemMetrics.responseTime / 200) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={refreshMetrics}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Refresh Metrics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="processing-power">Processing Power</Label>
                  <span className="text-sm font-medium">{processingPower}%</span>
                </div>
                <Slider 
                  id="processing-power" 
                  min={10} 
                  max={100} 
                  step={5}
                  value={[processingPower]} 
                  onValueChange={(value) => setProcessingPower(value[0])}
                  disabled={systemStatus !== 'online'}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="response-threshold">Response Threshold</Label>
                  <span className="text-sm font-medium">{responseThreshold}ms</span>
                </div>
                <Slider 
                  id="response-threshold" 
                  min={50} 
                  max={150} 
                  step={5}
                  value={[responseThreshold]} 
                  onValueChange={(value) => setResponseThreshold(value[0])}
                  disabled={systemStatus !== 'online'}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="resource-allocation">Resource Allocation</Label>
                  <span className="text-sm font-medium">{resourceAllocation}%</span>
                </div>
                <Slider 
                  id="resource-allocation" 
                  min={20} 
                  max={90} 
                  step={10}
                  value={[resourceAllocation]} 
                  onValueChange={(value) => setResourceAllocation(value[0])}
                  disabled={systemStatus !== 'online'}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          <Label htmlFor="adaptive-mode">Adaptive Mode</Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">Automatically adjusts system parameters based on current load and performance metrics</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch 
                    id="adaptive-mode" 
                    checked={adaptiveMode}
                    onCheckedChange={setAdaptiveMode}
                    disabled={systemStatus !== 'online'}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Cpu className="h-4 w-4 mr-2" />
                          <Label htmlFor="autonomous-mode">Autonomous Mode</Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">Enables the system to make independent decisions about resource allocation and optimization</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch 
                    id="autonomous-mode" 
                    checked={autonomousMode}
                    onCheckedChange={setAutonomousMode}
                    disabled={systemStatus !== 'online'}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Security Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  size="sm"
                  variant={securityMode === 'basic' ? 'default' : 'outline'}
                  className="text-xs h-8"
                  onClick={() => changeSecurityMode('basic')}
                >
                  Basic
                </Button>
                <Button 
                  size="sm"
                  variant={securityMode === 'standard' ? 'default' : 'outline'}
                  className="text-xs h-8"
                  onClick={() => changeSecurityMode('standard')}
                >
                  Standard
                </Button>
                <Button 
                  size="sm"
                  variant={securityMode === 'enhanced' ? 'default' : 'outline'}
                  className="text-xs h-8"
                  onClick={() => changeSecurityMode('enhanced')}
                >
                  Enhanced
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {securityMode === 'basic' ? 'Basic security with minimal overhead' :
                 securityMode === 'standard' ? 'Balanced security and performance' :
                 'Maximum security with advanced protection'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-primary" />
              Storage Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Data Compression</Label>
                <Switch id="data-compression" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-xs">Cache Optimization</Label>
                <Switch id="cache-optimization" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemMetrics.errorRate > 1.0 ? (
                <Alert variant="destructive" className="py-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Error rate above threshold: {systemMetrics.errorRate}%
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="flex items-center text-green-500 text-sm">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>System operating normally</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Last diagnostic: {new Date().toLocaleString()}
              </p>
              <Button size="sm" variant="outline" className="w-full mt-1 text-xs h-7">
                Run Diagnostics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralSystemControls;
