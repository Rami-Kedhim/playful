
import { format, formatDistanceToNow } from 'date-fns';

/**
 * Formats a date to a string 
 * @param date The date to format
 * @param formatString Optional format string (default: MMM d, yyyy)
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string = 'MMM d, yyyy'): string => {
  if (!date) return '';
  const dateObj = toDate(date);
  return format(dateObj, formatString);
};

/**
 * Format a date as relative time (e.g., "2 hours ago")
 * @param date The date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = toDate(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Format a price to a currency string
 * @param price The price to format
 * @param currency Currency code (default: USD)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Format a number with commas
 * @param num The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Convert a value to a Date object
 * @param value Date string or Date object
 * @returns Date object
 */
export const toDate = (value: Date | string): Date => {
  if (value instanceof Date) return value;
  if (typeof value === 'string') return new Date(value);
  return new Date();
};
