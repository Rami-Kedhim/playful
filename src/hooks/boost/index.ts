
// Main boost hook composition
export { default as useBoostManager } from './useBoostManager';

// Individual boost hooks
export * from './useBoostStatus';
export * from './useBoostAnalytics';
export * from './useBoostPurchase';
export * from './useBoostPackages';

// Utility functions
export { 
  formatBoostDuration,
  calculateBoostPrice,
  isEligibleForBoosting,
  calculateRemainingTime,
  getCurrentTimeSlot
} from '@/utils/boostCalculator';
