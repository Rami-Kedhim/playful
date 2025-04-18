
import { Escort } from '@/types/escort';

/**
 * Calculate the boost score for an escort profile
 * Higher score = higher placement in search results
 */
export const calculateBoostScore = (escort: Escort): number => {
  let score = 0;
  
  // Base score - fixed amount all profiles get
  score += 50;
  
  // Verification status
  if (escort.verified || escort.isVerified) {
    score += 20;
    
    // Additional points for higher verification levels
    const level = escort.verificationLevel || escort.verification_level;
    if (level === 'enhanced') score += 5;
    if (level === 'premium') score += 10;
  }
  
  // Profile completeness factors
  score += calculateProfileCompletenessScore(escort);
  
  // Activity factors
  if (escort.lastActive) {
    // Recent activity bonus
    const lastActiveDate = typeof escort.lastActive === 'string' 
      ? new Date(escort.lastActive) 
      : escort.lastActive;
    const daysSinceActive = (new Date().getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceActive < 1) score += 15;
    else if (daysSinceActive < 3) score += 10;
    else if (daysSinceActive < 7) score += 5;
  }
  
  // Availability
  if (escort.availableNow) {
    score += 25; // Major boost for available now
  }
  
  // Explicit boost level (paid feature)
  if (escort.boostLevel) {
    score += escort.boostLevel * 30;
  }
  
  // Content quality factors
  if (escort.rating) {
    // Rating bonus (0-5 scale)
    score += escort.rating * 5;
    
    // Higher rated escorts with more reviews get bigger bonus
    if (escort.rating >= 4.5 && escort.reviewCount && escort.reviewCount > 10) {
      score += 15;
    }
  }
  
  // Cap at a reasonable maximum
  return Math.min(score, 300);
};

/**
 * Calculate a score based on profile completeness
 */
const calculateProfileCompletenessScore = (escort: Escort): number => {
  let score = 0;
  
  // Core profile fields
  if (escort.bio || escort.description) score += 5;
  if (escort.location) score += 2;
  if (escort.services && escort.services.length > 0) score += 3;
  if (escort.tags && escort.tags.length > 0) score += 2;
  if (escort.languages && escort.languages.length > 0) score += 2;
  
  // Physical attributes
  if (escort.height) score += 1;
  if (escort.weight) score += 1;
  if (escort.hairColor) score += 1;
  if (escort.eyeColor) score += 1;
  if (escort.ethnicity) score += 1;
  if (escort.measurements) score += 2;
  
  // Photos and media
  if (escort.images && escort.images.length > 0) {
    score += Math.min(escort.images.length, 5); // Up to 5 points for images
  }
  
  if (escort.gallery) {
    // Handle both array and object gallery formats
    let galleryLength = 0;
    if (Array.isArray(escort.gallery)) {
      galleryLength = escort.gallery.length;
    } else if (escort.gallery.imageUrls && Array.isArray(escort.gallery.imageUrls)) {
      galleryLength = escort.gallery.imageUrls.length;
    }
    
    if (galleryLength > 0) {
      score += Math.min(galleryLength, 8); // Up to 8 points for gallery
    }
  } else if (escort.gallery_images && escort.gallery_images.length > 0) {
    score += Math.min(escort.gallery_images.length, 8);
  }
  
  // Videos
  if (escort.videos && escort.videos.length > 0) {
    score += 5 + Math.min(escort.videos.length, 5); // 5 base + up to 5 more
  }
  
  return score;
};

/**
 * Sorts escorts by boost score
 */
export const sortEscortsByBoostScore = (escorts: Escort[]): Escort[] => {
  return [...escorts].sort((a, b) => calculateBoostScore(b) - calculateBoostScore(a));
};

/**
 * Returns escorts with a minimum boost score
 */
export const filterByMinimumBoostScore = (escorts: Escort[], minScore: number): Escort[] => {
  return escorts.filter(escort => calculateBoostScore(escort) >= minScore);
};
