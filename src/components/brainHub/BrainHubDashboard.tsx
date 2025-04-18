import React from 'react';
import SuperlativeBrainHub from './SuperlativeBrainHub';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Brain } from 'lucide-react';
import { NeuralModel } from '@/types/neural/NeuralSystemMetrics';

const BrainHubDashboard: React.FC = () => {
  // Mock models data
  const mockModels: NeuralModel[] = [
    {
      id: 'model-1',
      name: 'Cognitive Analyzer',
      version: '1.0.0',
      capabilities: ['pattern recognition', 'information processing'],
      status: 'active',
      performance: {
        accuracy: 0.95,
        latency: 120,
        resourceUsage: 0.75
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'cognitive analysis'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Superlative Brain Hub</h1>
      </div>
      
      <Alert className="bg-amber-50 border-amber-200">
        <InfoIcon className="h-4 w-4 text-amber-800" />
        <AlertTitle className="text-amber-800">Neural Systems Online</AlertTitle>
        <AlertDescription className="text-amber-700">
          You are accessing the next-generation neural intelligence system. Use the Advanced Mode toggle to activate enhanced capabilities.
        </AlertDescription>
      </Alert>
      
      <Separator />
      
      <SuperlativeBrainHub models={mockModels} />
    </div>
  );
};

export default BrainHubDashboard;
