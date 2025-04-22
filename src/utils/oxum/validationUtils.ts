// Validation utilities for Oxum protocol
import { OxumValidationError } from './errors';
import { OxumValidationContext, ValidationResult } from './types';

// Constants for validation rules
const MAX_PRICE_DELTA = 0.15; // 15% maximum price deviation
const MIN_TRANSACTION_VALUE = 0.01; // Minimum transaction value in UBX
const MAX_TRANSACTION_VALUE = 100000; // Maximum transaction value in UBX

/**
 * Validates a price against the Oxum global pricing rules
 * @param price The price to validate
 * @param context Optional validation context
 * @returns True if valid, throws OxumValidationError if invalid
 */
export function validateGlobalPrice(
  price: number,
  context?: OxumValidationContext
): boolean {
  if (typeof price !== 'number' || isNaN(price)) {
    console.log('Validation failed: Price must be a valid number');
    throw new OxumValidationError('Price must be a valid number');
  }

  if (price < MIN_TRANSACTION_VALUE) {
    console.log(`Validation failed: Price ${price} is below minimum threshold ${MIN_TRANSACTION_VALUE}`);
    throw new OxumValidationError(`Price ${price} is below minimum threshold ${MIN_TRANSACTION_VALUE}`);
  }

  if (price > MAX_TRANSACTION_VALUE) {
    console.log(`Validation failed: Price ${price} exceeds maximum threshold ${MAX_TRANSACTION_VALUE}`);
    throw new OxumValidationError(`Price ${price} exceeds maximum threshold ${MAX_TRANSACTION_VALUE}`);
  }

  // Additional context-specific validations
  if (context?.marketReference && typeof context.marketReference === 'number') {
    const delta = Math.abs(price - context.marketReference) / context.marketReference;
    if (delta > MAX_PRICE_DELTA) {
      console.log(`Validation failed: Price ${price} deviates from market reference ${context.marketReference} by ${(delta * 100).toFixed(2)}%`);
      throw new OxumValidationError(`Price deviates from market reference by ${(delta * 100).toFixed(2)}%`);
    }
  }

  console.log(`Validation succeeded: Price ${price} is valid`);
  return true;
}

/**
 * Validates a transaction against Oxum protocol rules
 * @param transaction The transaction to validate
 * @returns Validation result object
 */
export function validateTransaction(transaction: any): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: []
  };

  try {
    // Check if transaction has required fields
    if (!transaction.amount || typeof transaction.amount !== 'number') {
      result.valid = false;
      result.errors.push('Transaction must have a valid amount');
    }

    // Validate price if present
    if (transaction.price) {
      try {
        validateGlobalPrice(transaction.price);
      } catch (error) {
        result.valid = false;
        if (error instanceof OxumValidationError) {
          result.errors.push(error.message);
        } else {
          result.errors.push('Invalid price in transaction');
        }
      }
    }

    // Check for required metadata
    if (!transaction.metadata || typeof transaction.metadata !== 'object') {
      result.valid = false;
      result.errors.push('Transaction must include metadata');
    }

    console.log('Transaction validation completed:', result.valid ? 'Success' : 'Failed');
    return result;
  } catch (error) {
    console.error('Unexpected error during transaction validation:', error);
    result.valid = false;
    result.errors.push('Unexpected validation error');
    return result;
  }
}

/**
 * Validates a boost package against Oxum protocol rules
 * @param boostPackage The boost package to validate
 * @returns True if valid, throws OxumValidationError if invalid
 */
export function validateBoostPackage(boostPackage: any): boolean {
  if (!boostPackage || typeof boostPackage !== 'object') {
    console.log('Validation failed: Invalid boost package object');
    throw new OxumValidationError('Invalid boost package object');
  }

  if (!boostPackage.id) {
    console.log('Validation failed: Boost package missing ID');
    throw new OxumValidationError('Boost package missing ID');
  }

  if (!boostPackage.price && !boostPackage.price_ubx) {
    console.log('Validation failed: Boost package missing price');
    throw new OxumValidationError('Boost package missing price');
  }

  // Validate price if present
  if (boostPackage.price_ubx) {
    validateGlobalPrice(Number(boostPackage.price_ubx));
  } else if (boostPackage.price) {
    validateGlobalPrice(Number(boostPackage.price));
  }

  console.log(`Validation succeeded: Boost package ${boostPackage.id} is valid`);
  return true;
}
