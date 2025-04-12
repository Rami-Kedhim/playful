
/**
 * Oxum Global Pricing System
 * Enforces Oxum Rule #001: Global Price Symmetry
 * 
 * This module re-exports all Oxum pricing functionality from modularized files
 */

// Import constant from constants file for local use
import { GLOBAL_UBX_RATE as UBX_RATE } from './constants';

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

/**
 * Returns the standard UBX boosting price
 * Uses the constant imported directly to avoid scope issues
 * @returns {number} The global boosting price in UBX
 */
export function getBoostingPriceUBX(): number {
  // Using the locally imported constant
  return UBX_RATE;
}
