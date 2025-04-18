
/**
 * Safely parses a date string to a Date object
 * If the date string is invalid, returns null or fallbacks to current date
 */
export const safelyParseDate = (
  dateString?: string | Date | null,
  useFallback: boolean = false
): Date | null => {
  if (!dateString) {
    return useFallback ? new Date() : null;
  }
  
  if (dateString instanceof Date) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? (useFallback ? new Date() : null) : date;
  } catch (error) {
    return useFallback ? new Date() : null;
  }
};

/**
 * Formats a date to a string in the user's locale
 */
export const formatDate = (
  date?: Date | string | null,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  const safeDate = safelyParseDate(date);
  if (!safeDate) return '';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale || 'en-US', options || defaultOptions).format(safeDate);
};

/**
 * Formats a date to a relative time string (e.g. "2 days ago")
 */
export const formatRelativeTime = (date?: Date | string | null): string => {
  const safeDate = safelyParseDate(date);
  if (!safeDate) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - safeDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};
