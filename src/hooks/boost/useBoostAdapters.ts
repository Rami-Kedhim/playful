
import { BoostStatus, BoostEligibility, BoostPackage } from "@/types/boost";

/**
 * Adapts the BoostStatus to ensure all required fields have values
 */
export const adaptBoostStatus = (status: any): BoostStatus => {
  return {
    isActive: status?.isActive || false,
    startTime: status?.startTime || undefined,
    endTime: status?.endTime || undefined,
    remainingTime: status?.remainingTime || undefined,
    packageId: status?.packageId || undefined,
    packageName: status?.packageName || undefined,
    progress: status?.progress || 0
  };
};

/**
 * Adapts the BoostEligibility to ensure all required fields have values
 */
export const adaptBoostEligibility = (eligibility: any): BoostEligibility => {
  return {
    isEligible: eligibility?.isEligible || eligibility?.eligible || false,
    reason: eligibility?.reason || eligibility?.ineligibilityReason || undefined
  };
};

/**
 * Adapts the BoostPackages array to ensure all required fields have values
 */
export const adaptBoostPackages = (packages: any[]): BoostPackage[] => {
  if (!packages || !Array.isArray(packages)) return [];
  
  return packages.map(pkg => ({
    id: pkg.id || `pkg-${Math.random().toString(36).substring(2, 9)}`,
    name: pkg.name || "Unnamed Package",
    duration: pkg.duration || "24:00:00",
    price_ubx: pkg.price_ubx || pkg.price || 50,
    description: pkg.description,
    features: pkg.features
  }));
};

/**
 * Adapts the formatBoostDuration function
 */
export const adaptFormatBoostDuration = (formatFn: (duration: string) => string) => {
  return (duration: string): string => {
    try {
      return formatFn(duration);
    } catch (e) {
      // Default formatting if the original function fails
      const [hours, minutes] = duration.split(':');
      if (hours === "24") return "24 hours";
      if (hours === "48") return "2 days";
      if (hours === "72") return "3 days";
      if (hours === "168") return "1 week";
      return `${hours} hours`;
    }
  };
};

/**
 * Adapts the getBoostPrice function
 */
export const adaptGetBoostPrice = (priceFn: () => number) => {
  return (): number => {
    try {
      return priceFn();
    } catch (e) {
      // Default price if the original function fails
      return 50;
    }
  };
};
