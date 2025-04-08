
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Brain, Activity, RefreshCw, Zap, Plus } from "lucide-react";
import { useNeuralRegistry } from "@/hooks/useNeuralRegistry";
import { 
  AICompanionNeuralService,
  EscortsNeuralService,
  CreatorsNeuralService,
  LivecamsNeuralService
} from "@/services/neural";
import NeuralModuleRegistration from './NeuralModuleRegistration';
import NeuralServiceCard from './NeuralServiceCard';
import EmptyServiceState from './EmptyServiceState';

const NeuralServicesPanel: React.FC = () => {
  const { 
    services, 
    loading, 
    error, 
    loadServices, 
    optimizeResources,
    getServicesByType 
  } = useNeuralRegistry();
  
  const [activeTab, setActiveTab] = useState('ai-companion');
  const [showRegistration, setShowRegistration] = useState(false);
  
  useEffect(() => {
    // Initial load of services
    loadServices();
  }, [loadServices]);
  
  const handleOptimize = () => {
    optimizeResources();
  };
  
  // Create default service handlers
  const createDefaultService = (moduleType: 'ai-companion' | 'escorts' | 'creators' | 'livecams') => {
    const ServiceClass = {
      'ai-companion': AICompanionNeuralService,
      'escorts': EscortsNeuralService,
      'creators': CreatorsNeuralService,
      'livecams': LivecamsNeuralService
    }[moduleType];
    
    const moduleId = `${moduleType}-primary`;
    const service = new ServiceClass(moduleId);
    
    // Register and reload
    const success = useNeuralRegistry().registerService(service);
    if (success) loadServices();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Neural Services</h3>
        <div className="space-x-2">
          <Button 
            size="sm" 
            variant={showRegistration ? "default" : "outline"} 
            onClick={() => setShowRegistration(!showRegistration)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {showRegistration ? 'Hide Registration' : 'Register Service'}
          </Button>
          <Button size="sm" variant="outline" onClick={loadServices}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleOptimize}>
            <Zap className="mr-2 h-4 w-4" />
            Optimize Resources
          </Button>
        </div>
      </div>
      
      {showRegistration && (
        <NeuralModuleRegistration onRegistered={loadServices} />
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="ai-companion">AI Companion</TabsTrigger>
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Content Creators</TabsTrigger>
            <TabsTrigger value="livecams">Livecams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-companion">
            {getServicesByType('ai-companion').length > 0 ? (
              getServicesByType('ai-companion').map(service => (
                <NeuralServiceCard 
                  key={service.moduleId} 
                  service={service}
                  onRefresh={loadServices} 
                />
              ))
            ) : (
              <EmptyServiceState
                icon={<Brain className="h-12 w-12 text-muted-foreground" />}
                title="AI Companion"
                onRegister={() => createDefaultService('ai-companion')}
              />
            )}
          </TabsContent>
          
          <TabsContent value="escorts">
            {getServicesByType('escorts').length > 0 ? (
              getServicesByType('escorts').map(service => (
                <NeuralServiceCard 
                  key={service.moduleId} 
                  service={service}
                  onRefresh={loadServices} 
                />
              ))
            ) : (
              <EmptyServiceState
                icon={<Activity className="h-12 w-12 text-muted-foreground" />}
                title="Escorts"
                onRegister={() => createDefaultService('escorts')}
              />
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            {getServicesByType('creators').length > 0 ? (
              getServicesByType('creators').map(service => (
                <NeuralServiceCard 
                  key={service.moduleId} 
                  service={service}
                  onRefresh={loadServices} 
                />
              ))
            ) : (
              <EmptyServiceState
                icon={<Activity className="h-12 w-12 text-muted-foreground" />}
                title="Content Creators"
                onRegister={() => createDefaultService('creators')}
              />
            )}
          </TabsContent>
          
          <TabsContent value="livecams">
            {getServicesByType('livecams').length > 0 ? (
              getServicesByType('livecams').map(service => (
                <NeuralServiceCard 
                  key={service.moduleId} 
                  service={service}
                  onRefresh={loadServices} 
                />
              ))
            ) : (
              <EmptyServiceState
                icon={<Activity className="h-12 w-12 text-muted-foreground" />}
                title="Livecams"
                onRegister={() => createDefaultService('livecams')}
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default NeuralServicesPanel;
