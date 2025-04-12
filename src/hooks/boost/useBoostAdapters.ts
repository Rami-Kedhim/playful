
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
 * Adapt format duration adapter function
 * This function now correctly converts between the two different formatter signatures
 */
export function adaptFormatBoostDuration(
  formatter: (hours: number) => string
): (durationString: string) => string {
  // Create a new function that takes a string duration and converts it to hours for the formatter
  return (durationString: string) => {
    // Parse hours from the duration string (format: "HH:MM:SS")
    let hours = 0;
    try {
      const parts = durationString.split(':');
      hours = parseInt(parts[0], 10);
      
      // Add partial hours from minutes if available
      if (parts.length > 1) {
        hours += parseInt(parts[1], 10) / 60;
      }
    } catch (e) {
      console.error("Error parsing duration string:", e);
      hours = 0;
    }
    
    return formatter(hours);
  };
}

/**
 * Adapt getBoostPrice function from one that requires a package parameter
 * to one that doesn't require parameters
 */
export function adaptGetBoostPrice(
  getPrice: (boostPackage: ManagerBoostPackage) => number
): () => number {
  return () => {
    // Return a default value since we don't have a package to pass
    // In a real implementation, this would probably use some context
    // or default package
    return getPrice({
      id: 'default',
      name: 'Default Package',
      description: '',
      duration: 1,
      price: 10,
      features: [],
      boostType: 'standard'
    });
  };
}
