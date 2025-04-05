
import { BoostParams } from "@/types/boost";

export const calculateRemainingTime = (endDate: Date): string => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) return "Expired";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

export const formatBoostDuration = (durationStr: string): string => {
  const [hours, minutes] = durationStr.split(':');
  if (parseInt(hours) > 0) {
    return `${parseInt(hours)} hour${parseInt(hours) > 1 ? 's' : ''}`;
  }
  return `${parseInt(minutes)} minutes`;
};

export const isEligibleForBoosting = (
  profileCompleteness: number,
  isVerified: boolean,
  profileAgeInDays: number,
  lastBoostDate?: Date
): { eligible: boolean; reason?: string } => {
  // Check profile completeness
  if (profileCompleteness < 60) {
    return { 
      eligible: false, 
      reason: "Your profile must be at least 60% complete to boost" 
    };
  }
  
  // Check verification status
  if (!isVerified) {
    return { 
      eligible: false, 
      reason: "Only verified profiles can use boost features" 
    };
  }
  
  // Check profile age
  if (profileAgeInDays < 3) {
    return { 
      eligible: false, 
      reason: "Your profile must be at least 3 days old to boost" 
    };
  }
  
  // Check if boost cooldown has passed
  if (lastBoostDate) {
    const hoursSinceLastBoost = (Date.now() - lastBoostDate.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastBoost < 6) {
      return { 
        eligible: false, 
        reason: `You must wait ${Math.ceil(6 - hoursSinceLastBoost)} more hours before boosting again` 
      };
    }
  }
  
  return { eligible: true };
};

export const getCurrentTimeSlot = (): 'off_peak' | 'normal' | 'peak' => {
  const hour = new Date().getHours();
  
  // Peak hours: 8pm-11pm (20-23)
  if (hour >= 20 && hour < 23) {
    return 'peak';
  }
  
  // Off-peak hours: 2am-8am (2-8)
  if (hour >= 2 && hour < 8) {
    return 'off_peak';
  }
  
  // Normal hours: all other times
  return 'normal';
};

export const calculateBoostPrice = (params: BoostParams): number => {
  let basePrice = 15; // Standard price in Lucoins
  
  // Apply country modifier (different markets have different pricing)
  if (['USA', 'Canada', 'Australia', 'UK'].includes(params.country)) {
    basePrice *= 1.2; // 20% premium for high-value markets
  } else if (['Germany', 'France', 'Italy', 'Spain'].includes(params.country)) {
    basePrice *= 1.1; // 10% premium for medium-value markets
  }
  
  // Apply profile quality modifier
  const qualityFactor = (params.completeness / 100) * 0.8 + (params.rating / 5) * 0.2;
  basePrice = basePrice * (1 - (qualityFactor * 0.2)); // Up to 20% discount for quality profiles
  
  // Apply time slot modifier
  if (params.timeSlot === 'peak') {
    basePrice *= 1.5; // 50% premium during peak hours
  } else if (params.timeSlot === 'off_peak') {
    basePrice *= 0.7; // 30% discount during off-peak hours
  }
  
  // Apply role-based discounts
  if (params.role === 'verified') {
    basePrice *= 0.9; // 10% discount for verified users
  } else if (params.role === 'AI') {
    basePrice *= 1.2; // 20% premium for AI profiles
  }
  
  // Round to nearest whole number
  return Math.max(5, Math.round(basePrice));
};
