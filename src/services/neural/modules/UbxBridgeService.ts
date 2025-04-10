
import { BaseNeuralService, NeuralServiceConfig } from '../modules/BaseNeuralService';
import { ModuleType } from '../registry/NeuralServiceRegistry';

/**
 * Event data structure for the UBX_Bridge
 */
interface UbxEvent {
  id: string;
  type: string;
  source: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  payload: any;
  metadata?: Record<string, any>;
}

/**
 * Event handler function type
 */
type EventHandlerFn = (event: UbxEvent) => void | Promise<void>;

/**
 * Subscription information
 */
interface Subscription {
  id: string;
  eventType: string;
  handler: EventHandlerFn;
  source?: string;
  filter?: (event: UbxEvent) => boolean;
}

/**
 * UbxBridgeService - Event Bus for UberCore Architecture
 * Manages communication between all modules in the system
 */
class UbxBridgeService extends BaseNeuralService {
  private subscriptions: Subscription[];
  private eventHistory: UbxEvent[];
  private maxHistorySize: number;
  private activeModules: Set<string>;
  private eventStats: Map<string, { count: number, lastTimestamp: Date }>;
  
  constructor() {
    // Configure the service with default settings
    const config: NeuralServiceConfig = {
      moduleId: 'ubx-bridge',
      moduleType: 'ubx-bridge' as ModuleType,
      moduleName: 'UBX Bridge Event Bus',
      description: 'Central communication hub for the UberCore architecture',
      version: '1.0.0',
      enabled: true,
      priority: 99, // Highest priority as the event bus is critical
      autonomyLevel: 95,
      resourceAllocation: 30
    };
    
    super(config);
    this.subscriptions = [];
    this.eventHistory = [];
    this.maxHistorySize = 1000; // Store last 1000 events
    this.activeModules = new Set();
    this.eventStats = new Map();
  }
  
