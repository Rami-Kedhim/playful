
import React, { useEffect } from 'react';
import { AICompanionNeuralService } from '@/services/neural/modules/AICompanionNeuralService';
import { useBrainHubAI } from '@/hooks/ai/useBrainHubAI';

interface AICompanionConsumerProps {
  companionId?: string;
}

const AICompanionConsumer: React.FC<AICompanionConsumerProps> = ({ companionId }) => {
  const { isConnected, connectToBrainHub } = useBrainHubAI({
    componentId: 'ai-companion-consumer',
    capabilities: ['conversation', 'personality_modeling', 'emotional_intelligence']
  });
  
  useEffect(() => {
    // Initialize AI companion neural service
    const aiCompanionService = new AICompanionNeuralService();
    aiCompanionService.initialize();
    
    // Set configuration
    aiCompanionService.updateConfig({
      sensitivity: 0.95,
      threshold: 0.8,
      mode: 'empathetic'
    });
    
    // Connect to Brain Hub
    connectToBrainHub();
  }, [connectToBrainHub]);
  
  return null; // This is a non-visual component
};

export default AICompanionConsumer;
