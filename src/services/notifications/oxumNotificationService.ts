
/**
 * Service for handling Oxum system notifications and alerts
 */
export class OxumNotificationService {
  private static instance: OxumNotificationService;
  private recoveryMode = false;
  private alertHandlers: Array<(message: string, level: 'info' | 'warning' | 'error') => void> = [];
  private violationCount = 0;
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): OxumNotificationService {
    if (!OxumNotificationService.instance) {
      OxumNotificationService.instance = new OxumNotificationService();
    }
    return OxumNotificationService.instance;
  }
  
  /**
   * Register an alert handler
   */
  public registerAlertHandler(
    handler: (message: string, level: 'info' | 'warning' | 'error') => void
  ): void {
    this.alertHandlers.push(handler);
  }
  
  /**
   * Send a notification to all registered handlers
   */
  private notify(message: string, level: 'info' | 'warning' | 'error'): void {
    this.alertHandlers.forEach(handler => handler(message, level));
    
    // Log to console as fallback
    if (level === 'error') {
      console.error(`[Oxum Notification] ${message}`);
    } else if (level === 'warning') {
      console.warn(`[Oxum Notification] ${message}`);
    } else {
      console.info(`[Oxum Notification] ${message}`);
    }
  }
  
  /**
   * Notify about a price validation violation
   */
  public static notifyViolation(): void {
    const instance = OxumNotificationService.getInstance();
    instance.violationCount++;
    
    // If multiple violations, escalate to warning
    const level = instance.violationCount > 3 ? 'warning' : 'info';
    
    instance.notify(
      `Price validation violation detected (${instance.violationCount} occurrences)`,
      level
    );
    
    // If violations exceed threshold, activate recovery mode
    if (instance.violationCount > 10 && !instance.recoveryMode) {
      instance.activateRecoveryMode();
    }
  }
  
  /**
   * Notify about a critical failure
   */
  public static notifyCriticalFailure(details: string): void {
    const instance = OxumNotificationService.getInstance();
    instance.notify(
      `CRITICAL OXUM FAILURE: ${details}`,
      'error'
    );
    
    // Automatically activate recovery mode on critical failure
    instance.activateRecoveryMode();
  }
  
  /**
   * Activate system recovery mode
   */
  private activateRecoveryMode(): void {
    this.recoveryMode = true;
    this.notify(
      'Oxum system entering RECOVERY MODE - strict price enforcement active',
      'warning'
    );
    
    // In a real system, this would trigger admin alerts
  }
  
  /**
   * Deactivate system recovery mode
   */
  public static deactivateRecoveryMode(): void {
    const instance = OxumNotificationService.getInstance();
    instance.recoveryMode = false;
    instance.violationCount = 0;
    instance.notify(
      'Oxum system exiting RECOVERY MODE - returning to normal operation',
      'info'
    );
  }
  
  /**
   * Check if system is in recovery mode
   */
  public static isInRecoveryMode(): boolean {
    return OxumNotificationService.getInstance().recoveryMode;
  }
}

// Export instance for convenience
export default OxumNotificationService.getInstance();
