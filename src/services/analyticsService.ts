import { AIAnalyticsService } from './ai/aiAnalyticsService';

// Event tracking categories
export type EventCategory = 
  | 'page_view'
  | 'user_engagement'
  | 'content_interaction'
  | 'conversion'
  | 'app_performance'
  | 'error';

// Interface for event data
export interface EventData {
  eventName: string;
  category: EventCategory;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

// Performance metrics interface
export interface PerformanceMetrics {
  navigationStart?: number;
  domComplete?: number;
  loadTime?: number;
  firstContentfulPaint?: number;
  timeToInteractive?: number;
  resourceLoadTimes?: Record<string, number>;
  memoryUsage?: number;
}

/**
 * Analytics service for tracking user engagement and performance metrics
 */
class AnalyticsService {
  private initialized = false;
  private userId?: string;
  private sessionId: string;
  private sessionStartTime: Date;
  private lastActiveTime: Date;
  private eventQueue: EventData[] = [];
  private flushInterval: any = null;
  private performanceMetrics: PerformanceMetrics = {};
  
  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = new Date();
    this.lastActiveTime = new Date();
    
    // Initialize performance observer if supported
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.setupPerformanceObserver();
    }
  }
  
  /**
   * Initialize analytics with user information
   */
  public init(userId?: string): void {
    if (this.initialized) {
      return;
    }
    
    this.userId = userId;
    this.initialized = true;
    
    // Set up event listeners for user activity
    if (typeof window !== 'undefined') {
      window.addEventListener('click', this.updateUserActivity);
      window.addEventListener('keypress', this.updateUserActivity);
      window.addEventListener('scroll', this.updateUserActivity);
      window.addEventListener('mousemove', this.updateUserActivity);
      
      // Track page views automatically
      this.trackPageView();
      
      // Set up periodic event flushing
      this.flushInterval = setInterval(this.flushEvents, 30000); // Every 30 seconds
    }
  }
  
  /**
   * Track a custom event
   */
  public trackEvent(eventName: string, category: EventCategory, properties?: Record<string, any>): void {
    const event: EventData = {
      eventName,
      category,
      properties,
      userId: this.userId,
      timestamp: new Date()
    };
    
    this.eventQueue.push(event);
    
    // If queue is getting large, flush immediately
    if (this.eventQueue.length > 20) {
      this.flushEvents();
    }
  }
  
  /**
   * Track page view with optional page data
   */
  public trackPageView(path?: string, title?: string): void {
    const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
    const currentTitle = title || (typeof document !== 'undefined' ? document.title : '');
    
    this.trackEvent('page_view', 'page_view', {
      path: currentPath,
      title: currentTitle,
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    });
  }
  
  /**
   * Track user engagement with content
   */
  public trackContentInteraction(contentId: string, contentType: string, interactionType: string, metadata?: Record<string, any>): void {
    this.trackEvent('content_interaction', 'content_interaction', {
      contentId,
      contentType,
      interactionType,
      ...metadata
    });
    
    // For AI-related content, also use specialized analytics
    if (contentType.includes('ai') || contentType.includes('neural')) {
      AIAnalyticsService.trackEvent(
        contentId,
        `ai_${interactionType}`,
        { contentType, ...metadata }
      );
    }
  }
  
  /**
   * Track error events
   */
  public trackError(errorType: string, errorMessage: string, errorStack?: string): void {
    this.trackEvent('error', 'error', {
      errorType,
      errorMessage,
      errorStack
    });
  }
  
  /**
   * Update user activity timestamp
   */
  private updateUserActivity = (): void => {
    this.lastActiveTime = new Date();
  }
  
  /**
   * Set up performance observer to collect metrics
   */
  private setupPerformanceObserver(): void {
    // Track navigation timing metrics
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      this.performanceMetrics.navigationStart = timing.navigationStart;
      this.performanceMetrics.domComplete = timing.domComplete;
      this.performanceMetrics.loadTime = timing.loadEventEnd - timing.navigationStart;
    }
    
    // Track Core Web Vitals and other performance metrics when available
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            this.performanceMetrics.firstContentfulPaint = entry.startTime;
          }
          // Add other metrics as needed (LCP, CLS, etc.)
        });
      });
      
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    } catch (e) {
      console.error('PerformanceObserver error:', e);
    }
  }
  
  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  /**
   * Send collected events to analytics backend
   */
  private flushEvents = async (): Promise<void> => {
    if (this.eventQueue.length === 0) {
      return;
    }
    
    // Create a copy of the current queue and clear it
    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];
    
    // Add session information and performance data to the payload
    const payload = {
      sessionId: this.sessionId,
      userId: this.userId,
      sessionDuration: (new Date().getTime() - this.sessionStartTime.getTime()) / 1000,
      events: eventsToSend,
      performance: this.performanceMetrics
    };
    
    try {
      // In a real app, this would send data to your analytics backend
      console.log('Analytics payload:', payload);
      
      // Simulate sending to a backend API
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
    } catch (error) {
      // In case of failure, add events back to the queue for next attempt
      this.eventQueue = [...eventsToSend, ...this.eventQueue];
      console.error('Failed to send analytics:', error);
    }
  }
  
  /**
   * Clean up event listeners and intervals
   */
  public cleanup(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this.updateUserActivity);
      window.removeEventListener('keypress', this.updateUserActivity);
      window.removeEventListener('scroll', this.updateUserActivity);
      window.removeEventListener('mousemove', this.updateUserActivity);
    }
    
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    
    // Final flush of remaining events
    this.flushEvents();
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Automatically initialize on import if in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  window.addEventListener('DOMContentLoaded', () => {
    analyticsService.init();
  });
}

// Export the AIAnalyticsService to prevent import errors
export { AIAnalyticsService };
