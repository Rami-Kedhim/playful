
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import NeuralServiceCard from './NeuralServiceCard';
import EmptyServiceState from './EmptyServiceState';
import { useNeuralServices } from '@/hooks/useNeuralServices';
import { BaseBrainService } from '@/services/neural/modules/BaseNeuralService';
import { ModuleType } from '@/services/neural/types/NeuralService'; // Added import for ModuleType

interface NeuralServicesPanelProps {
  title?: string;
}

const NeuralServicesPanel = ({ title = "Neural Services" }: NeuralServicesPanelProps) => {
  // Modified to use a mock service for demonstration
  const service = new BaseBrainService({
    moduleId: 'mock-service',
    name: 'Mock Service',
    description: 'Mock neural service for UI demonstration',
    moduleType: ModuleType.NEURAL,
    version: '1.0.0'
  });
  
  const { isInitialized, isLoading, error, reinitialize } = useNeuralServices(service);
  
  // Mock services for UI demonstration
  const services = isInitialized ? [service] : [];
  
  const handleRefresh = async () => {
    await reinitialize();
  };
  
  const handleOptimize = async () => {
    console.log('Optimizing resources...');
    // Optimization logic would go here
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>
            Active neural service modules and their status
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleOptimize}
            disabled={isLoading}
          >
            Optimize
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">
            <p className="font-medium">Error loading neural services</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : null}
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service, index) => (
              <NeuralServiceCard key={index} service={service} />
            ))}
          </div>
        ) : (
          <EmptyServiceState onRegister={() => {}} />
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralServicesPanel;
