/**
 * Analytics service for tracking Oxum price events and violations
 */
export class OxumPriceAnalytics {
  private static events: Array<{
    eventType: string;
    userPrice: number;
    targetPrice: number;
    timestamp: Date;
    metadata?: Record<string, any>;
  }> = [];
  
  /**
   * Log a price-related event
   * @param eventType Type of event (price_check, price_violation, etc.)
   * @param userPrice The price provided by the user/system
   * @param metadata Additional contextual data
   * @param targetPrice The expected price (global rate)
   */
  public static logPriceEvent(
    eventType: string,
    userPrice: number,
    metadata?: Record<string, any>,
    targetPrice?: number
  ): void {
    // Add event to the log
    this.events.push({
      eventType,
      userPrice,
      targetPrice: targetPrice || userPrice, // Default to user price if no target provided
      timestamp: new Date(),
      metadata
    });
    
    // In a real app, we would:
    // 1. Batch events for efficiency
    // 2. Send to a real analytics platform
    // 3. Purge old events from memory
    
    // For now, just limit the log size in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-500); // Keep last 500 events
    }
  }
  
  /**
   * Get analytics data for a specific period
   * @param startTime Start timestamp for analytics period
   * @param endTime End timestamp for analytics period
   */
  public static getAnalytics(startTime?: Date, endTime?: Date) {
    const now = new Date();
    const filteredEvents = this.events.filter(event => {
      const eventTime = event.timestamp;
      if (startTime && eventTime < startTime) return false;
      if (endTime && eventTime > endTime) return false;
      return true;
    });
    
    // Calculate success rate
    const checkEvents = filteredEvents.filter(e => e.eventType === 'price_check');
    const violationEvents = filteredEvents.filter(e => e.eventType === 'price_violation');
    
    const totalChecks = checkEvents.length;
    const totalViolations = violationEvents.length;
    const successRate = totalChecks > 0 ? (totalChecks - totalViolations) / totalChecks : 1;
    
    return {
      period: {
        start: startTime || this.events[0]?.timestamp || now,
        end: endTime || now,
      },
      metrics: {
        totalChecks,
        totalViolations,
        successRate,
        averagePrice: this.calculateAveragePrice(filteredEvents),
      },
      events: filteredEvents
    };
  }
  
  /**
   * Get filtered events by event type
   */
  public static getEvents(filter?: { eventType?: string }): any[] {
    if (!filter) {
      return [...this.events];
    }
    
    return this.events.filter(event => {
      if (filter.eventType && event.eventType !== filter.eventType) {
        return false;
      }
      return true;
    });
  }
  
  /**
   * Get summary statistics for events
   */
  public static getStats(): {
    totalEvents: number;
    violationCount: number;
    complianceRate: number;
    recentViolations: any[];
  } {
    const events = this.events;
    const totalEvents = events.length;
    const violationEvents = events.filter(e => e.eventType === 'price_violation');
    const violationCount = violationEvents.length;
    const complianceRate = totalEvents > 0 ? ((totalEvents - violationCount) / totalEvents) * 100 : 100;
    
    // Get recent violations (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const recentViolations = violationEvents.filter(e => e.timestamp >= oneDayAgo);
    
    return {
      totalEvents,
      violationCount,
      complianceRate,
      recentViolations
    };
  }
  
  /**
   * Calculate average price from events
   */
  private static calculateAveragePrice(events: typeof this.events) {
    if (events.length === 0) return 0;
    
    const sum = events.reduce((total, event) => total + event.userPrice, 0);
    return sum / events.length;
  }
  
  /**
   * Clear analytics data (mainly for testing)
   */
  public static clearAnalytics(): void {
    this.events = [];
  }
  
  /**
   * Clear all analytics events (alias for clearAnalytics)
   */
  public static clearEvents(): void {
    this.clearAnalytics();
  }
}
