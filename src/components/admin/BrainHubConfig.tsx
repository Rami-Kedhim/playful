import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { brainHub } from "@/services/neural/HermesOxumBrainHub";
import { BrainHubConfig } from "@/types/brainHub";
import { PsychologyModel, PhysicsModel, EconomicsModel, RoboticsModel } from "@/types/brainHub";

const BrainHubConfig: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfig | null>(null);
  const [activeTab, setActiveTab] = useState("ai-parameters");

  useEffect(() => {
    // Load initial configuration
    const currentConfig = brainHub.getConfig();
    setConfig(currentConfig);
  }, []);

  const handleValueChange = (section: keyof BrainHubConfig, key: string, value: any) => {
    if (!config) return;
    
    setConfig(prevConfig => {
      if (!prevConfig) return null;
      
      const newConfig = { ...prevConfig };
      
      // Handle nested properties
      if (typeof newConfig[section] === 'object' && newConfig[section] !== null) {
        (newConfig[section] as any)[key] = value;
      } else {
        (newConfig as any)[section] = value;
      }
      
      // Update the brain hub with new config
      brainHub.updateConfig(newConfig);
      
      return newConfig;
    });
  };

  const handleToggleChange = (key: keyof BrainHubConfig | string, checked: boolean) => {
    if (!config) return;
    
    // For domain-specific settings which are objects with enabled property
    if (key === "psychology") {
      handleValueChange("psychology" as keyof BrainHubConfig, "enabled", checked);
    }
    else if (key === "physics") {
      handleValueChange("physics" as keyof BrainHubConfig, "enabled", checked);
    }
    else if (key === "economics") {
      handleValueChange("economics" as keyof BrainHubConfig, "enabled", checked);
    }
    else if (key === "robotics") {
      handleValueChange("robotics" as keyof BrainHubConfig, "enabled", checked);
    }
    // For feature flags which are direct boolean values
    else if (key === "geoLegalFilteringEnabled" || 
             key === "neuroEmotionEnabled" || 
             key === "predictiveModulationEnabled") {
      setConfig(prevConfig => {
        if (!prevConfig) return null;
        const newConfig = { ...prevConfig, [key]: checked };
        brainHub.updateConfig(newConfig);
        return newConfig;
      });
    }
  };

  if (!config) {
    return <div>Loading configuration...</div>;
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="ai-parameters">AI Parameters</TabsTrigger>
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
            <TabsTrigger value="domain-settings">Domain Settings</TabsTrigger>
            <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-parameters" className="space-y-4">
            {/* AI Parameters Settings */}
            <h3 className="text-lg font-semibold mb-4">AI Model Parameters</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Learning Rate: {config.aiModelParameters.learningRate}</Label>
                </div>
                <Slider 
                  value={[config.aiModelParameters.learningRate * 1000]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={([value]) => handleValueChange("aiModelParameters", "learningRate", value / 1000)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Batch Size: {config.aiModelParameters.batchSize}</Label>
                </div>
                <Slider 
                  value={[config.aiModelParameters.batchSize]}
                  min={16}
                  max={128}
                  step={8}
                  onValueChange={([value]) => handleValueChange("aiModelParameters", "batchSize", value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Epochs: {config.aiModelParameters.epochs}</Label>
                </div>
                <Slider 
                  value={[config.aiModelParameters.epochs]}
                  min={5}
                  max={50}
                  step={5}
                  onValueChange={([value]) => handleValueChange("aiModelParameters", "epochs", value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Optimizer Type</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={config.aiModelParameters.optimizerType}
                  onChange={(e) => handleValueChange("aiModelParameters", "optimizerType", e.target.value)}
                >
                  <option value="adam">Adam</option>
                  <option value="sgd">SGD</option>
                  <option value="rmsprop">RMSprop</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system-settings" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Resource Allocation Mode</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={config.systemSettings.resourceAllocationMode}
                  onChange={(e) => handleValueChange("systemSettings", "resourceAllocationMode", e.target.value)}
                >
                  <option value="balanced">Balanced</option>
                  <option value="performance">Performance</option>
                  <option value="economy">Economy</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoOptimize">Auto Optimize</Label>
                  <p className="text-sm text-muted-foreground">Automatically adjust settings for optimal performance</p>
                </div>
                <Switch 
                  id="autoOptimize" 
                  checked={config.systemSettings.autoOptimize} 
                  onCheckedChange={(checked) => handleValueChange("systemSettings", "autoOptimize", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed logging for debugging purposes</p>
                </div>
                <Switch 
                  id="debugMode" 
                  checked={config.systemSettings.debugMode} 
                  onCheckedChange={(checked) => handleValueChange("systemSettings", "debugMode", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Logging Level</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={config.systemSettings.loggingLevel}
                  onChange={(e) => handleValueChange("systemSettings", "loggingLevel", e.target.value)}
                >
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                  <option value="warn">Warn</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="domain-settings" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Domain-Specific Settings</h3>
            
            <div className="grid gap-6">
              {/* Psychology Domain */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Psychology Model</h4>
                    <p className="text-sm text-muted-foreground">Emotional analysis & behavioral prediction</p>
                  </div>
                  <Switch 
                    checked={config.psychology.enabled} 
                    onCheckedChange={(checked) => handleToggleChange("psychology", checked)}
                  />
                </div>
                
                {config.psychology.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Confidence Threshold: {config.psychology.confidenceThreshold}</Label>
                      </div>
                      <Slider 
                        value={[config.psychology.confidenceThreshold * 100]}
                        min={50}
                        max={99}
                        step={1}
                        onValueChange={([value]) => handleValueChange("psychology", "confidenceThreshold", value / 100)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Physics Domain */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Physics Model</h4>
                    <p className="text-sm text-muted-foreground">Physical simulations & interactions</p>
                  </div>
                  <Switch 
                    checked={config.physics.enabled} 
                    onCheckedChange={(checked) => handleToggleChange("physics", checked)}
                  />
                </div>
                
                {config.physics.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Simulation Precision: {config.physics.simulationPrecision.toFixed(2)}</Label>
                      </div>
                      <Slider 
                        value={[config.physics.simulationPrecision * 100]}
                        min={70}
                        max={99}
                        step={1}
                        onValueChange={([value]) => handleValueChange("physics", "simulationPrecision", value / 100)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Economics Domain */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Economics Model</h4>
                    <p className="text-sm text-muted-foreground">Market dynamics & financial modeling</p>
                  </div>
                  <Switch 
                    checked={config.economics.enabled} 
                    onCheckedChange={(checked) => handleToggleChange("economics", checked)}
                  />
                </div>
                
                {/* No sliders for this one, just version selection */}
                {config.economics.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Current Model Version: {config.economics.marketModelVersion}</Label>
                      </div>
                      {/* No slider here */}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Robotics Domain */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Robotics Model</h4>
                    <p className="text-sm text-muted-foreground">Movement control & spatial reasoning</p>
                  </div>
                  <Switch 
                    checked={config.robotics.enabled} 
                    onCheckedChange={(checked) => handleToggleChange("robotics", checked)}
                  />
                </div>
                
                {config.robotics.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Motor Precision: {config.robotics.motorPrecision.toFixed(2)}</Label>
                      </div>
                      <Slider 
                        value={[config.robotics.motorPrecision * 100]}
                        min={50}
                        max={99}
                        step={1}
                        onValueChange={([value]) => handleValueChange("robotics", "motorPrecision", value / 100)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="feature-flags" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Feature Flags</h3>
            
            <div className="space-y-6">
              {/* Geo-Legal Filtering */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Geo-Legal Filtering</h4>
                  <p className="text-sm text-muted-foreground">Region-specific content compliance</p>
                </div>
                <Switch 
                  checked={config.geoLegalFilteringEnabled} 
                  onCheckedChange={(checked) => handleToggleChange("geoLegalFilteringEnabled", checked)}
                />
              </div>
              
              {/* Neuro-Emotion */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Neuro-Emotion Processing</h4>
                  <p className="text-sm text-muted-foreground">Advanced emotional intelligence</p>
                </div>
                <Switch 
                  checked={config.neuroEmotionEnabled} 
                  onCheckedChange={(checked) => handleToggleChange("neuroEmotionEnabled", checked)}
                />
              </div>
              
              {/* Predictive Modulation */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Predictive Modulation</h4>
                  <p className="text-sm text-muted-foreground">Anticipatory behavior adaptation</p>
                </div>
                <Switch 
                  checked={config.predictiveModulationEnabled} 
                  onCheckedChange={(checked) => handleToggleChange("predictiveModulationEnabled", checked)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfig;
