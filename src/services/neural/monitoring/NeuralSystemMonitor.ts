import { HealthMetrics, PerformanceReport } from '@/types/neuralMetrics';
import neuralMetricsProvider from './NeuralMetricsProvider';
import { neuralReporter } from '../reporting/NeuralReporter';
import { NeuralSystemStatus } from '../types/neuralHub';
import { neuralHub } from '../UnifiedNeuralHub';

/**
 * A centralized monitoring service for neural systems
 * Provides real-time monitoring, alerts, and system health checks
 */
export class NeuralSystemMonitor {
  private static instance: NeuralSystemMonitor;
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private alertThresholds: Record<string, number> = {
    cpuUtilization: 90,
    memoryUtilization: 85,
    errorRate: 5,
    responseTime: 500,
    stability: 0.7
  };
  
  private constructor() {
    // Private constructor for singleton
  }
  
  public static getInstance(): NeuralSystemMonitor {
    if (!NeuralSystemMonitor.instance) {
      NeuralSystemMonitor.instance = new NeuralSystemMonitor();
    }
    return NeuralSystemMonitor.instance;
  }
  
  /**
   * Start monitoring the neural system
   * @param intervalMs Monitoring interval in milliseconds
   * @returns A function to stop monitoring
   */
  public startMonitoring(intervalMs: number = 30000): () => void {
    if (this.isMonitoring) {
      console.info('Neural system monitoring is already active');
      return this.stopMonitoring;
    }
    
    this.isMonitoring = true;
    console.info(`Starting neural system monitoring with interval ${intervalMs}ms`);
    
    // Initial check
    this.performHealthCheck();
    
    // Set up interval for regular monitoring
    const intervalId = setInterval(() => {
      this.performHealthCheck();
    }, intervalMs);
    
    this.monitoringInterval = intervalId;
    
    // Return function to stop monitoring
    return this.stopMonitoring;
  }
  
  /**
   * Stop the neural system monitoring
   */
  public stopMonitoring = (): void => {
    if (!this.isMonitoring || this.monitoringInterval === null) {
      console.info('Neural system monitoring is not active');
      return;
    }
    
    clearInterval(this.monitoringInterval);
    this.monitoringInterval = null;
    this.isMonitoring = false;
    console.info('Neural system monitoring stopped');
  }
  
  /**
   * Check if monitoring is currently active
   */
  public isActive(): boolean {
    return this.isMonitoring;
  }
  
  /**
   * Perform a health check on the neural system
   */
  public performHealthCheck(): PerformanceReport {
    try {
      // Get the latest metrics
      const metrics = neuralMetricsProvider.getMetrics();
      
      // Generate a performance report
      const report = neuralReporter.generateReport();
      
      // Check for alerts
      const alerts = this.checkForAlerts(metrics);
      
      // Log critical alerts
      if (alerts.critical.length > 0) {
        console.error('CRITICAL NEURAL SYSTEM ALERTS:', alerts.critical);
      }
      
      // Log warnings
      if (alerts.warnings.length > 0) {
        console.warn('Neural system warnings:', alerts.warnings);
      }
      
      return report;
    } catch (error) {
      console.error('Error during neural system health check:', error);
      throw error;
    }
  }
  
  /**
   * Get the current system status
   */
  public getSystemStatus(): NeuralSystemStatus {
    try {
      return neuralHub.getSystemStatus();
    } catch (error) {
      console.error('Error getting neural system status:', error);
      
      // Return a default error status
      return {
        operational: false,
        uptime: 0,
        activeModules: [],
        processingQueue: 0,
        latency: 0,
        errorRate: 100
      };
    }
  }
  
  /**
   * Update the alert thresholds
   */
  public updateAlertThresholds(thresholds: Partial<Record<string, number>>): void {
    this.alertThresholds = {
      ...this.alertThresholds,
      ...thresholds
    };
    console.info('Neural system alert thresholds updated:', this.alertThresholds);
  }
  
  /**
   * Check metrics for any alerts
   */
  private checkForAlerts(metrics: HealthMetrics): {
    critical: string[];
    warnings: string[];
  } {
    const critical: string[] = [];
    const warnings: string[] = [];
    
    // Check CPU utilization
    if (metrics.cpuUtilization > this.alertThresholds.cpuUtilization) {
      critical.push(`CPU utilization critical: ${metrics.cpuUtilization.toFixed(1)}%`);
    } else if (metrics.cpuUtilization > this.alertThresholds.cpuUtilization * 0.8) {
      warnings.push(`High CPU utilization: ${metrics.cpuUtilization.toFixed(1)}%`);
    }
    
    // Check memory utilization
    if (metrics.memoryUtilization > this.alertThresholds.memoryUtilization) {
      critical.push(`Memory utilization critical: ${metrics.memoryUtilization.toFixed(1)}%`);
    } else if (metrics.memoryUtilization > this.alertThresholds.memoryUtilization * 0.8) {
      warnings.push(`High memory utilization: ${metrics.memoryUtilization.toFixed(1)}%`);
    }
    
    // Check error rate
    if (metrics.errorRate > this.alertThresholds.errorRate) {
      critical.push(`Error rate critical: ${metrics.errorRate.toFixed(2)}%`);
    } else if (metrics.errorRate > this.alertThresholds.errorRate * 0.5) {
      warnings.push(`Elevated error rate: ${metrics.errorRate.toFixed(2)}%`);
    }
    
    // Check response time
    if (metrics.responseTime > this.alertThresholds.responseTime) {
      warnings.push(`High response time: ${metrics.responseTime.toFixed(0)}ms`);
    }
    
    // Check stability
    if (metrics.stability < this.alertThresholds.stability) {
      warnings.push(`System stability concern: ${(metrics.stability * 100).toFixed(1)}%`);
    }
    
    return { critical, warnings };
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
}

export const neuralSystemMonitor = NeuralSystemMonitor.getInstance();
export default neuralSystemMonitor;
