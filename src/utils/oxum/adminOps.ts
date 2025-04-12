
import { GLOBAL_UBX_RATE } from './constants';

// Emergency override flag - only to be used in exceptional circumstances
let emergencyOverrideActive = false;

// Transaction log for audit purposes
const transactionLog: {
  timestamp: Date;
  price: number;
  details: string;
  userId?: string;
  override: boolean;
}[] = [];

/**
 * Activates emergency override mode for price validation
 * This should only be used by admins in exceptional circumstances
 * @param adminId Admin user ID authorizing the override
 * @param reason Documented reason for override
 * @returns Success status of the override activation
 */
export function emergencyPriceValidationOverride(
  adminId: string,
  reason: string
): boolean {
  // In a real system, we would verify admin permissions here
  
  // Log the override activation
  transactionLog.push({
    timestamp: new Date(),
    price: GLOBAL_UBX_RATE,
    details: `OVERRIDE ACTIVATED: ${reason}`,
    userId: adminId,
    override: true
  });
  
  // Set the override flag
  emergencyOverrideActive = true;
  
  // Add expiration timer - auto disable after 1 hour
  setTimeout(() => {
    if (emergencyOverrideActive) {
      emergencyOverrideActive = false;
      transactionLog.push({
        timestamp: new Date(),
        price: GLOBAL_UBX_RATE,
        details: 'OVERRIDE AUTO-DEACTIVATED: Timeout',
        userId: adminId,
        override: true
      });
    }
  }, 60 * 60 * 1000); // 1 hour
  
  return true;
}

/**
 * Checks if emergency override is currently active
 */
export function isEmergencyOverrideActive(): boolean {
  return emergencyOverrideActive;
}

/**
 * Logs a global price transaction for audit purposes
 */
export function logGlobalPriceTransaction(
  price: number,
  userId: string,
  details: string
): void {
  transactionLog.push({
    timestamp: new Date(),
    price,
    details,
    userId,
    override: emergencyOverrideActive
  });
}

/**
 * Get transaction log for auditing
 * In a real system, this would have pagination and filtering
 */
export function getTransactionLog(limit = 100): typeof transactionLog {
  return transactionLog.slice(-limit);
}
