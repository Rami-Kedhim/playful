
/**
 * Analytics service for Oxum price validation system
 */

export interface PriceEvent {
  eventType: string;
  timestamp: Date;
  price: number;
  targetPrice: number;
  metadata?: Record<string, any>;
  // Additional properties needed for other components
  userId?: string;
  profileId?: string;
  userPrice?: number;
  amount?: number;
  success?: boolean;
  message?: string;
}

export class OxumPriceAnalytics {
  private static events: PriceEvent[] = [];
  
  /**
   * Log a price-related event
   */
  static logPriceEvent(
    eventType: string,
    price: number,
    metadata?: Record<string, any>,
    targetPrice?: number
  ): void {
    const event: PriceEvent = {
      eventType,
      timestamp: new Date(),
      price,
      targetPrice: targetPrice || 0,
      metadata
    };
    
    // Add to in-memory log
    this.events.push(event);
    
    // In a real app, this would also send to a logging service
    console.debug(`[Oxum Analytics] ${eventType}:`, {
      price,
      time: event.timestamp.toISOString(),
      ...(metadata || {})
    });
  }
  
  /**
   * Get all logged events
   */
  static getEvents(): PriceEvent[] {
    return [...this.events];
  }
  
  /**
   * Clear all events (mainly for testing)
   */
  static clearEvents(): void {
    this.events = [];
  }
  
  /**
   * Get event statistics
   */
  static getStats(): {
    totalEvents: number;
    eventTypes: Record<string, number>;
    averagePrice: number;
    violationCount?: number;
    complianceRate?: number;
    recentViolations?: PriceEvent[];
  } {
    const eventTypes: Record<string, number> = {};
    let priceSum = 0;
    let violationCount = 0;
    const recentViolations: PriceEvent[] = [];
    
    for (const event of this.events) {
      eventTypes[event.eventType] = (eventTypes[event.eventType] || 0) + 1;
      priceSum += event.price;
      
      // Count violations
      if (event.eventType === 'violation') {
        violationCount++;
        recentViolations.push(event);
      }
    }
    
    // Calculate compliance rate
    const complianceRate = this.events.length > 0 
      ? 100 - (violationCount / this.events.length * 100) 
      : 100;
    
    return {
      totalEvents: this.events.length,
      eventTypes,
      averagePrice: this.events.length ? priceSum / this.events.length : 0,
      violationCount,
      complianceRate,
      recentViolations: recentViolations.slice(-5) // Last 5 violations
    };
  }
}
