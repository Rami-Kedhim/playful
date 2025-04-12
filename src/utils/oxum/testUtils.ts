
import { validateGlobalPrice, GLOBAL_UBX_RATE, PRICE_TOLERANCE } from './globalPricing';

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
}

/**
 * Runs a comprehensive self-test on the Oxum pricing system
 */
export function runPricingSystemSelfTest(): TestResult[] {
  const results: TestResult[] = [];
  
  // Test 1: Exact match should pass
  try {
    const exactMatchResult = validateGlobalPrice(GLOBAL_UBX_RATE);
    results.push({
      success: exactMatchResult === true,
      message: 'Exact match validation passed',
      details: { price: GLOBAL_UBX_RATE }
    });
  } catch (error: any) {
    results.push({
      success: false,
      message: 'Exact match validation failed unexpectedly',
      details: { error: error.message }
    });
  }
  
  // Test 2: Price within tolerance should pass
  const toleranceAmount = GLOBAL_UBX_RATE * (1 + (PRICE_TOLERANCE / 2));
  try {
    const toleranceResult = validateGlobalPrice(toleranceAmount);
    results.push({
      success: toleranceResult === true,
      message: 'Tolerance validation passed',
      details: { price: toleranceAmount }
    });
  } catch (error: any) {
    results.push({
      success: false,
      message: 'Tolerance validation failed unexpectedly',
      details: { 
        error: error.message,
        tolerance: PRICE_TOLERANCE,
        testPrice: toleranceAmount
      }
    });
  }
  
  // Test 3: Price outside tolerance should fail
  const outsideToleranceAmount = GLOBAL_UBX_RATE * (1 + (PRICE_TOLERANCE * 2));
  try {
    validateGlobalPrice(outsideToleranceAmount);
    results.push({
      success: false,
      message: 'Out of tolerance validation incorrectly passed',
      details: { price: outsideToleranceAmount }
    });
  } catch (error: any) {
    results.push({
      success: true,
      message: 'Out of tolerance validation correctly failed',
      details: { error: error.message }
    });
  }
  
  return results;
}
