import React, { useEffect } from 'react';
import { useLivecamContext } from '../providers/LivecamProvider';
import { livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';

interface LivecamConsumerProps {
  children: React.ReactNode;
}

const LivecamConsumer: React.FC<LivecamConsumerProps> = ({ children }) => {
  const { livecams, loading, error } = useLivecamContext();
  
  // Connect to neural service when component mounts
  useEffect(() => {
    const connectToNeuralService = async () => {
      try {
        // Configure neural service for livecam optimization
        livecamsNeuralService.configure({
          priority: 70,
          autonomyLevel: 60,
          enabled: true
        });
        
        // Log successful connection
        console.log('Connected to Livecams Neural Service:', livecamsNeuralService.getId());
        
        // Check if livecams are loaded and log
        if (livecams && livecams.length > 0) {
          console.log(`Loaded ${livecams.length} livecams for neural processing`);
        }
      } catch (err) {
        console.error('Failed to connect to Livecams Neural Service:', err);
      }
    };
    
    connectToNeuralService();
    
    // Cleanup on unmount
    return () => {
      console.log('Disconnecting from Livecams Neural Service');
    };
  }, [livecams]);
  
  // Render children
  return <>{children}</>;
};

export default LivecamConsumer;
