
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
  
  // Refresh creators when neural system is initialized
  useEffect(() => {
    if (isNeuralInitialized) {
      // Configure neural service based on user's wallet balance
      if (wallet && creatorsNeuralService) {
        const premiumMode = wallet.balance > 100;
        creatorsNeuralService.updateConfig({
          resourceAllocation: premiumMode ? 50 : 30,
          priority: premiumMode ? 80 : 45
        });
      }
      
      // Refresh creators with neural processing
      loadCreators(true);
    }
  }, [isNeuralInitialized, wallet?.balance]);
  
  return <>{children}</>;
};
