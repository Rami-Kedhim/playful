
// Oxum Boost Utilities
// Helper functions for visibility and boost calculations

/**
 * Calculate visibility decay over time
 */
export const calculateVisibilityDecay = (
  initialVisibility: number,
  decayConstant: number,
  timeElapsedHours: number
): number => {
  // Exponential decay formula
  const remainingVisibility = initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
  return Math.max(Math.round(remainingVisibility), 0);
};

/**
 * Calculate dynamic decay constant based on system load
 */
export const calculateDynamicDecayConstant = (
  baseConstant: number,
  systemLoad: number,
  timeElapsedHours: number
): number => {
  // Increase decay rate when system is more loaded or after long periods
  const loadFactor = 1 + (systemLoad * 0.5);
  const timeFactor = timeElapsedHours > 12 ? 1.2 : 1;
  
  return baseConstant * loadFactor * timeFactor;
};

/**
 * Calculate boost score
 */
export const calculateBoostScore = (
  maxEffect: number,
  aggressionFactor: number,
  currentValue: number,
  optimalRange: [number, number]
): number => {
  // Calculate distance from optimal range
  const [min, max] = optimalRange;
  const midpoint = (min + max) / 2;
  
  // Distance from midpoint of optimal range
  const distance = Math.abs(currentValue - midpoint);
  const rangeWidth = (max - min) / 2;
  
  // Calculate score reduction
  if (distance <= rangeWidth) {
    // Within optimal range, full score
    return maxEffect;
  } else {
    // Outside optimal range, apply decay
    const normalizedDistance = distance - rangeWidth;
    const reduction = normalizedDistance * aggressionFactor;
    return Math.max(Math.round(maxEffect - reduction), 0);
  }
};

/**
 * Get optimal time window for visibility
 */
export const getOptimalTimeWindow = (): [number, number] => {
  // This would be dynamic based on user data in production
  // For now, return fixed window (6pm - 11pm)
  return [18, 23];
};

/**
 * Calculate fair boost duration
 */
export const calculateFairBoostDuration = (
  activeProfileCount: number,
  systemLoad: number
): number => {
  // Base duration in hours
  const baseDuration = 8;
  
  // Reduce duration when more profiles are active or system is loaded
  const profileFactor = Math.max(0.5, 1 - (activeProfileCount / 1000));
  const loadFactor = Math.max(0.5, 1 - systemLoad);
  
  return Math.max(Math.round(baseDuration * profileFactor * loadFactor), 1);
};

/**
 * Calculate projected visibility improvement
 */
export const calculateProjectedVisibility = (
  currentVisibility: number,
  boostPower: number,
  profilePopularity: number = 0.5
): number => {
  const baseIncrease = boostPower * 10;
  const popularityMultiplier = 0.75 + (profilePopularity * 0.5); // 0.75 - 1.25
  
  const projectedVisibility = currentVisibility + (baseIncrease * popularityMultiplier);
  return Math.min(Math.round(projectedVisibility), 100);
};

/**
 * Calculate boost cost
 */
export const calculateBoostCost = (
  boostPower: number,
  duration: number,
  baseRate: number = 10
): number => {
  return Math.round(boostPower * duration * baseRate);
};

/**
 * Check if boost is eligible for discounts
 */
export const checkBoostDiscountEligibility = (
  userBoostHistory: { timestamp: number, power: number }[],
  currentTime: number = Date.now()
): { eligible: boolean; discountRate: number; reason: string } => {
  // No boosts in the last 7 days = eligible for discount
  const lastWeek = currentTime - (7 * 24 * 60 * 60 * 1000);
  const recentBoosts = userBoostHistory.filter(boost => boost.timestamp > lastWeek);
  
  if (recentBoosts.length === 0) {
    return {
      eligible: true,
      discountRate: 0.2, // 20% discount
      reason: 'First boost this week'
    };
  }
  
  // Multiple boosts in a single day = eligible for bundling discount
  const today = new Date(currentTime).setHours(0, 0, 0, 0);
  const boostsToday = userBoostHistory.filter(boost => 
    new Date(boost.timestamp).setHours(0, 0, 0, 0) === today
  );
  
  if (boostsToday.length >= 2) {
    return {
      eligible: true,
      discountRate: 0.15, // 15% discount
      reason: 'Multiple boosts today'
    };
  }
  
  return {
    eligible: false,
    discountRate: 0,
    reason: 'No discount available'
  };
};
