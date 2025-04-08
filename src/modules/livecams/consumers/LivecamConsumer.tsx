
import React, { useEffect } from 'react';
import { useLivecamContext } from '../providers/LivecamProvider';
import { useWallet } from '@/hooks/useWallet';
import { livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';

interface LivecamConsumerProps {
  children: React.ReactNode;
  isNeuralInitialized: boolean;
}

export const LivecamConsumer: React.FC<LivecamConsumerProps> = ({ 
  children,
  isNeuralInitialized
}) => {
  const { state, loadLivecams } = useLivecamContext();
  const { wallet } = useWallet();
  
  // Wait for neural system initialization before loading livecams
  useEffect(() => {
    if (isNeuralInitialized) {
      // Configure neural service based on user's wallet balance
      if (wallet && livecamsNeuralService) {
        const premiumMode = (wallet.balance > 100);
        livecamsNeuralService.updateConfig({
          resourceAllocation: premiumMode ? 60 : 40,
          priority: premiumMode ? 85 : 50,
          boostingEnabled: true // Use boostingEnabled property for configuration
        });
      }
      
      // Refresh livecams with neural processing
      loadLivecams(true);
    }
  }, [isNeuralInitialized, wallet?.balance, loadLivecams]);
  
  return <>{children}</>;
};
