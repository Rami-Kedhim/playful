
import { useState } from "react";
import { AnalyticsData } from "./useBoostAnalytics";
import { useBoostContext } from "@/contexts/BoostContext";
import { useBoostManager } from "./useBoostManager";

export const useBoostDialog = (
  profileId: string,
  onSuccess?: () => void,
  onClose?: () => void
) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<AnalyticsData | null>(null);
  const { boostStatus: contextBoostStatus } = useBoostContext();
  
  const { 
    boostStatus,
    eligibility,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    purchaseBoost,
    cancelBoost,
    loading,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(profileId);

  const openDialog = () => setOpen(true);
  const closeDialog = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  const toggleDialog = () => setOpen(prev => !prev);

  const fetchAnalytics = async () => {
    const analytics = await getBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
    }
    return analytics;
  };

  const handlePurchase = async (packageId: string) => {
    const packageToBoost = boostPackages.find(p => p.id === packageId);
    
    if (!packageToBoost) {
      return false;
    }
    
    const success = await purchaseBoost(packageToBoost);
    
    if (success) {
      setActiveTab("active");
      if (onSuccess) onSuccess();
    }
    
    return success;
  };

  const handleCancel = async () => {
    const success = await cancelBoost();
    
    if (success && onSuccess) {
      onSuccess();
    }
    
    return success;
  };

  const handlePackageSelect = (packageId: string) => {
    const pkg = boostPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
    }
  };

  return {
    open,
    setOpen,
    openDialog,
    closeDialog,
    toggleDialog,
    activeTab,
    setActiveTab,
    boostStatus,
    eligibility,
    boostPackages,
    selectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    handlePurchase,
    handleCancel,
    handlePackageSelect,
    loading,
    boostAnalytics,
    fetchAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  };
};
