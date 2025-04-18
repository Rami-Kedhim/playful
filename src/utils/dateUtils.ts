
/**
 * Safely parses a string or Date into a Date object
 * 
 * @param date Date string or Date object to parse
 * @returns Date object or null if invalid
 */
export const safelyParseDate = (date: string | Date | null | undefined): Date | null => {
  if (!date) return null;
  
  if (date instanceof Date) return date;
  
  try {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  } catch (e) {
    return null;
  }
};

/**
 * Formats a date to a localized string representation
 * 
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  const parsedDate = safelyParseDate(date);
  
  if (!parsedDate) return 'Invalid date';
  
  return parsedDate.toLocaleDateString(undefined, options);
};

/**
 * Compares two dates
 * 
 * @param date1 First date
 * @param date2 Second date
 * @returns -1 if date1 is before date2, 1 if date1 is after date2, 0 if equal
 */
export const compareDates = (
  date1: Date | string | null | undefined,
  date2: Date | string | null | undefined
): number => {
  const parsedDate1 = safelyParseDate(date1);
  const parsedDate2 = safelyParseDate(date2);
  
  if (!parsedDate1 && !parsedDate2) return 0;
  if (!parsedDate1) return -1;
  if (!parsedDate2) return 1;
  
  return parsedDate1.getTime() - parsedDate2.getTime();
};

/**
 * Calculates the expiry date based on a start date and duration in days
 */
export const calculateExpiryDate = (startDate: Date | string, durationDays: number): Date => {
  const date = safelyParseDate(startDate) || new Date();
  return new Date(date.getTime() + durationDays * 24 * 60 * 60 * 1000);
};

/**
 * Calculates the days remaining until an expiry date
 */
export const calculateDaysRemaining = (expiryDate: Date | string): number => {
  const expiry = safelyParseDate(expiryDate);
  if (!expiry) return 0;
  
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Determines content status based on expiry date
 */
export const determineContentStatus = (expiryDate: Date | string): 'active' | 'expiring' | 'expired' => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 7) return 'expiring';
  return 'active';
};

/**
 * Calculates renewal cost based on original price and discount percentage
 */
export const calculateRenewalCost = (originalPrice: number, discountPercentage: number = 10): number => {
  return originalPrice * (1 - discountPercentage / 100);
};
