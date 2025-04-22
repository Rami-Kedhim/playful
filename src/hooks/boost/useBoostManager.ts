
import { useState, useCallback } from 'react';
import { BoostStatus, BoostEligibility, BoostPackage, BoostAnalytics } from '@/types/boost';
import { useBoostAdapters } from './useBoostAdapters';

export const useBoostManager = (profileId: string) => {
  const adapters = useBoostAdapters(profileId);
  
  const {
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    loading,
    error,
    purchaseBoost,
    cancelBoost,
    dailyBoostUsage,
    dailyBoostLimit,
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages,
    formatBoostDuration,
    adaptFormatBoostDuration,
    getBoostAnalytics,
    fetchBoostPackages,
    adaptGetBoostPrice
  } = adapters;

  // Apply adapters to convert types
  const boostStatus = adaptBoostStatus(rawBoostStatus);
  const eligibility = adaptBoostEligibility(rawEligibility);
  const boostPackages = adaptBoostPackages(rawPackages);

  return {
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
    adaptFormatBoostDuration,
    getBoostAnalytics,
    fetchBoostPackages,
    adaptGetBoostPrice
  };
};

export default useBoostManager;
