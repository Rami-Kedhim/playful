
/**
 * HERMES Mathematical Utility Functions
 * 
 * Advanced mathematical functions for the HERMES optimization system
 */

// Calculate the dynamic decay constant based on user activity patterns
export const calculateDynamicDecayConstant = (
  baseDecayConstant: number,
  systemLoad: number,
  timeElapsed: number = 0,
  activityIntensity: number = 50
): number => {
  const base = 0.1;
  const activityFactor = Math.min(1, Math.max(0.1, activityIntensity / 100));
  const timeFactor = timeElapsed > 0 ? Math.exp(-0.05 * timeElapsed) : 1;
  
  return base * (1 + baseDecayConstant * timeFactor * activityFactor);
};

// Calculate visibility decay over time
export const calculateVisibilityDecay = (
  initialVisibility: number,
  decayConstant: number,
  timeElapsedHours: number
): number => {
  return initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
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

// Calculate boost score based on time of day
export const calculateBoostScore = (
  maxBoostEffect: number,
  aggressionFactor: number,
  currentHour: number,
  optimalTimeWindow: { start: number, peak: number, end: number }
): number => {
  const { start, peak, end } = optimalTimeWindow;
  
  // If within optimal window
  if (currentHour >= start && currentHour <= end) {
    const distFromPeak = Math.abs(currentHour - peak);
    const windowSize = (end - start) / 2;
    
    // Score decreases as we move away from peak time
    return maxBoostEffect * Math.pow(1 - (distFromPeak / windowSize), aggressionFactor);
  }
  
  // Outside optimal window, calculate lower score
  const distFromWindow = Math.min(
    Math.abs(currentHour - start),
    Math.abs(currentHour - end)
  );
  
  return Math.max(30, maxBoostEffect * Math.exp(-distFromWindow * 0.3));
};

// Get optimal time window based on current day
export const getOptimalTimeWindow = (): { start: number, peak: number, end: number } => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Weekend (Friday evening through Sunday)
  if (day === 5 && now.getHours() >= 18 || day === 6 || day === 0) {
    return { start: 20, peak: 22.5, end: 2 }; // 8PM to 2AM, peak at 10:30PM
  }
  
  // Weekday
  return { start: 19, peak: 21, end: 23 }; // 7PM to 11PM, peak at 9PM
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
  timeSinceLastTop: number,
  boostScore: number,
  competitionLevel: number = 5
): number => {
  // Base priority from boost score (0-100)
  const basePriority = boostScore * 0.6;
  
  // Urgency factor based on time since last top position
  const urgencyFactor = Math.min(25, timeSinceLastTop * 5);
  
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
      profile.timeRemaining,
      profile.score,
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
