
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

/**
 * Health monitoring for the Oxum Pricing System
 * Tracks system state and validation failures
 */

// System health tracking
let validationFailures = 0;
let consecutiveFailures = 0;
let lastValidationTime: Date | null = null;
let systemHealthy = true;

/**
 * Get the current health status of the Oxum pricing system
 */
export function getOxumPriceSystemHealth(): { 
  healthy: boolean;
  failures: number;
  consecutiveFailures: number;
  lastValidationTime: Date | null;
} {
  return {
    healthy: systemHealthy,
    failures: validationFailures,
    consecutiveFailures,
    lastValidationTime
  };
}

/**
 * Record a successful validation
 * Resets the consecutive failures counter and may restore system health
 */
export function recordSuccessfulValidation(): void {
  // Update system health tracking
  lastValidationTime = new Date();
  
  // Reset consecutive failures counter on success
  consecutiveFailures = 0;
  
  // If system was unhealthy but we have a successful validation, restore health
  if (!systemHealthy && consecutiveFailures === 0) {
    systemHealthy = true;
    OxumNotificationService.notifySystemHealthRestored();
  }
}

/**
 * Record a validation failure
 * Increments failure counters and may degrade system health
 */
export function recordValidationFailure(): void {
  // Update system health tracking
  lastValidationTime = new Date();
  
  // Track failures
  validationFailures++;
  consecutiveFailures++;
  
  // Update system health if too many consecutive failures
  if (consecutiveFailures > 5) {
    systemHealthy = false;
    OxumNotificationService.notifySystemHealthIssue(
      `Oxum Price Validation System health degraded: ${consecutiveFailures} consecutive validation failures`
    );
  }
}

/**
 * Reset system health after admin intervention
 */
export function resetSystemHealth(): void {
  consecutiveFailures = 0;
  systemHealthy = true;
}
