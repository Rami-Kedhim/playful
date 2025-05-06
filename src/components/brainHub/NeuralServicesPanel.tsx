
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import NeuralServiceCard from './NeuralServiceCard';
import EmptyServiceState from './EmptyServiceState';
import useNeuralServices from '@/hooks/useNeuralServices';

interface NeuralServicesPanelProps {
  title?: string;
}

const NeuralServicesPanel = ({ title = "Neural Services" }: NeuralServicesPanelProps) => {
  const { services, loading, error, refreshServices, optimizeResources } = useNeuralServices();
  
  const handleRefresh = async () => {
    await refreshServices();
  };
  
  const handleOptimize = async () => {
    await optimizeResources();
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
            disabled={loading}
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleOptimize}
            disabled={loading}
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
        
        {loading ? (
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
          <EmptyServiceState onRegisterNew={() => {}} />
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralServicesPanel;
