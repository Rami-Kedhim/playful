
/**
 * Oxum Global Pricing System
 * Enforces Oxum Rule #001: Global Price Symmetry
 * 
 * This module re-exports all Oxum pricing functionality from modularized files
 */

// Import from constants for local use
import { GLOBAL_UBX_RATE } from './constants';

// Re-export from constants
export { GLOBAL_UBX_RATE, PRICE_TOLERANCE, MAX_RETRY_ATTEMPTS } from './constants';

// Re-export from healthMonitor
export { getOxumPriceSystemHealth } from './healthMonitor';

// Re-export from validationUtils
export { 
  validateGlobalPrice,
  validateGlobalPriceWithRetry,
  compareWithTolerance
} from './validationUtils';

// Re-export from testUtils
export { runPricingSystemSelfTest } from './testUtils';

// Re-export from adminOps
export {
  emergencyPriceValidationOverride,
  logGlobalPriceTransaction
} from './adminOps';

// Simple helper function for getting the boost price
export function getBoostingPriceUBX(): number {
  // Use the constant directly after importing it at the top
  return GLOBAL_UBX_RATE;
}
