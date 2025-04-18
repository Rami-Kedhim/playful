
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { neuralHub } from '@/services/neural';
import { ModelParameters, initializeDefaultParameters, calculateSystemEfficiency, validateModelParameters } from '@/services/neural/models/modelParameters';

const ConfigurationPanel: React.FC = () => {
  const [parameters, setParameters] = useState<ModelParameters>(initializeDefaultParameters());
  const [efficiency, setEfficiency] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  useEffect(() => {
    // Calculate efficiency whenever parameters change
    const score = calculateSystemEfficiency(parameters);
    setEfficiency(score);
  }, [parameters]);
  
  const handleOptimize = (goal: 'speed' | 'accuracy' | 'efficiency' | 'balance') => {
    let optimizedParams: ModelParameters;
    
    switch (goal) {
      case 'speed':
        optimizedParams = {
          ...parameters,
          decayConstant: 0.3,
          cyclePeriod: 12,
          harmonicCount: 2,
          learningRate: 0.002,
          batchSize: 16
        };
        break;
        
      case 'accuracy':
        optimizedParams = {
          ...parameters,
          decayConstant: 0.15,
          growthFactor: 1.8,
          harmonicCount: 5,
          bifurcationPoint: 0.7,
          learningRate: 0.0005,
          batchSize: 64
        };
        break;
        
      case 'efficiency':
        optimizedParams = {
          ...parameters,
          decayConstant: 0.25,
          growthFactor: 1.2,
          cyclePeriod: 18,
          harmonicCount: 2,
          attractorStrength: 0.5,
          learningRate: 0.001,
          batchSize: 32
        };
        break;
        
      case 'balance':
      default:
        optimizedParams = {
          ...parameters,
          decayConstant: 0.2,
          growthFactor: 1.5,
          cyclePeriod: 24,
          harmonicCount: 3,
          bifurcationPoint: 0.6,
          attractorStrength: 0.6,
          learningRate: 0.001,
          batchSize: 32
        };
        break;
    }
    
    setParameters(optimizedParams);
  };
  
  const handleSaveParameters = () => {
    setIsSaving(true);
    
    // Validate parameters before saving
    const validation = validateModelParameters(parameters);
    
    if (!validation.valid) {
      console.error('Invalid parameters:', validation.errors);
      setIsSaving(false);
      return;
    }
    
    // Update parameters in neural hub
    neuralHub.updateModelParameters(parameters);
    
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };
  
  return (
    <Card className="mb-6 w-full">
      <CardHeader>
        <CardTitle>Neural Network Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label>System Efficiency Score</Label>
            <span className="font-semibold">{efficiency.toFixed(1)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                efficiency > 75 ? 'bg-green-500' : 
                efficiency > 50 ? 'bg-amber-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${efficiency}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Decay Constant</Label>
              <span>{parameters.decayConstant}</span>
            </div>
            <Slider
              value={[parameters.decayConstant * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setParameters({
                ...parameters,
                decayConstant: value[0] / 100
              })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Growth Factor</Label>
              <span>{parameters.growthFactor}</span>
            </div>
            <Slider
              value={[parameters.growthFactor * 50]}
              min={0}
              max={200}
              step={1}
              onValueChange={(value) => setParameters({
                ...parameters,
                growthFactor: value[0] / 50
              })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Cycle Period</Label>
              <span>{parameters.cyclePeriod}</span>
            </div>
            <Slider
              value={[parameters.cyclePeriod]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setParameters({
                ...parameters,
                cyclePeriod: value[0]
              })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Harmonic Count</Label>
              <span>{parameters.harmonicCount}</span>
            </div>
            <Slider
              value={[parameters.harmonicCount]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setParameters({
                ...parameters,
                harmonicCount: value[0]
              })}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOptimize('speed')}
          >
            Optimize for Speed
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOptimize('accuracy')}
          >
            Optimize for Accuracy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOptimize('efficiency')}
          >
            Optimize for Efficiency
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOptimize('balance')}
          >
            Balanced Approach
          </Button>
        </div>
        
        <Button 
          onClick={handleSaveParameters} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Parameters'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
