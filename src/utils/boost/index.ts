
// Export the calculateBoostScore function only once to resolve the ambiguity
export { calculateBoostScore } from './boostCalculation';
export * from './boostCalculation'; // This will export everything else from boostCalculation

// We'll export stubs for the missing modules to fix the build errors
export const BoostMetrics = {
  calculate: () => 0
};

export const BoostManager = {
  createBoost: () => ({ id: 'stub' }),
  getBoosts: () => []
};

export const boostMetricConfiguration = {
  weights: {
    reviews: 0.3,
    rating: 0.2,
    completeness: 0.5
  }
};

export const boostRankTitles = [
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond'
];

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export const calculateRecommendedBoostAmount = (score: number) => {
  const baseAmount = 50;
  const factor = Math.max(0.5, Math.min(2.0, score / 50));
  return Math.round(baseAmount * factor);
};
