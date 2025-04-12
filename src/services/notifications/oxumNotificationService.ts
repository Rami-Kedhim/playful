
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
