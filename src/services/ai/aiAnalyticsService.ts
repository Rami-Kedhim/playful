
/**
 * AIAnalyticsService - specialized analytics service for AI-related operations
 */

interface AIEventData {
  eventType: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

export class AIAnalyticsServiceClass {
  private readonly API_ENDPOINT = '/api/ai-analytics';
  private readonly LOCAL_STORAGE_KEY = 'ai_analytics_cache';
  private readonly MAX_CACHE_SIZE = 50;
  private eventQueue: AIEventData[] = [];
  private isFlushPending = false;
  
  constructor() {
    this.loadFromCache();
    
    // Set up interval to periodically flush events
    if (typeof window !== 'undefined') {
      setInterval(() => this.flushEvents(), 30000); // Every 30 seconds
      
      // Flush events when the page is being unloaded
      window.addEventListener('beforeunload', () => this.flushEvents(true));
    }
  }
  
  /**
   * Track an AI-related event
   * @param userId User or entity ID associated with the event
   * @param eventType Type of event
   * @param properties Additional event properties
   */
  public async trackEvent(
    userId: string,
    eventType: string,
    properties?: Record<string, any>
  ): Promise<void> {
    const event: AIEventData = {
      eventType,
      properties: {
        ...properties,
        userId
      },
      timestamp: new Date()
    };
    
    // Add to queue
    this.eventQueue.push(event);
    
    // Save to cache
    this.saveToCache();
    
    // If queue is getting large, flush immediately
    if (this.eventQueue.length >= 10) {
      this.flushEvents();
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AIAnalytics]', eventType, properties);
    }
  }
  
  /**
   * Send collected events to analytics backend
   */
  private async flushEvents(isSync: boolean = false): Promise<void> {
    if (this.eventQueue.length === 0 || this.isFlushPending) {
      return;
    }
    
    this.isFlushPending = true;
    
    try {
      // Create a copy of the current queue and clear it
      const eventsToSend = [...this.eventQueue];
      this.eventQueue = [];
      this.saveToCache();
      
      // In a real implementation, this would send data to a backend API
      // For demo purposes, we'll just log to console
      console.log('[AIAnalytics] Flushing events:', eventsToSend);
      
      // Simulate sending to a backend API
      // In a real implementation, you would uncomment this code
      /*
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events: eventsToSend }),
        // For sync operations (like page unload), use keepalive
        keepalive: isSync
      });
      
      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }
      */
    } catch (error) {
      // On error, add events back to the queue
      console.error('Failed to send AI analytics:', error);
      // Don't re-add events in case of sync operation (page unload)
      if (!isSync) {
        this.eventQueue = [...this.eventQueue];
        this.saveToCache();
      }
    } finally {
      this.isFlushPending = false;
    }
  }
  
  /**
   * Save current event queue to local storage
   */
  private saveToCache(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Limit cache size
      const cacheData = this.eventQueue.slice(0, this.MAX_CACHE_SIZE);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to cache AI analytics events:', error);
    }
  }
  
  /**
   * Load event queue from local storage
   */
  private loadFromCache(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const cached = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (cached) {
        this.eventQueue = JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to load AI analytics cache:', error);
    }
  }
}

// Export singleton instance
export const AIAnalyticsService = new AIAnalyticsServiceClass();

