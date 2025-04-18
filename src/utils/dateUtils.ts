
/**
 * Safely converts various date formats to a Date object
 */
export const safelyParseDate = (date: Date | string | number | null | undefined): Date => {
  if (date instanceof Date) return date;
  if (!date) return new Date();
  
  try {
    return new Date(date);
  } catch (err) {
    console.error('Error parsing date:', err);
    return new Date();
  }
};

/**
 * Converts string or Date to a Date object
 */
export const toDate = (date: string | Date | undefined): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

/**
 * Format date to a short readable string
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : (date as Date);
  return dateObj.toLocaleDateString();
};

/**
 * Format date with time
 */
export const formatDateTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : (date as Date);
  return dateObj.toLocaleString();
};
