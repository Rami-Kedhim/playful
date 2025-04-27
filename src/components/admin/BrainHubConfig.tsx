
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { BrainHubConfig } from '@/types/brainHub';

const BrainHubConfigComponent: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const currentConfig = brainHub.getConfig();
        setConfig(currentConfig);
      } catch (error) {
        console.error("Failed to load Brain Hub configuration:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfig();
  }, []);

  const handleConfigUpdate = (key: keyof BrainHubConfig, value: any) => {
    if (!config) return;
    
    const updatedConfig = { ...config };
    
    // Handle nested properties
    if (key.includes('.')) {
      const [section, property] = key.split('.') as [keyof BrainHubConfig, string];
      updatedConfig[section] = {
        ...updatedConfig[section],
        [property]: value
      };
    } else {
      // Handle top-level properties
      updatedConfig[key] = value;
    }
    
    setConfig(updatedConfig);
    brainHub.updateConfig(updatedConfig);
  };

  if (isLoading || !config) {
    return <div className="p-4">Loading configuration...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="ai-model" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="ai-model">AI Model</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="neural">Neural Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-model">
            <h3 className="text-lg font-medium mb-4">AI Model Parameters</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Learning Rate</Label>
                  <span className="text-sm">{config.aiModelParameters.learningRate}</span>
                </div>
                <Slider 
                  value={[config.aiModelParameters.learningRate * 1000]} 
                  min={1} 
                  max={100} 
                  step={1}
                  onValueChange={(value) => handleConfigUpdate('aiModelParameters.learningRate', value[0] / 1000)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Batch Size</Label>
                <Select 
                  value={config.aiModelParameters.batchSize.toString()} 
                  onValueChange={(value) => handleConfigUpdate('aiModelParameters.batchSize', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                    <SelectItem value="64">64</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Epochs</Label>
                  <span className="text-sm">{config.aiModelParameters.epochs}</span>
                </div>
                <Slider 
                  value={[config.aiModelParameters.epochs]} 
                  min={1} 
                  max={20} 
                  step={1}
                  onValueChange={(value) => handleConfigUpdate('aiModelParameters.epochs', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Optimizer Type</Label>
                <Select 
                  value={config.aiModelParameters.optimizerType} 
                  onValueChange={(value) => handleConfigUpdate('aiModelParameters.optimizerType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="adagrad">Adagrad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="modules">
            <h3 className="text-lg font-medium mb-4">Module Configuration</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Psychology Module</h4>
                  <p className="text-sm text-muted-foreground">Emotional analysis and user psychology modeling</p>
                </div>
                <Switch 
                  checked={config.psychology.enabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('psychology.enabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Physics Module</h4>
                  <p className="text-sm text-muted-foreground">Physical modeling and simulation</p>
                </div>
                <Switch 
                  checked={config.physics.enabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('physics.enabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Economics Module</h4>
                  <p className="text-sm text-muted-foreground">Market modeling and pricing optimization</p>
                </div>
                <Switch 
                  checked={config.economics.enabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('economics.enabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Robotics Module</h4>
                  <p className="text-sm text-muted-foreground">Control systems and sensor integration</p>
                </div>
                <Switch 
                  checked={config.robotics.enabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('robotics.enabled', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <h3 className="text-lg font-medium mb-4">System Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Resource Allocation Mode</Label>
                <Select 
                  value={config.systemSettings.resourceAllocationMode} 
                  onValueChange={(value) => handleConfigUpdate('systemSettings.resourceAllocationMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="performance">Performance Priority</SelectItem>
                    <SelectItem value="efficiency">Efficiency Priority</SelectItem>
                    <SelectItem value="dynamic">Dynamic Allocation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-Optimize</h4>
                  <p className="text-sm text-muted-foreground">Automatically optimize system resources</p>
                </div>
                <Switch 
                  checked={config.systemSettings.autoOptimize} 
                  onCheckedChange={(checked) => handleConfigUpdate('systemSettings.autoOptimize', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Debug Mode</h4>
                  <p className="text-sm text-muted-foreground">Enable detailed logging</p>
                </div>
                <Switch 
                  checked={config.systemSettings.debugMode} 
                  onCheckedChange={(checked) => handleConfigUpdate('systemSettings.debugMode', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Logging Level</Label>
                <Select 
                  value={config.systemSettings.loggingLevel} 
                  onValueChange={(value) => handleConfigUpdate('systemSettings.loggingLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="trace">Trace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Geo-Legal Filtering</h4>
                  <p className="text-sm text-muted-foreground">Enable region-specific content filtering</p>
                </div>
                <Switch 
                  checked={config.geoLegalFilteringEnabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('geoLegalFilteringEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Neuro-Emotion</h4>
                  <p className="text-sm text-muted-foreground">Enable emotional intelligence capabilities</p>
                </div>
                <Switch 
                  checked={config.neuroEmotionEnabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('neuroEmotionEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Predictive Modulation</h4>
                  <p className="text-sm text-muted-foreground">Enable predictive behavior analysis</p>
                </div>
                <Switch 
                  checked={config.predictiveModulationEnabled} 
                  onCheckedChange={(checked) => handleConfigUpdate('predictiveModulationEnabled', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="neural">
            <h3 className="text-lg font-medium mb-4">Neural Network Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Activation Threshold</Label>
                  <span className="text-sm">{config.neuralSettings.activationThreshold}</span>
                </div>
                <Slider 
                  value={[config.neuralSettings.activationThreshold * 100]} 
                  min={10} 
                  max={90} 
                  step={5}
                  onValueChange={(value) => handleConfigUpdate('neuralSettings.activationThreshold', value[0] / 100)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Neural Density</Label>
                  <span className="text-sm">{config.neuralSettings.neuralDensity}</span>
                </div>
                <Slider 
                  value={[config.neuralSettings.neuralDensity * 100]} 
                  min={10} 
                  max={90} 
                  step={5}
                  onValueChange={(value) => handleConfigUpdate('neuralSettings.neuralDensity', value[0] / 100)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Layer Configuration</Label>
                <Select 
                  value={config.neuralSettings.layerConfiguration} 
                  onValueChange={(value) => handleConfigUpdate('neuralSettings.layerConfiguration', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="enhanced">Enhanced</SelectItem>
                    <SelectItem value="complex">Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfigComponent;
