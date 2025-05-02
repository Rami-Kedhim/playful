
/**
 * Format a date to relative time (e.g. "2 days ago")
 * @param date Date to format
 */
export const formatDateRelative = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 30) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Calculate the number of days remaining between now and a future date
 * @param expiryDate The expiration date
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diffInMs = expiryDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
};

/**
 * Calculate expiry date based on creation date (default 6 months)
 * @param creationDate Date of content creation
 * @param months Number of months until expiry
 */
export const calculateExpiryDate = (creationDate: Date, months: number = 6): Date => {
  const expiryDate = new Date(creationDate);
  expiryDate.setMonth(expiryDate.getMonth() + months);
  return expiryDate;
};

/**
 * Determine content status based on expiry date
 * @param expiryDate The expiration date
 * @returns 'active', 'expiring', or 'expired'
 */
export const determineContentStatus = (expiryDate: Date): 'active' | 'expiring' | 'expired' => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining <= 14) {
    return 'expiring';
  } else {
    return 'active';
  }
};

/**
 * Convert a string to a Date object
 * @param dateString String representation of a date
 * @returns Date object
 */
export const toDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Format a date to a string in the format "MMM DD, YYYY"
 * @param date Date to format
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
