
/**
 * Utility functions for mathematical operations
 */

/**
 * Calculate percentage change between two values
 * @param current The current value
 * @param previous The previous value
 * @returns The percentage change
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format a number as a percentage string
 * @param value The value to format
 * @param decimals The number of decimal places
 * @returns Formatted percentage string with % sign
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate weighted average of a set of values
 * @param values Array of values
 * @param weights Array of weights
 * @returns The weighted average
 */
export const weightedAverage = (values: number[], weights: number[]): number => {
  if (values.length !== weights.length || values.length === 0) {
    return 0;
  }
  
  const sum = values.reduce((acc, val, i) => acc + val * weights[i], 0);
  const weightSum = weights.reduce((acc, w) => acc + w, 0);
  
  return sum / weightSum;
};

/**
 * Calculate moving average
 * @param values Array of values
 * @param window Size of the window
 * @returns Array of moving averages
 */
export const movingAverage = (values: number[], window: number): number[] => {
  if (values.length < window) {
    return values;
  }
  
  const result: number[] = [];
  for (let i = 0; i <= values.length - window; i++) {
    const windowSlice = values.slice(i, i + window);
    const avg = windowSlice.reduce((sum, val) => sum + val, 0) / window;
    result.push(avg);
  }
  
  return result;
};
