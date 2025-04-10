
/**
 * Hermes Engine - Core visibility decay and time-based algorithms
 * This handles how visibility decays over time for any content type
 */
import { 
  calculateVisibilityDecay,
  calculateBoostScore,
  getOptimalTimeWindow,
  calculateDynamicDecayConstant 
} from "@/utils/hermes/hermesMath";

export class HermesEngine {
  private systemLoad: number = 0.5; // Default to medium load
  
  // Algorithm configuration constants
  private config = {
    maxBoostEffect: 100,
    baseDecayConstant: 0.2,
    aggressionFactor: 0.5,
    timeOfDayFactor: 1.0
  };

  constructor(initialConfig?: Partial<HermesEngine['config']>) {
    if (initialConfig) {
      this.config = { ...this.config, ...initialConfig };
    }
  }
  
  /**
   * Calculate visibility score based on time elapsed since boost activation
   */
  public calculateVisibilityScore(
    initialVisibility: number,
    timeElapsedHours: number
  ): number {
    // Calculate decay based on time since boost activation
    const decayConstant = calculateDynamicDecayConstant(
      this.config.baseDecayConstant,
      this.systemLoad,
      timeElapsedHours
    );
    
    return calculateVisibilityDecay(
      initialVisibility,
      decayConstant,
      timeElapsedHours
    );
  }
  
  /**
   * Calculate time-of-day impact on visibility
   */
  public calculateTimeImpact(currentHour?: number): number {
    // Use provided hour or get current hour
    const hour = currentHour !== undefined ? 
      currentHour : 
      new Date().getHours() + (new Date().getMinutes() / 60);
    
    const optimalTime = getOptimalTimeWindow();
    
    return calculateBoostScore(
      this.config.maxBoostEffect,
      this.config.aggressionFactor,
      hour,
      optimalTime
    );
  }
  
  /**
   * Update system load to dynamically adjust algorithms
   */
  public updateSystemLoad(load: number): void {
    this.systemLoad = Math.max(0, Math.min(1, load));
  }
  
  /**
   * Update engine configuration
   */
  public updateConfig(newConfig: Partial<HermesEngine['config']>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Create singleton instance
export const hermesEngine = new HermesEngine();

export default hermesEngine;
