
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Brain, Power, Activity, RefreshCw, Zap, Plus } from "lucide-react";
import { useNeuralRegistry } from "@/hooks/useNeuralRegistry";
import { 
  AICompanionNeuralService,
  EscortsNeuralService,
  CreatorsNeuralService,
  LivecamsNeuralService,
  neuralServiceRegistry
} from "@/services/neural";
import NeuralModuleRegistration from './NeuralModuleRegistration';

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
  
  const renderServiceCard = (service: any) => {
    return (
      <Card key={service.moduleId} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              {service.moduleId}
            </CardTitle>
            <Badge variant={service.config.enabled ? "default" : "outline"}>
              {service.config.enabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <CardDescription>
            {service.moduleType} neural service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Autonomy Level</span>
              <span>{service.config.autonomyLevel}%</span>
            </div>
            <Progress value={service.config.autonomyLevel} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Priority</span>
              <span>{service.config.priority}/100</span>
            </div>
            <Progress value={service.config.priority} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Resource Allocation</span>
              <span>{service.config.resourceAllocation}%</span>
            </div>
            <Progress value={service.config.resourceAllocation} className="h-2" />
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
            <div className="flex flex-wrap gap-1">
              {service.getCapabilities().map((cap: string) => (
                <Badge key={cap} variant="secondary" className="text-xs">
                  {cap}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
              getServicesByType('ai-companion').map(renderServiceCard)
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Brain className="h-12 w-12 text-muted-foreground" />
                  <p>No AI Companion neural services registered</p>
                  <Button onClick={() => {
                    const service = new AICompanionNeuralService('ai-companion-primary');
                    neuralServiceRegistry.registerService(service);
                    loadServices();
                  }}>
                    <Power className="mr-2 h-4 w-4" />
                    Register Service
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="escorts">
            {getServicesByType('escorts').length > 0 ? (
              getServicesByType('escorts').map(renderServiceCard)
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Activity className="h-12 w-12 text-muted-foreground" />
                  <p>No Escorts neural services registered</p>
                  <Button onClick={() => {
                    const service = new EscortsNeuralService('escorts-primary');
                    neuralServiceRegistry.registerService(service);
                    loadServices();
                  }}>
                    <Power className="mr-2 h-4 w-4" />
                    Register Service
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            {getServicesByType('creators').length > 0 ? (
              getServicesByType('creators').map(renderServiceCard)
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Activity className="h-12 w-12 text-muted-foreground" />
                  <p>No Content Creators neural services registered</p>
                  <Button onClick={() => {
                    const service = new CreatorsNeuralService('creators-primary');
                    neuralServiceRegistry.registerService(service);
                    loadServices();
                  }}>
                    <Power className="mr-2 h-4 w-4" />
                    Register Service
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="livecams">
            {getServicesByType('livecams').length > 0 ? (
              getServicesByType('livecams').map(renderServiceCard)
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Activity className="h-12 w-12 text-muted-foreground" />
                  <p>No Livecams neural services registered</p>
                  <Button onClick={() => {
                    const service = new LivecamsNeuralService('livecams-primary');
                    neuralServiceRegistry.registerService(service);
                    loadServices();
                  }}>
                    <Power className="mr-2 h-4 w-4" />
                    Register Service
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default NeuralServicesPanel;
