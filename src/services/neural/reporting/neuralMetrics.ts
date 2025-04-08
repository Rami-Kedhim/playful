/**
 * Neural Metrics Service - Collects and reports metrics for neural systems
 */

export interface MetricsHistory {
  timestamp: Date;
  metrics: Record<string, number>;
}

export interface PerformanceReport {
  totalOperations: number;
  averageResponseTime: number;
  errorRate: number;
  peakMemoryUsage: number;
  topModels: Array<{
    modelId: string;
    usage: number;
    accuracy: number;
  }>;
}

class NeuralMetricsService {
  private metricsHistory: MetricsHistory[] = [];
  private lastCollected: Date = new Date();
  
  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    const now = new Date();
    
    // Generate sample data for the past 7 days
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      this.metricsHistory.push({
        timestamp: date,
        metrics: {
          operationsPerSecond: 1000 + (Math.random() * 500),
          responseTimeMs: 50 + (Math.random() * 30),
          errorRate: 0.001 + (Math.random() * 0.005),
          memoryUsagePercent: 40 + (Math.random() * 20),
          cpuUsagePercent: 30 + (Math.random() * 30),
          activeConnections: 100 + (Math.random() * 50),
          modelsInUse: 3 + Math.floor(Math.random() * 3)
        }
      });
    }
    
    this.lastCollected = now;
  }
  
  /**
   * Collect current metrics from the system
   */
  collectMetrics() {
    const now = new Date();
    
    // In a real implementation, this would collect actual metrics
    // For now, we'll generate simulated metrics
    this.metricsHistory.push({
      timestamp: now,
      metrics: {
        operationsPerSecond: 1000 + (Math.random() * 500),
        responseTimeMs: 50 + (Math.random() * 30),
        errorRate: 0.001 + (Math.random() * 0.005),
        memoryUsagePercent: 40 + (Math.random() * 20),
        cpuUsagePercent: 30 + (Math.random() * 30),
        activeConnections: 100 + (Math.random() * 50),
        modelsInUse: 3 + Math.floor(Math.random() * 3)
      }
    });
    
    // Keep only the last 1000 metrics records
    if (this.metricsHistory.length > 1000) {
      this.metricsHistory = this.metricsHistory.slice(-1000);
    }
    
    this.lastCollected = now;
  }
  
  /**
   * Get all collected metrics
   */
  getAllMetrics() {
    return [...this.metricsHistory];
  }
  
  /**
   * Get metrics within a specific time range
   */
  getMetricsByTimeRange(startTime: Date, endTime: Date) {
    return this.metricsHistory.filter(
      item => item.timestamp >= startTime && item.timestamp <= endTime
    );
  }
  
  /**
   * Get the most recent metrics
   */
  getLatestMetrics() {
    if (this.metricsHistory.length === 0) {
      return null;
    }
    return this.metricsHistory[this.metricsHistory.length - 1];
  }
  
  /**
   * Generate a performance report for a specific time period
   */
  generatePerformanceReport(period: 'hourly' | 'daily' | 'weekly' | 'monthly'): PerformanceReport {
    let metrics: MetricsHistory[];
    const now = new Date();
    
    // Filter metrics based on the requested period
    switch (period) {
      case 'hourly':
        const oneHourAgo = new Date(now);
        oneHourAgo.setHours(now.getHours() - 1);
        metrics = this.getMetricsByTimeRange(oneHourAgo, now);
        break;
      case 'daily':
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);
        metrics = this.getMetricsByTimeRange(oneDayAgo, now);
        break;
      case 'weekly':
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        metrics = this.getMetricsByTimeRange(oneWeekAgo, now);
        break;
      case 'monthly':
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        metrics = this.getMetricsByTimeRange(oneMonthAgo, now);
        break;
      default:
        metrics = this.getAllMetrics();
    }
    
    // Calculate aggregates
    const totalOperations = metrics.reduce(
      (sum, item) => sum + item.metrics.operationsPerSecond, 0
    );
    
    const averageResponseTime = metrics.reduce(
      (sum, item) => sum + item.metrics.responseTimeMs, 0
    ) / Math.max(1, metrics.length);
    
    const averageErrorRate = metrics.reduce(
      (sum, item) => sum + item.metrics.errorRate, 0
    ) / Math.max(1, metrics.length);
    
    const peakMemoryUsage = Math.max(
      ...metrics.map(item => item.metrics.memoryUsagePercent)
    );
    
    // Simulate top models data
    const topModels = [
      { modelId: 'semantic-analysis-1', usage: 42, accuracy: 0.92 },
      { modelId: 'image-recognition-2', usage: 28, accuracy: 0.85 },
      { modelId: 'nlp-processing-3', usage: 17, accuracy: 0.78 }
    ];
    
    return {
      totalOperations,
      averageResponseTime,
      errorRate: averageErrorRate,
      peakMemoryUsage,
      topModels
    };
  }
}

// Singleton instance
export const neuralMetrics = new NeuralMetricsService();
