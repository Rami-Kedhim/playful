
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNeuralHub } from "@/hooks/useNeuralHub";
import { toast } from "@/hooks/use-toast";
// Fix: Use type-only import to avoid naming conflict
import type { BrainHubConfig as BrainHubConfigType } from "@/types/brainHub";

const BrainHubConfig: React.FC = () => {
  const { getConfig, updateConfig } = useNeuralHub();
  const [activeTab, setActiveTab] = useState("system");
  // Initialize with all required properties
  const [config, setConfig] = useState<BrainHubConfigType>({
    systemSettings: {
      resourceAllocationMode: "balanced",
      autoOptimize: true,
      debugMode: false,
      loggingLevel: "info"
    },
    aiModelParameters: {
      learningRate: 0.001,
      batchSize: 32,
      epochs: 10,
      optimizerType: "adam"
    },
    neuralSettings: {
      activationThreshold: 0.5,
      neuralDensity: 0.8,
      layerConfiguration: "standard"
    },
    psychology: {
      enabled: true,
      confidenceThreshold: 0.7
    },
    physics: {
      enabled: true,
      simulationPrecision: 0.9
    },
    economics: {
      enabled: true,
      marketModelVersion: "1.0"
    },
    robotics: {
      enabled: false,
      motorPrecision: 0.95
    },
    geoLegalFilteringEnabled: true,
    neuroEmotionEnabled: true,
    predictiveModulationEnabled: false
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const brainHubConfig = getConfig();
    if (brainHubConfig) {
      setConfig(brainHubConfig as BrainHubConfigType);
    }
  }, [getConfig]);

  const handleSystemSettingChange = (key: string, value: any) => {
    // Fix: Ensure we're dealing with an object before spreading
    setConfig(prevConfig => ({
      ...prevConfig,
      systemSettings: {
        ...prevConfig.systemSettings,
        [key]: value
      }
    }));
  };

  const handleAIParameterChange = (key: string, value: any) => {
    // Fix: Ensure we're dealing with an object before spreading
    setConfig(prevConfig => ({
      ...prevConfig,
      aiModelParameters: {
        ...prevConfig.aiModelParameters,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateConfig(config);
      if (success) {
        toast({
          title: "Configuration Saved",
          description: "Brain Hub configuration has been updated successfully."
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to update Brain Hub configuration.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving configuration.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brain Hub Configuration</CardTitle>
        <CardDescription>
          Configure the neural intelligence core parameters
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="ai">AI Model</TabsTrigger>
            <TabsTrigger value="neural">Neural</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="resource-mode">Resource Allocation Mode</Label>
                  <select
                    id="resource-mode"
                    className="px-3 py-2 border rounded"
                    value={config.systemSettings.resourceAllocationMode}
                    onChange={(e) => handleSystemSettingChange('resourceAllocationMode', e.target.value)}
                  >
                    <option value="balanced">Balanced</option>
                    <option value="performance">Performance</option>
                    <option value="efficiency">Efficiency</option>
                    <option value="learning">Learning</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-optimize"
                    checked={config.systemSettings.autoOptimize}
                    onCheckedChange={(checked) => handleSystemSettingChange('autoOptimize', checked)}
                  />
                  <Label htmlFor="auto-optimize">Auto-optimize system resources</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="debug-mode"
                    checked={config.systemSettings.debugMode}
                    onCheckedChange={(checked) => handleSystemSettingChange('debugMode', checked)}
                  />
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Logging Level</Label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    value={config.systemSettings.loggingLevel}
                    onChange={(e) => handleSystemSettingChange('loggingLevel', e.target.value)}
                  >
                    <option value="error">Error Only</option>
                    <option value="warning">Warning</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                    <option value="trace">Trace</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Learning Rate: {config.aiModelParameters.learningRate}</Label>
                <Slider
                  min={0.0001}
                  max={0.01}
                  step={0.0001}
                  value={[config.aiModelParameters.learningRate]}
                  onValueChange={([value]) => handleAIParameterChange('learningRate', value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Batch Size: {config.aiModelParameters.batchSize}</Label>
                <Slider
                  min={8}
                  max={128}
                  step={8}
                  value={[config.aiModelParameters.batchSize]}
                  onValueChange={([value]) => handleAIParameterChange('batchSize', value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Epochs: {config.aiModelParameters.epochs}</Label>
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={[config.aiModelParameters.epochs]}
                  onValueChange={([value]) => handleAIParameterChange('epochs', value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Optimizer Type</Label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={config.aiModelParameters.optimizerType}
                  onChange={(e) => handleAIParameterChange('optimizerType', e.target.value)}
                >
                  <option value="adam">Adam</option>
                  <option value="sgd">SGD</option>
                  <option value="rmsprop">RMSProp</option>
                  <option value="adagrad">AdaGrad</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="neural">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Configure neural network parameters and connectivity.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="domains">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="domain-psychology"
                  checked={config.psychology.enabled}
                  onCheckedChange={(checked) => setConfig({...config, psychology: {...config.psychology, enabled: checked}})}
                />
                <Label htmlFor="domain-psychology">Psychology</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="domain-physics"
                  checked={config.physics.enabled}
                  onCheckedChange={(checked) => setConfig({...config, physics: {...config.physics, enabled: checked}})}
                />
                <Label htmlFor="domain-physics">Physics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="domain-economics"
                  checked={config.economics.enabled}
                  onCheckedChange={(checked) => setConfig({...config, economics: {...config.economics, enabled: checked}})}
                />
                <Label htmlFor="domain-economics">Economics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="domain-robotics"
                  checked={config.robotics.enabled}
                  onCheckedChange={(checked) => setConfig({...config, robotics: {...config.robotics, enabled: checked}})}
                />
                <Label htmlFor="domain-robotics">Robotics</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfig;
