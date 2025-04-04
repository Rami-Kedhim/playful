
import { useState, useEffect } from "react";
import { useBoostStatus } from "./useBoostStatus";
import { useBoostPackages } from "./useBoostPackages";
import { useBoostPurchase } from "./useBoostPurchase";
import { useBoostAnalytics } from "./useBoostAnalytics";
import { BoostPackage } from "@/types/boost";
import { formatBoostDuration } from "@/utils/boostCalculator";

export const useBoostManager = (profileId?: string) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { 
    boostStatus, 
    eligibility, 
    checkActiveBoost,
    fetchProfileData,
    cancelBoost,
    getBoostPrice
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
    fetchAnalytics 
  } = useBoostAnalytics(profileId);

  // Get profile boost info when profileId changes
  useEffect(() => {
    if (profileId) {
      fetchProfileData(profileId);
      checkActiveBoost(profileId);
    }
  }, [profileId, fetchProfileData, checkActiveBoost]);

  // Combine loading states
  const loading = packagesLoading || purchaseLoading;

  // Function to get analytics data
  const getBoostAnalytics = async () => {
    return await fetchAnalytics();
  };

  return {
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
    error,
    getBoostAnalytics,
    formatBoostDuration
  };
};

export default useBoostManager;
