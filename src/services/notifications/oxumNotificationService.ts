import { toast } from '@/hooks/use-toast';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { AIAnalyticsService } from '@/services/analyticsService';

interface OxumNotificationOptions {
  // Show notifications in the UI
  showUserNotifications: boolean;
  
  // Log notifications to the console
  logToConsole: boolean;
  
  // Send notifications to admin emails (in a real app)
  notifyAdmins: boolean;
  
  // Store notifications in the database (in a real app)
  storeInDatabase: boolean;
}

/**
 * Service for handling Oxum Rule notifications and alerts
 */
export class OxumNotificationService {
  private static options: OxumNotificationOptions = {
    showUserNotifications: true,
    logToConsole: true,
    notifyAdmins: false,
    storeInDatabase: false
  };
  
  private static isInitialized = false;
  private static recoveryModeActive = false;
  
  /**
   * Initialize the notification service
   */
  static initialize(options?: Partial<OxumNotificationOptions>): void {
    if (this.isInitialized) return;
    
    if (options) {
      this.options = {
        ...this.options,
        ...options
      };
    }
    
    this.setupViolationListeners();
    this.isInitialized = true;
    
    console.log('[Oxum Notification Service] Initialized with options:', this.options);
  }
  
  /**
   * Set up listeners for price violations
   */
  private static setupViolationListeners(): void {
    // In a real app, this would use an event system
    // For now, we'll use a polling approach for demonstration
    
    let lastViolationCount = OxumPriceAnalytics.getStats().violationCount;
    
    // Check for violations every 30 seconds
    setInterval(() => {
      const currentStats = OxumPriceAnalytics.getStats();
      const newViolations = currentStats.violationCount - lastViolationCount;
      
      if (newViolations > 0) {
        this.notifyViolation(newViolations);
        lastViolationCount = currentStats.violationCount;
      }
    }, 30000);
  }
  
  /**
   * Send a notification about a rule violation
   */
  static notifyViolation(violationCount: number = 1): void {
    if (this.options.logToConsole) {
      console.warn(`[Oxum Rule Violation] ${violationCount} new violation(s) detected`);
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Rule Violation Detected",
        description: `${violationCount} new violation(s) of the Oxum Global Price Symmetry rule detected.`,
        variant: "destructive"
      });
    }
    
    if (this.options.notifyAdmins) {
      // In a real app, this would send emails or notifications to admins
      console.log("[Oxum] Admin notification would be sent here");
    }
    
    if (this.options.storeInDatabase) {
      // In a real app, this would store the notification in a database
      AIAnalyticsService.trackEvent(
        'system',
        'oxum_violation_notification',
        { 
          violationCount,
          timestamp: new Date()
        }
      );
    }
    
    // Check if we need to enter recovery mode
    this.checkAndEnterRecoveryModeIfNeeded();
  }
  
  /**
   * Send a notification about a critical pricing failure
   */
  static notifyCriticalFailure(message: string): void {
    if (this.options.logToConsole) {
      console.error(`[Oxum Critical Failure] ${message}`);
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Critical System Failure",
        description: message,
        variant: "destructive"
      });
    }
    
    if (this.options.notifyAdmins) {
      // In a real app, this would send high-priority alerts to admins
      console.error("[Oxum] Critical failure notification would be sent to admins");
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_critical_failure',
      { 
        message,
        timestamp: new Date(),
        severity: 'critical'
      }
    );
    
    // Critical failures always trigger recovery mode
    this.enterRecoveryMode();
  }
  
  /**
   * Send a compliance alert (warning about potential issues)
   */
  static notifyComplianceWarning(message: string): void {
    if (this.options.logToConsole) {
      console.warn(`[Oxum Compliance Warning] ${message}`);
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Compliance Warning",
        description: message,
        variant: "warning"
      });
    }
    
    if (this.options.notifyAdmins || this.options.storeInDatabase) {
      AIAnalyticsService.trackEvent(
        'system',
        'oxum_compliance_warning',
        { 
          message,
          timestamp: new Date()
        }
      );
    }
  }
  
  /**
   * Notify about system health issues
   */
  static notifySystemHealthIssue(message: string): void {
    if (this.options.logToConsole) {
      console.error(`[Oxum System Health] ${message}`);
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum System Health Alert",
        description: message,
        variant: "destructive"
      });
    }
    
    if (this.options.notifyAdmins) {
      // In a real app, this would trigger high-priority alerts to admins
      console.error("[Oxum] Critical system health notification would be sent to admins");
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_system_health_issue',
      { 
        message,
        timestamp: new Date(),
        severity: 'high'
      }
    );
  }
  
  /**
   * Notify when system health is restored
   */
  static notifySystemHealthRestored(): void {
    if (this.options.logToConsole) {
      console.log("[Oxum System Health] System health restored");
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum System Health Restored",
        description: "The Oxum pricing system has resumed normal operation.",
        variant: "default"
      });
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_system_health_restored',
      { timestamp: new Date() }
    );
    
    this.exitRecoveryMode();
  }
  
  /**
   * Notify about an attempted security violation
   */
  static notifySecurityViolation(message: string): void {
    if (this.options.logToConsole) {
      console.error(`[Oxum Security] ${message}`);
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Security Alert",
        description: message,
        variant: "destructive"
      });
    }
    
    if (this.options.notifyAdmins) {
      // In a real app, this would trigger high-priority security alerts
      console.error("[Oxum] Security violation notification would be sent to admins");
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_security_violation',
      { 
        message,
        timestamp: new Date(),
        severity: 'critical'
      }
    );
  }
  
  /**
   * Enter system recovery mode
   */
  private static enterRecoveryMode(): void {
    if (this.recoveryModeActive) return;
    
    this.recoveryModeActive = true;
    
    if (this.options.logToConsole) {
      console.warn("[Oxum Recovery] Entering recovery mode");
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Recovery Mode Activated",
        description: "System is operating in recovery mode to maintain price integrity.",
        variant: "warning"
      });
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_recovery_mode_activated',
      { timestamp: new Date() }
    );
  }
  
  /**
   * Exit system recovery mode
   */
  private static exitRecoveryMode(): void {
    if (!this.recoveryModeActive) return;
    
    this.recoveryModeActive = false;
    
    if (this.options.logToConsole) {
      console.log("[Oxum Recovery] Exiting recovery mode");
    }
    
    if (this.options.showUserNotifications) {
      toast({
        title: "Oxum Recovery Mode Deactivated",
        description: "System has returned to normal operation.",
        variant: "default"
      });
    }
    
    AIAnalyticsService.trackEvent(
      'system',
      'oxum_recovery_mode_deactivated',
      { timestamp: new Date() }
    );
  }
  
  /**
   * Check if we need to enter recovery mode based on system metrics
   */
  private static checkAndEnterRecoveryModeIfNeeded(): void {
    // Get latest stats
    const stats = OxumPriceAnalytics.getStats();
    
    // Enter recovery mode if violation rate is above 20%
    if (stats.complianceRate < 80 || stats.recentViolations.length >= 5) {
      this.enterRecoveryMode();
    }
  }
  
  /**
   * Check if the system is in recovery mode
   */
  static isInRecoveryMode(): boolean {
    return this.recoveryModeActive;
  }
  
  /**
   * Configure notification options
   */
  static configure(options: Partial<OxumNotificationOptions>): void {
    this.options = {
      ...this.options,
      ...options
    };
    
    console.log('[Oxum Notification Service] Reconfigured with options:', this.options);
  }
}

// Initialize the service with default options
OxumNotificationService.initialize();
