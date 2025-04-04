
/**
 * Specialized boost score calculator for escort profiles
 */
import { Escort } from "@/types/escort";
import { calculateProfileCompletion } from './profileCompletion';
import { calculateInteractionScore, getHoursSinceLastActive } from './interactionScore';

/**
 * Calculate a comprehensive boost score for an escort profile
 */
export function calculateEscortBoostScore(
  escort: Escort, 
  interactions: {
    views: number;
    messages: number;
    bookings: number;
  }
): number {
  // Calculate profile completion score
  const profileCompletionScore = calculateProfileCompletion(escort);
  
  // Calculate interaction score
  const interactionScore = calculateInteractionScore(
    interactions.views,
    interactions.messages,
    interactions.bookings
  );
  
  // Determine verification bonus (0-100)
  const verificationBonus = escort.verified ? 100 : 0;
  
  // Calculate rating bonus (-20 to +20, centered on 3.0 rating)
  const ratingBonus = ((escort.rating || 3) - 3) * 20;
  
  // Calculate hours since last active
  const hoursSinceActive = getHoursSinceLastActive(escort.lastActive);
  
  // Activity decay factor: 100 when active, decays to 20 over 72 hours
  const activityFactor = 100 - (hoursSinceActive / 72) * 80;
  
  // Calculate weighted score
  const baseScore = (
    (profileCompletionScore * 0.3) +
    (interactionScore * 0.2) +
    (verificationBonus * 0.2) +
    (ratingBonus * 0.1) +
    (activityFactor * 0.2)
  );
  
  // Normalize score between 0-100
  return Math.max(0, Math.min(100, baseScore));
}

/**
 * Calculate boost intensity based on package tier
 */
export function getBoostIntensityByTier(tier: 'basic' | 'standard' | 'premium'): number {
  switch (tier) {
    case 'basic':
      return 15;
    case 'standard':
      return 30;
    case 'premium':
      return 50;
    default:
      return 0;
  }
}

/**
 * Create a unified export from the utils/boost directory
 */
export * from './profileCompletion';
export * from './interactionScore';
export * from './boostCalculation';
