import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import type { BrainHubConfig as BrainHubConfigType } from '@/types/brainHub';
import useBrainHubPersistence from '@/hooks/useBrainHubPersistence';
import { toast } from 'sonner';

const BrainHubConfig: React.FC = () => {
  const [config, setConfig] = useState<BrainHubConfigType>(brainHub.getConfig());
  const { saveState, loadState, lastSaved, isSaving, isLoading, error } = useBrainHubPersistence();
  const [activeTab, setActiveTab] = useState("ai-models");
  
  useEffect(() => {
    // Load initial configuration from Brain Hub
    const initialConfig = brainHub.getConfig();
    setConfig(initialConfig);
  }, []);
  
  const handleConfigChange = (key: string, subKey: string | null, value: any) => {
    setConfig(prevConfig => {
      let updatedConfig = { ...prevConfig };
      
      if (subKey) {
        // Deep copy for nested objects
        updatedConfig = {
          ...updatedConfig,
          [key]: {
            ...updatedConfig[key],
            [subKey]: value
          }
        };
      } else {
        updatedConfig = {
          ...updatedConfig,
          [key]: value
        };
      }
      
      return updatedConfig;
    });
  };
  
  const handleSaveConfig = async () => {
    const success = brainHub.updateConfig(config);
    
    if (success) {
      await saveState();
      toast({
        title: "Configuration saved",
        description: "Brain Hub configuration has been saved successfully",
      });
    } else {
      toast({
        title: "Save failed",
        description: "Failed to save Brain Hub configuration",
        variant: "destructive"
      });
    }
  };
  
  const handleLoadConfig = async () => {
    const success = await loadState();
    
    if (success) {
      const loadedConfig = brainHub.getConfig();
      setConfig(loadedConfig);
      toast({
        title: "Configuration loaded",
        description: "Brain Hub configuration has been loaded successfully",
      });
    } else {
      toast({
        title: "Load failed",
        description: "Failed to load Brain Hub configuration",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Brain Hub Configuration</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
            <TabsTrigger value="neural-settings">Neural Settings</TabsTrigger>
            <TabsTrigger value="filtering">Filtering</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-models">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI Model Parameters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Learning Rate</label>
                  <Slider
                    defaultValue={[config.aiModelParameters.learningRate * 1000]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={(value) => handleConfigChange('aiModelParameters', 'learningRate', value[0] / 1000)}
                  />
                  <p className="text-sm text-gray-500">Current: {config.aiModelParameters.learningRate}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Batch Size</label>
                  <input
                    type="number"
                    value={config.aiModelParameters.batchSize}
                    onChange={(e) => handleConfigChange('aiModelParameters', 'batchSize', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Epochs</label>
                  <input
                    type="number"
                    value={config.aiModelParameters.epochs}
                    onChange={(e) => handleConfigChange('aiModelParameters', 'epochs', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Optimizer Type</label>
                  <input
                    type="text"
                    value={config.aiModelParameters.optimizerType}
                    onChange={(e) => handleConfigChange('aiModelParameters', 'optimizerType', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system-settings">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">System Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resource Allocation Mode</label>
                  <input
                    type="text"
                    value={config.systemSettings.resourceAllocationMode}
                    onChange={(e) => handleConfigChange('systemSettings', 'resourceAllocationMode', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.systemSettings.autoOptimize}
                    onCheckedChange={(checked) => handleConfigChange('systemSettings', 'autoOptimize', checked)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">Auto Optimize</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.systemSettings.debugMode}
                    onCheckedChange={(checked) => handleConfigChange('systemSettings', 'debugMode', checked)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">Debug Mode</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logging Level</label>
                  <input
                    type="text"
                    value={config.systemSettings.loggingLevel}
                    onChange={(e) => handleConfigChange('systemSettings', 'loggingLevel', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="neural-settings">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Neural Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Activation Threshold</label>
                  <Slider
                    defaultValue={[config.neuralSettings.activationThreshold * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleConfigChange('neuralSettings', 'activationThreshold', value[0] / 100)}
                  />
                  <p className="text-sm text-gray-500">Current: {config.neuralSettings.activationThreshold}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Neural Density</label>
                  <Slider
                    defaultValue={[config.neuralSettings.neuralDensity * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleConfigChange('neuralSettings', 'neuralDensity', value[0] / 100)}
                  />
                  <p className="text-sm text-gray-500">Current: {config.neuralSettings.neuralDensity}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Layer Configuration</label>
                  <input
                    type="text"
                    value={config.neuralSettings.layerConfiguration}
                    onChange={(e) => handleConfigChange('neuralSettings', 'layerConfiguration', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="filtering">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Filtering Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.geoLegalFilteringEnabled}
                    onCheckedChange={(checked) => handleConfigChange('geoLegalFilteringEnabled', null, checked)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">Geo-Legal Filtering Enabled</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.neuroEmotionEnabled}
                    onCheckedChange={(checked) => handleConfigChange('neuroEmotionEnabled', null, checked)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">Neuro-Emotion Enabled</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.predictiveModulationEnabled}
                    onCheckedChange={(checked) => handleConfigChange('predictiveModulationEnabled', null, checked)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">Predictive Modulation Enabled</label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <Button variant="secondary" onClick={handleLoadConfig} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load Configuration'}
            </Button>
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-1">Last saved: {lastSaved.toLocaleTimeString()}</p>
            )}
            {error && (
              <p className="text-sm text-red-500 mt-1">Error: {error}</p>
            )}
          </div>
          
          <Button onClick={handleSaveConfig} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfig;
