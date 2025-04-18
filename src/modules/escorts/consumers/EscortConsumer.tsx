
import React, { useEffect } from 'react';
import { useEscortContext } from '../providers/EscortProvider';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { toast } from '@/components/ui/use-toast';

interface EscortConsumerProps {
  children: React.ReactNode;
}

const EscortConsumer: React.FC<EscortConsumerProps> = ({ children }) => {
  const { escorts, loading, error } = useEscortContext();
  
  // Connect to neural service when component mounts
  useEffect(() => {
    const connectToNeuralService = async () => {
      try {
        // Configure neural service for escort optimization
        escortsNeuralService.configure({
          priority: 80,
          autonomyLevel: 65,
          enabled: true
        });
        
        // Log successful connection
        console.log('Connected to Escorts Neural Service:', escortsNeuralService.getId());
        
        // Check if escorts are loaded and log
        if (escorts && escorts.length > 0) {
          console.log(`Loaded ${escorts.length} escorts for neural processing`);
        }
      } catch (err) {
        console.error('Failed to connect to Escorts Neural Service:', err);
      }
    };
    
    connectToNeuralService();
    
    // Cleanup on unmount
    return () => {
      console.log('Disconnecting from Escorts Neural Service');
    };
  }, [escorts]);
  
  // Render children
  return <>{children}</>;
};

export default EscortConsumer;
