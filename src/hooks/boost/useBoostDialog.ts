
import { useState } from 'react';
import { useBoostManager } from './useBoostManager';
import { BoostPackage } from '@/types/boost';

export const useBoostDialog = (profileId: string) => {
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const {
    loading,
    error,
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost,
    formatBoostDuration,
    adaptGetBoostPrice
  } = useBoostManager(profileId);

  const hermesStatus = {
    position: 3,
    activeUsers: 120,
    estimatedVisibility: boostStatus?.isActive ? 75 : 25,
    lastUpdateTime: new Date().toISOString(),
    boostScore: boostStatus?.isActive ? 8.5 : 0,
    effectivenessScore: boostStatus?.isActive ? 7.2 : 0
  };

  const getBoostPrice = adaptGetBoostPrice((pkg: BoostPackage) => {
    return pkg.price_ubx || pkg.price || 0;
  });

  const handleBoost = async () => {
    if (!selectedPackage) return;
    
    const packageToBoost = boostPackages.find(pkg => pkg.id === selectedPackage);
    if (!packageToBoost) return;
    
    return await purchaseBoost(packageToBoost);
  };

  return {
    activeTab,
    setActiveTab,
    selectedPackage,
    setSelectedPackage,
    loading,
    error,
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    hermesStatus,
    handleBoost,
    cancelBoost,
    formatBoostDuration,
    getBoostPrice
  };
};

export default useBoostDialog;
