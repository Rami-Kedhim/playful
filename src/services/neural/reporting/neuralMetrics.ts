
import { SystemHealthMetrics } from '../types/neuralHub';

export interface MetricsHistory {
  timestamp: Date;
  metrics: SystemHealthMetrics;
}

export interface PerformanceReport {
  totalOperations: number;
  averageResponseTime: number;
  errorRate: number;
  peakLoad: number;
  stability: number;
}

class NeuralMetricsService {
  private history: MetricsHistory[] = [];
  
  constructor() {
    // Initialize with some sample data
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      this.history.push({
        timestamp,
        metrics: this.generateSampleMetrics()
      });
    }
  }
  
  private generateSampleMetrics(): SystemHealthMetrics {
    return {
      load: 0.2 + Math.random() * 0.5,
      memoryUtilization: 0.3 + Math.random() * 0.4,
      operationsPerSecond: 800 + Math.random() * 500,
      responseTime: 30 + Math.random() * 30,
      errorRate: 0.001 + Math.random() * 0.01,
      stability: 0.9 + Math.random() * 0.09,
      userEngagement: 0.6 + Math.random() * 0.3,
      economicBalance: 0.7 + Math.random() * 0.2,
      lastUpdated: new Date()
    };
  }
  
  recordMetrics(metrics: SystemHealthMetrics): void {
    this.history.push({
      timestamp: new Date(),
      metrics
    });
    
    // Limit history size
    if (this.history.length > 720) { // Keep about 30 days at hourly records
      this.history = this.history.slice(-720);
    }
  }
  
  getHistory(hours: number = 24): MetricsHistory[] {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - hours);
    
    return this.history.filter(item => item.timestamp >= cutoff);
  }
  
  generatePerformanceReport(period: 'hourly' | 'daily' | 'weekly' | 'monthly'): PerformanceReport {
    let hours: number;
    
    switch (period) {
      case 'hourly':
        hours = 1;
        break;
      case 'daily':
        hours = 24;
        break;
      case 'weekly':
        hours = 24 * 7;
        break;
      case 'monthly':
        hours = 24 * 30;
        break;
    }
    
    const relevantHistory = this.getHistory(hours);
    
    if (relevantHistory.length === 0) {
      return {
        totalOperations: 0,
        averageResponseTime: 0,
        errorRate: 0,
        peakLoad: 0,
        stability: 1
      };
    }
    
    // Calculate average values
    let totalOps = 0;
    let totalResponseTime = 0;
    let totalErrorRate = 0;
    let peakLoad = 0;
    let averageStability = 0;
    
    relevantHistory.forEach(item => {
      totalOps += item.metrics.operationsPerSecond;
      totalResponseTime += item.metrics.responseTime;
      totalErrorRate += item.metrics.errorRate;
      peakLoad = Math.max(peakLoad, item.metrics.load);
      averageStability += item.metrics.stability;
    });
    
    const count = relevantHistory.length;
    const operationsPerSecond = totalOps / count;
    
    // Adjust for the time period
    const secondsInPeriod = hours * 60 * 60;
    const totalOperations = Math.round(operationsPerSecond * secondsInPeriod);
    
    return {
      totalOperations,
      averageResponseTime: totalResponseTime / count,
      errorRate: totalErrorRate / count,
      peakLoad,
      stability: averageStability / count
    };
  }
}

export const neuralMetrics = new NeuralMetricsService();