  /**
   * Publish an event to the bus
   * @param eventType Type of the event
   * @param source Source module of the event
   * @param payload Event data
   * @param metadata Additional event metadata
   * @param priority Event priority
   * @returns The published event object
   */
  public publish(
    eventType: string, 
    source: string, 
    payload: any, 
    metadata?: Record<string, any>,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): UbxEvent {
    if (!this.config.enabled) {
      console.warn('UBX Bridge is disabled, event not published');
      return {
        id: `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: eventType,
        source,
        timestamp: new Date(),
        priority,
        payload,
        metadata
      };
    }
    
    const event: UbxEvent = {
      id: `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: eventType,
      source,
      timestamp: new Date(),
      priority,
      payload,
      metadata
    };
    
    console.log(`Publishing event: ${eventType} from ${source}`);
    
    // Store event in history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
    
    // Update event stats
    const statsKey = `${eventType}:${source}`;
    const stats = this.eventStats.get(statsKey) || { count: 0, lastTimestamp: new Date() };
    stats.count += 1;
    stats.lastTimestamp = event.timestamp;
    this.eventStats.set(statsKey, stats);
    
    // Register active module
    this.activeModules.add(source);
    
    // Dispatch event to subscribers
    this.dispatchEvent(event);
    
    return event;
  }
  
  /**
   * Dispatch an event to all subscribers
   */
  private dispatchEvent(event: UbxEvent): void {
    // Get subscriptions for this event type
    const relevantSubscriptions = this.subscriptions.filter(sub => 
      sub.eventType === event.type || sub.eventType === '*'
    );
    
    if (relevantSubscriptions.length === 0) {
      console.log(`No subscribers for event: ${event.type}`);
      return;
    }
    
    // Sort by priority (critical events go to all subscribers immediately)
    if (event.priority === 'critical') {
      relevantSubscriptions.forEach(async subscription => {
        try {
          this.processSubscription(subscription, event);
        } catch (error) {
          console.error(`Error processing critical event ${event.id} in subscriber ${subscription.id}:`, error);
        }
      });
      return;
    }
    
    // For non-critical events, check filters and dispatch asynchronously
    relevantSubscriptions.forEach(async subscription => {
      try {
        // Check source filter if specified
        if (subscription.source && subscription.source !== event.source) {
          return;
        }
        
        // Check custom filter if specified
        if (subscription.filter && !subscription.filter(event)) {
          return;
        }
        
        this.processSubscription(subscription, event);
      } catch (error) {
        console.error(`Error processing event ${event.id} in subscriber ${subscription.id}:`, error);
      }
    });
  }
  
  /**
   * Process a subscription for an event
   */
  private processSubscription(subscription: Subscription, event: UbxEvent): void {
    // For high priority events, execute synchronously
    if (event.priority === 'high') {
      try {
        subscription.handler(event);
      } catch (error) {
        console.error(`Error in synchronous handler for ${subscription.id}:`, error);
      }
      return;
    }
    
    // For medium and low priority events, execute asynchronously
    setTimeout(() => {
      try {
        const result = subscription.handler(event);
        
        // Handle promise result if returned
        if (result instanceof Promise) {
          result.catch(error => {
            console.error(`Error in async handler for ${subscription.id}:`, error);
          });
        }
      } catch (error) {
        console.error(`Error in async handler for ${subscription.id}:`, error);
      }
    }, event.priority === 'low' ? 10 : 0);
  }
  
  /**
   * Subscribe to events
   * @param eventType Type of events to subscribe to (or '*' for all)
   * @param handler Event handler function
   * @param options Additional subscription options
   * @returns Subscription ID
   */
  public subscribe(
    eventType: string,
    handler: EventHandlerFn,
    options?: {
      source?: string;
      filter?: (event: UbxEvent) => boolean;
      id?: string;
    }
  ): string {
    if (!this.config.enabled) {
      console.warn('UBX Bridge is disabled, subscription not registered');
      return 'disabled';
    }
    
    const subscriptionId = options?.id || `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const subscription: Subscription = {
      id: subscriptionId,
      eventType,
      handler,
      source: options?.source,
      filter: options?.filter
    };
    
    this.subscriptions.push(subscription);
    console.log(`Registered subscription ${subscriptionId} for event type: ${eventType}`);
    
    return subscriptionId;
  }
  
  /**
   * Unsubscribe from events
   * @param subscriptionId ID of the subscription to cancel
   * @returns Whether the operation was successful
   */
  public unsubscribe(subscriptionId: string): boolean {
    const initialCount = this.subscriptions.length;
    this.subscriptions = this.subscriptions.filter(sub => sub.id !== subscriptionId);
    
    const removed = this.subscriptions.length < initialCount;
    if (removed) {
      console.log(`Unsubscribed: ${subscriptionId}`);
    } else {
      console.warn(`Subscription not found: ${subscriptionId}`);
    }
    
    return removed;
  }
  
  /**
   * Get event history
   * @param filter Optional filter parameters
   * @returns Filtered event history
   */
  public getEventHistory(filter?: {
    eventType?: string;
    source?: string;
    startTime?: Date;
    endTime?: Date;
    limit?: number;
  }): UbxEvent[] {
    let filteredHistory = [...this.eventHistory];
    
    // Apply filters
    if (filter) {
      if (filter.eventType) {
        filteredHistory = filteredHistory.filter(e => e.type === filter.eventType);
      }
      
      if (filter.source) {
        filteredHistory = filteredHistory.filter(e => e.source === filter.source);
      }
      
      if (filter.startTime) {
        filteredHistory = filteredHistory.filter(e => e.timestamp >= filter.startTime!);
      }
      
      if (filter.endTime) {
        filteredHistory = filteredHistory.filter(e => e.timestamp <= filter.endTime!);
      }
      
      if (filter.limit && filter.limit > 0) {
        filteredHistory = filteredHistory.slice(-filter.limit);
      }
    }
    
    return filteredHistory;
  }
  
  /**
   * Get active modules (sources that have published events)
   */
  public getActiveModules(): string[] {
    return Array.from(this.activeModules);
  }
  
  /**
   * Get event statistics
   */
  public getEventStats(): Record<string, { count: number, lastTimestamp: Date }> {
    const stats: Record<string, { count: number, lastTimestamp: Date }> = {};
    this.eventStats.forEach((value, key) => {
      stats[key] = value;
    });
    return stats;
  }
  
  /**
   * Get subscription count by event type
   */
  public getSubscriptionStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.subscriptions.forEach(sub => {
      stats[sub.eventType] = (stats[sub.eventType] || 0) + 1;
    });
    return stats;
  }
  
  /**
   * @override
   * Get capabilities of this neural service
   */
  public getCapabilities(): string[] {
    return [
      'event-distribution',
      'module-communication',
      'real-time-coordination',
      'system-monitoring',
      'event-history-tracking',
      'prioritized-message-handling',
      'module-activity-detection'
    ];
  }
  
  /**
   * @override
   * Initialize the service
   */
  public async initialize(): Promise<boolean> {
    console.log('Initializing UBX Bridge Event Bus...');
    // Simulate initialization process
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('UBX Bridge Event Bus initialized successfully');
    return true;
  }
}

// Export singleton instance
export const ubxBridgeService = new UbxBridgeService();

// Export the class for typing and extending
export { UbxBridgeService };
