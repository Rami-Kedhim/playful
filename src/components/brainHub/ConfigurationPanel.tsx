import React, { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { ModelParameters } from '@/services/neural/types/neuralHub';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, AlertCircle, RefreshCw } from 'lucide-react';

interface ConfigurationPanelProps {
  advancedMode: boolean;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ advancedMode }) => {
  const [modelParams, setModelParams] = useState<ModelParameters>(
    neuralHub.getModelParameters()
  );
  const [isModified, setIsModified] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [efficiency, setEfficiency] = useState(0);
  
  // Update efficiency when parameters change
  useEffect(() => {
    const calculatedEfficiency = neuralHub.calculateSystemEfficiency();
    setEfficiency(calculatedEfficiency);
  }, [modelParams]);
  
  // Update parameters from neural hub
  const syncParameters = () => {
    setModelParams(neuralHub.getModelParameters());
    setIsModified(false);
    setValidationErrors([]);
  };
  
  // Handle parameter changes
  const handleParamChange = (param: keyof ModelParameters, value: any) => {
    setModelParams((prev) => {
      const updated = { ...prev, [param]: value };
      setIsModified(true);
      return updated;
    });
  };
  
  // Save parameters to neural hub
  const handleSave = () => {
    const validation = neuralHub.validateModelParameters(modelParams);
    if (!validation.valid) {
      setValidationErrors(validation.errors || []);
      return;
    }
    
    neuralHub.updateModelParameters(modelParams);
    setIsModified(false);
    setValidationErrors([]);
  };
  
  // Reset parameters
  const handleReset = () => {
    neuralHub.resetSystem();
    syncParameters();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure neural model parameters and system settings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={syncParameters} 
                title="Refresh parameters from system"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {validationErrors.length > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validation Errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="advanced" disabled={!advancedMode}>Advanced Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="learningRate">Learning Rate</Label>
                    <span className="text-sm">{modelParams.learningRate}</span>
                  </div>
                  <Slider 
                    id="learningRate"
                    min={0.0001} 
                    max={0.1} 
                    step={0.0001} 
                    value={[modelParams.learningRate]}
                    onValueChange={(value) => handleParamChange('learningRate', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls how quickly the neural models learn from new data.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <span className="text-sm">{modelParams.batchSize}</span>
                  </div>
                  <Slider 
                    id="batchSize"
                    min={1} 
                    max={256} 
                    step={1} 
                    value={[modelParams.batchSize]}
                    onValueChange={(value) => handleParamChange('batchSize', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of samples processed before updating model parameters.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="epochs">Training Epochs</Label>
                    <span className="text-sm">{modelParams.epochs}</span>
                  </div>
                  <Slider 
                    id="epochs"
                    min={1} 
                    max={100} 
                    step={1} 
                    value={[modelParams.epochs]}
                    onValueChange={(value) => handleParamChange('epochs', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of complete passes through the training dataset.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="optimizerType">Optimizer</Label>
                  <Select 
                    value={modelParams.optimizerType}
                    onValueChange={(value) => handleParamChange('optimizerType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select optimizer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adam">Adam</SelectItem>
                      <SelectItem value="sgd">SGD</SelectItem>
                      <SelectItem value="rmsprop">RMSProp</SelectItem>
                      <SelectItem value="adagrad">AdaGrad</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Optimization algorithm used to update neural network weights.
                  </p>
                </div>
                
                {advancedMode && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="dropout">Dropout Rate</Label>
                      <span className="text-sm">{modelParams.dropout}</span>
                    </div>
                    <Slider 
                      id="dropout"
                      min={0} 
                      max={0.9} 
                      step={0.01} 
                      value={[modelParams.dropout || 0]}
                      onValueChange={(value) => handleParamChange('dropout', value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Fraction of input units to drop during training (prevents overfitting).
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="decayConstant">Decay Constant</Label>
                    <span className="text-sm">{modelParams.decayConstant}</span>
                  </div>
                  <Slider 
                    id="decayConstant"
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={[modelParams.decayConstant || 0.2]}
                    onValueChange={(value) => handleParamChange('decayConstant', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls how quickly old information fades from relevance.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="growthFactor">Growth Factor</Label>
                    <span className="text-sm">{modelParams.growthFactor}</span>
                  </div>
                  <Slider 
                    id="growthFactor"
                    min={0.5} 
                    max={5} 
                    step={0.1} 
                    value={[modelParams.growthFactor || 1.5]}
                    onValueChange={(value) => handleParamChange('growthFactor', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Expansion rate for neural connectivity and capacity.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="cyclePeriod">Cycle Period</Label>
                    <span className="text-sm">{modelParams.cyclePeriod}</span>
                  </div>
                  <Slider 
                    id="cyclePeriod"
                    min={1} 
                    max={48} 
                    step={1} 
                    value={[modelParams.cyclePeriod || 24]}
                    onValueChange={(value) => handleParamChange('cyclePeriod', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Time units before adaptive cycle repeats.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="bifurcationPoint">Bifurcation Point</Label>
                    <span className="text-sm">{modelParams.bifurcationPoint}</span>
                  </div>
                  <Slider 
                    id="bifurcationPoint"
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={[modelParams.bifurcationPoint || 0.6]}
                    onValueChange={(value) => handleParamChange('bifurcationPoint', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Threshold at which system behavior dramatically shifts.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="attractorStrength">Attractor Strength</Label>
                    <span className="text-sm">{modelParams.attractorStrength}</span>
                  </div>
                  <Slider 
                    id="attractorStrength"
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={[modelParams.attractorStrength || 0.7]}
                    onValueChange={(value) => handleParamChange('attractorStrength', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Power of convergence to stable system states.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            System Efficiency: <span className="font-bold">{Math.round(efficiency * 100)}%</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleReset}
            >
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!isModified}
            >
              Save Configuration
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Configuration Tips</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li className="text-sm">Lower learning rates provide stability but slower training</li>
            <li className="text-sm">Higher batch sizes improve efficiency but require more memory</li>
            <li className="text-sm">The Adam optimizer works best for most neural models</li>
            {advancedMode && (
              <>
                <li className="text-sm">Increase attractor strength for more focused specialization</li>
                <li className="text-sm">Decrease decay constant to improve long-term memory retention</li>
              </>
            )}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ConfigurationPanel;
