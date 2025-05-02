
import { HealthMetrics } from '@/types/neuralMetrics';

/**
 * Service responsible for providing neural metrics from various sources
 * This helps decouple the large NeuralHub from metrics collection
 */
class NeuralMetricsProvider {
  private lastMetricsUpdate: number = Date.now();
  private cachedMetrics: HealthMetrics;
  
  constructor() {
    // Initialize with default metrics
    this.cachedMetrics = this.generateDefaultMetrics();
  }
  
  /**
   * Get the latest health metrics, either from cache or freshly generated
   * @param forceRefresh Whether to force a refresh of the metrics
   * @param maxCacheAge Maximum age of cache in milliseconds
   */
  getHealthMetrics(forceRefresh = false, maxCacheAge = 10000): HealthMetrics {
    const now = Date.now();
    
    // If cache is expired or refresh is forced, generate new metrics
    if (forceRefresh || (now - this.lastMetricsUpdate > maxCacheAge)) {
      this.cachedMetrics = this.generateMetrics();
      this.lastMetricsUpdate = now;
    }
    
    return this.cachedMetrics;
  }
  
  /**
   * Generate metrics based on actual system performance
   * In a real system, this would collect data from various services and sources
   */
  private generateMetrics(): HealthMetrics {
    // In a real implementation, metrics would be collected from actual services
    return {
      cpuUtilization: Math.random() * 100,
      memoryUtilization: Math.random() * 100,
      errorRate: Math.random() * 5,
      responseTime: Math.random() * 200,
      operationsPerSecond: Math.floor(Math.random() * 1000),
      stability: 0.95 + Math.random() * 0.05,
      lastUpdated: Date.now(),
      systemLoad: Math.random(),
      userEngagement: Math.random(),
      requestsPerMinute: Math.floor(Math.random() * 600),
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      neuralAccuracy: Math.random(),
      neuralEfficiency: Math.random(),
      neuralLatency: Math.random() * 100,
    };
  }
  
  /**
   * Generate default metrics when no real data is available
   */
  private generateDefaultMetrics(): HealthMetrics {
    return {
      cpuUtilization: 35,
      memoryUtilization: 42,
      errorRate: 1.2,
      responseTime: 120,
      operationsPerSecond: 850,
      stability: 0.98,
      lastUpdated: Date.now(),
      systemLoad: 0.35,
      userEngagement: 0.75,
      requestsPerMinute: 425,
      cpuUsage: 35,
      memoryUsage: 42,
      neuralAccuracy: 0.92,
      neuralEfficiency: 0.85,
      neuralLatency: 45,
    };
  }
}

// Export a singleton instance
export const neuralMetricsProvider = new NeuralMetricsProvider();

// For convenience, also export the singleton's methods directly
export const getHealthMetrics = (forceRefresh?: boolean, maxCacheAge?: number) => 
  neuralMetricsProvider.getHealthMetrics(forceRefresh, maxCacheAge);
