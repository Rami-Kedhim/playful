
import { useState } from 'react';
import { useBoostContext } from './useBoostContext';
import { BoostStatus } from '@/types/boost';

export const useBoostDialog = (profileId?: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const {
    boostStatus,
    eligibility,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error,
    dailyBoostUsage = 0,
    dailyBoostLimit = 3,
    formatBoostDuration,
    hermesStatus
  } = useBoostContext();
  
  const openDialog = () => {
    setIsOpen(true);
    // Reset to packages tab when opening
    setActiveTab('packages');
    // Set first package as selected by default if available
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  };
  
  const closeDialog = () => {
    setIsOpen(false);
  };
  
  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
  };
  
  const handleBoost = async (): Promise<boolean> => {
    if (!profileId || !selectedPackage) return false;
    
    const success = await boostProfile(profileId, selectedPackage);
    
    if (success) {
      closeDialog();
    }
    
    return success;
  };
  
  const handleCancelBoost = async (): Promise<boolean> => {
    const success = await cancelBoost();
    
    if (success) {
      closeDialog();
    }
    
    return success;
  };
  
  const getBoostPrice = (): number => {
    const selected = packages.find(p => p.id === selectedPackage);
    return selected?.price_ubx || 0;
  };
  
  return {
    isOpen,
    setIsOpen,
    openDialog,
    closeDialog,
    activeTab,
    setActiveTab,
    selectedPackage,
    setSelectedPackage: handleSelectPackage,
    handleBoost,
    handleCancelBoost,
    boostStatus,
    eligibility,
    packages,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    getBoostPrice,
    hermesStatus,
    formatBoostDuration
  };
};

export default useBoostDialog;
