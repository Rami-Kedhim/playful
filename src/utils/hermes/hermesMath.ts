
/**
 * HERMES Mathematical Utility Functions
 * 
 * Advanced mathematical functions for the HERMES optimization system
 */

// Calculate the dynamic decay constant based on user activity patterns
export const calculateDynamicDecayConstant = (
  initialValue: number,
  timeElapsed: number,
  activityIntensity: number
): number => {
  const base = 0.1;
  const activityFactor = Math.min(1, Math.max(0.1, activityIntensity / 100));
  const timeFactor = Math.exp(-0.05 * timeElapsed);
  
  return base * (1 + initialValue * timeFactor * activityFactor);
};

// Calculate the geo-based boost multiplier
export const calculateGeoBoostMultiplier = (
  baseMultiplier: number,
  geoActivityFactor: number,
  timeOfDay: number
): number => {
  // Time of day effect (0-24 hours)
  const timeEffect = Math.sin((Math.PI * (timeOfDay - 6)) / 12) * 0.2 + 1;
  
  // Geo activity impact
  const geoEffect = Math.log10(geoActivityFactor + 1) * 0.5;
  
  return baseMultiplier * timeEffect * (1 + geoEffect);
};

// Calculate the engagement factor
export const calculateEngagementFactor = (
  views: number,
  interactions: number,
  timeSpent: number
): number => {
  if (views === 0) return 0;
  
  const interactionRate = interactions / views;
  const avgTimePerView = timeSpent / views;
  
  // Sigmoid function to normalize the engagement factor between 0 and 1
  const engagementRaw = interactionRate * avgTimePerView;
  const engagementFactor = 1 / (1 + Math.exp(-5 * (engagementRaw - 0.5)));
  
  return engagementFactor * 100; // Scale to percentage
};

// Calculate boost priority score
export const calculateBoostPriority = (
  profileScore: number,
  timeUntilExpiration: number,
  competitionLevel: number
): number => {
  // Base priority from profile score (0-100)
  const basePriority = profileScore * 0.6;
  
  // Urgency factor based on time until expiration
  const urgencyFactor = Math.max(0, 1 - timeUntilExpiration / 24) * 25;
  
  // Competition adjustment
  const competitionFactor = Math.min(competitionLevel, 10) * 1.5;
  
  return Math.min(100, basePriority + urgencyFactor + competitionFactor);
};

// Calculate the Laplace transform of a step response
export const calculateLaplaceTransform = (
  s: number, 
  a: number
): number => {
  return 1 / (s * (s + a));
};

// Calculate differential equation solution using Euler method
export const solveEulerMethod = (
  initialValue: number,
  timeStep: number,
  steps: number,
  rateFunction: (x: number, t: number) => number
): number[] => {
  const result: number[] = [initialValue];
  let currentValue = initialValue;
  
  for (let i = 0; i < steps; i++) {
    const time = i * timeStep;
    const rate = rateFunction(currentValue, time);
    currentValue += rate * timeStep;
    result.push(currentValue);
  }
  
  return result;
};

// HERMES core function: Calculate optimized boost allocation
export const calculateOptimalBoostAllocation = (
  availableBoost: number,
  profiles: Array<{
    id: string;
    score: number;
    competition: number;
    timeRemaining: number;
    currentAllocation: number;
  }>
): Array<{id: string; allocation: number}> => {
  // Calculate initial priorities
  const withPriorities = profiles.map(profile => ({
    ...profile,
    priority: calculateBoostPriority(
      profile.score,
      profile.timeRemaining,
      profile.competition
    )
  }));
  
  // Sort by priority descending
  const sorted = [...withPriorities].sort((a, b) => b.priority - a.priority);
  
  // Allocate boost proportionally to priority
  const totalPriority = sorted.reduce((sum, p) => sum + p.priority, 0);
  let remaining = availableBoost;
  
  const allocations = sorted.map(profile => {
    if (totalPriority === 0) return { id: profile.id, allocation: 0 };
    
    const optimalAllocation = (profile.priority / totalPriority) * availableBoost;
    const allocation = Math.min(remaining, optimalAllocation);
    remaining -= allocation;
    
    return {
      id: profile.id,
      allocation
    };
  });
  
  return allocations;
};
