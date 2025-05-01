
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
