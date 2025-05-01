
import { useState } from "react";
import { useBoostContext } from "@/hooks/boost/useBoostContext";
import { BoostPackage } from "@/types/boost";

export const useBoostDialog = (onSuccess?: () => void) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('packages');
  
  const context = useBoostContext();
  
  const {
    boostStatus,
    hermesStatus,
    eligibility,
    packages,
    loading,
    error,
    boostPackages = packages,
    dailyBoostUsage = 0,
    dailyBoostLimit = 3,
    boostProfile,
    cancelBoost,
    formatBoostDuration = (d) => d,
    adaptGetBoostPrice = () => 0
  } = context;
  
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
  };
  
  const handleBoost = async (): Promise<boolean> => {
    if (!selectedPackage) return false;
    
    try {
      const result = await boostProfile(selectedPackage, selectedPackage);
      if (result) {
        handleCloseDialog();
        if (onSuccess) onSuccess();
      }
      return result;
    } catch (error) {
      console.error('Boost error:', error);
      return false;
    }
  };
  
  const handleCancel = async (): Promise<boolean> => {
    try {
      const result = await cancelBoost();
      if (result && onSuccess) onSuccess();
      return result;
    } catch (error) {
      console.error('Cancel error:', error);
      return false;
    }
  };
  
  const getBoostPrice = () => {
    if (!selectedPackage) return 0;
    
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    return pkg?.price_ubx || pkg?.price || 0;
  };

  return {
    showDialog,
    isLoading: loading,
    boostStatus,
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess: onSuccess,
    toggleDialog,
    hermesStatus,
    eligibility,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    handleBoost,
    handleCancel,
    dailyBoostUsage,
    dailyBoostLimit,
    activeTab,
    setActiveTab,
    getBoostPrice,
    formatBoostDuration
  };
};

export default useBoostDialog;
