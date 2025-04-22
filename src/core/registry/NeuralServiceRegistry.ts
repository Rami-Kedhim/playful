
/**
 * Neural Service Registry - Tracks and manages all neural services
 */

class NeuralServiceRegistry {
  private services: Record<string, any> = {};
  private isInitialized: boolean = false;

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    console.log("[NeuralServiceRegistry] Initializing...");
    this.isInitialized = true;
  }

  public registerService(name: string, service: any): void {
    this.services[name] = service;
    console.log(`[NeuralServiceRegistry] Registered service: ${name}`);
  }

  public getService(name: string): any {
    if (!this.services[name]) {
      console.warn(`[NeuralServiceRegistry] Service not found: ${name}`);
      return null;
    }
    return this.services[name];
  }

  public getStatus(): Record<string, any> {
    return {
      initialized: this.isInitialized,
      serviceCount: Object.keys(this.services).length,
      services: Object.keys(this.services)
    };
  }
}

const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
