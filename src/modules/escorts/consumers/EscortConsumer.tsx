
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
  
  // Wait for neural system initialization before loading escorts
  useEffect(() => {
    if (isNeuralInitialized) {
      // Configure neural service based on user's wallet balance
      if (wallet && escortsNeuralService) {
        const premiumMode = (wallet.balance > 100);
        
        // Apply OxumAlgorithm boost settings based on user's premium status
        escortsNeuralService.configure({
          resourceAllocation: premiumMode ? 50 : 25,
          priority: premiumMode ? 80 : 40,
          boostingEnabled: true, // Enable boosting logic as per request
          boostingAlgorithm: "OxumAlgorithm",
          orderByBoost: true // As specified in the module requirements
        });
      }
      
      // Refresh escorts with neural processing (not raw scraping)
      loadEscorts(true);
    }
  }, [isNeuralInitialized, wallet?.balance, loadEscorts]);
  
  return <>{children}</>;
};
