
import { BaseNeuralService as BaseNeuralServiceInterface, NeuralServiceConfig } from '../types/NeuralService';

export class BaseBrainService implements BaseNeuralServiceInterface {
  id: string;
  name: string;
  moduleId: string;
  description: string;
  moduleType: string;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  config: NeuralServiceConfig;
  
  constructor(initialConfig: Partial<BaseNeuralServiceInterface> = {}) {
    this.id = initialConfig.id || `service-${Math.random().toString(36).substring(2, 9)}`;
    this.name = initialConfig.name || 'Generic Neural Service';
    this.moduleId = initialConfig.moduleId || this.id;
    this.description = initialConfig.description || 'A generic neural service';
    this.moduleType = initialConfig.moduleType || 'general';
    this.version = initialConfig.version || '1.0.0';
    this.status = initialConfig.status || 'active';
    this.config = initialConfig.config || {
      enabled: true,
      sensitivity: 0.7,
      threshold: 0.5,
      mode: 'standard'
    };
  }
  
  async initialize(): Promise<boolean> {
    console.log(`Initializing ${this.name} (${this.moduleId})...`);
    return true;
  }
  
  updateConfig(config: Partial<NeuralServiceConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
    console.log(`Updated config for ${this.name}:`, this.config);
  }
  
  getMetrics() {
    return {
      operationsCount: Math.floor(Math.random() * 10000),
      errorRate: Math.random() * 2,
      latency: Math.floor(Math.random() * 100)
    };
  }
  
  // This method was missing and causing errors in consumer modules
  configure(config: Partial<NeuralServiceConfig>): boolean {
    this.updateConfig(config);
    return true;
  }
  
  // Add getCapabilities method that was expected by NeuralServiceCard
  getCapabilities(): string[] {
    return ['basic_processing', 'data_analysis'];
  }
}

// Use 'export type' when re-exporting with isolatedModules enabled
export type { BaseNeuralServiceInterface };

// Export the class as the default for clean imports
export default BaseBrainService;
