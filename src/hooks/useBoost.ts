
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';

export const useBoost = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  
  const {
    boostStatus,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error
  } = context;
  
  return {
    isActive: boostStatus?.isActive || false,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error
  };
};

export default useBoost;
