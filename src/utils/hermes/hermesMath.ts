
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
  
  // Generate day of week factor (weekends have different patterns)
  const day = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = day === 0 || day === 6;
  
  // Map the current hour to an optimal time value
  // Peak hours are typically 7-9 AM and 5-8 PM on weekdays
  // Weekends have different patterns with peaks around 10AM-1PM and 8-11PM
  if (isWeekend) {
    if ((hour >= 10 && hour <= 13) || (hour >= 20 && hour <= 23)) {
      return 1; // Weekend prime time
    } else if (hour >= 2 && hour <= 6) {
      return -1; // Weekend off-peak time
    } else {
      return 0.5; // Weekend regular time (slightly better than weekday regular)
    }
  } else {
    // Weekday patterns
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)) {
      return 1; // Weekday prime time
    } else if (hour >= 22 || hour <= 5) {
      return -1; // Weekday off-peak time
    } else {
      return 0; // Weekday regular time
    }
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

/**
 * Calculate geographic boost multiplier based on timezone and user location
 * 
 * @param userTimezone - User's timezone (e.g. 'America/New_York')
 * @param targetTimezone - Target timezone for optimization (e.g. 'Europe/Berlin')
 * @returns Geographic multiplier factor
 */
export function calculateGeoBoostMultiplier(
  userTimezone: string,
  targetTimezone: string
): number {
  try {
    // Get current hours in user timezone and target timezone
    const now = new Date();
    
    // Default to 1 if we can't determine time difference
    if (!userTimezone || !targetTimezone) return 1;
    
    const userTime = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));
    const targetTime = new Date(now.toLocaleString('en-US', { timeZone: targetTimezone }));
    
    // Calculate time difference in hours
    const hourDifference = Math.abs(userTime.getHours() - targetTime.getHours());
    
    // If the time difference is large, boost more to compensate for different active hours
    // Max boost is 1.5x for 12-hour difference, min is 1x for same timezone
    return 1 + (hourDifference / 24);
  } catch (error) {
    console.error("Error calculating geo boost:", error);
    return 1; // Default multiplier if calculation fails
  }
}

/**
 * Calculate user engagement factor based on historical data
 * 
 * @param viewsHistory - Array of views over time periods
 * @param responsesHistory - Array of responses over time periods
 * @returns Engagement factor between 0-1
 */
export function calculateEngagementFactor(
  viewsHistory: number[],
  responsesHistory: number[]
): number {
  // Need at least some data to calculate
  if (!viewsHistory?.length || !responsesHistory?.length) return 0.5;
  
  // Calculate response rate
  let totalViews = 0;
  let totalResponses = 0;
  
  for (let i = 0; i < Math.min(viewsHistory.length, responsesHistory.length); i++) {
    totalViews += viewsHistory[i];
    totalResponses += responsesHistory[i];
  }
  
  // Avoid division by zero
  if (totalViews === 0) return 0.5;
  
  // Calculate engagement factor - capped between 0.2 and 1
  const responseRate = totalResponses / totalViews;
  return Math.min(1, Math.max(0.2, responseRate * 2));
}

/**
 * Calculate boost priority based on waiting time and other factors
 * Used to prioritize profiles that have been waiting longer
 * 
 * @param waitTimeHours - Hours since last appearance in top results
 * @param boostScore - Current boost score
 * @returns Priority score for queue positioning
 */
export function calculateBoostPriority(
  waitTimeHours: number,
  boostScore: number
): number {
  // Priority increases with wait time and boost score
  // Wait time is more important after a threshold
  const waitFactor = waitTimeHours <= 2 ? waitTimeHours / 2 : 1 + (waitTimeHours - 2) / 10;
  
  // Normalize boost score to 0-1
  const normalizedBoost = boostScore / 100;
  
  // Combined priority score
  return waitFactor * normalizedBoost * 100;
}
