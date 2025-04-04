
import { useState, useCallback } from "react";
import { useBoostStatus } from "./useBoostStatus";
import { useBoostPackages } from "./useBoostPackages";
import { useBoostPurchase } from "./useBoostPurchase";
import { useBoostAnalytics } from "./useBoostAnalytics";
import { BoostPackage } from "@/types/boost";

/**
 * Main hook that composes all boost-related functionality
 * This maintains backward compatibility while using the new modular structure
 */
const useBoostManager = (profileId?: string) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Combine the individual hooks
  const {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading: statusLoading,
    fetchProfileData,
    checkActiveBoost,
    getBoostPrice,
    cancelBoost,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostStatus(profileId);
  
  const {
    boostPackages,
    loading: packagesLoading,
    fetchBoostPackages
  } = useBoostPackages(selectedPackage, setSelectedPackage);
  
  const {
    purchaseBoost,
    loading: purchaseLoading
  } = useBoostPurchase(profileId, boostStatus);
  
  const {
    analytics,
    loading: analyticsLoading,
    fetchAnalytics
  } = useBoostAnalytics(profileId);
  
  const loading = statusLoading || packagesLoading || purchaseLoading || analyticsLoading;
  
  // Initialize the boost data
  const initializeBoostData = useCallback(async () => {
    try {
      if (profileId) {
        await Promise.all([
          fetchProfileData(profileId),
          checkActiveBoost(profileId),
          fetchBoostPackages()
        ]);
      }
    } catch (err: any) {
      console.error("Error initializing boost data:", err);
      setError(err.message || "Failed to initialize boost data");
    }
  }, [profileId, fetchProfileData, checkActiveBoost, fetchBoostPackages]);
  
  // Get boost analytics
  const getBoostAnalytics = useCallback(async () => {
    try {
      const data = await fetchAnalytics();
      return data;
    } catch (err: any) {
      console.error("Error fetching boost analytics:", err);
      setError(err.message || "Failed to fetch boost analytics");
      return null;
    }
  }, [fetchAnalytics]);
  
  return {
    boostStatus,
    eligibility,
    profileData,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    purchaseBoost,
    cancelBoost,
    getBoostPrice,
    getBoostAnalytics,
    analytics,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    fetchBoostPackages,
    initializeBoostData
  };
};

export default useBoostManager;
