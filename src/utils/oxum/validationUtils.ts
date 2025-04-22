
import { GLOBAL_UBX_RATE } from './constants';
import { validateGlobalPrice } from './globalPricing';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';
import { recordSuccessfulValidation, recordValidationFailure } from './healthMonitor';

/**
 * Resilient Price Comparison with tolerance
 * Compares user price with target price allowing for small floating point deviations
 */
export function compareWithTolerance(userPrice: number, targetPrice: number): boolean {
  // Calculate allowed deviation range
  const deviation = Math.abs(userPrice - targetPrice);
  const percentDeviation = (deviation / targetPrice);
  
  const PRICE_TOLERANCE = 0.001; // Tolerance for floating point errors (0.1%)
  
  // Check if within tolerance
  return percentDeviation <= PRICE_TOLERANCE;
}

/**
 * Validate price against the global price rule
 * Core validation function for Oxum Rule #001: Global Price Symmetry
 */
export function validateGlobalPriceExtended(userPrice: number, metadata?: Record<string, any>): boolean {
  try {
    // Log the price check event
    OxumPriceAnalytics.logPriceEvent(
      'price_check',
      userPrice,
      metadata,
      GLOBAL_UBX_RATE
    );
    
    // Primary validation: Exact match with tolerance
    const isValid = compareWithTolerance(userPrice, GLOBAL_UBX_RATE);
    
    if (!isValid) {
      recordValidationFailure();
      
      // Log the violation
      OxumPriceAnalytics.logPriceEvent(
        'price_violation',
        userPrice,
        {
          ...metadata,
          difference: userPrice - GLOBAL_UBX_RATE,
          percentDifference: ((userPrice - GLOBAL_UBX_RATE) / GLOBAL_UBX_RATE) * 100
        },
        GLOBAL_UBX_RATE
      );
      
      // Trigger notification
      OxumNotificationService.notifyViolation();
      
      throw new Error("[Oxum Enforcement] Invalid boosting price detected. Violation of Rule #001.");
    }
    
    // If validation successful, update health tracking
    recordSuccessfulValidation();
    
    return true;
  } catch (error: any) {
    // Log validation error
    console.error("[Oxum] Price validation error:", error);
    
    // Rethrow the error
    throw error;
  }
}

/**
 * Resilient price validation with automatic retries
 * For critical payment paths, retry validation to handle transient issues
 */
export async function validateGlobalPriceWithRetryUtil(
  userPrice: number, 
  metadata?: Record<string, any>
): Promise<boolean> {
  const MAX_RETRY_ATTEMPTS = 3;
  let attempts = 0;
  let lastError: Error | null = null;
  
  while (attempts < MAX_RETRY_ATTEMPTS) {
    try {
      return validateGlobalPriceExtended(userPrice, {
        ...metadata,
        retryAttempt: attempts
      });
    } catch (error: any) {
      lastError = error;
      attempts++;
      
      // Wait before retry with exponential backoff
      if (attempts < MAX_RETRY_ATTEMPTS) {
        await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempts)));
      }
    }
  }
  
  // All attempts failed - log critical error and throw
  OxumPriceAnalytics.logPriceEvent(
    'critical_price_failure',
    userPrice,
    {
      ...metadata,
      attempts,
      error: lastError?.message
    },
    GLOBAL_UBX_RATE
  );
  
  // Notify about critical failure
  OxumNotificationService.notifyCriticalFailure(`Price validation failed after ${attempts} attempts`);
  
  if (lastError) throw lastError;
  throw new Error("[Oxum Enforcement] Price validation failed after multiple attempts");
}
