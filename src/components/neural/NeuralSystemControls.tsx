
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  PowerIcon, 
  Settings, 
  RefreshCw, 
  Cpu, 
  BrainCircuit, 
  AlertTriangle, 
  PlayCircle, 
  PauseCircle, 
  Save
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { NeuralModelParameters } from '@/types/neuralMetrics';

const NeuralSystemControls = () => {
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'maintenance'>('online');
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState<NeuralModelParameters>({
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    maxTokens: 2048,
    modelName: 'neural-advanced-v2',
    processingPower: 80,
    responsiveness: 90,
    errorTolerance: 15,
    adaptiveMode: true,
    autonomousMode: false,
    precisionFactor: 0.85,
    maxOperations: 1000
  });
  
  const handleParameterChange = (key: keyof NeuralModelParameters, value: number | boolean) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSystemAction = (action: 'restart' | 'shutdown' | 'maintenance') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      switch (action) {
        case 'restart':
          toast({
            title: "System Restarting",
            description: "Neural system is restarting. This may take a few moments.",
          });
          setSystemStatus('offline');
          setTimeout(() => setSystemStatus('online'), 3000);
          break;
        case 'shutdown':
          toast({
            title: "System Shutdown",
            description: "Neural system has been shut down.",
          });
          setSystemStatus('offline');
          break;
        case 'maintenance':
          toast({
            title: "Maintenance Mode",
            description: "Neural system is now in maintenance mode.",
          });
          setSystemStatus('maintenance');
          break;
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSaveParameters = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Parameters Saved",
        description: "Neural system parameters have been updated.",
      });
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">System Control Panel</CardTitle>
              <CardDescription>Manage neural system operations and performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Status:</span>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1
                ${systemStatus === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  systemStatus === 'maintenance' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  systemStatus === 'online' ? 'bg-green-500' :
                  systemStatus === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                }`}></span>
                {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button 
              variant={systemStatus === 'online' ? 'default' : 'outline'} 
              className="flex items-center gap-2"
              disabled={isLoading || systemStatus === 'online'}
              onClick={() => handleSystemAction('restart')}
            >
              <PlayCircle className="h-4 w-4" />
              <span>Start System</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950"
              disabled={isLoading || systemStatus === 'maintenance'}
              onClick={() => handleSystemAction('maintenance')}
            >
              <Settings className="h-4 w-4" />
              <span>Maintenance Mode</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              disabled={isLoading || systemStatus === 'offline'}
              onClick={() => handleSystemAction('shutdown')}
            >
              <PauseCircle className="h-4 w-4" />
              <span>Stop System</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Cpu className="h-4 w-4" />
                    Processing Power
                  </label>
                  <span className="text-sm text-muted-foreground">{parameters.processingPower}%</span>
                </div>
                <Slider 
                  value={[parameters.processingPower || 50]} 
                  min={10} 
                  max={100} 
                  step={5}
                  onValueChange={(values) => handleParameterChange('processingPower', values[0])}
                  disabled={isLoading || systemStatus !== 'online'}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <RefreshCw className="h-4 w-4" />
                    Responsiveness
                  </label>
                  <span className="text-sm text-muted-foreground">{parameters.responsiveness}%</span>
                </div>
                <Slider 
                  value={[parameters.responsiveness || 50]} 
                  min={10} 
                  max={100} 
                  step={5}
                  onValueChange={(values) => handleParameterChange('responsiveness', values[0])}
                  disabled={isLoading || systemStatus !== 'online'}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Error Tolerance
                  </label>
                  <span className="text-sm text-muted-foreground">{parameters.errorTolerance}%</span>
                </div>
                <Slider 
                  value={[parameters.errorTolerance || 15]} 
                  min={5} 
                  max={50} 
                  step={5}
                  onValueChange={(values) => handleParameterChange('errorTolerance', values[0])}
                  disabled={isLoading || systemStatus !== 'online'}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <BrainCircuit className="h-4 w-4" />
                    Precision Factor
                  </label>
                  <span className="text-sm text-muted-foreground">{parameters.precisionFactor?.toFixed(2)}</span>
                </div>
                <Slider 
                  value={[parameters.precisionFactor || 0.5]} 
                  min={0.1} 
                  max={1} 
                  step={0.05}
                  onValueChange={(values) => handleParameterChange('precisionFactor', values[0])}
                  disabled={isLoading || systemStatus !== 'online'}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <label className="text-sm font-medium flex items-center gap-1" htmlFor="adaptive-mode">
                    Adaptive Mode
                  </label>
                  <Switch
                    id="adaptive-mode"
                    checked={parameters.adaptiveMode}
                    onCheckedChange={(checked) => handleParameterChange('adaptiveMode', checked)}
                    disabled={isLoading || systemStatus !== 'online'}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <label className="text-sm font-medium flex items-center gap-1" htmlFor="autonomous-mode">
                    Autonomous Mode
                  </label>
                  <Switch
                    id="autonomous-mode"
                    checked={parameters.autonomousMode}
                    onCheckedChange={(checked) => handleParameterChange('autonomousMode', checked)}
                    disabled={isLoading || systemStatus !== 'online'}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full flex items-center gap-2 justify-center" 
                  disabled={isLoading || systemStatus !== 'online'}
                  onClick={handleSaveParameters}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>Save Parameters</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Administration</CardTitle>
          <CardDescription>Advanced control options for system administrators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate System Keys</span>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <PowerIcon className="h-4 w-4" />
              <span>Clear System Cache</span>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 sm:col-span-2">
              <BrainCircuit className="h-4 w-4" />
              <span>Export System Diagnostics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralSystemControls;
