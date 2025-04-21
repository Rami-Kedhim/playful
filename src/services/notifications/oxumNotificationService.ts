
/**
 * Oxum Notification Service
 * Handles notifications related to Oxum price validation system
 */

// Recovery mode flag
let recoveryMode = false;

export class OxumNotificationService {
  /**
   * Notify about a price validation violation
   */
  static notifyViolation(): void {
    console.warn("[Oxum] Price validation violation detected");
    // In a real app, this would send notifications to admins or log to monitoring services
  }
  
  /**
   * Notify about a critical failure
   */
  static notifyCriticalFailure(message: string): void {
    console.error(`[Oxum Critical] ${message}`);
    // In a real app, this would trigger alerts, send notifications, etc.
    
    // Enter recovery mode on critical failures
    recoveryMode = true;
    
    // Auto-exit recovery mode after 30 minutes
    setTimeout(() => {
      recoveryMode = false;
      console.log("[Oxum] Exiting recovery mode");
    }, 30 * 60 * 1000);
  }
  
  /**
   * Check if the system is currently in recovery mode
   */
  static isInRecoveryMode(): boolean {
    return recoveryMode;
  }
  
  /**
   * Enter recovery mode manually
   */
  static enterRecoveryMode(reason: string): void {
    recoveryMode = true;
    console.warn(`[Oxum] Entering recovery mode: ${reason}`);
  }
  
  /**
   * Exit recovery mode manually
   */
  static exitRecoveryMode(): void {
    recoveryMode = false;
    console.log("[Oxum] Exiting recovery mode");
  }
}
