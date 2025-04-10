
import contentBrainHub from '@/services/content/ContentBrainHubService';

/**
 * Calculate the expiry date for content
 * @param createdAt Date the content was created
 * @returns Date when the content will expire
 */
export function calculateExpiryDate(createdAt: Date): Date {
  // Content expires 180 days after creation
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + 180);
  return expiryDate;
}

/**
 * Calculate how many days remain until expiry
 * @param expiryDate The date when content expires
 * @returns Number of days remaining until expiry
 */
export function calculateDaysRemaining(expiryDate: Date): number {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Determine content status based on creation date
 * @param createdAt Date content was created
 * @returns Status string: 'active', 'expiring', or 'expired'
 */
export function determineContentStatus(createdAt: Date): 'active' | 'expiring' | 'expired' {
  const expiryDate = calculateExpiryDate(createdAt);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining <= 30) {
    return 'expiring';
  } else {
    return 'active';
  }
}

/**
 * Calculate the cost to renew content
 * First attempts to use Brain Hub for intelligent pricing,
 * falls back to standard calculation if Brain Hub is unavailable
 * 
 * @param status Content status ('active', 'expiring', 'expired')
 * @param type Content type ('image', 'video', 'text')
 * @returns Renewal cost in Lucoins
 */
export function calculateRenewalCost(status: string, type: string): number {
  try {
    // Try to use Brain Hub for intelligent pricing
    return contentBrainHub.calculateOptimalRenewalCost(status, type);
  } catch (error) {
    // Fallback to standard calculation
    if (status === 'expired') {
      // Expired content costs more to renew
      return type === 'video' ? 3 : 2;
    } else {
      // Active or expiring content
      return type === 'video' ? 2 : 1;
    }
  }
}
