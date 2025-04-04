
/**
 * Utilities for calculating boost effects and scores
 */

/**
 * Calculate the effect of a boost based on time elapsed
 */
export function calculateBoostEffect(
  initialBoost: number,
  hoursElapsed: number,
  decayRate: number = 0.05
): number {
  // Exponential decay formula
  return initialBoost * Math.exp(-decayRate * hoursElapsed);
}

/**
 * Calculate a boost score for a profile based on various factors
 */
export function calculateBoostScore(
  profileCompleteness: number,
  activityScore: number,
  verificationBonus: number,
  ratingsBonus: number,
  boostedHours: number = 0,
  boostStrength: number = 0
): number {
  // Base score from profile quality
  const baseScore = (
    (profileCompleteness * 0.3) +
    (activityScore * 0.3) +
    (verificationBonus * 0.2) +
    (ratingsBonus * 0.2)
  );
  
  // Apply boost effect if active
  let boostEffect = 0;
  if (boostedHours > 0 && boostStrength > 0) {
    boostEffect = calculateBoostEffect(boostStrength, boostedHours);
  }
  
  return Math.min(100, baseScore + boostEffect);
}

/**
 * Calculate time weightings for optimal visibility
 */
export function calculateTimeWeighting(
  hour: number,
  peakHours: number[] = [9, 12, 18, 21]
): number {
  // Find closest peak hour
  const distanceToPeak = Math.min(...peakHours.map(peak => {
    // Calculate shortest distance considering 24-hour wraparound
    const directDistance = Math.abs(hour - peak);
    const wraparoundDistance = 24 - directDistance;
    return Math.min(directDistance, wraparoundDistance);
  }));
  
  // Convert distance to score (closer = higher score)
  // Max distance possible is 12 hours (half the day)
  return Math.max(0, 100 - ((distanceToPeak / 6) * 100));
}
