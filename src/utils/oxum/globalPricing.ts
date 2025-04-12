
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

// Oxum Boosting Global Pricing Enforcement
// This module enforces Oxum Rule #001: Global Price Symmetry

// === CONSTANTS ===
export const GLOBAL_UBX_RATE = 1000; // Boosting price = 1000 UBX for all
export const PRICE_TOLERANCE = 0.001; // Tolerance for floating point errors (0.1%)
export const MAX_RETRY_ATTEMPTS = 3; // Maximum number of validation retries

// System health tracking
let validationFailures = 0;
let consecutiveFailures = 0;
let lastValidationTime: Date | null = null;
let systemHealthy = true;

// === FUNCTION: Get Boosting Price ===
export function getBoostingPriceUBX(): number {
  return GLOBAL_UBX_RATE;
}

// === FUNCTION: Resilient Price Comparison ===
function compareWithTolerance(userPrice: number, targetPrice: number): boolean {
  // Calculate allowed deviation range
  const deviation = Math.abs(userPrice - targetPrice);
  const percentDeviation = (deviation / targetPrice);
  
  // Check if within tolerance
  return percentDeviation <= PRICE_TOLERANCE;
}

// === FUNCTION: System Health Check ===
export function getOxumPriceSystemHealth(): { 
  healthy: boolean;
  failures: number;
  consecutiveFailures: number;
  lastValidationTime: Date | null;
} {
  return {
    healthy: systemHealthy,
    failures: validationFailures,
    consecutiveFailures,
    lastValidationTime
  };
}

// === FUNCTION: Validate Price Enforcement ===
export function validateGlobalPrice(userPrice: number, metadata?: Record<string, any>): boolean {
  // Update system health tracking
  lastValidationTime = new Date();
  
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
      // Track failures
      validationFailures++;
      consecutiveFailures++;
      
      // Update system health if too many consecutive failures
      if (consecutiveFailures > 5) {
        systemHealthy = false;
        OxumNotificationService.notifySystemHealthIssue(
          `Oxum Price Validation System health degraded: ${consecutiveFailures} consecutive validation failures`
        );
      }
      
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
    
    // Reset consecutive failures counter on success
    consecutiveFailures = 0;
    
    // If system was unhealthy but we have a successful validation, restore health
    if (!systemHealthy && consecutiveFailures === 0) {
      systemHealthy = true;
      OxumNotificationService.notifySystemHealthRestored();
    }
    
    return true;
  } catch (error: any) {
    // Log validation error
    console.error("[Oxum] Price validation error:", error);
    
    // Rethrow the error
    throw error;
  }
}

// === FUNCTION: Resilient Price Validation with Retry ===
export async function validateGlobalPriceWithRetry(
  userPrice: number, 
  metadata?: Record<string, any>
): Promise<boolean> {
  let attempts = 0;
  let lastError: Error | null = null;
  
  while (attempts < MAX_RETRY_ATTEMPTS) {
    try {
      return validateGlobalPrice(userPrice, {
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
  
  if (lastError) throw lastError;
  throw new Error("[Oxum Enforcement] Price validation failed after multiple attempts");
}

// === FUNCTION: Emergency Price Override (Admin Only) ===
export function emergencyPriceValidationOverride(
  adminKey: string,
  reason: string
): boolean {
  // This would normally validate against a secure admin key
  const isValidAdminKey = adminKey === process.env.OXUM_ADMIN_KEY;
  
  if (!isValidAdminKey) {
    OxumNotificationService.notifySecurityViolation("Unauthorized emergency override attempt");
    throw new Error("[Oxum Security] Unauthorized emergency override attempt");
  }
  
  // Log the override
  OxumPriceAnalytics.logPriceEvent(
    'emergency_override',
    0,
    { reason },
    undefined
  );
  
  // Reset system health
  consecutiveFailures = 0;
  systemHealthy = true;
  
  return true;
}

// === FUNCTION: Log Successful Transaction ===
export function logGlobalPriceTransaction(
  amount: number, 
  userId?: string, 
  profileId?: string,
  metadata?: Record<string, any>
): void {
  OxumPriceAnalytics.logPriceEvent(
    'price_transaction',
    amount,
    metadata,
    undefined,
    userId,
    profileId
  );
}

// === FUNCTION: Price Rule Self-Test ===
export function runPricingSystemSelfTest(): { 
  success: boolean; 
  results: Array<{test: string; passed: boolean; message?: string}>
} {
  const results = [];
  let allPassed = true;
  
  try {
    // Test 1: Exact price match
    let test1Passed = false;
    try {
      validateGlobalPrice(GLOBAL_UBX_RATE);
      test1Passed = true;
      results.push({ test: "Exact price match", passed: true });
    } catch (e) {
      results.push({ test: "Exact price match", passed: false, message: String(e) });
      allPassed = false;
    }
    
    // Test 2: Price within tolerance
    let test2Passed = false;
    try {
      validateGlobalPrice(GLOBAL_UBX_RATE * (1 + PRICE_TOLERANCE / 2));
      test2Passed = true;
      results.push({ test: "Price within tolerance", passed: true });
    } catch (e) {
      results.push({ test: "Price within tolerance", passed: false, message: String(e) });
      allPassed = false;
    }
    
    // Test 3: Price outside tolerance (should fail)
    let test3Passed = false;
    try {
      validateGlobalPrice(GLOBAL_UBX_RATE * 1.1);
      results.push({ test: "Invalid price rejection", passed: false, message: "Failed to reject invalid price" });
      allPassed = false;
    } catch (e) {
      test3Passed = true;
      results.push({ test: "Invalid price rejection", passed: true });
    }
    
    return {
      success: allPassed,
      results
    };
  } catch (error) {
    return {
      success: false,
      results: [...results, { test: "Self-test execution", passed: false, message: String(error) }]
    };
  }
}
