
/**
 * UbxBridgeService - Neural event bridge for UberCore components
 */
export class UbxBridgeService {
  private enabled: boolean = true;
  private subscribers: Record<string, Array<(event: any) => void>> = {};
  private eventStats: Record<string, { count: number, lastFired: Date }> = {};
  private activeModules: string[] = ['logic', 'emotional', 'ethics'];
  private config = {
    enabled: true,
    queueSize: 100,
    priorityLevels: ['low', 'standard', 'high', 'critical']
  };
  
  async initialize(): Promise<boolean> {
    console.log('Initializing UBX Event Bridge...');
    // Reset subscribers
    this.subscribers = {};
    this.eventStats = {};
    return true;
  }
  
  subscribe(eventType: string, callback: (event: any) => void): void {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    
    this.subscribers[eventType].push(callback);
  }
  
  publish(
    eventType: string, 
    source: string,
    payload: any,
    metadata: Record<string, any> = {},
    priority: 'low' | 'standard' | 'high' | 'critical' = 'standard'
  ): void {
    const timestamp = new Date();
    
    // Create event object
    const event = {
      type: eventType,
      source,
      timestamp,
      payload,
      metadata,
      priority
    };
    
    // Update stats
    this.updateEventStats(eventType);
    
    // Deliver to subscribers
    this.deliverEvent(event);
  }
  
  private deliverEvent(event: any): void {
    const { type } = event;
    
    // Skip delivery if no subscribers
    if (!this.subscribers[type] || this.subscribers[type].length === 0) {
      return;
    }
    
    // Deliver to all subscribers
    this.subscribers[type].forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error(`Error in event subscriber for ${type}:`, error);
      }
    });
  }
  
  private updateEventStats(eventType: string): void {
    if (!this.eventStats[eventType]) {
      this.eventStats[eventType] = {
        count: 0,
        lastFired: new Date()
      };
    }
    
    this.eventStats[eventType].count++;
    this.eventStats[eventType].lastFired = new Date();
  }
  
  getEventStats(): Record<string, { count: number, lastFired: Date }> {
    return this.eventStats;
  }
  
  getActiveModules(): string[] {
    return this.activeModules;
  }
  
  getConfig(): any {
    return this.config;
  }
}

// Export singleton instance
export const ubxBridgeService = new UbxBridgeService();
