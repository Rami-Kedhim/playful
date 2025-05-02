
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RefreshCw, Cpu, Zap } from 'lucide-react';

interface SystemControlsProps {
  className?: string;
}

const NeuralSystemControls: React.FC<SystemControlsProps> = () => {
  const [systemStatus, setSystemStatus] = useState({
    operational: true,
    cpuUsage: 42,
    memoryUsage: 38,
    activeModels: 3,
    autoOptimize: true,
    learningEnabled: true,
    sensitivity: 70,
    performance: 'balanced' // 'performance', 'balanced', 'efficiency'
  });
  
  const handleSystemRestart = () => {
    console.log('Simulating system restart...');
    // In a real implementation, this would call the API to restart the system
  };
  
  const handleOptimizeNow = () => {
    console.log('Optimizing neural resources...');
    // In a real implementation, this would call the API to optimize resources
  };
  
  const toggleAutoOptimize = (checked: boolean) => {
    setSystemStatus(prev => ({
      ...prev,
      autoOptimize: checked
    }));
  };
  
  const toggleLearning = (checked: boolean) => {
    setSystemStatus(prev => ({
      ...prev,
      learningEnabled: checked
    }));
  };
  
  const updateSensitivity = (value: number[]) => {
    setSystemStatus(prev => ({
      ...prev,
      sensitivity: value[0]
    }));
  };
  
  const selectPerformanceMode = (mode: string) => {
    setSystemStatus(prev => ({
      ...prev,
      performance: mode
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${systemStatus.operational ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">System Status:</span>
          <span>{systemStatus.operational ? 'Operational' : 'Offline'}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSystemRestart}
          className="h-8"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Restart System
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CPU Usage</span>
            <span>{systemStatus.cpuUsage}%</span>
          </div>
          <Progress value={systemStatus.cpuUsage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Memory Usage</span>
            <span>{systemStatus.memoryUsage}%</span>
          </div>
          <Progress value={systemStatus.memoryUsage} className="h-2" />
        </div>
      </div>
      
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium flex items-center">
          <Cpu className="h-4 w-4 mr-1" />
          Neural Resource Management
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-sm">Auto-Optimize Resources</div>
            <div className="text-xs text-muted-foreground">Automatically adjust resource allocation</div>
          </div>
          <Switch 
            checked={systemStatus.autoOptimize} 
            onCheckedChange={toggleAutoOptimize} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-sm">Continuous Learning</div>
            <div className="text-xs text-muted-foreground">Keep improving models with new data</div>
          </div>
          <Switch 
            checked={systemStatus.learningEnabled} 
            onCheckedChange={toggleLearning} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">Neural Sensitivity</Label>
            <span className="text-xs">{systemStatus.sensitivity}%</span>
          </div>
          <Slider 
            min={0} 
            max={100} 
            step={1} 
            value={[systemStatus.sensitivity]} 
            onValueChange={updateSensitivity} 
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Performance Mode</Label>
          <div className="flex gap-2">
            <Button
              variant={systemStatus.performance === 'performance' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
              onClick={() => selectPerformanceMode('performance')}
            >
              <Zap className="h-3.5 w-3.5 mr-1" />
              Performance
            </Button>
            <Button
              variant={systemStatus.performance === 'balanced' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
              onClick={() => selectPerformanceMode('balanced')}
            >
              Balanced
            </Button>
            <Button
              variant={systemStatus.performance === 'efficiency' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
              onClick={() => selectPerformanceMode('efficiency')}
            >
              Efficiency
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleOptimizeNow}
        >
          Optimize Resources Now
        </Button>
      </div>
    </div>
  );
};

export default NeuralSystemControls;
