
/**
 * Formats a currency value according to the specified locale and currency
 */
export const formatCurrency = (value: number, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date to a human-readable string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Safely converts a string date to a Date object
 */
export const toDate = (dateString: string | Date): Date => {
  if (dateString instanceof Date) return dateString;
  return new Date(dateString);
};

/**
 * Formats a date-time to a string with both date and time
 */
export const formatDateTime = (date: Date | string): string => {
  if (!date) return '';
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats a number with thousands separators
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formats a duration in seconds to a user-friendly format
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Formats a percentage (e.g., 0.75) to a readable string (75%)
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};
