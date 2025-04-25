
/**
 * Analytics Utilities for the UberCore System
 * Provides tools for analyzing user behavior and system performance
 */

/**
 * Calculate engagement score based on user interactions
 */
export const calculateEngagementScore = (
  impressions: number,
  views: number,
  interactions: number,
  bookmarks: number,
  messages: number
): number => {
  // Weights for different interaction types
  const viewWeight = 1;
  const interactionWeight = 3;
  const bookmarkWeight = 5;
  const messageWeight = 10;
  
  // Prevent division by zero
  if (impressions === 0) return 0;
  
  // Calculate engagement components
  const viewRate = views / impressions;
  const interactionRate = interactions / impressions;
  const bookmarkRate = bookmarks / impressions;
  const messageRate = messages / impressions;
  
  // Weighted score calculation
  const score = (
    (viewRate * viewWeight) +
    (interactionRate * interactionWeight) +
    (bookmarkRate * bookmarkWeight) +
    (messageRate * messageWeight)
  ) * 100;
  
  // Normalize to 0-100 range
  return Math.min(100, Math.max(0, score));
};

/**
 * Calculate boost effectiveness
 */
export const calculateBoostEffectiveness = (
  preBoostImpressions: number,
  postBoostImpressions: number,
  boostLevel: number
): number => {
  // Prevent division by zero
  if (preBoostImpressions === 0 || boostLevel === 0) return 0;
  
  // Calculate percentage increase
  const percentIncrease = ((postBoostImpressions - preBoostImpressions) / preBoostImpressions) * 100;
  
  // Calculate effectiveness ratio (percentage increase per boost level)
  const effectivenessRatio = percentIncrease / boostLevel;
  
  return effectivenessRatio;
};

/**
 * Calculate optimal boost investment
 */
export const calculateOptimalBoostInvestment = (
  currentEngagement: number,
  historicalEffectiveness: number,
  budget: number
): number => {
  // Base calculation for recommended boost level
  const baseRecommendation = Math.sqrt(budget * historicalEffectiveness);
  
  // Adjust based on current engagement
  let adjustedRecommendation = baseRecommendation;
  
  // Lower recommendation if engagement is already high
  if (currentEngagement > 75) {
    adjustedRecommendation *= 0.8;
  } 
  // Increase recommendation if engagement is low
  else if (currentEngagement < 30) {
    adjustedRecommendation *= 1.2;
  }
  
  // Ensure we stay within budget
  return Math.min(budget, Math.max(1, adjustedRecommendation));
};

/**
 * Generate analytics time ranges
 */
export const getAnalyticsTimeRanges = () => {
  const now = new Date();
  
  // Generate start dates for various time ranges
  const day = new Date(now);
  day.setHours(0, 0, 0, 0);
  
  const week = new Date(now);
  week.setDate(week.getDate() - week.getDay());
  week.setHours(0, 0, 0, 0);
  
  const month = new Date(now);
  month.setDate(1);
  month.setHours(0, 0, 0, 0);
  
  const threeMonths = new Date(month);
  threeMonths.setMonth(month.getMonth() - 3);
  
  const year = new Date(month);
  year.setMonth(0);
  
  return {
    today: day,
    thisWeek: week,
    thisMonth: month,
    threeMonths,
    thisYear: year,
    allTime: null
  };
};
