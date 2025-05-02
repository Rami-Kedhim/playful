
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { NeuralModelParameters } from '@/types/neuralMetrics';

const NeuralSystemControls: React.FC = () => {
  const { toast } = useToast();
  const [parameters, setParameters] = useState<NeuralModelParameters>({
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    maxTokens: 1000,
    modelName: "neural-advanced-v2",
    processingPower: 75,
    responsiveness: 60,
    errorTolerance: 25,
    adaptiveMode: true,
    autonomousMode: false,
    precisionFactor: 85,
    maxOperations: 500,
    stopSequences: ["<END>", "<STOP>"]
  });
  
  const [optimizing, setOptimizing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const handleSliderChange = (name: keyof NeuralModelParameters, value: number[] | boolean) => {
    setParameters(prev => ({
      ...prev,
      [name]: Array.isArray(value) ? value[0] : value
    }));
  };
  
  const handleSwitchChange = (name: keyof NeuralModelParameters) => {
    setParameters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const handleAutoOptimize = () => {
    setOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setParameters({
        temperature: 0.65,
        topP: 0.92,
        frequencyPenalty: 0.6,
        presencePenalty: 0.55,
        maxTokens: 1200,
        modelName: "neural-advanced-v2",
        processingPower: 85,
        responsiveness: 70,
        errorTolerance: 20,
        adaptiveMode: true,
        autonomousMode: true,
        precisionFactor: 90,
        maxOperations: 600,
        stopSequences: ["<END>", "<STOP>"]
      });
      
      setOptimizing(false);
      
      toast({
        title: "Auto-Optimization Complete",
        description: "Parameters have been optimized for current workload.",
      });
    }, 2000);
  };
  
  const handleSaveChanges = () => {
    setSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      setSaving(false);
      
      toast({
        title: "Changes Saved",
        description: "Neural system parameters have been updated.",
      });
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neural System Parameters</CardTitle>
        <CardDescription>Fine-tune neural processing parameters for optimal performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Adjusting these parameters may affect system behavior. Advanced users only.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="temperature">Temperature ({parameters.temperature.toFixed(2)})</Label>
              </div>
              <Slider 
                id="temperature" 
                min={0} 
                max={1} 
                step={0.01} 
                value={[parameters.temperature]} 
                onValueChange={(value) => handleSliderChange("temperature", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Controls randomness in output generation
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="topP">Top P ({parameters.topP.toFixed(2)})</Label>
              </div>
              <Slider 
                id="topP" 
                min={0} 
                max={1} 
                step={0.01} 
                value={[parameters.topP]} 
                onValueChange={(value) => handleSliderChange("topP", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Alternative to temperature for nucleus sampling
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="processingPower">Processing Power ({parameters.processingPower}%)</Label>
              </div>
              <Slider 
                id="processingPower" 
                min={10} 
                max={100} 
                step={5} 
                value={[parameters.processingPower]} 
                onValueChange={(value) => handleSliderChange("processingPower", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Allocates computational resources
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="precisionFactor">Precision Factor ({parameters.precisionFactor}%)</Label>
              </div>
              <Slider 
                id="precisionFactor" 
                min={50} 
                max={99} 
                step={1} 
                value={[parameters.precisionFactor]} 
                onValueChange={(value) => handleSliderChange("precisionFactor", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Higher values increase accuracy but may reduce speed
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="responsiveness">Responsiveness ({parameters.responsiveness}%)</Label>
              </div>
              <Slider 
                id="responsiveness" 
                min={10} 
                max={100} 
                step={5} 
                value={[parameters.responsiveness]} 
                onValueChange={(value) => handleSliderChange("responsiveness", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Speed of system response to inputs
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="errorTolerance">Error Tolerance ({parameters.errorTolerance}%)</Label>
              </div>
              <Slider 
                id="errorTolerance" 
                min={5} 
                max={50} 
                step={5} 
                value={[parameters.errorTolerance]} 
                onValueChange={(value) => handleSliderChange("errorTolerance", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Threshold before system flags anomalies
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="maxOperations">Max Operations ({parameters.maxOperations})</Label>
              </div>
              <Slider 
                id="maxOperations" 
                min={100} 
                max={1000} 
                step={100} 
                value={[parameters.maxOperations]} 
                onValueChange={(value) => handleSliderChange("maxOperations", value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Maximum operations per processing cycle
              </p>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adaptiveMode">Adaptive Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Dynamically adjusts to changing conditions
                  </p>
                </div>
                <Switch 
                  id="adaptiveMode" 
                  checked={parameters.adaptiveMode} 
                  onCheckedChange={() => handleSwitchChange("adaptiveMode")}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autonomousMode">Autonomous Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Allows system to self-optimize without supervision
                  </p>
                </div>
                <Switch 
                  id="autonomousMode" 
                  checked={parameters.autonomousMode} 
                  onCheckedChange={() => handleSwitchChange("autonomousMode")}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center justify-between pt-2">
          <Button 
            onClick={handleAutoOptimize} 
            disabled={optimizing}
            variant="outline"
          >
            {optimizing ? 'Optimizing...' : 'Auto-Optimize Parameters'}
          </Button>
          
          <Button 
            onClick={handleSaveChanges} 
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
            {!saving && <Check className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemControls;
