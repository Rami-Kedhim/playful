
import React, { useEffect } from 'react';
import { useEscortContext } from '../providers/EscortProvider';
import { useWallet } from '@/hooks/useWallet';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';

interface EscortConsumerProps {
  children: React.ReactNode;
  isNeuralInitialized: boolean;
}

export const EscortConsumer: React.FC<EscortConsumerProps> = ({ 
  children,
  isNeuralInitialized
}) => {
  const { state, loadEscorts } = useEscortContext();
  const { wallet } = useWallet();
  
  // Refresh escorts when neural system is initialized
  useEffect(() => {
    if (isNeuralInitialized) {
      // Configure neural service based on user's wallet balance
      if (wallet && escortsNeuralService) {
        const premiumMode = wallet.balance > 100;
        escortsNeuralService.updateConfig({
          resourceAllocation: premiumMode ? 50 : 25,
          priority: premiumMode ? 80 : 40
        });
      }
      
      // Refresh escorts with neural processing
      loadEscorts(true);
    }
  }, [isNeuralInitialized, wallet?.balance]);
  
  return <>{children}</>;
};
