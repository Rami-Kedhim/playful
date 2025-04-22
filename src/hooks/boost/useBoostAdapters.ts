
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';

/**
 * Adapts the BoostStatus from one format to another to ensure compatibility
 */
export const adaptBoostStatus = (boostStatus: any): BoostStatus => {
  return {
    isActive: boostStatus?.isActive || false,
    startTime: boostStatus?.startTime || '',
    endTime: boostStatus?.endTime || '',
    remainingTime: boostStatus?.timeRemaining || boostStatus?.remainingTime || '',
    packageId: boostStatus?.activeBoostId || boostStatus?.packageId || '',
    packageName: boostStatus?.packageName || '',
    progress: boostStatus?.progress !== undefined ? boostStatus.progress : 0,
    expiresAt: boostStatus?.endTime || boostStatus?.expiresAt || '',
    timeRemaining: boostStatus?.timeRemaining || '',
    profileId: boostStatus?.profileId || '',
    boostPackage: boostStatus?.boostPackage || undefined
  };
};

/**
 * Adapts the BoostEligibility from one format to another to ensure compatibility
 */
export const adaptBoostEligibility = (eligibility: any): BoostEligibility => {
  return {
    isEligible: eligibility?.isEligible || eligibility?.eligible || false,
    reason: eligibility?.reason || (eligibility?.reasons?.[0] || ''),
    reasons: eligibility?.reasons || (eligibility?.reason ? [eligibility.reason] : []),
    minimumProfileCompleteness: eligibility?.minimumProfileCompleteness || 0,
    missingFields: eligibility?.missingFields || [],
    minRequiredBalance: eligibility?.minRequiredBalance || 0
  };
};

/**
 * Adapts the BoostPackages array from one format to another to ensure compatibility
 */
export const adaptBoostPackages = (packages: any[]): BoostPackage[] => {
  if (!packages || !Array.isArray(packages)) {
    return [];
  }
  
  return packages.map((pkg) => ({
    id: pkg.id || '',
    name: pkg.name || '',
    duration: pkg.duration || '',
    price_ubx: pkg.price || pkg.price_ubx || 0,
    description: pkg.description || '',
    features: pkg.features || []
  }));
};

/**
 * Adapts duration formatting functions to ensure compatibility
 */
export const adaptFormatBoostDuration = (
  formatFunction: ((hours: number) => string) | ((duration: string) => string)
) => {
  return (duration: string): string => {
    if (typeof duration === 'string') {
      // Convert HH:MM:SS format to hours for original function
      if (duration.includes(':')) {
        const [hours, minutes] = duration.split(':').map(Number);
        return formatFunction(hours + minutes / 60);
      }
      // If it's a string but not in time format, assume it's already formatted
      return duration;
    }
    // If it's a number, call the original formatter
    return formatFunction(duration);
  };
};

/**
 * Adapts price calculation functions to ensure compatibility
 */
export const adaptGetBoostPrice = (priceFunction: any) => {
  return (): number => {
    try {
      if (typeof priceFunction === 'function') {
        return priceFunction();
      }
      return 15; // Default price
    } catch (e) {
      console.error('Error in price calculation:', e);
      return 15; // Default fallback price
    }
  };
};
