
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { resetSystemHealth } from './healthMonitor';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

/**
 * Emergency admin override functions for the Oxum Pricing System
 */

/**
 * Emergency Price Override (Admin Only)
 * Allows bypassing validation rules in emergency situations
 */
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
  resetSystemHealth();
  
  return true;
}

/**
 * Log a successful transaction
 * For audit trail and analytics purposes
 */
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
