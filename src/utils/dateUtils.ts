
import { ContentStatus } from '@/types/neural';

export const calculateExpiryDate = (startDate: Date | string, durationDays: number = 180): Date => {
  const date = startDate instanceof Date ? startDate : new Date(startDate);
  return new Date(date.getTime() + durationDays * 24 * 60 * 60 * 1000);
};

export const calculateDaysRemaining = (expiryDate: Date | string): number => {
  const expiry = expiryDate instanceof Date ? expiryDate : new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const determineContentStatus = (startDate: Date | string): ContentStatus => {
  // Calculate expiry date based on start date
  const expiryDate = calculateExpiryDate(startDate);
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 7) return 'expiring';
  return 'active';
};

export const calculateRenewalCost = (originalPrice: number, discountPercentage: number = 10): number => {
  return originalPrice * (1 - discountPercentage / 100);
};

export const safelyParseDate = (dateInput: string | Date | undefined | null): Date | null => {
  if (!dateInput) return null;
  try {
    return dateInput instanceof Date ? dateInput : new Date(dateInput);
  } catch (e) {
    console.error("Failed to parse date:", dateInput);
    return null;
  }
};
