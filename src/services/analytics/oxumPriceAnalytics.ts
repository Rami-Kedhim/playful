
import { AIAnalyticsService } from '@/services/analyticsService';

interface PriceEvent {
  eventType: 'price_check' | 'price_violation' | 'price_transaction' | 'critical_price_failure' | 'emergency_override';
  amount: number;
  expectedAmount?: number;
  userId?: string;
  profileId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

/**
 * OxumPriceAnalytics service for tracking and monitoring price-related events
 * for Rule #001: Global Price Symmetry compliance
 */
export class OxumPriceAnalytics {
  private static events: PriceEvent[] = [];
  private static MAX_EVENTS = 1000;
  
  /**
   * Log a price-related event for auditing and monitoring
   */
  static async logPriceEvent(
    eventType: PriceEvent['eventType'], 
    amount: number, 
    metadata?: Record<string, any>,
    expectedAmount?: number,
    userId?: string,
    profileId?: string,
  ): Promise<void> {
    // Create event object
    const event: PriceEvent = {
      eventType,
      amount,
      expectedAmount,
      userId,
      profileId,
      metadata,
      timestamp: new Date()
    };
    
    // Store event in memory (limited capacity)
    this.events.unshift(event);
    if (this.events.length > this.MAX_EVENTS) {
      this.events.pop();
    }
    
    // Log to analytics service
    if (profileId) {
      AIAnalyticsService.trackEvent(
        profileId, 
        `oxum_${eventType}`, 
        {
          amount,
          expectedAmount,
          userId,
          timestamp: event.timestamp,
          ...metadata
        }
      );
    }
    
    // Log violations and critical failures to console for easier debugging
    if (eventType === 'price_violation' || eventType === 'critical_price_failure') {
      console.error(`[Oxum ${eventType === 'price_violation' ? 'Rule Violation' : 'Critical Failure'}]`, event);
    }
    
    // Log emergency overrides for security auditing
    if (eventType === 'emergency_override') {
      console.warn('[Oxum Security] Emergency override activated:', event);
    }
  }
  
  /**
   * Get all logged price events, optionally filtered
   */
  static getEvents(filter?: {
    eventType?: PriceEvent['eventType'];
    startDate?: Date;
    endDate?: Date;
    userId?: string;
  }): PriceEvent[] {
    let filteredEvents = [...this.events];
    
    if (filter) {
      if (filter.eventType) {
        filteredEvents = filteredEvents.filter(e => e.eventType === filter.eventType);
      }
      
      if (filter.startDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp >= filter.startDate);
      }
      
      if (filter.endDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp <= filter.endDate);
      }
      
      if (filter.userId) {
        filteredEvents = filteredEvents.filter(e => e.userId === filter.userId);
      }
    }
    
    return filteredEvents;
  }
  
  /**
   * Get statistics about price events
   */
  static getStats(): {
    totalEvents: number;
    violationCount: number;
    complianceRate: number;
    recentViolations: PriceEvent[];
  } {
    const totalEvents = this.events.length;
    const violations = this.events.filter(e => e.eventType === 'price_violation');
    const violationCount = violations.length;
    const complianceRate = totalEvents > 0 ? ((totalEvents - violationCount) / totalEvents) * 100 : 100;
    
    // Get recent violations (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const recentViolations = violations.filter(v => v.timestamp >= oneDayAgo);
    
    return {
      totalEvents,
      violationCount,
      complianceRate,
      recentViolations
    };
  }
  
  /**
   * Clear all stored events
   */
  static clearEvents(): void {
    this.events = [];
  }
}
