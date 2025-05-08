
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';
import { BoostStatus, BoostEligibility, HermesStatus, BoostPackage } from '@/types/boost';

export const useBoost = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  
  // Create default values for required properties
  const boostStatus: BoostStatus = context.boostStatus || { 
    isActive: false, 
    remainingTime: '' 
  };
  
  const eligibility: BoostEligibility = context.eligibility || { 
    isEligible: false,
    reasons: []
  };
  
  const hermesStatus: HermesStatus = context.hermesStatus || {
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: '',
    boostScore: 0,
    effectivenessScore: 0
  };
  
  return {
    isActive: boostStatus.isActive || false,
    packages: context.packages || [],
    boostProfile: context.boostProfile || (async () => false),
    cancelBoost: context.cancelBoost || (async () => false),
    loading: context.loading || false,
    error: context.error || null,
    boostStatus,
    hermesStatus,
    eligibility,
    remainingTime: boostStatus.remainingTime || '',
    getBoostAnalytics: context.getBoostAnalytics || (async () => ({}))
  };
};

export default useBoost;
