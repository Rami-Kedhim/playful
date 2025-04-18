
/**
 * Safely parses a date string or Date object into a Date object
 * Returns the provided default value if parsing fails
 */
export function safelyParseDate(
  date: string | Date | undefined | null,
  defaultValue: Date = new Date()
): Date {
  if (!date) return defaultValue;
  
  if (date instanceof Date) return date;
  
  try {
    const parsed = new Date(date);
    // Check if the date is valid
    return isNaN(parsed.getTime()) ? defaultValue : parsed;
  } catch (e) {
    console.error("Error parsing date:", e);
    return defaultValue;
  }
}

/**
 * Converts a value to a Date object
 */
export function toDate(value: string | Date | number | undefined | null): Date | null {
  if (!value) return null;
  
  if (value instanceof Date) return value;
  
  try {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  } catch (e) {
    return null;
  }
}

/**
 * Formats a date to a string using specified options
 */
export function formatDate(
  date: Date | string | number | undefined | null,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  },
  locale: string = 'en-US'
): string {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (e) {
    console.error("Error formatting date:", e);
    return '';
  }
}

/**
 * Calculates expiry date from a creation date (180 days later)
 */
export function calculateExpiryDate(createdAt: Date): Date {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + 180); // 180 days validity
  return expiryDate;
}

/**
 * Calculates days remaining until a given date
 */
export function calculateDaysRemaining(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Determines content status based on created date
 */
export function determineContentStatus(createdAt: Date): 'active' | 'expiring' | 'expired' {
  const expiryDate = calculateExpiryDate(createdAt);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 30) return 'expiring'; // 30 days or less = expiring
  return 'active';
}

/**
 * Calculate renewal cost for content
 */
export function calculateRenewalCost(contentStatus: string, contentType?: string): number {
  // Default costs
  const baseCosts = {
    image: 1,
    video: 2,
    text: 1
  };
  
  // Apply status multiplier
  const statusMultiplier = contentStatus === 'expired' ? 1.5 : 1;
  
  // Calculate base cost based on content type
  const baseCost = contentType ? (baseCosts[contentType as keyof typeof baseCosts] || 1) : 1;
  
  return Math.ceil(baseCost * statusMultiplier);
}
