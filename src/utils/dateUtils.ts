
import { formatDistance, format, differenceInDays } from 'date-fns';

// Format date as relative (today, yesterday, 2 days ago, etc.)
export const formatDateRelative = (date: Date): string => {
  const now = new Date();
  try {
    return formatDistance(new Date(date), now, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Format date with standard format
export const formatDate = (date: Date, formatStr: string = 'PPP'): string => {
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Calculate days remaining until a date
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  return Math.max(0, differenceInDays(new Date(expiryDate), now));
};

// Calculate expiry date based on creation date (default 180 days)
export const calculateExpiryDate = (creationDate: Date, durationDays = 180): Date => {
  const expiryDate = new Date(creationDate);
  expiryDate.setDate(expiryDate.getDate() + durationDays);
  return expiryDate;
};

// Calculate renewal cost based on content status and type
export const calculateRenewalCost = (status: string, contentType: string): number => {
  // Base costs by content type
  const baseCosts: Record<string, number> = {
    text: 5,
    image: 10,
    video: 15,
    audio: 12,
    interactive: 20
  };

  // Status modifiers
  const statusModifiers: Record<string, number> = {
    active: 1.0,
    expiring: 1.2,  // 20% premium for expiring content
    expired: 1.5,   // 50% premium for expired content
    draft: 0.8      // 20% discount for drafts
  };

  // Get base cost or default to 10
  const baseCost = baseCosts[contentType] || 10;
  
  // Apply status modifier or default to 1.0
  const modifier = statusModifiers[status] || 1.0;

  return Math.round(baseCost * modifier);
};

// Determine content status based on days remaining
export const determineContentStatus = (expiryDate: Date): 'active' | 'expiring' | 'expired' => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining === 0) {
    return 'expired';
  } else if (daysRemaining <= 7) {
    return 'expiring';
  } else {
    return 'active';
  }
};
