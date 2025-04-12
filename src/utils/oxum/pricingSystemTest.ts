
import { validateGlobalPrice, GLOBAL_UBX_RATE, runPricingSystemSelfTest } from './globalPricing';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';

/**
 * Comprehensive test suite for Oxum Global Pricing enforcement
 */
export class OxumPricingSystemTest {
  static async runAllTests(): Promise<{
    totalTests: number;
    passed: number;
    failed: number;
    results: Array<{
      name: string;
      passed: boolean;
      error?: string;
    }>;
  }> {
    const results: Array<{
      name: string;
      passed: boolean;
      error?: string;
    }> = [];
    
    // Clear analytics before tests
    OxumPriceAnalytics.clearEvents();
    
    try {
      // Test 1: Valid price
      try {
        validateGlobalPrice(GLOBAL_UBX_RATE);
        results.push({ name: "Valid price validation", passed: true });
      } catch (error) {
        results.push({ 
          name: "Valid price validation", 
          passed: false, 
          error: error instanceof Error ? error.message : String(error)
        });
      }
      
      // Test 2: Invalid price (too high)
      try {
        validateGlobalPrice(GLOBAL_UBX_RATE * 1.5);
        results.push({ 
          name: "Invalid price rejection (high)", 
          passed: false, 
          error: "Failed to reject high price" 
        });
      } catch (error) {
        results.push({ name: "Invalid price rejection (high)", passed: true });
      }
      
      // Test 3: Invalid price (too low)
      try {
        validateGlobalPrice(GLOBAL_UBX_RATE * 0.5);
        results.push({ 
          name: "Invalid price rejection (low)", 
          passed: false, 
          error: "Failed to reject low price" 
        });
      } catch (error) {
        results.push({ name: "Invalid price rejection (low)", passed: true });
      }
      
      // Test 4: Price with metadata
      try {
        validateGlobalPrice(GLOBAL_UBX_RATE, { testCase: "metadata-test" });
        results.push({ name: "Price validation with metadata", passed: true });
      } catch (error) {
        results.push({ 
          name: "Price validation with metadata", 
          passed: false, 
          error: error instanceof Error ? error.message : String(error)
        });
      }
      
      // Test 5: Verify analytics capture
      const events = OxumPriceAnalytics.getEvents();
      if (events.length >= 4) { // At least 4 events from our tests
        results.push({ name: "Analytics event capture", passed: true });
      } else {
        results.push({ 
          name: "Analytics event capture", 
          passed: false, 
          error: `Expected at least 4 events, got ${events.length}` 
        });
      }
      
      // Test 6: Run the self-test function
      const selfTestResults = runPricingSystemSelfTest();
      if (selfTestResults.success) {
        results.push({ name: "System self-test", passed: true });
      } else {
        results.push({ 
          name: "System self-test", 
          passed: false,
          error: `Self-test failed: ${selfTestResults.results.filter(r => !r.passed).map(r => r.message).join(", ")}` 
        });
      }
      
      // Test 7: Floating point precision test
      try {
        // JavaScript floating point can sometimes cause issues
        // Test with a price that's very slightly different from the target
        validateGlobalPrice(GLOBAL_UBX_RATE + 0.0000001);
        results.push({ name: "Floating point precision handling", passed: true });
      } catch (error) {
        results.push({ 
          name: "Floating point precision handling", 
          passed: false, 
          error: error instanceof Error ? error.message : String(error)
        });
      }
      
      // Test 8: Edge case - zero price
      try {
        validateGlobalPrice(0);
        results.push({ 
          name: "Zero price rejection", 
          passed: false, 
          error: "Failed to reject zero price" 
        });
      } catch (error) {
        results.push({ name: "Zero price rejection", passed: true });
      }
      
      // Test 9: Edge case - negative price
      try {
        validateGlobalPrice(-100);
        results.push({ 
          name: "Negative price rejection", 
          passed: false, 
          error: "Failed to reject negative price" 
        });
      } catch (error) {
        results.push({ name: "Negative price rejection", passed: true });
      }
      
      // Test 10: Edge case - NaN price
      try {
        validateGlobalPrice(NaN);
        results.push({ 
          name: "NaN price rejection", 
          passed: false, 
          error: "Failed to reject NaN price" 
        });
      } catch (error) {
        results.push({ name: "NaN price rejection", passed: true });
      }
      
      // Calculate summary
      const passed = results.filter(r => r.passed).length;
      const failed = results.filter(r => !r.passed).length;
      
      return {
        totalTests: results.length,
        passed,
        failed,
        results
      };
    } catch (error) {
      return {
        totalTests: results.length,
        passed: results.filter(r => r.passed).length,
        failed: results.filter(r => !r.passed).length + 1,
        results: [
          ...results,
          { 
            name: "Test suite execution", 
            passed: false, 
            error: error instanceof Error ? error.message : String(error)
          }
        ]
      };
    }
  }

