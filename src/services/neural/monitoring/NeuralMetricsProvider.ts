
import { HealthMetrics, ServiceMetrics, PerformanceReport } from '@/types/neuralMetrics';

/**
 * Service responsible for providing neural metrics from various sources
 * This helps decouple the large NeuralHub from metrics collection
 */
export class NeuralMetricsProvider {
  private lastMetricsUpdate: number = Date.now();
  private cachedMetrics: HealthMetrics;
  private metricsHistory: HealthMetrics[] = [];
  
  constructor() {
    // Initialize with default metrics
    this.cachedMetrics = this.getDefaultMetrics();
  }
  
  /**
   * Get the latest health metrics
   */
  getMetrics(): HealthMetrics {
    return this.cachedMetrics;
  }
  
  /**
   * Update metrics from a new data source
   */
  updateMetrics(data: any): void {
    const newMetrics = this.createHealthMetrics(data);
    this.cachedMetrics = newMetrics;
    this.metricsHistory.push(newMetrics);
    this.lastMetricsUpdate = Date.now();
    
    // Limit history size
    if (this.metricsHistory.length > 100) {
      this.metricsHistory.shift();
    }
  }
  
  /**
   * Get a summary of the current metrics
   */
  getSummaryMetrics(): HealthMetrics {
    return {
      ...this.cachedMetrics
    };
  }
  
  /**
   * Get service statuses
   */
  getServiceStatuses(): Record<string, { status: string; metrics: ServiceMetrics }> {
    return {
      // Example statuses - replace with actual service status logic
      serviceA: { status: 'online', metrics: this.getDefaultServiceMetrics() },
      serviceB: { status: 'degraded', metrics: this.getDefaultServiceMetrics() }
    };
  }
  
  /**
   * Generate recommendations based on current metrics
   */
  generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.cachedMetrics.cpuUtilization > 90) {
      recommendations.push("Optimize CPU usage");
    }
    if (this.cachedMetrics.memoryUtilization > 90) {
      recommendations.push("Optimize memory usage");
    }
    
    return recommendations;
  }
  
  /**
   * Calculate overall health score
   */
  calculateOverallHealth(): string {
    let healthScore = 100;
    
    healthScore -= this.cachedMetrics.cpuUtilization / 100 * 20;
    healthScore -= this.cachedMetrics.memoryUtilization / 100 * 30;
    healthScore -= this.cachedMetrics.errorRate * 50;
    
    // Convert to string for return type consistency
    return healthScore.toFixed(0);
  }
  
  /**
   * Get default health metrics
   */
  getDefaultMetrics(): HealthMetrics {
    return {
      cpuUtilization: 0,
      memoryUtilization: 0,
      errorRate: 0,
      responseTime: 0,
      operationsPerSecond: 0,
      stability: 0,
      lastUpdated: Date.now(),
      systemLoad: 0,
      userEngagement: 0,
      requestsPerMinute: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      neuralAccuracy: 0,
      neuralEfficiency: 0,
      neuralLatency: 0,
      memoryAllocation: 0,
      networkThroughput: 0,
      requestRate: 0,
      averageResponseTime: 0
    };
  }
  
  /**
   * Get default service metrics
   * Updated to ensure all required fields are present
   */
  getDefaultServiceMetrics(): ServiceMetrics {
    return {
      operationsCount: 0,
      errorCount: 0,
      latency: 0,
      responseTime: 0,
      successRate: 1.0,
      errorRate: 0,
      processingSpeed: 0,
      accuracy: 0,
      uptime: 0,
      requestsProcessed: 0,
      errors: 0
    };
  }

  /**
   * Create a performance report
   */
  createPerformanceReport(): PerformanceReport {
    const timestamp = new Date();
    const systemMetrics = this.getSummaryMetrics();
    
    return {
      timestamp,
      overallHealth: this.calculateOverallHealth(),
      services: this.getServiceStatuses(),
      systemMetrics: {
        cpuUsage: systemMetrics.cpuUsage,
        memoryUsage: systemMetrics.memoryUsage,
        responseTime: systemMetrics.responseTime,
        operationsPerSecond: systemMetrics.operationsPerSecond,
        errorRate: systemMetrics.errorRate
      },
      recommendations: this.generateRecommendations()
    };
  }
  
  /**
   * Simulate a system crash
   */
  simulateCrash(): void {
    console.error("Simulating system crash!");
    // Simulate a crash by throwing an unhandled exception
    throw new Error("Simulated system crash");
  }

  /**
   * Create complete HealthMetrics object
   * Ensures all required fields are populated
   */
  createHealthMetrics(data: any): HealthMetrics {
    return {
      cpuUtilization: data.cpuUtilization || 0,
      memoryUtilization: data.memoryUtilization || 0,
      errorRate: data.errorRate || 0,
      responseTime: data.responseTime || 0,
      operationsPerSecond: data.operationsPerSecond || 0,
      stability: data.stability || 0,
      lastUpdated: data.lastUpdated || Date.now(),
      systemLoad: data.systemLoad || 0,
      userEngagement: data.userEngagement || 0,
      requestsPerMinute: data.requestsPerMinute || 0,
      cpuUsage: data.cpuUsage || data.cpuUtilization || 0,
      memoryUsage: data.memoryUsage || data.memoryUtilization || 0,
      neuralAccuracy: data.neuralAccuracy || 0,
      neuralEfficiency: data.neuralEfficiency || 0,
      neuralLatency: data.neuralLatency || 0,
      
      // Add required fields that were missing
      memoryAllocation: data.memoryAllocation || data.memoryUtilization / 100 || 0,
      networkThroughput: data.networkThroughput || 0,
      requestRate: data.requestRate || data.operationsPerSecond || 0,
      averageResponseTime: data.averageResponseTime || data.responseTime || 0
    };
  }
}

// Export singleton instance
export default new NeuralMetricsProvider();
