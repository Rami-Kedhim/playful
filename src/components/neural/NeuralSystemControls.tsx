
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, RefreshCw, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { NeuralModelParameters } from '@/types/neuralMetrics';

const NeuralSystemControls: React.FC = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [parameters, setParameters] = useState<NeuralModelParameters>({
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    maxTokens: 1000,
    modelName: "neural-advanced-v2",
    processingPower: 75,
    responsiveness: 80,
    errorTolerance: 30,
    adaptiveMode: true,
    autonomousMode: false,
    precisionFactor: 85,
    maxOperations: 500
  });
  
  const handleParameterChange = (
    key: keyof NeuralModelParameters, 
    value: number | boolean | string
  ) => {
    setParameters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };
  
  const handleSliderChange = (key: keyof NeuralModelParameters, value: number[]) => {
    handleParameterChange(key, value[0]);
  };
  
  const handleReset = () => {
    setParameters({
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
      maxTokens: 1000,
      modelName: "neural-advanced-v2",
      processingPower: 75,
      responsiveness: 80,
      errorTolerance: 30,
      adaptiveMode: true,
      autonomousMode: false,
      precisionFactor: 85,
      maxOperations: 500
    });
    setHasChanges(true);
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      
      toast({
        title: "Parameters Saved",
        description: "Neural system parameters have been updated successfully."
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      {hasChanges && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unsaved Changes</AlertTitle>
          <AlertDescription>
            You have made changes to the neural system parameters. Click "Save Parameters" to apply these changes.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Parameters Card */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="temperature">Temperature</Label>
                <span className="text-sm font-mono">{parameters.temperature.toFixed(2)}</span>
              </div>
              <Slider 
                id="temperature"
                min={0} 
                max={1} 
                step={0.01} 
                value={[parameters.temperature]} 
                onValueChange={(value) => handleSliderChange('temperature', value)} 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Controls randomness: Lower values are more focused, higher values more creative.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="topP">Top P</Label>
                <span className="text-sm font-mono">{parameters.topP.toFixed(2)}</span>
              </div>
              <Slider 
                id="topP"
                min={0.1} 
                max={1} 
                step={0.01} 
                value={[parameters.topP]} 
                onValueChange={(value) => handleSliderChange('topP', value)} 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Controls diversity of neural response generation.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
                <span className="text-sm font-mono">{parameters.frequencyPenalty.toFixed(2)}</span>
              </div>
              <Slider 
                id="frequencyPenalty"
                min={0} 
                max={2} 
                step={0.01} 
                value={[parameters.frequencyPenalty]} 
                onValueChange={(value) => handleSliderChange('frequencyPenalty', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="presencePenalty">Presence Penalty</Label>
                <span className="text-sm font-mono">{parameters.presencePenalty.toFixed(2)}</span>
              </div>
              <Slider 
                id="presencePenalty"
                min={0} 
                max={2} 
                step={0.01} 
                value={[parameters.presencePenalty]} 
                onValueChange={(value) => handleSliderChange('presencePenalty', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <span className="text-sm font-mono">{parameters.maxTokens}</span>
              </div>
              <Slider 
                id="maxTokens"
                min={100} 
                max={4000} 
                step={100} 
                value={[parameters.maxTokens]} 
                onValueChange={(value) => handleSliderChange('maxTokens', value)} 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Advanced Parameters Card */}
        <Card>
          <CardHeader>
            <CardTitle>Neural System Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="processingPower">Processing Power</Label>
                <span className="text-sm font-mono">{parameters.processingPower}%</span>
              </div>
              <Slider 
                id="processingPower"
                min={10} 
                max={100} 
                step={1} 
                value={[parameters.processingPower || 75]} 
                onValueChange={(value) => handleSliderChange('processingPower', value)} 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Allocates processing resources to the neural system.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="responsiveness">Responsiveness</Label>
                <span className="text-sm font-mono">{parameters.responsiveness}%</span>
              </div>
              <Slider 
                id="responsiveness"
                min={10} 
                max={100} 
                step={1} 
                value={[parameters.responsiveness || 80]} 
                onValueChange={(value) => handleSliderChange('responsiveness', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="precisionFactor">Precision Factor</Label>
                <span className="text-sm font-mono">{parameters.precisionFactor}%</span>
              </div>
              <Slider 
                id="precisionFactor"
                min={10} 
                max={100} 
                step={1} 
                value={[parameters.precisionFactor || 85]} 
                onValueChange={(value) => handleSliderChange('precisionFactor', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="errorTolerance">Error Tolerance</Label>
                <span className="text-sm font-mono">{parameters.errorTolerance}%</span>
              </div>
              <Slider 
                id="errorTolerance"
                min={0} 
                max={100} 
                step={1} 
                value={[parameters.errorTolerance || 30]} 
                onValueChange={(value) => handleSliderChange('errorTolerance', value)} 
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adaptiveMode" className="font-medium">Adaptive Mode</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enables neural system to adapt to changing conditions.
                  </p>
                </div>
                <Switch 
                  id="adaptiveMode" 
                  checked={parameters.adaptiveMode} 
                  onCheckedChange={(checked) => handleParameterChange('adaptiveMode', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autonomousMode" className="font-medium">Autonomous Mode</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Allows system to make independent optimization decisions.
                  </p>
                </div>
                <Switch 
                  id="autonomousMode" 
                  checked={parameters.autonomousMode} 
                  onCheckedChange={(checked) => handleParameterChange('autonomousMode', checked)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={handleReset} 
          disabled={isSaving}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        
        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Parameters
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NeuralSystemControls;
