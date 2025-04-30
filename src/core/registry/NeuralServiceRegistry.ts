
/**
 * Neural Service Registry
 * Manages and provides access to all neural services in the UberCore ecosystem
 */

class NeuralServiceRegistry {
  private services: Map<string, any> = new Map();
  private initialized: boolean = false;
  
  /**
   * Initialize the registry and all registered services
   */
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }
    
    console.log('Initializing Neural Service Registry');
    
    // Initialize all registered services
    for (const [name, service] of this.services.entries()) {
      if (service.initialize && typeof service.initialize === 'function') {
        try {
          await service.initialize();
          console.log(`Service ${name} initialized`);
        } catch (error) {
          console.error(`Failed to initialize service ${name}:`, error);
          return false;
        }
      }
    }
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Register a service with the registry
   */
  public register(name: string, service: any): void {
    this.services.set(name, service);
    console.log(`Service ${name} registered`);
  }
  
  /**
   * Get a service by name
   */
  public get<T>(name: string): T | undefined {
    return this.services.get(name) as T;
  }
  
  /**
   * Check if a service exists
   */
  public has(name: string): boolean {
    return this.services.has(name);
  }
  
  /**
   * Get all registered service names
   */
  public getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }
  
  /**
   * Get the number of registered services
   */
  public get serviceCount(): number {
    return this.services.size;
  }
}

// Export singleton instance
const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
