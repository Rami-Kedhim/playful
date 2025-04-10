
import { ModuleType } from "../registry/NeuralServiceRegistry";

// Define the configuration for a neural service
export interface NeuralServiceConfig {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  enabled: boolean;
  priority: number;
  resourceAllocation: number;
}

// Define the interface for a neural service
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  initialize(): Promise<boolean>;
  configure(options: Record<string, any>): void;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  isEnabled(): boolean;
  getCapabilities(): string[];
  getMetrics(): Record<string, any>;
}

// Singleton registry for neural services
export class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  
  public registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      return false;
    }
    
    this.services.set(service.moduleId, service);
    return true;
  }
  
  public getService(moduleId: string): NeuralService | undefined {
    return this.services.get(moduleId);
  }
  
  public getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }
}
