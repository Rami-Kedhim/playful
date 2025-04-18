import React, { useEffect } from 'react';
import { useCreatorContext } from '../providers/CreatorProvider';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';

interface CreatorConsumerProps {
  children: React.ReactNode;
}

const CreatorConsumer: React.FC<CreatorConsumerProps> = ({ children }) => {
  const { creators, loading, error } = useCreatorContext();
  
  // Connect to neural service when component mounts
  useEffect(() => {
    const connectToNeuralService = async () => {
      try {
        // Configure neural service for creator optimization
        creatorsNeuralService.configure({
          priority: 80,
          autonomyLevel: 65,
          enabled: true
        });
        
        // Log successful connection
        console.log('Connected to Creators Neural Service:', creatorsNeuralService.getId());
        
        // Check if creators are loaded and log
        if (creators && creators.length > 0) {
          console.log(`Loaded ${creators.length} creators for neural processing`);
        }
      } catch (err) {
        console.error('Failed to connect to Creators Neural Service:', err);
      }
    };
    
    connectToNeuralService();
    
    // Cleanup on unmount
    return () => {
      console.log('Disconnecting from Creators Neural Service');
    };
  }, [creators]);
  
  // Render children
  return <>{children}</>;
};

export default CreatorConsumer;
