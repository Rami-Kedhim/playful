
/**
 * Adapters for converting between different boost-related interfaces
 */
import { BoostStatus as TypesBoostStatus, BoostPackage as TypesBoostPackage } from "@/types/boost";
import { BoostStatus as ManagerBoostStatus, BoostPackage as ManagerBoostPackage, BoostEligibility } from "./useBoostManager";

/**
 * Adapt BoostStatus from useBoostManager to the format expected by components
 */
export function adaptBoostStatus(status: ManagerBoostStatus): TypesBoostStatus {
  return {
    isActive: status.isActive,
    progress: status.isActive ? 
      calculateProgressFromDates(status.startTime, status.endTime) : 0,
    remainingTime: status.timeRemaining || '',
    expiresAt: status.endTime,
    boostPackage: status.isActive && status.activeBoostId ? 
      adaptBoostPackageToTypes({
        id: status.activeBoostId,
        name: 'Active Boost',
        description: '',
        duration: 0, // Will be overridden below
        price: 0,
        features: [],
        boostType: 'standard'
      }) : undefined
  };
}

/**
 * Calculate progress percentage based on start and end dates
 */
function calculateProgressFromDates(
  startTime?: Date, 
  endTime?: Date
): number {
  if (!startTime || !endTime) return 0;
  
  const now = new Date();
  const total = endTime.getTime() - startTime.getTime();
  const elapsed = now.getTime() - startTime.getTime();
  
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

/**
 * Adapt BoostEligibility to the format expected by components
 */
export function adaptBoostEligibility(
  eligibility: BoostEligibility
): { eligible: boolean; reason?: string } {
  return {
    eligible: eligibility.isEligible,
    reason: eligibility.reasons?.join('. ')
  };
}

/**
 * Adapt BoostPackage from useBoostManager to the format expected by components
 */
export function adaptBoostPackages(packages: ManagerBoostPackage[]): TypesBoostPackage[] {
  return packages.map(adaptBoostPackageToTypes);
}

/**
 * Adapt a single BoostPackage from useBoostManager to the format expected by components
 */
function adaptBoostPackageToTypes(pkg: ManagerBoostPackage): TypesBoostPackage {
  return {
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    duration: typeof pkg.duration === 'number' ? `${pkg.duration}:00:00` : pkg.duration,
    price_ubx: pkg.price,
    features: pkg.features
  };
}

/**
 * Fix format duration adapter function to match the expected signature
 * This adapter converts from string-based duration formatter to number-based
 */
export function adaptFormatBoostDuration(
  formatter: (durationString: string) => string
): (hours: number) => string {
  return (hours: number) => {
    // Convert hours to "HH:00:00" format
    const hoursStr = `${Math.floor(hours)}:00:00`;
    return formatter(hoursStr);
  };
}

/**
 * Adapt getBoostPrice function
 */
export function adaptGetBoostPrice(
  getPrice: () => number
): () => number {
  return getPrice;
}
