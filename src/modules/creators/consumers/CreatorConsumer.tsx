
import React, { useEffect } from 'react';
import { useCreatorContext } from '../providers/CreatorProvider';
import { useWallet } from '@/hooks/useWallet';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';

interface CreatorConsumerProps {
  children: React.ReactNode;
  isNeuralInitialized: boolean;
}

export const CreatorConsumer: React.FC<CreatorConsumerProps> = ({ 
  children,
  isNeuralInitialized
}) => {
  const { state, loadCreators } = useCreatorContext();
  const { wallet } = useWallet();
  
  // Wait for neural system initialization before loading creators
  useEffect(() => {
    if (isNeuralInitialized) {
      // Configure neural service based on user's wallet balance
      if (wallet && creatorsNeuralService) {
        const premiumMode = (wallet.balance > 100);
        creatorsNeuralService.updateConfig({
          resourceAllocation: premiumMode ? 60 : 40,
          priority: premiumMode ? 85 : 50,
          boostingEnabled: true // Use boostingEnabled property for configuration
        });
      }
      
      // Refresh creators with neural processing
      loadCreators(true);
    }
  }, [isNeuralInitialized, wallet?.balance, loadCreators]);
  
  return <>{children}</>;
};
