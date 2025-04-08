/**
 * Neural Analytics - Analytics and reporting for the neural hub
 */
import { NeuralModel, SystemHealthMetrics } from '../types/neuralHub';

interface PerformancePoint {
  timestamp: Date;
  value: number;
  label: string;
}

interface PerformanceData {
  accuracy: PerformancePoint[];
  latency: PerformancePoint[];
  throughput: PerformancePoint[];
  resourceUsage: PerformancePoint[];
}

export class NeuralAnalytics {
  private performanceHistory: Map<string, PerformanceData> = new Map();
  private healthMetricsHistory: SystemHealthMetrics[] = [];
  
  constructor() {
    console.log('Neural Analytics initialized');
  }
  
  /**
   * Record performance metrics for a neural model
   */
  recordModelPerformance(model: NeuralModel): void {
    const modelId = model.id;
    const now = new Date();
    
    // Initialize performance data for this model if it doesn't exist
    if (!this.performanceHistory.has(modelId)) {
      this.performanceHistory.set(modelId, {
        accuracy: [],
        latency: [],
        throughput: [],
        resourceUsage: []
      });
    }
    
    // Get existing performance data
    const performanceData = this.performanceHistory.get(modelId)!;
    
    // Record new data points
    performanceData.accuracy.push({
      timestamp: now,
      value: model.performance.accuracy,
      label: `${(model.performance.accuracy * 100).toFixed(1)}%`
    });
    
    performanceData.latency.push({
      timestamp: now,
      value: model.performance.latency,
      label: `${model.performance.latency}ms`
    });
    
    performanceData.resourceUsage.push({
      timestamp: now,
      value: model.performance.resourceUsage,
      label: `${(model.performance.resourceUsage * 100).toFixed(1)}%`
    });
    
    if (model.performance.throughput !== undefined) {
      performanceData.throughput.push({
        timestamp: now,
        value: model.performance.throughput,
        label: `${model.performance.throughput}/s`
      });
    }
    
    // Limit history size (keep last 100 points)
    if (performanceData.accuracy.length > 100) {
      performanceData.accuracy = performanceData.accuracy.slice(-100);
      performanceData.latency = performanceData.latency.slice(-100);
      performanceData.resourceUsage = performanceData.resourceUsage.slice(-100);
      performanceData.throughput = performanceData.throughput.slice(-100);
    }
    
    // Update the map
    this.performanceHistory.set(modelId, performanceData);
  }
  
  /**
   * Record system health metrics
   */
  recordHealthMetrics(metrics: SystemHealthMetrics): void {
    this.healthMetricsHistory.push(metrics);
    
    // Limit history size (keep last 200 points)
    if (this.healthMetricsHistory.length > 200) {
      this.healthMetricsHistory = this.healthMetricsHistory.slice(-200);
    }
  }
  
  /**
   * Get performance history for a model
   */
  getModelPerformanceHistory(modelId: string): PerformanceData | null {
    return this.performanceHistory.get(modelId) || null;
  }
  
  /**
   * Get system health metrics history
   */
  getHealthMetricsHistory(): SystemHealthMetrics[] {
    return [...this.healthMetricsHistory];
  }
  
  /**
   * Calculate performance trends for a model
   */
  calculatePerformanceTrends(modelId: string, days: number = 7): any {
    const performanceData = this.performanceHistory.get(modelId);
    if (!performanceData) return null;
    
    const now = new Date();
    const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    // Filter data points within the requested time range
    const recentAccuracy = performanceData.accuracy.filter(
      point => point.timestamp >= pastDate
    );
    
    const recentLatency = performanceData.latency.filter(
      point => point.timestamp >= pastDate
    );
    
    const recentResourceUsage = performanceData.resourceUsage.filter(
      point => point.timestamp >= pastDate
    );
    
    const recentThroughput = performanceData.throughput.filter(
      point => point.timestamp >= pastDate
    );
    
    // Calculate trends (percentage change)
    const calculateTrend = (points: PerformancePoint[]): number | null => {
      if (points.length < 2) return null;
      
      const oldest = points[0].value;
      const newest = points[points.length - 1].value;
      
      return (newest - oldest) / oldest;
    };
    
    return {
      accuracyTrend: calculateTrend(recentAccuracy),
      latencyTrend: calculateTrend(recentLatency),
      resourceUsageTrend: calculateTrend(recentResourceUsage),
      throughputTrend: recentThroughput.length > 0 ? calculateTrend(recentThroughput) : null
    };
  }
}

// Singleton instance
export const neuralAnalytics = new NeuralAnalytics();
