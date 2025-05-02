
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Power, RefreshCw, RotateCw, PlayCircle, PauseCircle, 
  Zap, Shield, Database, AlertCircle, CheckCircle, 
  Cpu, Activity, BarChart3
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const NeuralSystemControls: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'maintenance'>('online');
  const [processingCapacity, setProcessingCapacity] = useState<number>(75);
  const [memoryAllocation, setMemoryAllocation] = useState<number>(60);
  const [activeModels, setActiveModels] = useState<string[]>(['neural-core', 'language-processor', 'image-recognition']);
  const [isProcessingPaused, setIsProcessingPaused] = useState<boolean>(false);
  
  // Mock system modules
  const systemModules = [
    { id: 'neural-core', name: 'Neural Core', status: 'online', load: 72 },
    { id: 'language-processor', name: 'Language Processor', status: 'online', load: 58 },
    { id: 'image-recognition', name: 'Image Recognition', status: 'online', load: 34 },
    { id: 'spatial-reasoning', name: 'Spatial Reasoning', status: 'offline', load: 0 },
    { id: 'sentiment-analysis', name: 'Sentiment Analysis', status: 'online', load: 27 },
  ];
  
  const handleSystemToggle = () => {
    setSystemStatus(systemStatus === 'online' ? 'offline' : 'online');
  };
  
  const handleProcessingToggle = () => {
    setIsProcessingPaused(!isProcessingPaused);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* System Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(systemStatus)}`}></div>
                <span className="font-medium capitalize">{systemStatus}</span>
              </div>
              <Switch checked={systemStatus === 'online'} onCheckedChange={handleSystemToggle} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" size="sm" className="h-auto py-1 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Restart
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-1 text-xs">
                <RotateCw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-1 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Security
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-1 text-xs">
                <Database className="h-3 w-3 mr-1" />
                Backup
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Processing Controls Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Processing Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">Processing</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant={isProcessingPaused ? "outline" : "ghost"} 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={handleProcessingToggle}
                  title={isProcessingPaused ? "Resume Processing" : "Pause Processing"}
                >
                  {isProcessingPaused ? 
                    <PlayCircle className="h-4 w-4" /> : 
                    <PauseCircle className="h-4 w-4" />
                  }
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  title="Boost Processing"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Processing Capacity</span>
                  <span className="text-xs font-medium">{processingCapacity}%</span>
                </div>
                <Slider 
                  value={[processingCapacity]} 
                  onValueChange={(values) => setProcessingCapacity(values[0])}
                  max={100}
                  step={5}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Memory Allocation</span>
                  <span className="text-xs font-medium">{memoryAllocation}%</span>
                </div>
                <Slider 
                  value={[memoryAllocation]} 
                  onValueChange={(values) => setMemoryAllocation(values[0])}
                  max={100}
                  step={5}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Operational Metrics Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">System Load</span>
              <div className="flex items-center">
                <span className="text-xs font-medium">67%</span>
                <Activity className="h-3 w-3 ml-1 text-amber-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Memory Usage</span>
              <div className="flex items-center">
                <span className="text-xs font-medium">58%</span>
                <Activity className="h-3 w-3 ml-1 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Network Throughput</span>
              <div className="flex items-center">
                <span className="text-xs font-medium">83%</span>
                <Activity className="h-3 w-3 ml-1 text-red-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Response Time</span>
              <div className="flex items-center">
                <span className="text-xs font-medium">43ms</span>
                <Activity className="h-3 w-3 ml-1 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Error Rate</span>
              <div className="flex items-center">
                <span className="text-xs font-medium">0.8%</span>
                <Activity className="h-3 w-3 ml-1 text-green-500" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8 mt-2">
              <BarChart3 className="h-3 w-3 mr-2" />
              View Detailed Metrics
            </Button>
          </CardContent>
        </Card>
        
        {/* System Actions Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">System Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All Modules
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Run Security Scan
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Backup Configuration
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Cpu className="h-4 w-4 mr-2" />
              Optimize Resources
            </Button>
            <Separator className="my-1" />
            <Button variant="destructive" size="sm" className="w-full justify-start">
              <Power className="h-4 w-4 mr-2" />
              Emergency Shutdown
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Modules List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Neural Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {systemModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${module.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium text-sm">{module.name}</span>
                  {activeModels.includes(module.id) && (
                    <Badge variant="outline" className="text-xs bg-primary/10">Active</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium w-12 text-right">
                    {module.status === 'online' ? `${module.load}% load` : 'Offline'}
                  </div>
                  <Switch 
                    checked={module.status === 'online'} 
                    onCheckedChange={() => {}}
                    disabled={module.id === 'neural-core'}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Button size="sm" variant="outline">
              Add Module
            </Button>
            <Button size="sm" variant="outline">
              Optimize Resources
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* System Health Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Neural Core: Operational</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Data Pipeline: Operational</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Memory Management: Performance Issue</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Network Connectivity: Operational</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Security Systems: Operational</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8">View</Button>
            </div>
            <Button variant="outline" className="w-full mt-2">Run Full Diagnostic</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralSystemControls;
