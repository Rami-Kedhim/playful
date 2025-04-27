
import React, { useEffect } from 'react';
import { CreatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';
import { useBrainHubAI } from '@/hooks/ai/useBrainHubAI';

interface CreatorConsumerProps {
  creatorId?: string;
}

const CreatorConsumer: React.FC<CreatorConsumerProps> = ({ creatorId }) => {
  const { isConnected, connectToBrainHub } = useBrainHubAI({
    componentId: 'creator-consumer',
    capabilities: ['content_optimization', 'engagement_analysis']
  });
  
  useEffect(() => {
    // Initialize creators neural service
    const creatorsService = new CreatorsNeuralService();
    creatorsService.initialize();
    
    // Set configuration
    creatorsService.updateConfig({
      sensitivity: 0.8,
      threshold: 0.6,
      mode: 'creative'
    });
    
    // Connect to Brain Hub
    connectToBrainHub();
  }, [connectToBrainHub]);
  
  return null; // This is a non-visual component
};

export default CreatorConsumer;
