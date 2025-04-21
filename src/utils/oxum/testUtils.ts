
import { validateGlobalPrice, GLOBAL_UBX_RATE, PRICE_TOLERANCE } from './globalPricing';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';

export interface TestResult {
  success: boolean;
  message: string;
  details?: any;
  timestamp?: Date;
}

/**
 * Runs a comprehensive self-test on the Oxum pricing system
 */
export function runPricingSystemSelfTest(): {
  success: boolean;
  results: TestResult[];
  testsPassed?: number;
  failedTests?: number;
} {
  const results: TestResult[] = [];
  
  // Test 1: Exact match should pass
  try {
    const exactMatchResult = validateGlobalPrice(GLOBAL_UBX_RATE);
    results.push({
      success: exactMatchResult === true,
      message: 'Exact match validation passed',
      details: { price: GLOBAL_UBX_RATE },
      timestamp: new Date()
    });
  } catch (error: any) {
    results.push({
      success: false,
      message: 'Exact match validation failed unexpectedly',
      details: { error: error.message },
      timestamp: new Date()
    });
  }
  
  // Clear previous analytics events for a clean slate
  OxumPriceAnalytics.clearEvents();
  
  // Test 2: Price within tolerance should pass
  const toleranceAmount = GLOBAL_UBX_RATE * (1 + (PRICE_TOLERANCE / 2));
  try {
    const toleranceResult = validateGlobalPrice(toleranceAmount);
    results.push({
      success: toleranceResult === true,
      message: 'Tolerance validation passed',
      details: { price: toleranceAmount },
      timestamp: new Date()
    });
  } catch (error: any) {
    results.push({
      success: false,
      message: 'Tolerance validation failed unexpectedly',
      details: { 
        error: error.message,
        tolerance: PRICE_TOLERANCE,
        testPrice: toleranceAmount
      },
      timestamp: new Date()
    });
  }
  
  // Test 3: Price outside tolerance should fail
  const outsideToleranceAmount = GLOBAL_UBX_RATE * (1 + (PRICE_TOLERANCE * 2));
  try {
    validateGlobalPrice(outsideToleranceAmount);
    results.push({
      success: false,
      message: 'Out of tolerance validation incorrectly passed',
      details: { price: outsideToleranceAmount },
      timestamp: new Date()
    });
  } catch (error: any) {
    results.push({
      success: true,
      message: 'Out of tolerance validation correctly failed',
      details: { error: error.message },
      timestamp: new Date()
    });
  }
  
  // Determine if all tests passed
  const allTestsPassed = results.every(result => result.success);
  const testsPassed = results.filter(result => result.success).length;
  const failedTests = results.filter(result => !result.success).length;
  
  return {
    success: allTestsPassed,
    results: results,
    testsPassed,
    failedTests
  };
}
