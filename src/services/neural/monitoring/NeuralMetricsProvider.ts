import { HealthMetrics, ServiceMetrics } from '@/types/neuralMetrics';

/**
 * Service responsible for providing neural metrics from various sources
 * This helps decouple the large NeuralHub from metrics collection
 */
export class NeuralMetricsProvider {
  private lastMetricsUpdate: number = Date.now();
  private cachedMetrics: HealthMetrics;
  private metricsHistory: HealthMetrics[] = [];
  private maxHistoryLength: number = 100;
  private listeners: Set<() => void> = new Set();
  private refreshIntervalId: NodeJS.Timeout | null = null;
  
  constructor() {
    // Initialize with default metrics
    this.cachedMetrics = this.generateDefaultMetrics();
    
    // Add the initial metrics to history
    this.metricsHistory.push({...this.cachedMetrics});
  }
  
  /**
   * Start automatic refresh of metrics at the given interval
   * @param interval Refresh interval in milliseconds
   */
  startAutoRefresh(interval: number = 10000): void {
    this.stopAutoRefresh(); // Clear any existing interval
    
    this.refreshIntervalId = setInterval(() => {
      this.refreshMetrics();
    }, interval);
  }
  
  /**
   * Stop automatic refresh of metrics
   */
  stopAutoRefresh(): void {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  }
  
