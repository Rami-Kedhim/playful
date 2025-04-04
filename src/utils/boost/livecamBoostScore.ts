
/**
 * Specialized boost score calculator for livecam profiles
 */
import { Livecam } from "@/types/livecams";
import { calculateInteractionScore } from './interactionScore';
import { calculateTimeWeighting } from './boostCalculation';

/**
 * Calculate profile completeness score for a livecam (0-100)
 */
export function calculateLivecamProfileCompletion(livecam: Livecam): number {
  // Create an array of required fields to check
  const requiredFields: Array<keyof Livecam> = [
    'username', 'imageUrl', 'region', 'language'
  ];
  
  // Create an array of optional fields to check
  const optionalFields: Array<keyof Livecam> = [
    'thumbnailUrl', 'name', 'tags', 'category'
  ];
  
  // Count how many required fields are present
  const requiredFieldsPresent = requiredFields.filter(
    field => livecam[field] !== undefined && livecam[field] !== null && livecam[field] !== ''
  ).length;
  
  // Count how many optional fields are present
  const optionalFieldsPresent = optionalFields.filter(
    field => livecam[field] !== undefined && livecam[field] !== null && 
    (Array.isArray(livecam[field]) ? (livecam[field] as any[]).length > 0 : livecam[field] !== '')
  ).length;
  
  // Calculate completeness percentage
  // Required fields contribute 70% of the score, optional fields 30%
  const requiredScore = (requiredFieldsPresent / requiredFields.length) * 70;
  const optionalScore = (optionalFieldsPresent / optionalFields.length) * 30;
  
  return Math.min(100, requiredScore + optionalScore);
}

/**
 * Calculate a comprehensive boost score for a livecam profile
 */
export function calculateLivecamBoostScore(
  livecam: Livecam, 
  interactions: {
    views: number;
    engagements: number;
  },
  currentHour: number = new Date().getHours()
): number {
  // Calculate profile completion score
  const profileCompletionScore = calculateLivecamProfileCompletion(livecam);
  
  // Calculate interaction score (views and engagements)
  const interactionScore = calculateInteractionScore(
    interactions.views,
    interactions.engagements,
    0 // No bookings for livecams
  );
  
  // Active streaming bonus (0-100)
  const streamingBonus = livecam.isStreaming ? 100 : 0;
  
  // Calculate rating bonus (-20 to +20, centered on 3.0 rating)
  const ratingBonus = ((livecam.rating || 3) - 3) * 20;
  
  // Calculate time of day weighting (0-100)
  const timeWeighting = calculateTimeWeighting(currentHour);
  
  // Calculate weighted score
  const baseScore = (
    (profileCompletionScore * 0.2) +
    (interactionScore * 0.2) +
    (streamingBonus * 0.3) +
    (ratingBonus * 0.1) +
    (timeWeighting * 0.2)
  );
  
  // Normalize score between 0-100
  return Math.max(0, Math.min(100, baseScore));
}

/**
 * Calculate boost intensity based on number of viewers
 * More viewers = less need for artificial boost
 */
export function getViewerBasedBoostIntensity(viewerCount: number): number {
  if (viewerCount > 1000) return 10;   // Very popular, minimal boost
  if (viewerCount > 500) return 20;    // Popular
  if (viewerCount > 100) return 30;    // Moderately popular
  if (viewerCount > 50) return 40;     // Some attention
  return 50;                          // Needs more visibility
}
