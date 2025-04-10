
/**
 * Neural Service Interface
 * Defines the common interface for all neural services in the system
 */

export interface NeuralService {
  // Metadata
  moduleId: string;
  moduleType: string;
  moduleName: string;
  description: string;
  version: string;
  author: string;
  
  // Core functionality
  initialize(): Promise<boolean>;
  configure(config: any): Promise<boolean>;
  
  // Utilities
  getCapabilities(): string[];
  getMetrics(): Record<string, number>;
  isEnabled(): boolean;
}

export default NeuralService;
