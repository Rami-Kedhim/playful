
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

/**
 * Format a relative time (e.g., "in 3 days" or "5 days ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  } else if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
  } else {
    return 'today';
  }
};

/**
 * Determine content status based on expiration date
 */
export const determineContentStatus = (
  createdAt: Date,
  lastInteractionAt?: Date
): 'active' | 'expiring' | 'expired' | 'archived' => {
  const interactionDate = lastInteractionAt || createdAt;
  const expiryDate = calculateExpiryDate(interactionDate);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining <= 30) {
    return 'expiring';
  } else {
    return 'active';
  }
};

/**
 * Check if content is eligible for renewal
 */
export const isContentRenewable = (status: string): boolean => {
  return status === 'expiring' || status === 'expired';
};

/**
 * Calculate Lucoin cost for renewing content
 */
export const calculateRenewalCost = (
  status: string, 
  contentType: string = 'standard'
): number => {
  // Base cost is 1 Lucoin
  let cost = 1;
  
  // Expired content costs more to renew
  if (status === 'expired') {
    cost = 2;
  }
  
  // Premium content types cost more
  if (contentType === 'premium' || contentType === 'video') {
    cost += 1;
  }
  
  return cost;
};

/**
 * Format time period in a human-readable format
 * @param days Number of days
 * @returns Formatted time period (e.g., "6 months" for 180 days)
 */
export const formatTimePeriod = (days: number): string => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''}`;
  }
};

/**
 * Get elapsed time since a date
 */
export const getElapsedTime = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes > 0 ? `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago` : 'just now';
    }
  }
};
