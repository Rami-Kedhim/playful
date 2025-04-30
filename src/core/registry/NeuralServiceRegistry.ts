
/**
 * Neural Service Registry - Manages neural service instances
 */

interface NeuralService {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  initialize: () => Promise<boolean>;
  metrics?: Record<string, any>;
}

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  private initialized: boolean = false;

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    console.info('Initializing Neural Service Registry');
    
    // In a real implementation, would discover and initialize services dynamically
    this.initialized = true;
    return true;
  }

  public registerService(service: NeuralService): void {
    this.services.set(service.id, service);
    console.info(`Registered neural service: ${service.name} (${service.id})`);
  }

  public getService(id: string): NeuralService | undefined {
    return this.services.get(id);
  }

  public getServicesByType(type: string): NeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.type === type);
  }

  public getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }

  public getActiveServices(): NeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.status === 'active');
  }

  public getSystemStatus(): Record<string, any> {
    return {
      totalServices: this.services.size,
      activeServices: this.getActiveServices().length,
      servicesByType: this.getServiceTypeCounts(),
      lastUpdate: new Date().toISOString()
    };
  }

  private getServiceTypeCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    
    this.services.forEach(service => {
      if (!counts[service.type]) {
        counts[service.type] = 0;
      }
      counts[service.type]++;
    });
    
    return counts;
  }
}

// Export singleton instance
const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