  /**
   * Add a listener to be notified when metrics are updated
   * @param listener Function to be called when metrics change
   */
  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    
    // Return a function that removes the listener
    return () => {
      this.listeners.delete(listener);
    };
  }
  
  /**
   * Force a refresh of metrics
   */
  refreshMetrics(): HealthMetrics {
    const newMetrics = this.generateMetrics();
    this.cachedMetrics = newMetrics;
    this.lastMetricsUpdate = Date.now();
    
    // Add to history, maintaining maximum length
    this.metricsHistory.push({...newMetrics});
    if (this.metricsHistory.length > this.maxHistoryLength) {
      this.metricsHistory.shift();
    }
    
    // Notify listeners
    this.notifyListeners();
    
    return newMetrics;
  }
  
  /**
   * Notify all registered listeners that metrics have changed
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('Error in metrics listener:', error);
      }
    });
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
      return this.refreshMetrics();
    }
    
    return this.cachedMetrics;
  }
  
  /**
   * Get historical metrics over time
   * @param limit Maximum number of history items to return (from most recent)
   */
  getMetricsHistory(limit?: number): HealthMetrics[] {
    if (limit && limit > 0) {
      return this.metricsHistory.slice(-limit);
    }
    return [...this.metricsHistory];
  }
  
  /**
   * Clear the metrics history
   */
  clearHistory(): void {
    this.metricsHistory = [];
    this.metricsHistory.push({...this.cachedMetrics});
  }
  
  /**
   * Generate a performance report based on current and historical metrics
   */
  generatePerformanceReport(): PerformanceReport {
    const currentMetrics = this.cachedMetrics;
    const history = this.getMetricsHistory(30); // Last 30 data points
    
    // Calculate trends based on history
    const cpuTrend = this.calculateTrend(history.map(m => m.cpuUtilization));
    const memoryTrend = this.calculateTrend(history.map(m => m.memoryUtilization));
    const errorTrend = this.calculateTrend(history.map(m => m.errorRate));
    
    // Generate recommendations based on trends and current metrics
    const recommendations = this.generateRecommendations(currentMetrics, {
      cpuTrend,
      memoryTrend,
      errorTrend
    });
    
    return {
      timestamp: new Date(),
      overallHealth: this.calculateOverallHealth(currentMetrics),
      services: {
        neural: {
          status: 'active',
          metrics: {
            operationsCount: currentMetrics.operationsPerSecond * 60, // per minute
            errorRate: currentMetrics.errorRate,
            latency: currentMetrics.responseTime,
            successRate: 100 - currentMetrics.errorRate
          }
        }
      },
      systemMetrics: {
        cpuUsage: currentMetrics.cpuUsage,
        memoryUsage: currentMetrics.memoryUsage,
        responseTime: currentMetrics.responseTime,
        operationsPerSecond: currentMetrics.operationsPerSecond,
        errorRate: currentMetrics.errorRate
      },
      recommendations
    };
  }
  
  /**
   * Calculate the trend of a series of values
   * @param values Array of values
   * @returns Trend percentage (positive for increasing, negative for decreasing)
   */
  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    // Use simple linear regression to calculate trend
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    
    for (let i = 0; i < values.length; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumX2 += i * i;
    }
    
    const n = values.length;
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    
    // Convert slope to percentage change over the whole period
    const startVal = values[0] || 1; // Avoid division by zero
    const percentChange = (slope * (values.length - 1)) / startVal * 100;
    
    return percentChange;
  }
  
  /**
   * Calculate overall health score based on key metrics
   * @param metrics Current health metrics
   * @returns Health score from 0 to 100
   */
  private calculateOverallHealth(metrics: HealthMetrics): number {
    // Weight factors for each component
    const weights = {
      cpuUtilization: 0.2,
      memoryUtilization: 0.2,
      errorRate: 0.25,
      responseTime: 0.15,
      stability: 0.2
    };
    
    // Calculate normalized scores (0-100 where 100 is best)
    const cpuScore = 100 - metrics.cpuUtilization;
    const memoryScore = 100 - metrics.memoryUtilization;
    const errorScore = 100 - (metrics.errorRate * 20); // Scale error rate (0-5 typical range)
    const responseScore = 100 - (metrics.responseTime / 2); // Scale response time (0-200ms typical range)
    const stabilityScore = metrics.stability * 100;
    
    // Combine weighted scores
    const overallHealth = (
      weights.cpuUtilization * cpuScore +
      weights.memoryUtilization * memoryScore +
      weights.errorRate * errorScore +
      weights.responseTime * responseScore +
      weights.stability * stabilityScore
    );
    
    // Ensure score is within 0-100 range
    return Math.min(100, Math.max(0, overallHealth));
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
      
      // Add required fields that were missing
      memoryAllocation: Math.random() * 100,
      networkThroughput: Math.random(),
      requestRate: Math.random() * 100,
      averageResponseTime: Math.random() * 200
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
      
      // Add required fields that were missing
      memoryAllocation: 42,
      networkThroughput: 0,
      requestRate: 850,
      averageResponseTime: 120
    };
  }
  
  /**
   * Create a complete ServiceMetrics object
   * This fixes the error at line 152
   */
  createServiceMetrics(data: any): ServiceMetrics {
    return {
      operationsCount: data.operationsCount || 0,
      errorCount: data.errorCount || 0,
      errorRate: data.errorRate || 0,
      latency: data.latency !== undefined ? data.latency : null,
      responseTime: data.responseTime || 0,
      successRate: data.successRate !== undefined ? data.successRate : 1.0
    };
  }
  
  /**
   * Create complete HealthMetrics object
   * This fixes the errors at lines 243 and 266
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
  
  /**
   * Generate recommendations based on metrics and trends
   */
  private generateRecommendations(metrics: HealthMetrics, trends: Record<string, number>): string[] {
    const recommendations: string[] = [];
    
    // CPU recommendations
    if (metrics.cpuUtilization > 75) {
      recommendations.push("High CPU utilization detected. Consider scaling computing resources or optimizing neural processing pipelines.");
    }
    if (trends.cpuTrend > 10) {
      recommendations.push("CPU utilization has been increasing. Review recent changes to neural models that may be causing increased load.");
    }
    
    // Memory recommendations
    if (metrics.memoryUtilization > 80) {
      recommendations.push("Memory utilization approaching capacity. Consider increasing available memory or optimizing memory usage.");
    }
    if (trends.memoryTrend > 15) {
      recommendations.push("Memory usage is growing rapidly. Check for potential memory leaks in neural processing modules.");
    }
    
    // Error rate recommendations
    if (metrics.errorRate > 2) {
      recommendations.push("Error rate exceeds normal threshold. Investigate error patterns in neural processing pipelines.");
    }
    if (trends.errorTrend > 20) {
      recommendations.push("Error rate is increasing significantly. Immediate attention required to prevent system degradation.");
    }
    
    // Response time recommendations
    if (metrics.responseTime > 150) {
      recommendations.push("Neural response time is above optimal levels. Consider optimizing neural pathways for improved performance.");
    }
    
    // Neural specific recommendations
    if (metrics.neuralAccuracy < 0.85) {
      recommendations.push("Neural accuracy is below target threshold. Consider retraining models with updated datasets.");
    }
    
    if (metrics.neuralEfficiency < 0.8) {
      recommendations.push("Neural processing efficiency could be improved. Consider implementing neural caching or optimizing data flows.");
    }
    
    if (metrics.neuralLatency > 60) {
      recommendations.push("Neural latency is higher than optimal. Review neural architecture to identify bottlenecks.");
    }
    
    // If everything is good, provide a positive recommendation
    if (recommendations.length === 0) {
      recommendations.push("All neural systems operating within optimal parameters. Continued monitoring recommended.");
    }
    
    return recommendations;
  }
}

// Export a singleton instance
export const neuralMetricsProvider = new NeuralMetricsProvider();

// For convenience, also export the singleton's methods directly
export const getHealthMetrics = (forceRefresh?: boolean, maxCacheAge?: number) => 
  neuralMetricsProvider.getHealthMetrics(forceRefresh, maxCacheAge);

export const getMetricsHistory = (limit?: number) =>
  neuralMetricsProvider.getMetricsHistory(limit);

export const refreshMetrics = () =>
  neuralMetricsProvider.refreshMetrics();

export const generatePerformanceReport = () =>
  neuralMetricsProvider.generatePerformanceReport();

export const startAutoRefresh = (interval?: number) =>
  neuralMetricsProvider.startAutoRefresh(interval);

export const stopAutoRefresh = () =>
  neuralMetricsProvider.stopAutoRefresh();

export const addMetricsListener = (listener: () => void) =>
  neuralMetricsProvider.addListener(listener);
