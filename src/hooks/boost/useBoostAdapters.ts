
/**
 * Adapters to help transition between different boost systems
 */

import { formatDurationString } from '@/utils/formatters';

/**
 * Adapter to convert boost status from legacy format to PULSE format
 */
export const adaptBoostStatus = (status: any) => {
  if (!status) {
    return { isActive: false, progress: 0 };
  }

  return {
    ...status,
    progress: status.progress || 0,
  };
};

/**
 * Adapter to convert boost eligibility from legacy format to PULSE format
 */
export const adaptBoostEligibility = (eligibility: any) => {
  if (!eligibility) {
    return { eligible: true };
  }

  return {
    eligible: eligibility.isEligible || true,
    reason: eligibility.reasons?.join(', '),
  };
};

/**
 * Adapter to convert boost packages from legacy format to PULSE format
 */
export const adaptBoostPackages = (packages: any[]) => {
  if (!packages || !packages.length) {
    return [];
  }

  return packages.map((pkg) => ({
    ...pkg,
    price_ubx: pkg.price || pkg.price_ubx || 0,
  }));
};

/**
 * Adapter to format boost duration
 */
export const adaptFormatBoostDuration = (formatter: (durationStr: string) => string) => {
  return (hours: number) => {
    // Convert hours to "HH:MM:SS" format
    const hoursInt = Math.floor(hours);
    const minutesInt = Math.floor((hours - hoursInt) * 60);
    const durationStr = `${hoursInt.toString().padStart(2, '0')}:${minutesInt.toString().padStart(2, '0')}:00`;
    
    return formatter(durationStr);
  };
};

/**
 * Adapter to get boost price
 */
export const adaptGetBoostPrice = (getPrice: () => number) => {
  return (packageId?: string) => {
    return getPrice();
  };
};
