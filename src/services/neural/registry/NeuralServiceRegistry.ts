
import { brainHub } from '../HermesOxumBrainHub';

/**
 * Module types supported by the Neural Service Registry
 */
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

/**
 * Neural Service configuration interface
 */
export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number; // 0-100, higher is more important
  autonomyLevel: number; // 0-100, higher means more autonomous decision making
  resourceAllocation: number; // 0-100, percentage of resources allocated
}

/**
 * Neural Service interface that all module-specific services must implement
 */
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  initialize(): Promise<boolean>;
  processFeedback(feedback: any): void;
  getMetrics(): Record<string, any>;
  getCapabilities(): string[];
}

/**
 * Registry for managing all neural services across different modules
 */
class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  private initialized: boolean = false;

  /**
   * Register a new neural service
   */
  registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      console.warn(`Service with ID ${service.moduleId} is already registered`);
      return false;
    }

    this.services.set(service.moduleId, service);
    console.log(`Registered neural service: ${service.moduleId} (${service.moduleType})`);
    
    // Notify BrainHub about new service
    brainHub.processRequest({
      type: 'register_neural_service',
      data: {
        moduleId: service.moduleId,
        moduleType: service.moduleType,
        capabilities: service.getCapabilities()
      }
    });
    
    return true;
  }

  /**
   * Unregister a neural service
   */
  unregisterService(moduleId: string): boolean {
    if (!this.services.has(moduleId)) {
      return false;
    }

    this.services.delete(moduleId);
    console.log(`Unregistered neural service: ${moduleId}`);
    
    return true;
  }

  /**
   * Get a specific neural service by ID
   */
  getService(moduleId: string): NeuralService | undefined {
    return this.services.get(moduleId);
  }

  /**
   * Get all services of a specific module type
   */
  getServicesByType(moduleType: ModuleType): NeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.moduleType === moduleType);
  }

  /**
   * Get all registered services
   */
  getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }

  /**
   * Initialize all registered services
   */
  async initializeAll(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }
    
    try {
      const results = await Promise.all(
        Array.from(this.services.values()).map(service => service.initialize())
      );
      
      this.initialized = results.every(result => result === true);
      return this.initialized;
    } catch (error) {
      console.error('Failed to initialize all neural services:', error);
      return false;
    }
  }

  /**
   * Get system-wide metrics from all services
   */
  getAllMetrics(): Record<string, Record<string, any>> {
    const metrics: Record<string, Record<string, any>> = {};
    
    this.services.forEach((service, moduleId) => {
      metrics[moduleId] = service.getMetrics();
    });
    
    return metrics;
  }

  /**
   * Re-distribute resource allocation based on current priorities
   */
  optimizeResourceAllocation(): void {
    const services = Array.from(this.services.values());
    const totalPriority = services.reduce((sum, service) => sum + service.config.priority, 0);
    
    if (totalPriority === 0) return; // No services or all have 0 priority
    
    services.forEach(service => {
      // Calculate new resource allocation based on priority
      const newAllocation = Math.round((service.config.priority / totalPriority) * 100);
      service.config.resourceAllocation = newAllocation;
      
      console.log(`Resource allocation for ${service.moduleId}: ${newAllocation}%`);
    });
  }
}

// Create singleton instance
export const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
