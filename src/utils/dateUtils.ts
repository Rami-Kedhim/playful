
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
