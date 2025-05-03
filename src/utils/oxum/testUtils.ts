
import { GLOBAL_UBX_RATE, PRICE_TOLERANCE } from "./constants";

// Define a tolerance for price comparisons
const PRICE_TOLERANCE_LOCAL = PRICE_TOLERANCE || 0.001;

// Function to check if a price is within the acceptable tolerance
export const isPriceWithinTolerance = (price1: number, price2: number): boolean => {
  return Math.abs(price1 - price2) <= PRICE_TOLERANCE_LOCAL;
};

// Function to run a single test and return the result
export const runTest = (testName: string, testFunction: () => boolean | void): { success: boolean; message: string } => {
  try {
    const result = testFunction();
    const success = result === undefined ? true : result;

    if (success) {
      return { success: true, message: `${testName} passed` };
    } else {
      return { success: false, message: `${testName} failed` };
    }
  } catch (error: any) {
    return { success: false, message: `${testName} threw an error: ${error.message}` };
  }
};

// Function to compare two prices and return a boolean indicating if they are equal within a tolerance
export const comparePrices = (price1: number, price2: number): boolean => {
  return Math.abs(price1 - price2) < PRICE_TOLERANCE_LOCAL;
};
