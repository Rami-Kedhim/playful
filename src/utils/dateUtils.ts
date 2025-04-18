
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

/**
 * Calculate expiry date (180 days from creation)
 */
export const calculateExpiryDate = (creationDate: Date): Date => {
  const expiryDate = new Date(creationDate);
  expiryDate.setDate(expiryDate.getDate() + 180); // 180 days (6 months) expiry
  return expiryDate;
};

/**
 * Calculate days remaining until expiry
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
};

/**
 * Determine content status based on creation date and days remaining
 */
export const determineContentStatus = (creationDate: Date): 'active' | 'expiring' | 'expired' => {
  const expiryDate = calculateExpiryDate(creationDate);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining <= 30) { // Less than 30 days left
    return 'expiring';
  } else {
    return 'active';
  }
};

/**
 * Calculate renewal cost based on content status and type
 */
export const calculateRenewalCost = (status: string, contentType: string): number => {
  const basePrice = contentType === 'video' ? 5 : contentType === 'image' ? 2 : 1;
  
  // Apply discount for nearly expired content
  if (status === 'expiring') {
    return basePrice * 0.8; // 20% discount
  } else if (status === 'expired') {
    return basePrice * 1.2; // 20% penalty
  }
  
  return basePrice;
};
