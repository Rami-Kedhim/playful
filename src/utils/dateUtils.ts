
/**
 * Convert a value to a Date object
 * @param value - The value to convert (can be string, Date, or undefined)
 * @returns A Date object or undefined
 */
export const toDate = (value: string | Date | undefined): Date | undefined => {
  if (!value) return undefined;
  return value instanceof Date ? value : new Date(value);
};

/**
 * Format a date for displaying in the UI
 * @param date - The date to format (can be string, Date, or undefined)
 * @param format - The format to use (default is local date string)
 * @returns A formatted date string or placeholder
 */
export const formatDate = (
  date: string | Date | undefined, 
  format: 'short' | 'full' | 'relative' = 'full'
): string => {
  if (!date) return 'N/A';
  
  const dateObj = toDate(date);
  if (!dateObj) return 'Invalid date';
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'full':
      return dateObj.toLocaleString();
    case 'relative':
      return getRelativeTimeString(dateObj);
    default:
      return dateObj.toLocaleString();
  }
};

/**
 * Get a relative time string (e.g., "2 days ago")
 */
const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 30) return `${diffDay} days ago`;
  
  return date.toLocaleDateString();
};
