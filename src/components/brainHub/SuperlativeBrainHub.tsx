
import React, { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { NeuralModel, SystemHealthMetrics } from '@/services/neural/types/neuralHub';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import NeuralSystemsPanel from './NeuralSystemsPanel';
import SystemHealthPanel from './SystemHealthPanel';
import ConfigurationPanel from './ConfigurationPanel';

const SuperlativeBrainHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('neural-systems');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [models, setModels] = useState<NeuralModel[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics | null>(null);

  useEffect(() => {
    // Initialize models
    setModels(neuralHub.getModels());
    
    // Initialize health metrics
    setHealthMetrics(neuralHub.getHealthMetrics());
    
    // Subscribe to health metrics updates
    neuralHub.addObserver((metrics) => {
      setHealthMetrics(metrics);
    });
    
    // Set up regular polling for model updates
    const intervalId = setInterval(() => {
      setModels(neuralHub.getModels());
    }, 5000);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  const handleAdvancedModeChange = (checked: boolean) => {
    setAdvancedMode(checked);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Neural Hub Control Center</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="advanced-mode" className={advancedMode ? 'text-primary' : ''}>
            Advanced Mode
          </Label>
          <Switch
            id="advanced-mode"
            checked={advancedMode}
            onCheckedChange={handleAdvancedModeChange}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="neural-systems">Neural Systems</TabsTrigger>
          <TabsTrigger value="system-health">System Health</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="neural-systems" className="space-y-4">
          <NeuralSystemsPanel 
            models={models}
            advancedMode={advancedMode}
          />
        </TabsContent>
        
        <TabsContent value="system-health" className="space-y-4">
          {healthMetrics && (
            <SystemHealthPanel 
              metrics={healthMetrics}
              advancedMode={advancedMode}
            />
          )}
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-4">
          <ConfigurationPanel 
            advancedMode={advancedMode}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperlativeBrainHub;
