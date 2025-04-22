
import { useContext } from 'react';
import { BoostContext, BoostContextType } from '@/contexts/BoostContext';

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
    error,
    eligibility,
    dailyBoostUsage,
    dailyBoostLimit,
    formatBoostDuration,
    refreshBoostStatus
  } = context;
  
  return {
    isActive: boostStatus?.isActive || false,
    boostStatus,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error,
    eligibility,
    dailyBoostUsage,
    dailyBoostLimit,
    formatBoostDuration,
    refreshBoostStatus
  };
};

export default useBoost;
