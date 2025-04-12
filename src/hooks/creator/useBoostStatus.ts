
import { useState, useEffect } from "react";
import { useBoostStatusBase } from "../boost/useBoostStatusBase";
import { formatBoostDuration } from "@/utils/boostCalculator";

export const useBoostStatus = (creatorId: string | undefined) => {
  const {
    boostStatus,
    loading,
    error,
    fetchBoostStatus,
    formatDuration
  } = useBoostStatusBase(creatorId, {
    mockActiveChance: 0.5, // 50% chance of having an active boost
    boostDuration: "72:00:00" // Creators typically have longer boosts (3 days)
  });

  // Fetch boost status on mount
  useEffect(() => {
    if (creatorId) {
      fetchBoostStatus();
    }
  }, [creatorId, fetchBoostStatus]);

  return {
    boostStatus,
    loading,
    error,
    formatDuration
  };
};
