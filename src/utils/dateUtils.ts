
/**
 * Calculate days remaining until a given date
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Calculate expiration date based on creation date
 * Default is 180 days from creation as per UberEscorts brief
 */
export const calculateExpiryDate = (
  creationDate: Date, 
  daysToExpire: number = 180
): Date => {
  const expiryDate = new Date(creationDate);
  expiryDate.setDate(expiryDate.getDate() + daysToExpire);
  return expiryDate;
};

/**
 * Format a date for display 
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
