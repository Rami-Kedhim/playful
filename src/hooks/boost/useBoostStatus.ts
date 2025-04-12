
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { BoostPackage } from "@/types/boost";
import { useBoostStatusBase } from "./useBoostStatusBase";
import { 
  isEligibleForBoosting, 
  getCurrentTimeSlot
} from "@/utils/boostCalculator";

export const useBoostStatus = (profileId?: string) => {
  const {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    fetchBoostStatus,
    checkEligibility,
    cancelBoost,
    formatDuration
  } = useBoostStatusBase(profileId, { 
    mockActiveChance: 0.3, // 30% chance of having an active boost
    dailyBoostLimit: 4 // Oxum model: 4 boosts max per day (12 hours)
  });

  // Additional client-specific boost functionality
  const checkActiveBoost = useCallback(async (id: string) => {
    if (!id) return;
    await fetchBoostStatus();
  }, [fetchBoostStatus]);

  const getBoostPrice = useCallback(() => {
    return 15; // Default price in UBX tokens
  }, []);

  return {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    fetchProfileData: checkEligibility,
    checkActiveBoost,
    getBoostPrice,
    cancelBoost
  };
};
