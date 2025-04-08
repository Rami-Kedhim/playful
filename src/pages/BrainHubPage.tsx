
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Brain, Info, Settings, ChartBar } from 'lucide-react';
import SuperlativeBrainHub from '@/components/brainHub/SuperlativeBrainHub';
import BrainCore from '@/components/brainHub/BrainCore';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';
import NeuralAnalyticsPanel from '@/components/brainHub/NeuralAnalyticsPanel';
import NeuralModuleRegistration from '@/components/brainHub/NeuralModuleRegistration';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { NeuralModel } from '@/services/neural/types/neuralHub';
import { useToast } from '@/components/ui/use-toast';

const BrainHubPage: React.FC = () => {
  const [models, setModels] = useState<NeuralModel[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const { toast } = useToast();
  
  // Load models on component mount
  useEffect(() => {
    fetchModels();
  }, []);
  
  const fetchModels = () => {
    try {
      const hubModels = neuralHub.getModels();
      setModels(hubModels);
    } catch (error) {
      console.error('Failed to fetch models:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch neural models',
        variant: 'destructive'
      });
    }
  };
  
  // Handle module registration
  const handleModuleRegistered = () => {
    toast({
      title: 'Success',
      description: 'Neural module successfully registered',
    });
    fetchModels(); // Refresh models list
  };
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="mr-2 h-8 w-8 text-primary" />
            Brain Hub Control Center
          </h1>
          <p className="text-muted-foreground">
            Advanced management interface for the neural systems integration
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setAdvancedMode(!advancedMode)}
          >
            <Settings className="mr-2 h-4 w-4" />
            {advancedMode ? 'Basic Mode' : 'Advanced Mode'}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="neural-services">Neural Services</TabsTrigger>
          <TabsTrigger value="brain-core">Brain Core</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <SuperlativeBrainHub />
        </TabsContent>
        
        <TabsContent value="neural-services">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NeuralServicesPanel 
                models={models} 
                advancedMode={advancedMode} 
              />
            </div>
            
            <div className="space-y-6">
              <NeuralModuleRegistration onRegistered={handleModuleRegistered} />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Info className="w-5 h-5 mr-2 text-primary" />
                    Neural Systems Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Active Models</span>
                      <p className="text-2xl font-medium">{models.filter(m => m.status === 'active').length} / {models.length}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">System Efficiency</span>
                      <p className="text-2xl font-medium">{neuralHub.calculateSystemEfficiency()}%</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Active Training Jobs</span>
                      <p className="text-2xl font-medium">{neuralHub.getActiveTrainingJobs().length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="brain-core">
          <BrainCore />
        </TabsContent>
        
        <TabsContent value="analytics">
          <NeuralAnalyticsPanel advancedMode={advancedMode} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubPage;
