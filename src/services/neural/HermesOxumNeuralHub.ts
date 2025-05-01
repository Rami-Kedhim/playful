
import { hermes } from "@/core/Hermes";
import { oxum } from "@/core/Oxum";
import { hermesOrusOxum } from "@/core/HermesOrusOxum";
import { orus } from "@/core/Orus";

/**
 * Neural Hub for connecting brain components 
 * with Hermes, Oxum, and Orus systems
 */
export class HermesOxumNeuralHub {
  private isInitialized: boolean = false;
  private registeredModules: Map<string, any> = new Map();
  private lastOptimizationTime: Date | null = null;
  
  /**
   * Initialize the neural hub and connect to core systems
   */
  public initialize(): boolean {
    if (this.isInitialized) return true;
    
    console.log('Brain Hub Connection Service initialized');
    
    // Connect with core systems
    this.registerCoreConnections();
    
    this.isInitialized = true;
    return true;
  }
  
  /**
   * Register connections to core systems
   */
  private registerCoreConnections(): void {
    try {
      // Register with Hermes for flow dynamics
      hermes.connect({
        system: 'NeuralHub',
        connectionId: `neural-hub-${Date.now()}`
      });
      
      // Register with Orus for security validation
      const sessionValidation = orus.validateSession('system');
      
      if (!sessionValidation.isValid) {
        console.warn('Neural hub system session validation failed');
      }
      
      // Set up the optimization schedule
      this.scheduleOptimization();
    } catch (error) {
      console.error('Error registering core connections:', error);
    }
  }
  
  /**
   * Schedule periodic optimization
   */
  private scheduleOptimization(): void {
    // Schedule optimization every 15 minutes
    setInterval(() => {
      this.optimizeNeuralConnections();
    }, 15 * 60 * 1000);
  }
  
  /**
   * Register a neural module with the hub
   */
  public registerModule(moduleId: string, moduleInterface: any): boolean {
    if (this.registeredModules.has(moduleId)) {
      console.warn(`Module with ID ${moduleId} is already registered`);
      return false;
    }
    
    this.registeredModules.set(moduleId, {
      interface: moduleInterface,
      registeredAt: new Date(),
      lastAccessed: new Date()
    });
    
    // Log with Hermes
    hermes.connect({
      system: 'NeuralHub',
      connectionId: `register-${moduleId}-${Date.now()}`,
      metadata: {
        action: 'register_module',
        moduleId
      }
    });
    
    return true;
  }
  
  /**
   * Get a registered module by ID
   */
  public getModule(moduleId: string): any {
    const module = this.registeredModules.get(moduleId);
    
    if (module) {
      module.lastAccessed = new Date();
      this.registeredModules.set(moduleId, module);
      return module.interface;
    }
    
    return null;
  }
  
  /**
   * Run neural optimization for all registered modules
   */
  public optimizeNeuralConnections(): void {
    console.log('Running neural optimization');
    
    this.lastOptimizationTime = new Date();
    
    // For each registered module, run optimization if available
    this.registeredModules.forEach((module, id) => {
      try {
        if (module.interface && typeof module.interface.optimize === 'function') {
          module.interface.optimize();
          console.log(`Optimized neural module: ${id}`);
        }
      } catch (error) {
        console.error(`Error optimizing module ${id}:`, error);
      }
    });
    
    // Use hermesOrusOxum for profile rotation
    const now = new Date();
    const currentHour = now.getHours();
    const optimalWindow = hermesOrusOxum.getOptimalTimeWindow();
    const timeImpact = hermesOrusOxum.calculateTimeImpact(currentHour, optimalWindow);
    
    console.log(`Neural optimization complete. Current time impact: ${timeImpact.toFixed(2)}`);
  }
  
  /**
   * Get optimization status
   */
  public getOptimizationStatus(): {
    lastOptimized: Date | null;
    registeredModules: number;
    activeModules: number;
  } {
    // Count active modules (accessed in the last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let activeCount = 0;
    
    this.registeredModules.forEach(module => {
      if (module.lastAccessed > oneHourAgo) {
        activeCount++;
      }
    });
    
    return {
      lastOptimized: this.lastOptimizationTime,
      registeredModules: this.registeredModules.size,
      activeModules: activeCount
    };
  }
  
  /**
   * Interface with Oxum boost system
   */
  public interfaceWithBoost(): boolean {
    try {
      // Calculate a boost score for a system-level profile
      const boostScore = oxum.calculateBoostScore('system-neural-hub');
      
      // Log the boost score
      hermesOrusOxum.logSignalTransform('system-boost-score', boostScore);
      
      return true;
    } catch (error) {
      console.error('Error interfacing with boost system:', error);
      return false;
    }
  }
}

// Export singleton instance
export const neuralHub = new HermesOxumNeuralHub();
export default neuralHub;

// Initialize on import
neuralHub.initialize();
