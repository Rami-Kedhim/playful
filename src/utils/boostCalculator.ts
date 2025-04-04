
import { BoostParams } from "@/types/boost";

/**
 * Oxum Ethical Boosting Algorithm - Fixed price model
 */
export const calculateBoostPrice = ({
  country,
  completeness,
  rating,
  timeSlot,
  role,
}: BoostParams): number => {
  // Under the Oxum Ethical Boosting model, price is fixed at 15 Lucoins ($1.50)
  return 15; // Fixed price for all boosts
};

/**
 * Determines if a profile is eligible for boosting
 */
export const isEligibleForBoosting = (
  profileCompleteness: number,
  isVerified: boolean,
  profileAge: number, // in days
  lastBoostTime?: Date
): { eligible: boolean; reason?: string } => {
  // Oxum Ethical Boosting Model: Only verified escorts can boost
  if (!isVerified) {
    return { eligible: false, reason: "Only verified escorts can use the boost feature" };
  }

  // Profile must be at least 30% complete
  if (profileCompleteness < 30) {
    return { eligible: false, reason: "Profile must be at least 30% complete" };
  }

  // New profiles need some age
  if (profileAge < 1) {
    return { eligible: false, reason: "Profile must be at least 1 day old" };
  }

  // Check if last boost was recent (if applicable)
  if (lastBoostTime) {
    const hoursSinceLastBoost = (Date.now() - lastBoostTime.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastBoost < 3) { // Oxum model: 3-hour boosting periods
      return { 
        eligible: false, 
        reason: `You can boost again in ${Math.ceil(3 - hoursSinceLastBoost)} hours` 
      };
    }
  }

  return { eligible: true };
};

/**
 * Determines the current time slot based on hour
 */
export const getCurrentTimeSlot = (): 'off_peak' | 'normal' | 'peak' => {
  const hour = new Date().getHours();
  
  // Peak hours: 7-9 AM, 5-8 PM (typical browsing times)
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)) {
    return 'peak';
  }
  
  // Off-peak hours: late night and early morning
  if (hour >= 0 && hour <= 5) {
    return 'off_peak';
  }
  
  // All other times are normal
  return 'normal';
};

/**
 * Calculate remaining time in a readable format
 */
export const calculateRemainingTime = (endTime: Date): string => {
  const now = new Date();
  const diffMs = endTime.getTime() - now.getTime();
  
  if (diffMs <= 0) return "Expired";
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  let timeString = "";
  if (days > 0) timeString += `${days}d `;
  if (hours > 0 || days > 0) timeString += `${hours}h `;
  timeString += `${minutes}m`;
  
  return timeString;
};

/**
 * Format boost duration in a readable format
 */
export const formatBoostDuration = (durationStr: string): string => {
  // Parse the PostgreSQL interval format "168:00:00" (hours:minutes:seconds)
  const parts = durationStr.split(':');
  const hours = parseInt(parts[0]);
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}${remainingHours > 0 ? ` ${remainingHours} hours` : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''}`;
};
