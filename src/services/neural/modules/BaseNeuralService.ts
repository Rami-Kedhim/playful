
import { NeuralService, NeuralServiceConfig, ModuleType } from '../registry/NeuralServiceRegistry';
import { brainHub } from '../HermesOxumBrainHub';

/**
 * Abstract base class for module-specific neural services
 */
export abstract class BaseNeuralService implements NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  
  protected lastMetrics: Record<string, any> = {};
  protected capabilities: string[] = [];
  protected isInitialized: boolean = false;
  
  constructor(moduleId: string, moduleType: ModuleType, config: NeuralServiceConfig) {
    this.moduleId = moduleId;
    this.moduleType = moduleType;
    this.config = {
      enabled: config.enabled !== undefined ? config.enabled : true,
      priority: config.priority !== undefined ? Math.min(100, Math.max(0, config.priority)) : 50,
      autonomyLevel: config.autonomyLevel !== undefined ? Math.min(100, Math.max(0, config.autonomyLevel)) : 50,
      resourceAllocation: config.resourceAllocation !== undefined ? Math.min(100, Math.max(0, config.resourceAllocation)) : 25,
    };
  }
  
  /**
   * Initialize the service - must be implemented by subclasses
   */
  abstract initialize(): Promise<boolean>;
  
  /**
   * Process feedback for this module
   */
  processFeedback(feedback: any): void {
    console.log(`Processing feedback for ${this.moduleId}:`, feedback);
    this.updateMetrics({
      feedbackProcessedAt: new Date(),
      feedbackType: feedback.type || 'unknown'
    });
    
    // Notify Brain Hub about the feedback
    brainHub.processRequest({
      type: 'neural_service_feedback',
      data: {
        moduleId: this.moduleId,
        moduleType: this.moduleType,
        feedback
      }
    });
  }
  
  /**
   * Get current service metrics
   */
  getMetrics(): Record<string, any> {
    return {
      ...this.lastMetrics,
      moduleId: this.moduleId,
      moduleType: this.moduleType,
      enabled: this.config.enabled,
      priority: this.config.priority,
      autonomyLevel: this.config.autonomyLevel,
      resourceAllocation: this.config.resourceAllocation,
      lastUpdated: new Date()
    };
  }
  
  /**
   * Get service capabilities
   */
  getCapabilities(): string[] {
    return this.capabilities;
  }
  
  /**
   * Update service metrics
   */
  protected updateMetrics(metrics: Record<string, any>): void {
    this.lastMetrics = { ...this.lastMetrics, ...metrics };
  }
  
  /**
   * Register a capability for this service
   */
  protected registerCapability(capability: string): void {
    if (!this.capabilities.includes(capability)) {
      this.capabilities.push(capability);
    }
  }
  
  /**
   * Update service configuration
   */
  updateConfig(config: Partial<NeuralServiceConfig>): void {
    if (config.enabled !== undefined) {
      this.config.enabled = config.enabled;
    }
    
    if (config.priority !== undefined) {
      this.config.priority = Math.min(100, Math.max(0, config.priority));
    }
    
    if (config.autonomyLevel !== undefined) {
      this.config.autonomyLevel = Math.min(100, Math.max(0, config.autonomyLevel));
    }
    
    if (config.resourceAllocation !== undefined) {
      this.config.resourceAllocation = Math.min(100, Math.max(0, config.resourceAllocation));
    }
  }
}
