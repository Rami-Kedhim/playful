
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { NeuralModelParameters } from '@/types/neuralMetrics';

interface NeuralSystemControlsProps {
  onUpdate?: (parameters: Partial<NeuralModelParameters>) => void;
  className?: string;
}

const NeuralSystemControls: React.FC<NeuralSystemControlsProps> = ({ 
  onUpdate,
  className
}) => {
  const { toast } = useToast();
  const [parameters, setParameters] = useState<NeuralModelParameters>({
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    maxTokens: 1000,
    modelName: 'neural-advanced',
    processingPower: 80,
    responsiveness: 65,
    errorTolerance: 25,
    adaptiveMode: true,
    autonomousMode: false,
    precisionFactor: 70,
    maxOperations: 5000
  });

  const handleChange = (key: keyof NeuralModelParameters, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const handleToggle = (key: keyof NeuralModelParameters) => {
    setParameters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = () => {
    if (onUpdate) {
      onUpdate(parameters);
    }
    toast({
      title: "System Controls Updated",
      description: "Neural system parameters have been adjusted."
    });
  };

  const handleReset = () => {
    setParameters({
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      maxTokens: 1000,
      modelName: 'neural-advanced',
      processingPower: 80,
      responsiveness: 65,
      errorTolerance: 25,
      adaptiveMode: true,
      autonomousMode: false,
      precisionFactor: 70,
      maxOperations: 5000
    });
    
    if (onUpdate) {
      onUpdate({
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
        maxTokens: 1000,
        modelName: 'neural-advanced',
        processingPower: 80,
        responsiveness: 65,
        errorTolerance: 25,
        adaptiveMode: true,
        autonomousMode: false,
        precisionFactor: 70,
        maxOperations: 5000
      });
    }
    
    toast({
      title: "Controls Reset",
      description: "Neural system parameters have been reset to defaults."
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Neural System Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Processing Power Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="processingPower">Processing Power</Label>
              <span className="text-sm font-medium">{parameters.processingPower}%</span>
            </div>
            <Slider
              id="processingPower"
              min={10}
              max={100}
              step={1}
              value={[parameters.processingPower ?? 80]}
              onValueChange={(values) => handleChange('processingPower', values[0])}
            />
          </div>
          
          {/* Responsiveness Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="responsiveness">System Responsiveness</Label>
              <span className="text-sm font-medium">{parameters.responsiveness}%</span>
            </div>
            <Slider
              id="responsiveness"
              min={10}
              max={100}
              step={1}
              value={[parameters.responsiveness ?? 65]}
              onValueChange={(values) => handleChange('responsiveness', values[0])}
            />
          </div>
          
          {/* Error Tolerance Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="errorTolerance">Error Tolerance</Label>
              <span className="text-sm font-medium">{parameters.errorTolerance}%</span>
            </div>
            <Slider
              id="errorTolerance"
              min={5}
              max={50}
              step={1}
              value={[parameters.errorTolerance ?? 25]}
              onValueChange={(values) => handleChange('errorTolerance', values[0])}
            />
          </div>
          
          {/* Precision Factor Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="precisionFactor">Precision Factor</Label>
              <span className="text-sm font-medium">{parameters.precisionFactor}%</span>
            </div>
            <Slider
              id="precisionFactor"
              min={10}
              max={100}
              step={1}
              value={[parameters.precisionFactor ?? 70]}
              onValueChange={(values) => handleChange('precisionFactor', values[0])}
            />
          </div>
          
          {/* Mode Toggles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="adaptiveMode" className="cursor-pointer">Adaptive Mode</Label>
              <Switch
                id="adaptiveMode"
                checked={parameters.adaptiveMode}
                onCheckedChange={() => handleToggle('adaptiveMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autonomousMode" className="cursor-pointer">Autonomous Mode</Label>
              <Switch
                id="autonomousMode"
                checked={parameters.autonomousMode}
                onCheckedChange={() => handleToggle('autonomousMode')}
              />
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Button onClick={handleApply} className="flex-1">
            Apply Changes
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemControls;
