
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuperlativeBrainHub from '@/components/brainHub/SuperlativeBrainHub';
import BrainCore from '@/components/brainHub/BrainCore';
import NeuralServicesPanel from '@/components/brainHub/NeuralServicesPanel';

const BrainHubPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Brain Hub Control Center</h1>
      <p className="text-muted-foreground">
        Advanced management interface for the neural systems integration
      </p>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="neural-services">Neural Services</TabsTrigger>
          <TabsTrigger value="brain-core">Brain Core</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <SuperlativeBrainHub />
        </TabsContent>
        
        <TabsContent value="neural-services">
          <NeuralServicesPanel />
        </TabsContent>
        
        <TabsContent value="brain-core">
          <BrainCore />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="p-8 text-center text-muted-foreground">
            Analytics dashboard coming soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubPage;
