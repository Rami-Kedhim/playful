
/**
 * Adapter functions to transform between different boost-related data models
 */
import { BoostStatus } from "@/types/boost";

// Adapt from internal status to external status
export function adaptBoostStatus(internalStatus: any): BoostStatus {
  return {
    isActive: internalStatus.isActive || false,
    activeBoostId: internalStatus.activeBoostId || undefined,
    startTime: internalStatus.startTime || undefined,
    endTime: internalStatus.endTime || undefined,
    timeRemaining: internalStatus.timeRemaining || undefined,
    remainingTime: internalStatus.timeRemaining || "0 minutes",
    expiresAt: internalStatus.endTime,
    progress: typeof internalStatus.progress === 'number' ? internalStatus.progress : 0,
    boostPackage: internalStatus.boostPackage || undefined,
    profileId: internalStatus.profileId || undefined
  };
}

// Adapt from internal eligibility to external eligibility
export function adaptBoostEligibility(internalEligibility: any): any {
  return {
    eligible: internalEligibility.isEligible || false,
    reason: internalEligibility.reasons?.[0] || undefined
  };
}

// Adapt from internal packages to external packages
export function adaptBoostPackages(internalPackages: any[]): any[] {
  return internalPackages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description || "",
    duration: typeof pkg.duration === 'number' ? `${pkg.duration}:00:00` : pkg.duration,
    price_ubx: pkg.price,
    features: pkg.features || []
  }));
}

// Fixed adapter for format duration function
export function adaptFormatBoostDuration(formatFn: (duration: any) => string): (duration: string) => string {
  // Create a wrapper function that handles string durations by parsing them
  return (duration: string) => {
    // Handle format like "HH:MM:SS"
    if (duration.includes(':')) {
      const parts = duration.split(':');
      const hours = parseInt(parts[0], 10);
      return formatFn(hours);
    }
    
    // Try to parse as a number
    const durationNum = parseFloat(duration);
    if (!isNaN(durationNum)) {
      return formatFn(durationNum);
    }
    
    // Fallback
    return duration;
  };
}

// Fixed adapter for price function
export function adaptGetBoostPrice(getPriceFn: (boostPackage?: any) => number): () => number {
  // Create a wrapper function that takes no arguments
  return () => {
    return getPriceFn();
  };
}
