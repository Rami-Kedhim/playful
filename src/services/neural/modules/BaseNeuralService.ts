
import { BaseNeuralService as BaseNeuralServiceType, NeuralServiceConfig, ModuleType } from '../types/NeuralService';

/**
 * Base implementation for all neural services
 * Provides common functionality and standardized interfaces
 */
export abstract class BaseBrainService implements BaseNeuralServiceType {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  moduleType: ModuleType;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  config: NeuralServiceConfig;
  
  constructor(
    id: string,
    moduleId: string,
    name: string,
    description: string,
    moduleType: ModuleType,
    version: string,
    config: NeuralServiceConfig
  ) {
    this.id = id;
    this.moduleId = moduleId;
    this.name = name;
    this.description = description;
    this.moduleType = moduleType;
    this.version = version;
    this.config = config;
    this.status = config.enabled ? 'active' : 'inactive';
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
   */
  getMetrics(): any {
    return {
      operationsCount: 0,
      errorRate: 0,
      latency: 0,
      status: this.status
    };
  }
}
