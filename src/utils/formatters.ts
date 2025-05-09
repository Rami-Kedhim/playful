
/**
 * Utility functions for formatting and transforming data
 */

/**
 * Converts a value to a Date object
 * @param value - Date, string, number, or any other value to convert to Date
 * @returns Date object or null if conversion failed
 */
export function toDate(value: Date | string | number | null | undefined): Date | null {
  if (value === null || value === undefined) {
    return null;
  }
  
  if (value instanceof Date) {
    return value;
  }
  
  try {
    // If it's a timestamp number
    if (typeof value === 'number') {
      return new Date(value);
    }
    
    // If it's a date string
    if (typeof value === 'string') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    
    return null;
  } catch (error) {
    console.error('Error converting to date:', error);
    return null;
  }
}

/**
 * Formats a date as a string using locale options
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
): string {
  const dateObj = toDate(date);
  if (!dateObj) return 'N/A';
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Formats a number as currency
 * @param amount - Number to format as currency
 * @param currency - Currency code (e.g., 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: string = 'USD'
): string {
  if (amount === null || amount === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * Formats a number with thousands separators
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Formats a duration in seconds to MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
  if (!seconds) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
