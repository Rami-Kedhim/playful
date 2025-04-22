
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { useBoostManager } from './useBoostManager';

// Add adapter functions
export const adaptBoostStatus = (status: any): BoostStatus => {
  if (!status) return {
    isActive: false,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    remainingTime: '00:00:00',
    progress: 0,
    packageId: '',
    packageName: '',
    profileId: '',
    timeRemaining: '00:00:00'
  };

  return {
    isActive: status?.isActive || false,
    startTime: status?.startTime || new Date().toISOString(),
    endTime: status?.endTime || new Date().toISOString(),
    remainingTime: status?.remainingTime || '00:00:00',
    progress: status?.progress || 0,
    packageId: status?.packageId || '',
    packageName: status?.packageName || '',
    profileId: status?.profileId || '',
    timeRemaining: status?.timeRemaining || '00:00:00',
    // Add other properties as needed
  };
};

export const adaptBoostEligibility = (eligibility: any): BoostEligibility => {
  if (!eligibility) return {
    isEligible: false,
    reason: 'Eligibility status unknown',
  };

  return {
    isEligible: eligibility?.isEligible || false,
    reason: eligibility?.reason || 'Eligibility status unknown',
  };
};

export const adaptBoostPackages = (packages: any[]): BoostPackage[] => {
  if (!packages || !Array.isArray(packages) || packages.length === 0) {
    return [];
  }

  return packages.map(pkg => ({
    id: pkg.id || '',
    name: pkg.name || '',
    description: pkg.description || '',
    duration: pkg.duration || '00:00:00',
    price: pkg.price || 0,
    price_ubx: pkg.price_ubx || pkg.price || 0,
    boost_power: pkg.boost_power || 1,
    visibility_increase: pkg.visibility_increase || 0,
    features: pkg.features || [],
    image_url: pkg.image_url || '',
    is_featured: pkg.is_featured || false,
    badge_color: pkg.badge_color || '',
    icon: pkg.icon || '',
  }));
};

export const adaptGetBoostPrice = (getPrice: any) => {
  return () => {
    if (typeof getPrice === 'function') {
      return getPrice();
    }
    return 15; // Default price
  };
};

export const adaptFormatBoostDuration = (formatter: (duration: string) => string) => {
  return (duration: string): string => {
    return formatter(duration);
  };
};

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
    dailyBoostLimit,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostAnalytics,
  } = useBoostManager(userId);

  // Get boost price for the selected package
  const getBoostPrice = useCallback((): number => {
    const selectedPackage = rawPackages && rawPackages.length > 0 ? rawPackages[0] : null;
    return selectedPackage ? (selectedPackage.price_ubx || selectedPackage.price || 0) : 0;
  }, [rawPackages]);

  // Purchase boost with additional validation
  const purchaseBoost = useCallback(async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      // Adapt the boost package to the format expected by rawPurchaseBoost
      const adaptedPackage = {
        id: boostPackage.id,
        name: boostPackage.name,
        price: boostPackage.price,
        price_ubx: boostPackage.price_ubx,
        // Add other properties needed by rawPurchaseBoost
      };
      return await rawPurchaseBoost(adaptedPackage);
    } catch (err) {
      console.error("Error in purchaseBoost adapter:", err);
      return false;
    }
  }, [rawPurchaseBoost]);

  // Format boost duration for display
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
    formatBoostDuration,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostAnalytics,
    // Export the adapter functions
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages,
    adaptGetBoostPrice
  };
};