  /**
   * Run a load test on the pricing system
   */
  static async runLoadTest(iterations: number = 1000): Promise<{
    success: boolean;
    totalIterations: number;
    completedIterations: number;
    averageExecutionTime: number;
    maxExecutionTime: number;
    failureRate: number;
  }> {
    const times: number[] = [];
    let failures = 0;
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      
      try {
        // Alternate between valid and invalid prices
        const price = i % 2 === 0 ? GLOBAL_UBX_RATE : GLOBAL_UBX_RATE * 1.1;
        
        try {
          validateGlobalPrice(price, { loadTest: true, iteration: i });
        } catch (error) {
          // We expect errors for invalid prices, so this is not a test failure
          if (i % 2 !== 0) {
            // This was supposed to fail, so it's actually a success
          } else {
            // This was supposed to succeed, so it's a failure
            failures++;
          }
        }
        
        const end = performance.now();
        times.push(end - start);
      } catch (error) {
        failures++;
      }
    }
    
    // Calculate statistics
    const totalTime = times.reduce((sum, time) => sum + time, 0);
    const averageTime = totalTime / times.length;
    const maxTime = Math.max(...times);
    const failureRate = (failures / iterations) * 100;
    
    return {
      success: failures === 0,
      totalIterations: iterations,
      completedIterations: iterations - failures,
      averageExecutionTime: averageTime,
      maxExecutionTime: maxTime,
      failureRate: failureRate
    };
  }
  
  /**
   * Test price edge cases
   */
  static testEdgeCases(): Array<{
    name: string;
    passed: boolean;
    error?: string;
  }> {
    const results: Array<{
      name: string;
      passed: boolean;
      error?: string;
    }> = [];
    
    // Test edge cases beyond the regular test suite
    const edgeCases = [
      { name: "Maximum safe integer", value: Number.MAX_SAFE_INTEGER },
      { name: "Very small number", value: 0.0000001 },
      { name: "Infinity", value: Infinity },
      { name: "String as number", value: "1000" as any }, // Intentional type error for testing
      { name: "Undefined", value: undefined as any }, // Intentional type error for testing
      { name: "Boolean true", value: true as any }, // Intentional type error for testing
      { name: "Exponential notation", value: 1e3 }, // This is actually 1000
    ];
    
    for (const testCase of edgeCases) {
      try {
        // All should fail except exponential notation which evaluates to 1000
        if (testCase.name === "Exponential notation") {
          validateGlobalPrice(testCase.value);
          results.push({ name: `Edge case: ${testCase.name}`, passed: true });
        } else {
          validateGlobalPrice(testCase.value);
          results.push({ 
            name: `Edge case: ${testCase.name}`, 
            passed: false, 
            error: `Failed to reject ${testCase.name}` 
          });
        }
      } catch (error) {
        if (testCase.name === "Exponential notation") {
          results.push({ 
            name: `Edge case: ${testCase.name}`, 
            passed: false, 
            error: `Incorrectly rejected ${testCase.name}: ${error instanceof Error ? error.message : String(error)}` 
          });
        } else {
          results.push({ name: `Edge case: ${testCase.name}`, passed: true });
        }
      }
    }
    
    return results;
  }
}
