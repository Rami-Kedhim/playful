
import { BoostPackage } from "@/types/boost";

/**
 * Calculate the price for a boost based on various parameters
 * @param duration Duration in hours
 * @param basePrice Base price in Lucoins
 * @param profileScore Profile quality score
 * @param timeSlotMultiplier Multiplier for peak hours
 * @returns Calculated price
 */
export const calculateBoostPrice = (
  duration: number,
  basePrice: number,
  profileScore: number = 100,
  timeSlotMultiplier: number = 1
): number => {
  const profileMultiplier = profileScore / 100;
  return Math.round(duration * basePrice * timeSlotMultiplier * profileMultiplier);
};

/**
 * Format a boost duration string into a human-readable format
 * @param durationString Duration in "HH:MM:SS" format
 * @returns Human-readable duration string
 */
export const formatBoostDuration = (durationString: string): string => {
  const [hours, minutes] = durationString.split(":").map(Number);
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours > 0) {
      return `${days} day${days !== 1 ? 's' : ''}, ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
    }
    return `${days} day${days !== 1 ? 's' : ''}`;
  }
  
  if (hours > 0) {
    if (minutes > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

/**
 * Calculate remaining time in a human-readable format
 * @param expiryDate The date/time when the boost expires
 * @returns Human-readable remaining time
 */
export const calculateRemainingTime = (expiryDate: Date): string => {
  const now = new Date();
  if (expiryDate <= now) return "Expired";
  
  const diffMs = expiryDate.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs > 24) {
    const days = Math.floor(diffHrs / 24);
    const hours = diffHrs % 24;
    return `${days}d ${hours}h remaining`;
  }
  
  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m remaining`;
  }
  
  return `${diffMins}m remaining`;
};

/**
 * Check if a profile is eligible for boosting
 * @param profileCompleteness Profile completeness score
 * @param isVerified Whether the profile is verified
 * @param profileAgeDays Age of the profile in days
 * @param lastBoost Date of the last boost
 * @returns Object with eligibility status and reason
 */
export const isEligibleForBoosting = (
  profileCompleteness: number,
  isVerified: boolean,
  profileAgeDays: number,
  lastBoost: Date
): { eligible: boolean; reason?: string } => {
  if (!isVerified) {
    return {
      eligible: false,
      reason: "Profile must be verified to use boost"
    };
  }
  
  if (profileCompleteness < 60) {
    return {
      eligible: false,
      reason: "Profile must be at least 60% complete"
    };
  }
  
  if (profileAgeDays < 3) {
    return {
      eligible: false,
      reason: "Profile must be at least 3 days old"
    };
  }
  
  // Check if last boost was less than 12 hours ago
  const hoursSinceLastBoost = (new Date().getTime() - lastBoost.getTime()) / (1000 * 60 * 60);
  if (hoursSinceLastBoost < 12) {
    return {
      eligible: false,
      reason: `You can boost again in ${Math.ceil(12 - hoursSinceLastBoost)} hours`
    };
  }
  
  return { eligible: true };
};

/**
 * Get the current time slot for boost pricing
 * @returns Object with time slot info
 */
export const getCurrentTimeSlot = (): { name: string; multiplier: number } => {
  const hour = new Date().getHours();
  
  if (hour >= 20 || hour < 2) {
    return { name: "Peak Hours", multiplier: 1.5 };
  }
  
  if ((hour >= 16 && hour < 20) || (hour >= 10 && hour < 14)) {
    return { name: "High Demand", multiplier: 1.25 };
  }
  
  return { name: "Standard", multiplier: 1.0 };
};
