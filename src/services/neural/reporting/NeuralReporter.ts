
import { HealthMetrics, ServiceMetrics, PerformanceReport } from '@/types/neuralMetrics';
import neuralMetricsProvider from '../monitoring/NeuralMetricsProvider';
import { collectServiceMetrics, calculateSystemMetrics } from './neuralMetrics';
import neuralServiceRegistry from '../registry/NeuralServiceRegistry';

/**
 * Neural Reporter Service - Responsible for generating comprehensive reports
 * of the neural system's health and performance
 */
export class NeuralReporter {
  private static instance: NeuralReporter;
  private lastReportTime: number = 0;
  private reportInterval: number = 60000; // 1 minute
  private reports: PerformanceReport[] = [];
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): NeuralReporter {
    if (!NeuralReporter.instance) {
      NeuralReporter.instance = new NeuralReporter();
    }
    return NeuralReporter.instance;
  }
  
  /**
   * Generate a comprehensive performance report
   */
  public generateReport(): PerformanceReport {
    const timestamp = new Date();
    this.lastReportTime = timestamp.getTime();
    
    // Get all services from registry
    const services = neuralServiceRegistry.getAllServices();
    
    // Collect metrics from all services
    const serviceMetrics = collectServiceMetrics(services);
    
    // Calculate system-wide metrics
    const systemMetricsAggregated = calculateSystemMetrics(serviceMetrics);
    
    // Get health metrics from provider
    const healthMetrics = neuralMetricsProvider.getMetrics();
    
    // Create the report
    const report: PerformanceReport = {
      timestamp,
      overallHealth: neuralMetricsProvider.calculateOverallHealth(),
      services: {},
      systemMetrics: {
        cpuUsage: healthMetrics.cpuUsage,
        memoryUsage: healthMetrics.memoryUsage,
        responseTime: healthMetrics.responseTime,
        operationsPerSecond: healthMetrics.operationsPerSecond,
        errorRate: healthMetrics.errorRate
      },
      recommendations: neuralMetricsProvider.generateRecommendations()
    };
    
    // Add service information to report
    services.forEach(service => {
      report.services[service.moduleId] = {
        status: service.status || 'unknown',
        metrics: serviceMetrics[service.moduleId] || this.getDefaultServiceMetrics()
      };
    });
    
    // Store report in history
    this.reports.push(report);
    
    // Limit report history size
    if (this.reports.length > 100) {
      this.reports.shift();
    }
    
    return report;
  }
  
  /**
   * Get the most recent report, or generate a new one if needed
   */
  public getLatestReport(): PerformanceReport {
    const now = Date.now();
    
    // Generate a new report if needed
    if (now - this.lastReportTime > this.reportInterval || this.reports.length === 0) {
      return this.generateReport();
    }
    
    // Return most recent report
    return this.reports[this.reports.length - 1];
  }
  
  /**
   * Get report history
   */
  public getReportHistory(): PerformanceReport[] {
    return [...this.reports];
  }
  
  /**
   * Get default service metrics
   */
  private getDefaultServiceMetrics(): ServiceMetrics {
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
   * Schedule regular reporting
   */
  public startScheduledReporting(interval: number = 60000): () => void {
    this.reportInterval = interval;
    
    // Generate initial report
    this.generateReport();
    
    // Set up interval for regular reporting
    const intervalId = setInterval(() => {
      this.generateReport();
    }, interval);
    
    // Return function to stop reporting
    return () => {
      clearInterval(intervalId);
    };
  }
}

export const neuralReporter = NeuralReporter.getInstance();
export default neuralReporter;
