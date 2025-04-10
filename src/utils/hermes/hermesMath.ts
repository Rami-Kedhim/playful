
/**
 * Advanced mathematical functions for the HERMES Optimization System
 */

/**
 * Calculate visibility decay based on exponential function
 * 
 * @param initialValue - Initial visibility value
 * @param decayConstant - Rate of decay (higher = faster decay)
 * @param timeElapsed - Time elapsed in hours
 * @returns Current visibility value
 */
export function calculateVisibilityDecay(
  initialValue: number,
  decayConstant: number,
  timeElapsed: number
): number {
  return initialValue * Math.exp(-decayConstant * timeElapsed);
}

/**
 * Calculate boost score based on time of day
 * 
 * @param maxEffect - Maximum boost effect
 * @param aggressionFactor - How aggressively to boost (0-1)
 * @param currentTimeValue - Current time (decimal hours, 0-24)
 * @param optimalTimeWindow - Optimal time window for maximum boost
 * @returns Boost score
 */
export function calculateBoostScore(
  maxEffect: number,
  aggressionFactor: number,
  currentTimeValue: number,
  optimalTimeWindow: [number, number]
): number {
  const [windowStart, windowEnd] = optimalTimeWindow;
  
  // Check if current time is within optimal window
  if (currentTimeValue >= windowStart && currentTimeValue <= windowEnd) {
    // Maximum boost during optimal window
    return maxEffect;
  }
  
  // Calculate distance from optimal window
  let distanceFromWindow;
  if (currentTimeValue < windowStart) {
    distanceFromWindow = windowStart - currentTimeValue;
  } else {
    distanceFromWindow = currentTimeValue - windowEnd;
  }
  
  // Apply distance penalty with aggression factor
  const penalty = Math.min(1, distanceFromWindow / 6) * aggressionFactor;
  return maxEffect * (1 - penalty);
}

/**
 * Calculate geographic boost multiplier based on source and target timezones
 * 
 * @param sourceTimezone - Source timezone
 * @param targetTimezone - Target timezone
 * @returns Multiplier value (0.5-1.5)
 */
export function calculateGeoBoostMultiplier(
  sourceTimezone: string,
  targetTimezone: string
): number {
  // This is a simplified implementation
  // In a real system, this would use timezone offsets and population models
  
  // Get current hours in both timezones
  const sourceDate = new Date();
  const targetDate = new Date();
  
  // Simulate timezone offset for demo purposes
  const sourceHour = sourceDate.getHours();
  let targetHour;
  
  // Simple offset simulation
  if (targetTimezone.includes('Europe')) {
    targetHour = (sourceHour + 6) % 24; // Europe ahead of America
  } else {
    targetHour = sourceHour;
  }
  
  // Calculate activity level based on local time (simplified)
  const sourceActivity = getActivityLevel(sourceHour);
  const targetActivity = getActivityLevel(targetHour);
  
  // Higher multiplier when target location has higher activity
  return 0.5 + targetActivity;
}

/**
 * Calculate engagement factor based on user interaction patterns
 * 
 * @param viewCount - Number of profile views
 * @param clickCount - Number of interaction clicks
 * @param timeSpent - Time spent viewing the profile (minutes)
 * @returns Engagement factor (0-1)
 */
export function calculateEngagementFactor(
  viewCount: number,
  clickCount: number,
  timeSpent: number
): number {
  // Normalize inputs
  const normalizedViews = Math.min(1, viewCount / 20);
  const normalizedClicks = Math.min(1, clickCount / 5);
  const normalizedTime = Math.min(1, timeSpent / 15);
  
  // Weighted average of factors
  return (normalizedViews * 0.2) + (normalizedClicks * 0.5) + (normalizedTime * 0.3);
}

/**
 * Calculate boost priority based on wait time and score
 * 
 * @param waitTimeHours - Time since last top position (hours)
 * @param currentBoostScore - Current boost score
 * @returns Priority score
 */
export function calculateBoostPriority(
  waitTimeHours: number,
  currentBoostScore: number
): number {
  // Logarithmic wait time factor - increases priority but with diminishing returns
  const waitFactor = Math.log10(Math.max(1, waitTimeHours) + 1) * 10;
  
  // Score factor - higher score gets higher priority
  const scoreFactor = currentBoostScore / 20;
  
  return waitFactor + scoreFactor;
}

/**
 * Get optimal time window for maximum exposure
 * 
 * @returns Tuple of [start, end] hours (0-24)
 */
export function getOptimalTimeWindow(): [number, number] {
  // This could be dynamically calculated based on analytics
  // For now, return fixed optimal window (8pm - 12am)
  return [20, 24];
}

/**
 * Helper function to calculate activity level based on hour of day
 * 
 * @param hour - Hour of day (0-23)
 * @returns Activity level (0-1)
 */
function getActivityLevel(hour: number): number {
  // Define peak hours (simplified model)
  // Early morning (5-8): Low
  // Work hours (9-17): Medium
  // Evening (18-23): High
  // Late night (0-4): Low-Medium
  
  if (hour >= 5 && hour <= 8) return 0.3;
  if (hour >= 9 && hour <= 17) return 0.5;
  if (hour >= 18 && hour <= 23) return 0.9;
  return 0.4; // Late night
}

/**
 * Calculate time impact on boost effectiveness
 * 
 * @param currentHour - Current hour (0-23)
 * @returns Impact score (0-100)
 */
export function calculateTimeImpact(currentHour: number): number {
  // Simple model - effectiveness varies by time of day
  // Peak during evening hours
  if (currentHour >= 18 && currentHour <= 23) {
    return 80 + (currentHour - 18) * 4;
  }
  // Medium during day
  else if (currentHour >= 8 && currentHour < 18) {
    return 50 + (currentHour - 8) * 3;
  }
  // Low during night/early morning
  else {
    return 30 + Math.abs(currentHour - 3) * 5;
  }
}
