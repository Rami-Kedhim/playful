
import { useState, useCallback } from 'react';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { useBoostManager, BoostPackage as BoostManagerPackage } from './useBoostManager';

export const useBoostAdapters = (profileId: string) => {
  const {
    loading,
    error,
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost: rawPurchaseBoost,
    cancelBoost: rawCancelBoost
  } = useBoostManager(profileId);

  // Adapter for boost status
  const adaptBoostStatus = useCallback((status: any): BoostStatus => {
    if (!status) {
      return {
        isActive: false,
        startTime: '',
        endTime: '',
        remainingTime: ''
      };
    }

    return {
      isActive: status.isActive || false,
      startTime: status.startTime || '',
      endTime: status.endTime || '',
      remainingTime: status.remainingTime || '',
      progress: status.progress,
      packageId: status.packageId,
      packageName: status.packageName,
      profileId: status.profileId,
      timeRemaining: status.timeRemaining,
      activeBoostId: status.activeBoostId,
      expiresAt: status.expiresAt,
      boostPackage: status.boostPackage ? adaptBoostPackage(status.boostPackage) : undefined,
      pulseData: status.pulseData
    };
  }, []);

  // Adapter for boost eligibility
  const adaptBoostEligibility = useCallback((eligibility: any): BoostEligibility => {
    return {
      isEligible: eligibility.isEligible || false,
      reason: eligibility.reason || 'Unknown'
    };
  }, []);

  // Adapter for a single boost package
  const adaptBoostPackage = useCallback((pkg: any): BoostPackage => {
    return {
      id: pkg.id || '',
      name: pkg.name || '',
      description: pkg.description || '',
      duration: pkg.duration || '',
      price: pkg.price || 0,
      price_ubx: pkg.price_ubx || 0,
      boost_power: pkg.boost_power || 0,
      visibility_increase: pkg.visibility_increase || 0,
      features: pkg.features || [],
      image_url: pkg.image_url,
      is_featured: pkg.is_featured,
      badge_color: pkg.badge_color,
      icon: pkg.icon
    };
  }, []);

  // Adapter for boost packages
  const adaptBoostPackages = useCallback((packages: any[]): BoostPackage[] => {
    if (!packages || !Array.isArray(packages)) {
      return [];
    }
    
    return packages.map(pkg => adaptBoostPackage(pkg));
  }, [adaptBoostPackage]);

  // Function to adapt formatBoostDuration
  const adaptFormatBoostDuration = useCallback((formatter: (duration: string) => string) => {
    return (duration: string) => {
      return formatter(duration);
    };
  }, []);

  // Adapter for purchase boost function
  const purchaseBoost = useCallback(async (pkg: BoostPackage): Promise<boolean> => {
    try {
      // Create a package object compatible with the raw useBoostManager
      const managerPackage: BoostManagerPackage = {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price || 0,
        description: pkg.description || '',
        duration: pkg.duration || '',
        features: pkg.features || []
      };
      
      return await rawPurchaseBoost(managerPackage);
    } catch (error) {
      console.error('Error purchasing boost:', error);
      return false;
    }
  }, [rawPurchaseBoost]);

  // Format duration (common util)
  const formatBoostDuration = useCallback((duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours >= 24 ? 
      `${Math.floor(hours / 24)} days` : 
      `${hours} hours`;
  }, []);

  return {
    loading,
    error,
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost: rawCancelBoost,
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages,
    adaptFormatBoostDuration,
    formatBoostDuration
  };
};
