
/**
 * Analytics service for Oxum price validation system
 */

interface PriceEvent {
  eventType: string;
  timestamp: Date;
  price: number;
  targetPrice: number;
  metadata?: Record<string, any>;
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
  } {
    const eventTypes: Record<string, number> = {};
    let priceSum = 0;
    
    for (const event of this.events) {
      eventTypes[event.eventType] = (eventTypes[event.eventType] || 0) + 1;
      priceSum += event.price;
    }
    
    return {
      totalEvents: this.events.length,
      eventTypes,
      averagePrice: this.events.length ? priceSum / this.events.length : 0
    };
  }
}
