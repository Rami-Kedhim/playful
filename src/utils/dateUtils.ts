
/**
 * Convert string to date safely
 * @param dateStr - Date string to convert
 * @param defaultValue - Default value to return if conversion fails
 */
export const safelyParseDate = (dateStr: string | Date | null | undefined, defaultValue: Date = new Date()): Date => {
  if (!dateStr) return defaultValue;
  
  try {
    if (dateStr instanceof Date) return dateStr;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? defaultValue : date;
  } catch (e) {
    console.error('Failed to parse date:', dateStr);
    return defaultValue;
  }
};

/**
 * Calculate days remaining until a date
 * @param endDate - End date
 */
export const calculateDaysRemaining = (endDate: string | Date): number => {
  const end = safelyParseDate(endDate);
  const now = new Date();
  
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

/**
 * Calculate expiry date based on a start date and a duration in days
 * @param startDate - Start date
 * @param durationDays - Duration in days
 */
export const calculateExpiryDate = (startDate: string | Date, durationDays: number): Date => {
  const start = safelyParseDate(startDate);
  const expiryDate = new Date(start);
  expiryDate.setDate(start.getDate() + durationDays);
  return expiryDate;
};

/**
 * Calculate renewal cost based on original cost and days remaining
 * @param originalCost - Original cost
 * @param daysRemaining - Days remaining
 * @param totalDays - Total subscription days
 */
export const calculateRenewalCost = (
  originalCost: number,
  daysRemaining: number,
  totalDays: number = 30
): number => {
  const remainingRatio = daysRemaining / totalDays;
  const discountedCost = originalCost * (1 - 0.5 * remainingRatio);
  return Math.max(Math.round(discountedCost * 100) / 100, originalCost * 0.5);
};

/**
 * Determine content status based on expiry date
 * @param expiryDate - Expiry date
 */
export const determineContentStatus = (expiryDate: string | Date): 'active' | 'expiring' | 'expired' => {
  const daysLeft = calculateDaysRemaining(expiryDate);
  
  if (daysLeft <= 0) return 'expired';
  if (daysLeft <= 7) return 'expiring';
  return 'active';
};

/**
 * Convert string to Date object
 * @param dateStr - Date string to convert
 */
export const toDate = (dateStr: string | Date | null | undefined): Date | null => {
  if (!dateStr) return null;
  try {
    if (dateStr instanceof Date) return dateStr;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch (e) {
    return null;
  }
};
