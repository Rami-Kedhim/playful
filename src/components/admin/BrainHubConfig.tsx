
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { BrainHubConfig as BrainHubConfigType } from '@/types/brainHub';
import { toast } from '@/components/ui/use-toast';
import { Brain, Settings, Cpu, Activity, Sparkles } from 'lucide-react';

const BrainHubConfig: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfigType | null>(null);
  const [activeTab, setActiveTab] = useState('ai-model');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load configuration on component mount
    const loadConfig = () => {
      try {
        const currentConfig = brainHub.getConfig();
        setConfig(currentConfig);
      } catch (error) {
        console.error('Failed to load BrainHub configuration:', error);
      }
    };

    loadConfig();
  }, []);

  const handleSaveConfig = async () => {
    if (!config) return;

    setIsSaving(true);
    try {
      const success = brainHub.updateConfig(config);
      
      if (success) {
        toast({
          title: 'Configuration updated',
          description: 'BrainHub settings have been saved successfully.',
          variant: 'success',
        });
      } else {
        throw new Error('Failed to update configuration');
      }
    } catch (error) {
      console.error('Config update error:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update BrainHub configuration.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to handle nested property updates
  const updateNestedConfig = (path: string, value: any) => {
    if (!config) return;
    
    const pathParts = path.split('.');
    const newConfig = { ...config };
    
    let current: any = newConfig;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    setConfig(newConfig);
  };

  if (!config) {
    return <div>Loading configuration...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>BrainHub Configuration</CardTitle>
            <CardDescription>Configure AI model parameters and system settings</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="ai-model">
              <Cpu className="mr-2 h-4 w-4" />
              AI Model
            </TabsTrigger>
            <TabsTrigger value="domains">
              <Sparkles className="mr-2 h-4 w-4" />
              Knowledge Domains
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="neural">
              <Activity className="mr-2 h-4 w-4" />
              Neural Settings
            </TabsTrigger>
          </TabsList>

          {/* AI Model Parameters */}
          <TabsContent value="ai-model" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Learning Rate</Label>
                  <span className="text-sm font-medium">
                    {config.aiModelParameters.learningRate}
                  </span>
                </div>
                <Slider 
                  min={0.0001}
                  max={0.01}
                  step={0.0001}
                  value={[config.aiModelParameters.learningRate]}
                  onValueChange={(value) => updateNestedConfig('aiModelParameters.learningRate', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Controls how quickly the model adapts to new information
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Batch Size</Label>
                  <span className="text-sm font-medium">
                    {config.aiModelParameters.batchSize}
                  </span>
                </div>
                <Slider 
                  min={1}
                  max={64}
                  step={1}
                  value={[config.aiModelParameters.batchSize]}
                  onValueChange={(value) => updateNestedConfig('aiModelParameters.batchSize', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Number of samples processed before model update
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Training Epochs</Label>
                  <span className="text-sm font-medium">
                    {config.aiModelParameters.epochs}
                  </span>
                </div>
                <Slider 
                  min={1}
                  max={20}
                  step={1}
                  value={[config.aiModelParameters.epochs]}
                  onValueChange={(value) => updateNestedConfig('aiModelParameters.epochs', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Number of complete passes through the training dataset
                </p>
              </div>

              <div className="space-y-2">
                <Label>Optimizer Type</Label>
                <Select
                  value={config.aiModelParameters.optimizerType}
                  onValueChange={(value) => updateNestedConfig('aiModelParameters.optimizerType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select optimizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="adagrad">AdaGrad</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Algorithm used to update model weights during training
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Domains */}
          <TabsContent value="domains" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Psychology Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="psychology-enabled" className="font-normal">Enable Psychology</Label>
                    <Switch 
                      id="psychology-enabled" 
                      checked={config.psychology.enabled}
                      onCheckedChange={(checked) => updateNestedConfig('psychology.enabled', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enables emotional analysis and psychological modeling
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Physics Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="physics-enabled" className="font-normal">Enable Physics</Label>
                    <Switch 
                      id="physics-enabled" 
                      checked={config.physics.enabled}
                      onCheckedChange={(checked) => updateNestedConfig('physics.enabled', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enables physical interaction simulation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Economics Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="economics-enabled" className="font-normal">Enable Economics</Label>
                    <Switch 
                      id="economics-enabled" 
                      checked={config.economics.enabled}
                      onCheckedChange={(checked) => updateNestedConfig('economics.enabled', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enables economic modeling and market simulation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Robotics Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="robotics-enabled" className="font-normal">Enable Robotics</Label>
                    <Switch 
                      id="robotics-enabled" 
                      checked={config.robotics.enabled}
                      onCheckedChange={(checked) => updateNestedConfig('robotics.enabled', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enables robotic control and motor functions
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Resource Allocation Mode</Label>
                <Select
                  value={config.systemSettings.resourceAllocationMode}
                  onValueChange={(value) => updateNestedConfig('systemSettings.resourceAllocationMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                    <SelectItem value="adaptive">Adaptive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Controls how system resources are allocated to different processes
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="auto-optimize" className="font-normal">Auto-optimize</Label>
                  <Switch 
                    id="auto-optimize" 
                    checked={config.systemSettings.autoOptimize}
                    onCheckedChange={(checked) => updateNestedConfig('systemSettings.autoOptimize', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically optimize resource allocation based on usage patterns
                </p>

                <div className="flex justify-between items-center">
                  <Label htmlFor="debug-mode" className="font-normal">Debug Mode</Label>
                  <Switch 
                    id="debug-mode" 
                    checked={config.systemSettings.debugMode}
                    onCheckedChange={(checked) => updateNestedConfig('systemSettings.debugMode', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enable additional logging and diagnostics
                </p>

                <div className="space-y-2">
                  <Label>Logging Level</Label>
                  <Select
                    value={config.systemSettings.loggingLevel}
                    onValueChange={(value) => updateNestedConfig('systemSettings.loggingLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select logging level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="trace">Trace</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Set the verbosity level for system logs
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Geo-Legal Filtering</Label>
                    <p className="text-xs text-muted-foreground">
                      Enforce region-specific legal compliance
                    </p>
                  </div>
                  <Switch
                    checked={config.geoLegalFilteringEnabled}
                    onCheckedChange={(checked) => 
                      setConfig({...config, geoLegalFilteringEnabled: checked})
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Neuro-Emotion Processing</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable emotional context processing
                    </p>
                  </div>
                  <Switch
                    checked={config.neuroEmotionEnabled}
                    onCheckedChange={(checked) => 
                      setConfig({...config, neuroEmotionEnabled: checked})
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Predictive Modulation</Label>
                    <p className="text-xs text-muted-foreground">
                      Pre-emptively adjust systems based on predicted patterns
                    </p>
                  </div>
                  <Switch
                    checked={config.predictiveModulationEnabled}
                    onCheckedChange={(checked) => 
                      setConfig({...config, predictiveModulationEnabled: checked})
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Neural Settings */}
          <TabsContent value="neural" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Activation Threshold</Label>
                  <span className="text-sm font-medium">
                    {config.neuralSettings.activationThreshold}
                  </span>
                </div>
                <Slider 
                  min={0.1}
                  max={1.0}
                  step={0.01}
                  value={[config.neuralSettings.activationThreshold]}
                  onValueChange={(value) => updateNestedConfig('neuralSettings.activationThreshold', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Threshold for neural activation functions
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Neural Density</Label>
                  <span className="text-sm font-medium">
                    {config.neuralSettings.neuralDensity}
                  </span>
                </div>
                <Slider 
                  min={0.1}
                  max={1.0}
                  step={0.01}
                  value={[config.neuralSettings.neuralDensity]}
                  onValueChange={(value) => updateNestedConfig('neuralSettings.neuralDensity', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Density of connections in the neural network
                </p>
              </div>

              <div className="space-y-2">
                <Label>Layer Configuration</Label>
                <Select
                  value={config.neuralSettings.layerConfiguration}
                  onValueChange={(value) => updateNestedConfig('neuralSettings.layerConfiguration', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deep">Deep</SelectItem>
                    <SelectItem value="residual">Residual</SelectItem>
                    <SelectItem value="recurrent">Recurrent</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Structure of neural network layers
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveConfig} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfig;
