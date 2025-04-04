
import { Escort } from "@/types/escort";

/**
 * Find an escort by their ID
 */
export const findEscortById = (escorts: Escort[], id: string): Escort | undefined => {
  return escorts.find(escort => escort.id === id);
};

/**
 * Format price to a readable string with currency symbol
 */
export const formatPrice = (price: number, currency: string = "$"): string => {
  return `${currency}${price.toLocaleString()}`;
};

/**
 * Check if escort is available now based on availability data
 */
export const isAvailableNow = (escort: Escort): boolean => {
  // This is a placeholder implementation
  // In a real app, this would check current day/time against escort's availability
  return true;
};

/**
 * Calculate distance between user and escort
 * This is a placeholder that would use geolocation in a real app
 */
export const calculateDistance = (userLocation: string, escortLocation: string): number => {
  // Placeholder implementation
  return 5; // miles or km
};
