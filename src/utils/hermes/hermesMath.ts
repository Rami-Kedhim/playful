
/**
 * Mathematical utility functions for the Hermes flow dynamics system
 */

/**
 * Calculate the decay of visibility over time using an exponential decay model
 * 
 * @param initialVisibility Starting visibility value (usually 100)
 * @param decayConstant How quickly the visibility decays
 * @param timeElapsedHours Time elapsed since boost in hours
 * @returns Remaining visibility as a percentage
 */
export function calculateVisibilityDecay(
  initialVisibility: number,
  decayConstant: number,
  timeElapsedHours: number
): number {
  // Use exponential decay model: V(t) = V₀ * e^(-λt)
  return initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
}

/**
 * Calculate dynamic decay constant based on system conditions
 * 
 * @param baseDecayConstant Base decay rate
 * @param systemLoad Current system load (0-1)
 * @param timeElapsed Time elapsed since boost
 * @returns Adjusted decay constant
 */
export function calculateDynamicDecayConstant(
  baseDecayConstant: number,
  systemLoad: number,
  timeElapsed: number
): number {
  // Decay happens faster under high system load
  let adjustedDecay = baseDecayConstant * (1 + systemLoad * 0.5);
  
  // Decay accelerates as time passes
  const timeAcceleration = Math.min(1, timeElapsed / 48); // Max effect after 48 hours
  adjustedDecay *= (1 + timeAcceleration * 0.3);
  
  return adjustedDecay;
}

/**
 * Calculate boost score based on time of day
 * 
 * @param maxBoostEffect Maximum possible boost effect
 * @param aggressionFactor How aggressive the boost curve is
 * @param currentHour Current hour (0-23)
 * @param optimalTime Optimal time window for boosting
 * @returns Boost score
 */
export function calculateBoostScore(
  maxBoostEffect: number,
  aggressionFactor: number,
  currentHour: number,
  optimalTime: { start: number; end: number }
): number {
  // Check if current hour is within optimal window
  if (currentHour >= optimalTime.start && currentHour <= optimalTime.end) {
    // Calculate position within optimal window (0-1)
    const windowSize = optimalTime.end - optimalTime.start;
    const position = (currentHour - optimalTime.start) / windowSize;
    
    // Calculate score with a bell curve - highest in the middle of the window
    const bellCurve = Math.sin(position * Math.PI) ** aggressionFactor;
    return maxBoostEffect * bellCurve;
  }
  
  // Outside optimal window, calculate distance to nearest boundary
  const distToStart = Math.min(
    Math.abs(currentHour - optimalTime.start),
    Math.abs(currentHour - (optimalTime.start + 24))
  );
  
  const distToEnd = Math.min(
    Math.abs(currentHour - optimalTime.end),
    Math.abs(currentHour - (optimalTime.end + 24))
  );
  
  const distance = Math.min(distToStart, distToEnd);
  
  // Calculate falloff based on distance
  const falloff = Math.max(0, 1 - (distance / 6)); // 6-hour falloff
  return maxBoostEffect * falloff * 0.6; // Maximum 60% of optimal outside window
}

/**
 * Get optimal time window for boosting based on activity patterns
 */
export function getOptimalTimeWindow(): { start: number; end: number } {
  // This would typically use real activity data, for now use hardcoded window
  // Prime time is typically 8 PM - 11 PM
  return {
    start: 20, // 8 PM
    end: 23    // 11 PM
  };
}

/**
 * Calculate visibility gain from a boost
 */
export function calculateBoostVisibilityGain(
  baseVisibility: number,
  boostLevel: number,
  profileCompleteness: number
): number {
  // Boost gives diminishing returns at higher levels
  const boostFactor = 1 + Math.log(1 + boostLevel) / Math.log(5);
  
  // Profile completeness affects boost effectiveness
  const completenessMultiplier = 0.7 + (profileCompleteness / 100) * 0.3;
  
  return baseVisibility * boostFactor * completenessMultiplier;
}
