
import { validateGlobalPrice } from './validationUtils';
import { GLOBAL_UBX_RATE, PRICE_TOLERANCE } from './constants';

/**
 * Price Rule Self-Test
 * Runs automated tests on the price validation system
 */
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
