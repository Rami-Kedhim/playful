
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';

export const useBoost = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  
  return {
    isActive: context.isActive || context.boostStatus?.isActive || false,
    packages: context.packages || [],
    boostProfile: context.boostProfile,
    cancelBoost: context.cancelBoost,
    loading: context.loading || false,
    error: context.error || null,
    remainingTime: context.remainingTime,
    boostScore: context.boostScore,
    boostStatus: context.boostStatus,
    eligibility: context.eligibility,
    hermesStatus: context.hermesStatus
  };
};

export default useBoost;
