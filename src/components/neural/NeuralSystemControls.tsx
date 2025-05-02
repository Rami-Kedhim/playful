
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Activity,
  AlertTriangle,
  Gauge,
  RefreshCw,
  Power,
  Zap,
  Shield,
  Server
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const NeuralSystemControls: React.FC = () => {
  // System control states
  const [powerStatus, setPowerStatus] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [processingPower, setProcessingPower] = useState(65);
  const [memoryAllocation, setMemoryAllocation] = useState(40);
  const [errorTolerance, setErrorTolerance] = useState(25);
  const [responseLevel, setResponseLevel] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  // Handle system power toggle
  const handlePowerToggle = () => {
    setIsRestarting(true);
    
    // Simulate system restart
    setTimeout(() => {
      setPowerStatus(!powerStatus);
      setIsRestarting(false);
      
      toast({
        title: powerStatus ? "System shutting down" : "System powering up",
        description: powerStatus 
          ? "Neural system is safely shutting down all processes."
          : "Neural system is initializing all modules and services.",
      });
    }, 2000);
  };

  // Handle maintenance mode toggle
  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    
    toast({
      title: !maintenanceMode ? "Maintenance mode activated" : "Maintenance mode deactivated",
      description: !maintenanceMode 
        ? "System will continue to process existing tasks but reject new ones."
        : "System is now accepting all new tasks and connections.",
      variant: !maintenanceMode ? "default" : "default",
    });
  };

  // Handle system restart
  const handleRestart = () => {
    setIsRestarting(true);
    
    // Simulate system restart
    setTimeout(() => {
      setIsRestarting(false);
      
      toast({
        title: "System restarted successfully",
        description: "All neural systems have been restarted with current settings.",
      });
    }, 3000);
  };

  // Apply system settings
  const handleApplySettings = () => {
    setIsLoading(true);
    
    // Simulate applying settings
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings applied",
        description: "Neural system parameters have been updated successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Power className="h-5 w-5" />
                <span>System Power Control</span>
              </CardTitle>
              <div className={`flex items-center ${powerStatus ? 'text-green-500' : 'text-gray-500'}`}>
                <span className={`inline-block h-2 w-2 rounded-full ${powerStatus ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                <span className="ml-2 text-sm font-medium">
                  {powerStatus ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <CardDescription>Control system power state and maintenance mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">System Power</Label>
                  <p className="text-sm text-muted-foreground">
                    {powerStatus ? 'System is running and processing requests' : 'System is offline'}
                  </p>
                </div>
                <Switch 
                  checked={powerStatus} 
                  onCheckedChange={handlePowerToggle}
                  disabled={isRestarting}
                  aria-label="Toggle system power"
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    {maintenanceMode ? 'Rejecting new connections' : 'Accepting all connections'}
                  </p>
                </div>
                <Switch 
                  checked={maintenanceMode} 
                  onCheckedChange={handleMaintenanceToggle}
                  disabled={!powerStatus || isRestarting}
                  aria-label="Toggle maintenance mode"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={handleRestart}
                  disabled={!powerStatus || isRestarting}
                >
                  {isRestarting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Restarting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restart System
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>Current system metrics and health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>CPU Usage</Label>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Memory Usage</Label>
                  <span className="text-sm font-medium">38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Network Throughput</Label>
                  <span className="text-sm font-medium">27%</span>
                </div>
                <Progress value={27} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Active Connections</Label>
                  <span className="text-sm font-medium">486</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
              
              <div className="pt-2">
                <div className="flex items-center">
                  <div className="flex-1 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">31ms</div>
                      <div className="text-xs text-muted-foreground">Avg Response</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0.8%</div>
                      <div className="text-xs text-muted-foreground">Error Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            <span>Processing Parameters</span>
          </CardTitle>
          <CardDescription>Configure neural processing parameters and behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="processing-power">Processing Power</Label>
                <span className="text-sm font-medium">{processingPower}%</span>
              </div>
              <Slider
                id="processing-power"
                min={10}
                max={100}
                step={5}
                value={[processingPower]}
                onValueChange={(values) => setProcessingPower(values[0])}
                disabled={!powerStatus || isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Adjust the amount of computational resources allocated to neural processing tasks
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="memory-allocation">Memory Allocation</Label>
                <span className="text-sm font-medium">{memoryAllocation}%</span>
              </div>
              <Slider
                id="memory-allocation"
                min={20}
                max={90}
                step={5}
                value={[memoryAllocation]}
                onValueChange={(values) => setMemoryAllocation(values[0])}
                disabled={!powerStatus || isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Control memory allocation for neural models and data processing
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="error-tolerance">Error Tolerance</Label>
                <span className="text-sm font-medium">{errorTolerance}%</span>
              </div>
              <Slider
                id="error-tolerance"
                min={5}
                max={50}
                step={5}
                value={[errorTolerance]}
                onValueChange={(values) => setErrorTolerance(values[0])}
                disabled={!powerStatus || isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Set the error tolerance threshold for neural operations
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="response-level">Response Optimization</Label>
                <span className="text-sm font-medium">{responseLevel}%</span>
              </div>
              <Slider
                id="response-level"
                min={10}
                max={100}
                step={5}
                value={[responseLevel]}
                onValueChange={(values) => setResponseLevel(values[0])}
                disabled={!powerStatus || isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Balance between response speed and accuracy of neural processing
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" disabled={!powerStatus || isLoading}>
                Reset to Defaults
              </Button>
              <Button onClick={handleApplySettings} disabled={!powerStatus || isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Apply Settings"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Security Controls</span>
            </CardTitle>
            <CardDescription>Manage system security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enhanced Security Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable additional verification for all operations
                  </p>
                </div>
                <Switch disabled={!powerStatus} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anomaly Detection</Label>
                  <p className="text-xs text-muted-foreground">
                    Monitor and flag unusual neural patterns
                  </p>
                </div>
                <Switch defaultChecked disabled={!powerStatus} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Request Throttling</Label>
                  <p className="text-xs text-muted-foreground">
                    Limit excessive requests from single sources
                  </p>
                </div>
                <Switch defaultChecked disabled={!powerStatus} />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" disabled={!powerStatus}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Security Audit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              <span>System Actions</span>
            </CardTitle>
            <CardDescription>Perform administrative system operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" disabled={!powerStatus}>
                <Zap className="mr-2 h-4 w-4" />
                Optimize Neural Cache
              </Button>
              
              <Button variant="outline" className="w-full" disabled={!powerStatus}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Recalibrate Response Models
              </Button>
              
              <Button variant="outline" className="w-full" disabled={!powerStatus}>
                <Activity className="mr-2 h-4 w-4" />
                System Health Report
              </Button>
              
              <Button variant="destructive" className="w-full" disabled={!powerStatus}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency Shutdown
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralSystemControls;
