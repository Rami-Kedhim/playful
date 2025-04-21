
import { OxumNotificationService } from '../../services/notifications/oxumNotificationService';

// Administrative override for price validation
let adminOverrideActive = false;

/**
 * Emergency override for price validation
 * Allows administrators to bypass validation in emergency situations
 * 
 * @param enable Whether to enable or disable the override
 * @param reason The reason for enabling the override
 * @param adminId The ID of the admin performing the action
 * @returns Boolean indicating success of the operation
 */
export function emergencyPriceValidationOverride(
  enable: boolean, 
  reason: string = 'Unspecified', 
  adminId: string = 'system'
): boolean {
  // In a real system, this would log the action and require proper authorization
  
  if (enable) {
    adminOverrideActive = true;
    OxumNotificationService.enterRecoveryMode(`Admin override: ${reason} (by ${adminId})`);
    console.warn(`[Oxum Admin] Price validation override ENABLED: ${reason} by ${adminId}`);
    return true;
  } else {
    adminOverrideActive = false;
    OxumNotificationService.exitRecoveryMode();
    console.info(`[Oxum Admin] Price validation override DISABLED by ${adminId}`);
    return true;
  }
}

/**
 * Check if admin override is currently active
 */
export function isOverrideActive(): boolean {
  return adminOverrideActive;
}

/**
 * Reset the system to normal operation
 * Clears all emergency states and overrides
 */
export function resetSystemState(): boolean {
  adminOverrideActive = false;
  OxumNotificationService.exitRecoveryMode();
  console.info("[Oxum Admin] System state reset to normal operation");
  return true;
}
