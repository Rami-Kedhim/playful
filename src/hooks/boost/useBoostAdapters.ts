
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
 * Adapt BoostPackage from useBoostManager to the format expected by types/boost.ts
 */
export function adaptBoostPackageToTypes(
  pkg: ManagerBoostPackage
): TypesBoostPackage {
  return {
    id: pkg.id,
    name: pkg.name,
    duration: formatHoursToDuration(pkg.duration),
    price_ubx: pkg.price,
    description: pkg.description,
    features: pkg.features
  };
}

/**
 * Adapt BoostPackage array from useBoostManager to the format expected by types/boost.ts
 */
export function adaptBoostPackages(
  packages: ManagerBoostPackage[]
): TypesBoostPackage[] {
  return packages.map(adaptBoostPackageToTypes);
}

/**
 * Format hours to duration string (HH:MM:SS)
 */
function formatHoursToDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;
}

/**
 * Adapter for formatBoostDuration function
 */
export function adaptFormatBoostDuration(
  originalFormatFn: (hours: number) => string
): (duration: string) => string {
  return (duration: string) => {
    // Parse HH:MM:SS to hours
    const [hours, minutes] = duration.split(':').map(Number);
    const totalHours = hours + (minutes / 60);
    return originalFormatFn(totalHours);
  };
}

/**
 * Adapter for getBoostPrice function
 */
export function adaptGetBoostPrice(
  priceFn: (pkg: ManagerBoostPackage) => number
): () => number {
  return () => {
    // Return a default price since we can't get the selected package here
    return 15;
  };
}

/**
 * Convert TypesBoostPackage to ManagerBoostPackage
 */
export function adaptBoostPackageToManager(
  pkg: TypesBoostPackage
): ManagerBoostPackage {
  // Parse duration string to hours
  const [hours, minutes] = pkg.duration.split(':').map(Number);
  const durationHours = hours + (minutes / 60);
  
  return {
    id: pkg.id,
    name: pkg.name,
    description: pkg.description || '',
    duration: durationHours,
    price: pkg.price_ubx,
    features: pkg.features || [],
    boostType: 'standard'
  };
}
