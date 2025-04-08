
/**
 * Neural Metrics - Tracking and reporting on neural system performance
 */
import { SystemHealthMetrics } from '../types/neuralHub';

// Define types for metrics collection
export interface MetricsHistory {
  timestamp: Date;
  metrics: SystemHealthMetrics;
}

export interface PerformanceReport {
  period: 'hourly' | 'daily' | 'weekly';
  startTime: Date;
  endTime: Date;
  averageLoad: number;
  peakLoad: number;
  averageResponseTime: number;
  totalOperations: number;
  errorRate: number;
  stability: number;
}

class NeuralMetricsCollector {
  private metricsHistory: MetricsHistory[] = [];
  private readonly MAX_HISTORY_SIZE = 1000;
  
  /**
   * Record a metrics snapshot
   */
  recordMetrics(metrics: SystemHealthMetrics): void {
    const entry: MetricsHistory = {
      timestamp: new Date(),
      metrics: { ...metrics }
    };
    
    this.metricsHistory.push(entry);
    
    // Maintain limited history size
    if (this.metricsHistory.length > this.MAX_HISTORY_SIZE) {
      this.metricsHistory = this.metricsHistory.slice(
        this.metricsHistory.length - this.MAX_HISTORY_SIZE
      );
    }
  }
  
  /**
   * Get metrics history within a time range
   */
  getMetricsHistory(startTime?: Date, endTime?: Date): MetricsHistory[] {
    if (!startTime && !endTime) {
      return [...this.metricsHistory];
    }
    
    const now = new Date();
    const start = startTime || new Date(0);
    const end = endTime || now;
    
    return this.metricsHistory.filter(entry => 
      entry.timestamp >= start && entry.timestamp <= end
    );
  }
  
  /**
   * Generate a performance report for a specific period
   */
  generatePerformanceReport(period: 'hourly' | 'daily' | 'weekly'): PerformanceReport {
    const now = new Date();
    let startTime: Date;
    
    switch (period) {
      case 'hourly':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case 'daily':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'weekly':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
    }
    
    const relevantMetrics = this.getMetricsHistory(startTime, now);
    
    if (relevantMetrics.length === 0) {
      return {
        period,
        startTime,
        endTime: now,
        averageLoad: 0,
        peakLoad: 0,
        averageResponseTime: 0,
        totalOperations: 0,
        errorRate: 0,
        stability: 0
      };
    }
    
    // Calculate aggregate metrics
    let totalLoad = 0;
    let peakLoad = 0;
    let totalResponseTime = 0;
    let totalOps = 0;
    let totalErrors = 0;
    let totalStability = 0;
    
    relevantMetrics.forEach(entry => {
      totalLoad += entry.metrics.load;
      peakLoad = Math.max(peakLoad, entry.metrics.load);
      totalResponseTime += entry.metrics.responseTime;
      totalOps += entry.metrics.operationsPerSecond;
      totalStability += entry.metrics.stability;
      totalErrors += entry.metrics.errorRate;
    });
    
    const count = relevantMetrics.length;
    
    return {
      period,
      startTime,
      endTime: now,
      averageLoad: totalLoad / count,
      peakLoad,
      averageResponseTime: totalResponseTime / count,
      totalOperations: totalOps,
      errorRate: totalErrors / count,
      stability: totalStability / count
    };
  }
  
  /**
   * Clear all metrics history
   */
  clearHistory(): void {
    this.metricsHistory = [];
  }
}

// Singleton instance
export const neuralMetrics = new NeuralMetricsCollector();
