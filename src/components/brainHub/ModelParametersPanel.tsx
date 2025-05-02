
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNeuralHub } from '@/hooks/useNeuralHub';
import { ModelParameters } from '@/services/neural/models/modelParameters';

/**
 * Component for adjusting Neural Hub model parameters
 */
const ModelParametersPanel: React.FC = () => {
  const { getParameters, updateParameters } = useNeuralHub();
  const [parameters, setParameters] = useState<ModelParameters>(() => getParameters());
  const { toast } = useToast();
  
  // Reset parameters to current values
  useEffect(() => {
    const currentParams = getParameters();
    setParameters(currentParams as ModelParameters);
  }, [getParameters]);

  // Update local state when a parameter changes
  const handleParameterChange = (key: keyof ModelParameters, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };
  
  // Save changes to the Neural Hub
  const handleSave = () => {
    updateParameters(parameters);
    toast({
      title: "Parameters Updated",
      description: "Neural model parameters have been updated successfully."
    });
  };
  
  // Reset to default values
  const handleReset = () => {
    const currentParams = getParameters();
    setParameters(currentParams as ModelParameters);
    toast({
      description: "Parameters have been reset to current values."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="text-sm font-medium">{parameters.temperature.toFixed(2)}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.01}
              value={[parameters.temperature]}
              onValueChange={(values) => handleParameterChange('temperature', values[0])}
            />
            <p className="text-xs text-muted-foreground">
              Controls randomness: Lower values are more deterministic, higher values more creative.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
              <span className="text-sm font-medium">{parameters.frequencyPenalty.toFixed(2)}</span>
            </div>
            <Slider
              id="frequencyPenalty"
              min={0}
              max={2}
              step={0.01}
              value={[parameters.frequencyPenalty]}
              onValueChange={(values) => handleParameterChange('frequencyPenalty', values[0])}
            />
            <p className="text-xs text-muted-foreground">
              Reduces repetition of tokens. Higher values decrease likelihood of repeating the same content.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <span className="text-sm font-medium">{parameters.maxTokens}</span>
            </div>
            <Slider
              id="maxTokens"
              min={64}
              max={4096}
              step={64}
              value={[parameters.maxTokens]}
              onValueChange={(values) => handleParameterChange('maxTokens', values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="modelName">Model Name</Label>
            <Input
              id="modelName"
              value={parameters.modelName}
              onChange={(e) => handleParameterChange('modelName', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelParametersPanel;
