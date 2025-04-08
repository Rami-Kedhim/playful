
/**
 * Neural Analytics - Analytics and reporting for the neural hub
 */
import { NeuralModel, SystemHealthMetrics } from '../types/neuralHub';

export interface PerformancePoint {
  timestamp: Date;
  value: number;
  label: string;
}

export interface PerformanceData {
  accuracy: PerformancePoint[];
  latency: PerformancePoint[];
  throughput: PerformancePoint[];
  resourceUsage: PerformancePoint[];
}

export interface PerformanceTrend {
  date: Date;
  value: number;
  category: string;
}

export interface NeuralAnalyticsReport {
  summary: {
    accuracy: number;
    latency: number;
    throughput: number;
    resourceUsage: number;
    recommendations: string[];
  };
  trends: {
    timestamp: Date;
    load: number;
    accuracy: number;
    latency: number;
  }[];
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

// Functions needed by other components
export function generateNeuralAnalytics(): NeuralAnalyticsReport {
  // Generate a simulated analytics report
  const currentDate = new Date();
  const trends = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6-i));
    return {
      timestamp: date,
      load: 0.3 + Math.random() * 0.4,
      accuracy: 0.85 + Math.random() * 0.1,
      latency: 30 + Math.random() * 20
    };
  });
  
  return {
    summary: {
      accuracy: 0.91,
      latency: 45.2,
      throughput: 1200,
      resourceUsage: 0.65,
      recommendations: [
        "Increase model batch size to improve throughput",
        "Consider reducing precision to improve latency",
        "Add additional training data to improve accuracy"
      ]
    },
    trends
  };
}

export function generatePerformanceForecast(days: number): PerformanceTrend[] {
  const forecast: PerformanceTrend[] = [];
  const currentDate = new Date();
  
  // Generate synthetic forecast data
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    
    // Add accuracy forecast
    forecast.push({
      date,
      value: 0.85 + (i * 0.01) + (Math.random() * 0.05),
      category: 'accuracy'
    });
    
    // Add latency forecast
    forecast.push({
      date,
      value: 45 - (i * 0.5) + (Math.random() * 5),
      category: 'latency'
    });
    
    // Add resource usage forecast
    forecast.push({
      date,
      value: 0.65 + (i * 0.02) + (Math.random() * 0.1),
      category: 'resourceUsage'
    });
  }
  
  return forecast;
}
