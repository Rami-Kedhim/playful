
import { BoostParams } from "@/types/boost";

/**
 * Oxum Algorithm - Calculates boost price based on various parameters
 */
export const calculateBoostPrice = ({
  country,
  completeness,
  rating,
  timeSlot,
  role,
}: BoostParams): number => {
  let basePrice = 50; // Base price in Lucoins

  // Country-based price adjustment
  if (["US", "Germany", "UK", "Australia", "Canada"].includes(country)) {
    basePrice += 20;
  } else if (["Japan", "France", "Italy", "Spain", "Netherlands"].includes(country)) {
    basePrice += 15;
  }

  // Profile completeness affects price - incomplete profiles pay more
  if (completeness < 40) {
    basePrice += 50;
  } else if (completeness < 60) {
    basePrice += 30;
  } else if (completeness < 80) {
    basePrice += 15;
  } else if (completeness > 95) {
    basePrice -= 10; // Bonus for very complete profiles
  }

  // Rating-based adjustment
  if (rating > 4.8) basePrice -= 15;
  else if (rating > 4.5) basePrice -= 10;
  else if (rating > 4.0) basePrice -= 5;
  else if (rating < 3.0) basePrice += 15;

  // Time slot - peak hours cost more
  if (timeSlot === "peak") basePrice += 25;
  else if (timeSlot === "normal") basePrice += 10;

  // Role-based adjustment
  if (role === "AI") basePrice += 10;
  else if (role === "verified") basePrice -= 5;

  // Ensure minimum price of 30
  return Math.max(30, basePrice);
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
  // Profile must be at least 30% complete
  if (profileCompleteness < 30) {
    return { eligible: false, reason: "Profile must be at least 30% complete" };
  }

  // Unverified profiles need more completeness
  if (!isVerified && profileCompleteness < 50) {
    return { eligible: false, reason: "Unverified profiles need at least 50% completeness" };
  }

  // New profiles need some age
  if (profileAge < 3) {
    return { eligible: false, reason: "Profile must be at least 3 days old" };
  }

  // Check if last boost was recent (if applicable)
  if (lastBoostTime) {
    const hoursSinceLastBoost = (Date.now() - lastBoostTime.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastBoost < 24) {
      return { 
        eligible: false, 
        reason: `You can boost again in ${Math.ceil(24 - hoursSinceLastBoost)} hours` 
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
