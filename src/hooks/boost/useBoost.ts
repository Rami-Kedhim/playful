
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';

export const useBoost = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  
  return {
    isActive: context.boostStatus?.isActive || false,
    boostStatus: context.boostStatus,
    eligibility: context.eligibility,
    packages: context.packages,
    boostProfile: context.boostProfile,
    cancelBoost: context.cancelBoost,
    loading: context.loading,
    error: context.error,
    refreshBoostStatus: context.refreshBoostStatus,
    dailyBoostUsage: context.dailyBoostUsage,
    dailyBoostLimit: context.dailyBoostLimit,
    formatBoostDuration: context.formatBoostDuration
  };
};

export default useBoost;
