
/**
 * HERMES Mathematical Core Functions
 * 
 * These functions implement the mathematical models that power the HERMES optimization system.
 * The models are based on differential equations, time-series analysis, and predictive algorithms.
 */

/**
 * Calculate visibility decay over time based on the decay constant
 * @param initialVisibility Initial visibility value
 * @param decayConstant Rate of decay
 * @param timeElapsedHours Time elapsed in hours
 * @returns Current visibility value
 */
export function calculateVisibilityDecay(
  initialVisibility: number,
  decayConstant: number,
  timeElapsedHours: number
): number {
  // Exponential decay model: V(t) = V₀ * e^(-λt)
  return initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
}

/**
 * Calculate dynamic decay constant based on system load
 * Increases decay during high system load to preserve resources
 * @param baseDecayConstant Base decay constant
 * @param systemLoad Current system load (0-1)
 * @returns Adjusted decay constant
 */
export function calculateDynamicDecayConstant(
  baseDecayConstant: number,
  systemLoad: number
): number {
  // Linear adjustment based on system load
  // During high load (systemLoad close to 1), decay happens faster
  return baseDecayConstant * (1 + systemLoad);
}

/**
 * Calculate boost score based on the boost effectiveness model
 * @param maxEffect Maximum boost effect
 * @param aggressionFactor Controls how aggressively the boost is applied
 * @param currentTime Current time (typically hour of day)
 * @param optimalTime Optimal time for maximum effect
 * @returns Boost score
 */
export function calculateBoostScore(
  maxEffect: number,
  aggressionFactor: number,
  currentTime: number,
  optimalTime: { start: number; peak: number; end: number }
): number {
  // Distance from the optimal peak time
  const distanceFromPeak = Math.abs(currentTime - optimalTime.peak);
  
  // Width of the effective period
  const effectiveWidth = Math.max(
    optimalTime.end - optimalTime.peak,
    optimalTime.peak - optimalTime.start
  );
  
  // If outside the effective time window, reduced effect
  if (currentTime < optimalTime.start || currentTime > optimalTime.end) {
    return maxEffect * 0.2;
  }
  
  // Gaussian-like effect that peaks at the optimal time
  // Effect = max_effect * e^(-agg_factor * (distance_from_peak/effective_width)²)
  const effect = maxEffect * Math.exp(
    -aggressionFactor * Math.pow(distanceFromPeak / effectiveWidth, 2)
  );
  
  return effect;
}

/**
 * Get the optimal time window based on historical data
 * @returns Optimal time window for boost effectiveness
 */
export function getOptimalTimeWindow(): { start: number; peak: number; end: number } {
  // This would be derived from actual analytics in a real implementation
  // For now, returning a generalized prime time
  return {
    start: 18, // 6PM
    peak: 21,  // 9PM
    end: 23    // 11PM
  };
}

/**
 * Calculate engagement likelihood based on user context and profile attributes
 * @param userContext User context data
 * @param profileAttributes Profile attributes data
 * @returns Engagement likelihood score (0-1)
 */
export function calculateEngagementLikelihood(
  userContext: any,
  profileAttributes: any
): number {
  // In a real implementation, this would use a trained model
  // For demonstration, returning a random value weighted by the profile popularity
  const popularity = profileAttributes.popularity || 0.5;
  return Math.min(1, Math.max(0, (Math.random() * 0.4) + 0.3 + (popularity * 0.3)));
}

/**
 * Calculate conversion probability based on engagement history
 * @param engagementHistory Array of past engagement values
 * @returns Probability of conversion
 */
export function calculateConversionProbability(engagementHistory: number[]): number {
  if (!engagementHistory || engagementHistory.length === 0) {
    return 0.05; // Base conversion rate with no data
  }
  
  // Look for positive trend in engagement
  const recentEngagement = engagementHistory.slice(-3);
  let positiveSlope = true;
  
  for (let i = 1; i < recentEngagement.length; i++) {
    if (recentEngagement[i] <= recentEngagement[i-1]) {
      positiveSlope = false;
      break;
    }
  }
  
  // Calculate average engagement level
  const avgEngagement = engagementHistory.reduce((sum, val) => sum + val, 0) / engagementHistory.length;
  
  // Higher engagement + positive trend = higher conversion probability
  const baseProb = Math.min(0.8, avgEngagement);
  return positiveSlope ? baseProb * 1.25 : baseProb * 0.9;
}

/**
 * Solve the differential equation for optimization
 * dE/dt = α(Conversion) - β(ExitRate)
 * @param alpha Conversion weight
 * @param beta Exit rate weight
 * @param initialEngagement Initial engagement value
 * @param conversionRate Conversion rate
 * @param exitRate Exit rate
 * @param timeStep Time step for solution
 * @param duration Duration to solve for
 * @returns Array of engagement values over time
 */
export function solveEngagementEquation(
  alpha: number,
  beta: number,
  initialEngagement: number,
  conversionRate: number,
  exitRate: number,
  timeStep: number,
  duration: number
): number[] {
  // Euler method to solve the differential equation
  const steps = Math.ceil(duration / timeStep);
  const engagementValues: number[] = [initialEngagement];
  
  let currentEngagement = initialEngagement;
  
  for (let i = 0; i < steps; i++) {
    // Calculate derivative: dE/dt = α(Conversion) - β(ExitRate)
    const derivative = (alpha * conversionRate) - (beta * exitRate);
    
    // Update using Euler method: E(t+dt) = E(t) + dE/dt * dt
    currentEngagement += derivative * timeStep;
    
    // Ensure engagement stays within reasonable bounds
    currentEngagement = Math.max(0, Math.min(100, currentEngagement));
    
    engagementValues.push(currentEngagement);
  }
  
  return engagementValues;
}

/**
 * Calculate resource allocation based on optimization goals
 * @param resources Available resources
 * @param profiles Array of profiles with attributes
 * @param optimizationGoal Goal to optimize for
 * @returns Optimal resource allocation
 */
export function calculateOptimalResourceAllocation(
  resources: number,
  profiles: any[],
  optimizationGoal: 'engagement' | 'conversion' | 'revenue'
): Record<string, number> {
  const allocation: Record<string, number> = {};
  
  if (!profiles || profiles.length === 0) {
    return allocation;
  }
  
  // Calculate allocation scores based on optimization goal
  const scores = profiles.map(profile => {
    let score;
    
    switch (optimizationGoal) {
      case 'engagement':
        score = profile.engagementRate || 0.5;
        break;
      case 'conversion':
        score = profile.conversionRate || 0.2;
        break;
      case 'revenue':
        score = (profile.conversionRate || 0.2) * (profile.averageRevenue || 50);
        break;
      default:
        score = 0.5;
    }
    
    return { id: profile.id, score };
  });
  
  // Normalize scores to sum to 1
  const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
  
  // Distribute resources proportionally to scores
  scores.forEach(item => {
    const normalizedScore = totalScore > 0 ? item.score / totalScore : 1 / scores.length;
    allocation[item.id] = Math.round(resources * normalizedScore * 100) / 100;
  });
  
  return allocation;
}
