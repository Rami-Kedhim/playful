
/**
 * Format a currency value
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  if (isNaN(value)) return 'Invalid amount';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format a date string or Date object to a readable format
 */
export function formatDate(date: string | Date | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!date) return 'N/A';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  return dateObj.toLocaleDateString(undefined, defaultOptions);
}

/**
 * Convert string to Date object
 */
export function toDate(dateString: string | Date): Date {
  if (dateString instanceof Date) return dateString;
  return new Date(dateString);
}
