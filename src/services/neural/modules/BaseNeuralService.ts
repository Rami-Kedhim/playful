
import { BaseNeuralService as BaseNeuralServiceType, NeuralServiceConfig, ModuleType } from '../types/NeuralService';

/**
 * Base implementation for all neural services
 * Provides common functionality and standardized interfaces
 */
export class BaseBrainService implements BaseNeuralServiceType {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  moduleType: ModuleType;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  config: NeuralServiceConfig;
  
  constructor(
    params: {
      id?: string,
      moduleId: string,
      name: string,
      description: string,
      moduleType: ModuleType,
      version: string,
      config?: Partial<NeuralServiceConfig>
    }
  ) {
    this.id = params.id || `neural-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    this.moduleId = params.moduleId;
    this.name = params.name;
    this.description = params.description;
    this.moduleType = params.moduleType;
    this.version = params.version;
    this.config = {
      enabled: true,
      priority: 50,
      resources: {
        cpu: 1,
        memory: 512
      },
      sensitivity: 0.8,
      threshold: 0.6,
      ...params.config
    };
    this.status = this.config.enabled ? 'active' : 'inactive';
  }
  
  /**
   * Initialize this service module
   */
  async initialize(): Promise<boolean> {
    try {
      // Default implementation
      console.log(`Initializing ${this.name} (${this.version})`);
      this.status = this.config.enabled ? 'active' : 'inactive';
      return this.config.enabled;
    } catch (error) {
      console.error(`Failed to initialize ${this.name}:`, error);
      this.status = 'inactive';
      return false;
    }
  }
  
  /**
   * Update configuration parameters
   */
  updateConfig(config: Partial<NeuralServiceConfig>): void {
    this.config = { ...this.config, ...config };
    this.status = this.config.enabled ? 'active' : 'inactive';
    console.log(`Updated configuration for ${this.name}`);
  }
  
  /**
   * Get available capabilities of this service
   */
  getCapabilities(): string[] {
    return ['basic'];
  }
  
  /**
   * Get performance metrics for this service
   * Ensures returned metrics match the ServiceMetrics interface
   */
  getMetrics(): any {
    return {
      operationsCount: 0,
      errorCount: 0,
      latency: 0,        // Ensure latency is always provided
      responseTime: 0,    // Include responseTime for compatibility
      errorRate: 0,
      successRate: 1.0,   // Add successRate with a default value
      status: this.status
    };
  }
}
