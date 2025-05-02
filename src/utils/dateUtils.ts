
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
