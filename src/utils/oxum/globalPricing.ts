
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

// Oxum Boosting Global Pricing Enforcement
// This module enforces Oxum Rule #001: Global Price Symmetry

// === CONSTANTS ===
export const GLOBAL_UBX_RATE = 1000; // Boosting price = 1000 UBX for all

// === FUNCTION: Get Boosting Price ===
export function getBoostingPriceUBX(): number {
  return GLOBAL_UBX_RATE;
}

// === FUNCTION: Validate Price Enforcement ===
export function validateGlobalPrice(userPrice: number, metadata?: Record<string, any>): boolean {
  // Log the price check event
  OxumPriceAnalytics.logPriceEvent(
    'price_check',
    userPrice,
    metadata,
    GLOBAL_UBX_RATE
  );
  
  if (userPrice !== GLOBAL_UBX_RATE) {
    // Log the violation
    OxumPriceAnalytics.logPriceEvent(
      'price_violation',
      userPrice,
      {
        ...metadata,
        difference: userPrice - GLOBAL_UBX_RATE,
        percentDifference: ((userPrice - GLOBAL_UBX_RATE) / GLOBAL_UBX_RATE) * 100
      },
      GLOBAL_UBX_RATE
    );
    
    // Trigger notification
    OxumNotificationService.notifyViolation();
    
    throw new Error("[Oxum Enforcement] Invalid boosting price detected. Violation of Rule #001.");
  }
  
  return true;
}

// === FUNCTION: Log Successful Transaction ===
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
