
/**
 * Utilities for calculating profile completion scores
 */
import { Escort } from "@/types/escort";

/**
 * Calculates a profile completion percentage (0-100)
 */
export function calculateProfileCompletion(escort: Escort): number {
  // Define required fields and their weights
  const fieldWeights = {
    name: 10,
    description: 15,
    imageUrl: 15,
    gallery: 10,
    services: 15,
    rates: 15,
    availability: 10,
    languages: 5,
    location: 5
  };
  
  let totalWeight = 0;
  let completedWeight = 0;
  
  // Check each field and add its weight if completed
  for (const [field, weight] of Object.entries(fieldWeights)) {
    totalWeight += weight;
    
    if (field === 'gallery') {
      // Check if gallery has at least one image
      if (escort.gallery && escort.gallery.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'services') {
      // Check if services has at least one service
      if (escort.services && escort.services.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'rates') {
      // Check if rates object has hourly rate
      if (escort.rates && escort.rates.hourly > 0) {
        completedWeight += weight;
      }
    } else if (field === 'availability') {
      // Check if availability object has days
      if (escort.availability && escort.availability.days && escort.availability.days.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'languages') {
      // Check if languages array has at least one language
      if (escort.languages && escort.languages.length > 0) {
        completedWeight += weight;
      }
    } else {
      // For simple string fields, check if they exist and are not empty
      if (escort[field as keyof Escort] && String(escort[field as keyof Escort]).trim() !== '') {
        completedWeight += weight;
      }
    }
  }
  
  // Calculate percentage
  return Math.round((completedWeight / totalWeight) * 100);
}
