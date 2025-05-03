
/**
 * Utility functions for Hermes visibility calculations
 */

/**
 * Calculate visibility decay based on initial visibility and time elapsed
 */
export const calculateVisibilityDecay = (
  initialVisibility: number,
  decayConstant: number,
  timeElapsedHours: number
): number => {
  // Exponential decay formula: V(t) = V₀ * e^(-λt)
  return initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
};

/**
 * Calculate dynamic decay constant based on system load
 */
export const calculateDynamicDecayConstant = (
  baseConstant: number,
  systemLoad: number,
  timeElapsed: number
): number => {
  // Adjust decay constant based on system load
  const loadFactor = 1 + (systemLoad * 0.5);
  // And add a small increase based on time elapsed (prevents eternal visibility)
  const timeFactor = Math.min(0.1, timeElapsed * 0.005);
  return baseConstant * loadFactor + timeFactor;
};

/**
 * Calculate boost score based on various factors
 */
export const calculateBoostScore = (
  maxEffect: number,
  aggressionFactor: number,
  currentHour: number,
  optimalHour: number
): number => {
  // Calculate time difference, accounting for circular nature of hours
  const hourDiff = Math.min(
    Math.abs(currentHour - optimalHour),
    24 - Math.abs(currentHour - optimalHour)
  );
  
  // Calculate score using a bell curve formula
  return maxEffect * Math.exp(-(aggressionFactor * hourDiff * hourDiff));
};

/**
 * Get optimal time window for visibility
 */
export const getOptimalTimeWindow = (): number => {
  // This would normally be calculated based on analytics
  // For now, return a fixed time (e.g., 9 PM)
  return 21;
};
