
/**
 * Boost Value Calculation Utilities
 */

/**
 * Evaluates the monetary value and ROI of a boost
 */
export const evaluateBoostValue = (
  boostCost: number,
  expectedImpressions: number,
  conversionRate: number = 0.02,
  averageValue: number = 100
) => {
  // Calculate expected conversions
  const expectedConversions = expectedImpressions * conversionRate;
  
  // Calculate expected revenue
  const expectedRevenue = expectedConversions * averageValue;
  
  // Calculate ROI
  const roi = ((expectedRevenue - boostCost) / boostCost) * 100;
  
  return {
    cost: boostCost,
    expectedImpressions,
    expectedConversions,
    expectedRevenue,
    roi,
    recommendation: roi > 100 ? 'Highly Recommended' : 
                   roi > 50 ? 'Recommended' : 
                   roi > 0 ? 'Consider' : 'Not Recommended',
    valueScore: Math.min(Math.max(roi / 2, 0), 100)
  };
};

export default evaluateBoostValue;
