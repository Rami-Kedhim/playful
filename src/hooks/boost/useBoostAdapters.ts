
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { useBoostManager } from './useBoostManager';

export const useBoostAdapters = (userId: string) => {
  const { 
    boostStatus: rawBoostStatus, 
    eligibility: rawEligibility, 
    boostPackages: rawPackages,
    loading,
    error,
    purchaseBoost: rawPurchaseBoost,
    cancelBoost,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(userId);

  // Get boost price for the selected package
  const getBoostPrice = useCallback((packageId: string): number => {
    const selectedPackage = rawPackages.find(pkg => pkg.id === packageId);
    return selectedPackage ? selectedPackage.price_ubx : 0;
  }, [rawPackages]);

  // Purchase boost with additional validation
  const purchaseBoost = useCallback(async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      return await rawPurchaseBoost(boostPackage);
    } catch (err) {
      console.error("Error in purchaseBoost adapter:", err);
      return false;
    }
  }, [rawPurchaseBoost]);

  // Format boost duration for display
  const adaptFormatBoostDuration = (formatter: (duration: string) => string) => {
    return (duration: string): string => {
      return formatter(duration);
    };
  };

  // For default formatting if no custom formatter provided
  const formatBoostDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  return {
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    loading,
    error,
    purchaseBoost,
    cancelBoost,
    getBoostPrice,
    adaptFormatBoostDuration,
    formatBoostDuration
  };
};
