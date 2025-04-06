
/**
 * HERMES Mathematical Functions
 * Based on Zill's differential equations frameworks
 */

/**
 * Calculate visibility decay using exponential ODE model
 * 
 * dV/dt = -k * V   =>   V(t) = V₀ * e^(-k*t)
 * 
 * @param initialVisibility - Starting visibility value
 * @param decayConstant - Rate of decay
 * @param timeElapsed - Time since boost in hours
 * @returns Remaining visibility percentage
 */
export function calculateVisibilityDecay(
  initialVisibility: number,
  decayConstant: number,
  timeElapsed: number
): number {
  // Exponential decay solution to the ODE
  const remainingVisibility = initialVisibility * Math.exp(-decayConstant * timeElapsed);
  
  // Ensure result is between 0 and initialVisibility
  return Math.max(0, Math.min(initialVisibility, remainingVisibility));
}

/**
 * Calculate boost score based on time of day using Fourier components
 * Implemented based on Zill's Fourier series concepts
 * 
 * @param maxEffect - Maximum possible boost effect
 * @param aggressionFactor - Controls curve steepness
 * @param currentHour - Current hour (0-23.99)
 * @param optimalTime - Array of optimal time windows [start, end]
 * @returns Boost score (0-100)
 */
export function calculateBoostScore(
  maxEffect: number,
  aggressionFactor: number,
  currentHour: number,
  optimalTime: [number, number]
): number {
  const [peakStart, peakEnd] = optimalTime;
  
  // Calculate normalized time distance to peak period
  let timeDistance: number;
  
  if (currentHour >= peakStart && currentHour <= peakEnd) {
    // Within peak window - maximum effect
    timeDistance = 0;
  } else {
    // Outside peak window - calculate distance
    const distanceToStart = Math.min(
      Math.abs(currentHour - peakStart),
      Math.abs(currentHour - peakStart + 24),
      Math.abs(currentHour - peakStart - 24)
    );
    
    const distanceToEnd = Math.min(
      Math.abs(currentHour - peakEnd),
      Math.abs(currentHour - peakEnd + 24),
      Math.abs(currentHour - peakEnd - 24)
    );
    
    // Use the smaller of the two distances
    timeDistance = Math.min(distanceToStart, distanceToEnd);
  }
  
  // Calculate effect using sigmoid-like function
  const effect = maxEffect / (1 + Math.pow(timeDistance / aggressionFactor, 2));
  
  return Math.max(0, Math.min(maxEffect, effect));
}

/**
 * Get optimal time window based on analysis of user activity
 * In a real implementation, this would adapt based on data
 * 
 * @returns Tuple of [startHour, endHour] for peak activity
 */
export function getOptimalTimeWindow(): [number, number] {
  // For now, use fixed optimal window (7pm-11pm)
  return [19, 23];
}

/**
 * Calculate dynamic decay constant based on system load
 * Higher system load = faster decay to ensure fair rotation
 * 
 * @param baseDecay - The base decay constant
 * @param systemLoad - Current system load (0-1)
 * @returns Adjusted decay constant
 */
export function calculateDynamicDecayConstant(
  baseDecay: number,
  systemLoad: number
): number {
  // Increase decay rate as system load increases
  return baseDecay * (1 + systemLoad);
}

/**
 * Calculate boost priority based on waiting time and score
 * Used for fair rotation in the Oxum system
 * 
 * @param waitTimeHours - Hours since content was last featured
 * @param boostScore - Base boost score
 * @returns Priority score for queue positioning
 */
export function calculateBoostPriority(
  waitTimeHours: number,
  boostScore: number
): number {
  // Higher wait time and higher boost score = higher priority
  // But wait time becomes more important over time
  const waitTimeFactor = Math.min(10, waitTimeHours / 2); // Max 10x multiplier
  
  return boostScore * (1 + waitTimeFactor);
}

/**
 * Calculate geographical boost multiplier based on time zone differences
 * 
 * @param sourceTimezone - Source time zone
 * @param targetTimezone - Target time zone
 * @returns Multiplier for boost effect
 */
export function calculateGeoBoostMultiplier(
  sourceTimezone: string,
  targetTimezone: string
): number {
  // Simplified implementation for now
  // In real system, this would use actual time zone calculations
  return 1.0;
}

/**
 * Calculate engagement factor based on user interaction
 * 
 * @param views - Number of profile views
 * @param interactions - Number of user interactions
 * @param conversionRate - Conversion rate from views to interactions
 * @returns Engagement factor
 */
export function calculateEngagementFactor(
  views: number,
  interactions: number,
  conversionRate: number = 0.1
): number {
  if (views === 0) return 0;
  
  // Calculate actual conversion rate
  const actualRate = interactions / views;
  
  // Compare with expected rate
  const relativeFactor = actualRate / conversionRate;
  
  // Bounded factor
  return Math.min(1.5, Math.max(0.5, relativeFactor));
}
