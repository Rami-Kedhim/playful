
// Date formatting and manipulation utilities

/**
 * Safely parses a date string to Date object
 */
export const safelyParseDate = (dateString?: string): Date => {
  if (!dateString) return new Date();
  
  try {
    return new Date(dateString);
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date();
  }
};

/**
 * Calculates the expiry date for a content item
 */
export const calculateExpiryDate = (startDate: Date, durationDays: number): Date => {
  const expiryDate = new Date(startDate);
  expiryDate.setDate(expiryDate.getDate() + durationDays);
  return expiryDate;
};

/**
 * Calculates remaining days for a content subscription
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

/**
 * Determines the status of content based on expiry
 */
export const determineContentStatus = (expiryDate: Date): 'active' | 'expiring' | 'expired' => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining <= 7) {
    return 'expiring';
  } else {
    return 'active';
  }
};

/**
 * Calculate renewal cost with potential discount
 */
export const calculateRenewalCost = (baseCost: number, isEarlyRenewal: boolean): number => {
  if (isEarlyRenewal) {
    return baseCost * 0.9; // 10% discount for early renewal
  }
  return baseCost;
};
