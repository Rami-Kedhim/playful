
/**
 * Project Hermes - Mathematical Core
 * Advanced mathematical calculations for profile visibility and boost effects
 */

/**
 * Visibility Decay Function (VDF)
 * Calculates how visibility decays over time using exponential decay
 * 
 * @param initialVisibility - Initial visibility value (V₀)
 * @param decayConstant - The decay constant (k)
 * @param timeElapsed - Time elapsed since boost in hours (t)
 * @returns Current visibility value V(t)
 */
export function calculateVisibilityDecay(
  initialVisibility: number,
  decayConstant: number,
  timeElapsed: number
): number {
  // V(t) = V₀·e^(-kt)
  return initialVisibility * Math.exp(-decayConstant * timeElapsed);
}

/**
 * Boost Score Function (BSF)
 * Calculates the boost effect using a sigmoid function
 * 
 * @param maxBoostEffect - Maximum boost effect (α)
 * @param aggressionFactor - Controls how fast boosting hits (β)
 * @param currentTime - Current time (t)
 * @param optimalTimeWindow - Optimal boosting time window (T)
 * @returns Current boost score B(t)
 */
export function calculateBoostScore(
  maxBoostEffect: number,
  aggressionFactor: number,
  currentTime: number,
  optimalTimeWindow: number
): number {
  // B(t) = α · 1/(1 + e^(-β(t - T)))
  return maxBoostEffect * (1 / (1 + Math.exp(-aggressionFactor * (currentTime - optimalTimeWindow))));
}

/**
 * Determines the current optimal time window based on traffic patterns
 * Uses historical data to identify peak hours
 * 
 * @returns The optimal time window value (T)
 */
export function getOptimalTimeWindow(): number {
  const hour = new Date().getHours();
  
  // Map the current hour to an optimal time value
  // Peak hours are typically 7-9 AM and 5-8 PM
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)) {
    return 1; // Prime time
  } else if (hour >= 22 || hour <= 5) {
    return -1; // Off-peak time
  } else {
    return 0; // Regular time
  }
}

/**
 * Calculate the dynamic decay constant based on current system load
 * Higher traffic = faster decay to ensure rotation
 * 
 * @param baseDecay - The base decay constant
 * @param currentLoad - Current system load (0-1)
 * @returns Adjusted decay constant
 */
export function calculateDynamicDecayConstant(
  baseDecay: number,
  currentLoad: number
): number {
  // Increase decay when system is under high load
  return baseDecay * (1 + currentLoad);
}
