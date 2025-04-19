
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SuperlativeBrainHub from '@/components/brainHub/SuperlativeBrainHub';
import { NeuralModel as NeuralHubNeuralModel } from '@/services/neural/types/neuralHub';
import { NeuralModel as NeuralMetricsNeuralModel } from '@/types/neural/NeuralSystemMetrics';

const BrainHubPage = () => {
  const [activeTab, setActiveTab] = useState<string>('models');
  const [models, setModels] = useState<NeuralMetricsNeuralModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching models
    setTimeout(() => {
      const mockModelsHub: NeuralHubNeuralModel[] = [
        {
          id: 'model-1',
          name: 'LoveSense GPT',
          type: 'language',
          version: '2.1',
          capabilities: ['text-generation', 'image-description', 'sentiment-analysis'],
          status: 'active' as const,
          performance: {
            accuracy: 0.89,
            latency: 120,
            resourceUsage: 0.75
          },
          specialization: 'natural-language-processing',
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 1024,
          precision: 32
        },
        {
          id: 'model-2',
          name: 'Persona Builder',
          type: 'language',
          version: '1.5',
          capabilities: ['character-creation', 'dialogue-generation'],
          status: 'active' as const,
          performance: {
            accuracy: 0.85,
            latency: 100,
            resourceUsage: 0.65
          },
          specialization: 'character-generation',
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 512,
          precision: 16
        },
        {
          id: 'model-3',
          name: 'EscortMind',
          type: 'multimodal',
          version: '3.0',
          capabilities: ['profile-optimization', 'scheduling-assistant', 'recommendation-engine'],
          status: 'active' as const,
          performance: {
            accuracy: 0.92,
            latency: 150,
            resourceUsage: 0.85
          },
          specialization: 'profile-optimization',
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 2048,
          precision: 64
        }
      ];

      // Cast from neuralHub's model type to metrics's expected type
      const modelsMapped: NeuralMetricsNeuralModel[] = mockModelsHub.map(m => ({
        ...m,
        status: m.status  // Already compatible with required unions by asserting as const above
      }));

      setModels(modelsMapped);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brain Hub</h1>
          <p className="text-muted-foreground">
            Advanced neural systems for profile optimization and interaction.
          </p>
        </div>
        <Button>Connect New Service</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neural Models Available</CardTitle>
              <CardDescription>Select a neural model to enhance your profile and interactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <SuperlativeBrainHub models={models} />
            </CardContent>
            <CardFooter>
              <Button variant="outline">Configure Neural Integration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="space-y-4">
          {/* Training tab content here */}
          <p>Training tab content would go here</p>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          {/* Performance tab content here */}
          <p>Performance tab content would go here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrainHubPage;

