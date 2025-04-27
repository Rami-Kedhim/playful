import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNeuralRegistry } from '@/hooks/useNeuralRegistry';
import { BaseBrainService } from '@/services/neural/modules/BaseNeuralService';
import { NeuralServiceConfig } from '@/services/neural/types/NeuralService';

interface AdaptiveCognitiveProps {
  moduleId?: string;
  title?: string;
}

const AdaptiveCognitiveCore: React.FC<AdaptiveCognitiveProps> = ({ 
  moduleId = 'adaptive-core', 
  title = 'Adaptive Cognitive Core'
}) => {
  const { registerService } = useNeuralRegistry();
  const [adaptiveCore, setAdaptiveCore] = useState<BaseBrainService | null>(null);
  const [cognitiveLoad, setCognitiveLoad] = useState(0);

  useEffect(() => {
    // Create a neural service for the adaptive core
    const config: NeuralServiceConfig = {
      enabled: true,
      sensitivity: 0.85,
      threshold: 0.7,
      mode: 'adaptive'
    };
    
    const service = new BaseBrainService({
      name: title,
      moduleId,
      description: 'Adaptive cognitive processing module',
      moduleType: 'cognitive',
      version: '1.2.0',
      config
    });
    
    // Register the service with the neural registry
    if (registerService(service)) {
      setAdaptiveCore(service);
    }
    
    // Simulate cognitive load changes
    const interval = setInterval(() => {
      setCognitiveLoad(Math.floor(30 + Math.random() * 50));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [moduleId, title, registerService]);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Cognitive Load</span>
              <span>{cognitiveLoad}%</span>
            </div>
            <Progress value={cognitiveLoad} />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">Active</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Efficiency</span>
              <span className="font-medium">{85 + Math.floor(Math.random() * 10)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveCognitiveCore;
