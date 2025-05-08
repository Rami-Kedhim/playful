
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';

export const useBoostContext = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return {
    ...context,
    boostStatus: context.boostStatus || { isActive: false, remainingTime: '' },
    eligibility: context.eligibility || { isEligible: false },
    packages: context.packages || [],
    loading: context.loading || false,
    error: context.error || null,
    getBoostAnalytics: context.getBoostAnalytics || (async () => ({}))
  };
};

export default useBoostContext;
