
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { neuralHub } from "@/services/neural/HermesOxumNeuralHub";
import { BrainHubConfig } from "@/types/brainHub";

const BrainHubConfig: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfig>({
    aiModelParameters: {
      learningRate: 0.001,
      batchSize: 32,
      epochs: 10,
      optimizerType: "adam"
    },
    systemSettings: {
      resourceAllocationMode: "balanced",
      autoOptimize: true,
      debugMode: false,
      loggingLevel: "info"
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
  
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // Load the current config from the neural hub
    const hubConfig = neuralHub.getConfig();
    setConfig(hubConfig as BrainHubConfig);
  }, []);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await neuralHub.updateConfig(config);
      toast({
        title: "Configuration Saved",
        description: "Brain Hub settings have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const updateConfig = (section: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof BrainHubConfig],
        [key]: value
      }
    }));
  };
  
  const updateNestedConfig = (section: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof BrainHubConfig],
        [key]: value
      }
    }));
  };
  
  const updateTopLevelConfig = (key: keyof BrainHubConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">System Settings</h3>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="resource-allocation">Resource Allocation Mode</Label>
              <select 
                id="resource-allocation"
                className="p-2 border rounded"
                value={config.systemSettings.resourceAllocationMode}
                onChange={(e) => updateNestedConfig("systemSettings", "resourceAllocationMode", e.target.value)}
              >
                <option value="balanced">Balanced</option>
                <option value="performance">Performance</option>
                <option value="efficiency">Efficiency</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-optimize">Auto-Optimize</Label>
              <Switch 
                id="auto-optimize" 
                checked={config.systemSettings.autoOptimize}
                onCheckedChange={(checked) => updateNestedConfig("systemSettings", "autoOptimize", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <Switch 
                id="debug-mode" 
                checked={config.systemSettings.debugMode}
                onCheckedChange={(checked) => updateNestedConfig("systemSettings", "debugMode", checked)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="logging-level">Logging Level</Label>
              <select 
                id="logging-level"
                className="p-2 border rounded"
                value={config.systemSettings.loggingLevel}
                onChange={(e) => updateNestedConfig("systemSettings", "loggingLevel", e.target.value)}
              >
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
                <option value="trace">Trace</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">AI Model Parameters</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="learning-rate">Learning Rate: {config.aiModelParameters.learningRate}</Label>
              </div>
              <Slider 
                id="learning-rate"
                min={0.0001}
                max={0.01}
                step={0.0001}
                value={[config.aiModelParameters.learningRate]}
                onValueChange={(values) => updateNestedConfig("aiModelParameters", "learningRate", values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="batch-size">Batch Size: {config.aiModelParameters.batchSize}</Label>
              </div>
              <Slider 
                id="batch-size"
                min={8}
                max={128}
                step={8}
                value={[config.aiModelParameters.batchSize]}
                onValueChange={(values) => updateNestedConfig("aiModelParameters", "batchSize", values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="epochs">Epochs: {config.aiModelParameters.epochs}</Label>
              </div>
              <Slider 
                id="epochs"
                min={1}
                max={100}
                step={1}
                value={[config.aiModelParameters.epochs]}
                onValueChange={(values) => updateNestedConfig("aiModelParameters", "epochs", values[0])}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="optimizer-type">Optimizer Type</Label>
              <select 
                id="optimizer-type"
                className="p-2 border rounded"
                value={config.aiModelParameters.optimizerType}
                onChange={(e) => updateNestedConfig("aiModelParameters", "optimizerType", e.target.value)}
              >
                <option value="adam">Adam</option>
                <option value="sgd">SGD</option>
                <option value="rmsprop">RMSProp</option>
                <option value="adagrad">AdaGrad</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Neural Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Activation Threshold: {config.neuralSettings.activationThreshold}</Label>
              </div>
              <Slider 
                min={0.1}
                max={0.9}
                step={0.1}
                value={[config.neuralSettings.activationThreshold]}
                onValueChange={(values) => updateNestedConfig("neuralSettings", "activationThreshold", values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Neural Density: {config.neuralSettings.neuralDensity}</Label>
              </div>
              <Slider 
                min={0.1}
                max={1.0}
                step={0.1}
                value={[config.neuralSettings.neuralDensity]}
                onValueChange={(values) => updateNestedConfig("neuralSettings", "neuralDensity", values[0])}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label>Layer Configuration</Label>
              <select 
                className="p-2 border rounded"
                value={config.neuralSettings.layerConfiguration}
                onChange={(e) => updateNestedConfig("neuralSettings", "layerConfiguration", e.target.value)}
              >
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="extended">Extended</option>
                <option value="complex">Complex</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Specialized Models</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Psychology Model</Label>
                <p className="text-sm text-muted-foreground">Emotional analysis and behavior prediction</p>
              </div>
              <Switch 
                checked={config.psychology.enabled}
                onCheckedChange={(checked) => updateNestedConfig("psychology", "enabled", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Physics Model</Label>
                <p className="text-sm text-muted-foreground">Collision detection and dynamic simulations</p>
              </div>
              <Switch 
                checked={config.physics.enabled}
                onCheckedChange={(checked) => updateNestedConfig("physics", "enabled", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Economics Model</Label>
                <p className="text-sm text-muted-foreground">Market simulation and price optimization</p>
              </div>
              <Switch 
                checked={config.economics.enabled}
                onCheckedChange={(checked) => updateNestedConfig("economics", "enabled", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Robotics Model</Label>
                <p className="text-sm text-muted-foreground">Path planning and control systems</p>
              </div>
              <Switch 
                checked={config.robotics.enabled}
                onCheckedChange={(checked) => updateNestedConfig("robotics", "enabled", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Advanced Features</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Geo-Legal Filtering</Label>
                <p className="text-sm text-muted-foreground">Region-specific content compliance</p>
              </div>
              <Switch 
                checked={config.geoLegalFilteringEnabled}
                onCheckedChange={(checked) => updateTopLevelConfig("geoLegalFilteringEnabled", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Neuro-Emotion</Label>
                <p className="text-sm text-muted-foreground">Enhanced emotional response modeling</p>
              </div>
              <Switch 
                checked={config.neuroEmotionEnabled}
                onCheckedChange={(checked) => updateTopLevelConfig("neuroEmotionEnabled", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Predictive Modulation</Label>
                <p className="text-sm text-muted-foreground">Advanced behavior anticipation</p>
              </div>
              <Switch 
                checked={config.predictiveModulationEnabled}
                onCheckedChange={(checked) => updateTopLevelConfig("predictiveModulationEnabled", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </div>
  );
};

export default BrainHubConfig;
