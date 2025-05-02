
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, Save, RotateCw, PauseCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import useNeuralHub from '@/hooks/useNeuralHub';

interface NeuralSystemControlsProps {
  className?: string;
}

const NeuralSystemControls: React.FC<NeuralSystemControlsProps> = ({ className = '' }) => {
  const { getParameters, updateParameters, getSystemStatus } = useNeuralHub();
  
  const [parameters, setParameters] = useState({
    neuralProcessingPower: 80,
    responsivenessFactor: 60,
    errorThreshold: 3.0,
    adaptiveMode: true,
    autonomousAdjustment: false,
    precisionLevel: 75,
    maxConcurrentOperations: 100,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  useEffect(() => {
    loadCurrentParameters();
  }, []);
  
  const loadCurrentParameters = async () => {
    try {
      setIsLoading(true);
      const currentParams = getParameters();
      
      // Map API parameters to our UI parameters
      setParameters({
        neuralProcessingPower: currentParams.processingPower || 80,
        responsivenessFactor: currentParams.responsiveness || 60,
        errorThreshold: currentParams.errorTolerance || 3.0,
        adaptiveMode: currentParams.adaptiveMode || true,
        autonomousAdjustment: currentParams.autonomousMode || false,
        precisionLevel: currentParams.precisionFactor || 75,
        maxConcurrentOperations: currentParams.maxOperations || 100,
      });
      
      setIsDirty(false);
    } catch (error) {
      console.error('Error loading neural parameters:', error);
      toast.error('Failed to load neural system parameters');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleParameterChange = (param: string, value: number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
    setIsDirty(true);
  };
  
  const handleSaveParameters = async () => {
    try {
      setIsLoading(true);
      
      // Map UI parameters to API parameters
      await updateParameters({
        processingPower: parameters.neuralProcessingPower,
        responsiveness: parameters.responsivenessFactor,
        errorTolerance: parameters.errorThreshold,
        adaptiveMode: parameters.adaptiveMode,
        autonomousMode: parameters.autonomousAdjustment,
        precisionFactor: parameters.precisionLevel,
        maxOperations: parameters.maxConcurrentOperations
      });
      
      toast.success('Neural system parameters updated successfully');
      setIsDirty(false);
    } catch (error) {
      console.error('Error updating parameters:', error);
      toast.error('Failed to update neural system parameters');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    loadCurrentParameters();
    toast.info('Parameters reset to current values');
  };
  
  const handleEmergencyPause = () => {
    try {
      updateParameters({ 
        processingPower: 10,
        maxOperations: 10,
        emergencyMode: true
      });
      
      toast.warning('Neural system emergency pause activated');
      loadCurrentParameters(); // Reload current state
      
    } catch (error) {
      console.error('Emergency pause failed:', error);
      toast.error('Failed to activate emergency pause');
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          <span>Neural System Controls</span>
        </CardTitle>
        <CardDescription>
          Adjust neural processing parameters and system behavior
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="flex items-center">
                  Neural Processing Power
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Controls how much computing resources are allocated to neural processing.
                          Higher values increase performance but consume more resources.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="font-medium">{parameters.neuralProcessingPower}%</span>
              </div>
              <Slider 
                value={[parameters.neuralProcessingPower]} 
                min={10} 
                max={100} 
                step={1} 
                onValueChange={(vals) => handleParameterChange('neuralProcessingPower', vals[0])}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="flex items-center">
                  Responsiveness Factor
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Affects how quickly the system responds to neural inputs.
                          Higher values increase speed but may reduce accuracy.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="font-medium">{parameters.responsivenessFactor}%</span>
              </div>
              <Slider 
                value={[parameters.responsivenessFactor]} 
                min={10} 
                max={100} 
                step={1} 
                onValueChange={(vals) => handleParameterChange('responsivenessFactor', vals[0])}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="flex items-center">
                  Error Threshold
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Maximum allowable error rate before the system triggers warnings.
                          Lower values enforce stricter error handling.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="font-medium">{parameters.errorThreshold}%</span>
              </div>
              <Slider 
                value={[parameters.errorThreshold]} 
                min={0.5} 
                max={10} 
                step={0.1} 
                onValueChange={(vals) => handleParameterChange('errorThreshold', vals[0])}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="flex items-center">
                  Precision Level
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Controls the precision of neural computations.
                          Higher values increase accuracy but require more processing time.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="font-medium">{parameters.precisionLevel}%</span>
              </div>
              <Slider 
                value={[parameters.precisionLevel]} 
                min={10} 
                max={100} 
                step={1} 
                onValueChange={(vals) => handleParameterChange('precisionLevel', vals[0])}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="flex items-center">
                  Max Concurrent Operations
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Maximum number of operations the system can process simultaneously.
                          Higher values increase throughput but may decrease stability.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="font-medium">{parameters.maxConcurrentOperations}</span>
              </div>
              <Slider 
                value={[parameters.maxConcurrentOperations]} 
                min={10} 
                max={200} 
                step={5} 
                onValueChange={(vals) => handleParameterChange('maxConcurrentOperations', vals[0])}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Adaptive Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically adjusts parameters based on workload
                </div>
              </div>
              <Switch
                checked={parameters.adaptiveMode}
                onCheckedChange={(checked) => handleParameterChange('adaptiveMode', checked)}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Autonomous Adjustment</Label>
                <div className="text-sm text-muted-foreground">
                  Allow system to self-optimize without user intervention
                </div>
              </div>
              <Switch
                checked={parameters.autonomousAdjustment}
                onCheckedChange={(checked) => handleParameterChange('autonomousAdjustment', checked)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-2 border-t">
            <div className="space-x-2">
              <Button
                variant="outline" 
                onClick={handleReset} 
                disabled={isLoading || !isDirty}
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleEmergencyPause}
                disabled={isLoading}
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                Emergency Pause
              </Button>
            </div>
            
            <Button 
              onClick={handleSaveParameters} 
              disabled={isLoading || !isDirty}
            >
              {isLoading ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemControls;
