
// Date utility functions for content management

/**
 * Calculate the expiry date for content (180 days from creation)
 */
export const calculateExpiryDate = (creationDate: Date): Date => {
  const expiryDate = new Date(creationDate);
  expiryDate.setDate(expiryDate.getDate() + 180); // 180 days validity
  return expiryDate;
};

/**
 * Calculate days remaining until expiry
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Determine content status based on days remaining
 */
export const determineContentStatus = (creationDate: Date): 'active' | 'expiring' | 'expired' => {
  const expiryDate = calculateExpiryDate(creationDate);
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
 * Calculate renewal cost based on content status and type
 */
export const calculateRenewalCost = (status: string, contentType: string = 'default'): number => {
  // Base cost
  let cost = 1;
  
  // Adjust based on status
  if (status === 'expired') {
    cost += 1; // Extra charge for expired content
  }
  
  // Adjust based on content type
  switch (contentType) {
    case 'video':
      cost += 1; // Videos cost more to renew
      break;
    case 'image':
      cost += 0.5; // Images have a small additional cost
      break;
    default:
      break;
  }
  
  return cost;
};
