
/**
 * Safely parses a date string or returns a fallback if invalid
 * @param dateString The date string to parse
 * @param fallback Optional fallback date (defaults to current date)
 */
export const safelyParseDate = (dateString?: string | null | undefined, fallback: Date = new Date()): Date => {
  if (!dateString) return fallback;
  
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? fallback : parsedDate;
};

/**
 * Calculate the expiry date from a given date and period
 * @param startDate Start date
 * @param periodDays Number of days in the period
 */
export const calculateExpiryDate = (startDate: Date | string, periodDays: number): Date => {
  const date = typeof startDate === 'string' ? new Date(startDate) : startDate;
  return new Date(date.getTime() + periodDays * 24 * 60 * 60 * 1000);
};

/**
 * Calculate days remaining until a date
 * @param targetDate The target date
 */
export const calculateDaysRemaining = (targetDate: Date | string): number => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate renewal cost based on subscription type and duration
 */
export const calculateRenewalCost = (
  basePrice: number,
  discountRate = 0,
  isYearly = false
): number => {
  let price = basePrice;
  if (discountRate > 0) {
    price = basePrice * (1 - discountRate);
  }
  if (isYearly) {
    price = price * 12 * 0.8; // 20% yearly discount
  }
  return Math.round(price * 100) / 100;
};

/**
 * Determine content status based on expiry date
 */
export const determineContentStatus = (expiryDate: Date | string): 'active' | 'expiring' | 'expired' => {
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  const now = new Date();
  
  if (expiry < now) {
    return 'expired';
  }
  
  // If expiring within 7 days
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
  if (expiry < sevenDaysFromNow) {
    return 'expiring';
  }
  
  return 'active';
};
