
// Calculate expiry date (6 months from creation)
export const calculateExpiryDate = (createdAt: Date): Date => {
  const expiryDate = new Date(createdAt);
  expiryDate.setMonth(expiryDate.getMonth() + 6);
  return expiryDate;
};

// Calculate days remaining until expiry
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Determine content status based on days remaining
export const determineContentStatus = (createdAt: Date): 'active' | 'expiring' | 'expired' => {
  const expiryDate = calculateExpiryDate(createdAt);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) {
    return 'expired';
  } else if (daysRemaining < 30) {
    return 'expiring';
  } else {
    return 'active';
  }
};

// Calculate renewal cost based on status
export const calculateRenewalCost = (status: 'active' | 'expiring' | 'expired', contentType: string = 'standard'): number => {
  const baseRate = contentType === 'premium' ? 2 : 1;
  
  switch (status) {
    case 'expired':
      return baseRate * 1.5;
    case 'expiring':
      return baseRate * 1.2;
    default:
      return baseRate;
  }
};

// Convert string date to Date object safely
export const safelyParseDate = (dateString: string | Date | undefined): Date => {
  if (!dateString) return new Date();
  
  if (dateString instanceof Date) {
    return dateString;
  }
  
  try {
    return new Date(dateString);
  } catch (e) {
    console.error("Error parsing date:", e);
    return new Date();
  }
};
