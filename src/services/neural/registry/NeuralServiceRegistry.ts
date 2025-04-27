interface NeuralService {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  getMetrics: () => {
    operationsCount: number;
    errorRate: number;
    latency: number;
    [key: string]: any;
  };
  moduleId?: string;
  description?: string;
  moduleType?: string;
  version?: string;
  config?: any;
}

class NeuralServiceRegistry {
  private services: NeuralService[] = [];

  constructor() {
    // Initialize with some mock services
    this.initMockServices();
  }

  private initMockServices() {
    this.services = [
      {
        id: 'neural-1',
        name: 'Cognitive Analysis Service',
        status: 'active',
        getMetrics: () => ({
          operationsCount: 5000 + Math.floor(Math.random() * 3000),
          errorRate: 0.5 + Math.random() * 1.5,
          latency: 50 + Math.random() * 50
        })
      },
      {
        id: 'neural-2',
        name: 'Semantic Processing Engine',
        status: 'active',
        getMetrics: () => ({
          operationsCount: 7500 + Math.floor(Math.random() * 2500),
          errorRate: 0.3 + Math.random(),
          latency: 30 + Math.random() * 40
        })
      },
      {
        id: 'neural-3',
        name: 'Image Recognition Service',
        status: Math.random() > 0.8 ? 'maintenance' : 'active',
        getMetrics: () => ({
          operationsCount: 3000 + Math.floor(Math.random() * 2000),
          errorRate: 1.0 + Math.random() * 2.0,
          latency: 80 + Math.random() * 70
        })
      }
    ];
  }

  async initialize(): Promise<void> {
    console.log("Initializing Neural Service Registry");
    return Promise.resolve();
  }

  registerService(service: NeuralService): boolean {
    if (this.services.find(s => s.id === service.id)) {
      console.warn(`Service with ID ${service.id} already exists`);
      return false;
    }
    
    this.services.push(service);
    console.log(`Service ${service.id} registered successfully`);
    return true;
  }
  
  getServicesByModule(moduleType: string): NeuralService[] {
    return this.services.filter(service => 
      service.moduleType === moduleType
    );
  }

  optimizeResourceAllocation(): void {
    console.log("Optimizing resource allocation for neural services");
    // Mock implementation
  }

  getAllServices(): NeuralService[] {
    return this.services;
  }

  getService(id: string): NeuralService | undefined {
    return this.services.find(service => service.id === id);
  }
}

const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
