
import { HealthMetrics, ServiceMetrics, PerformanceReport } from '@/types/neuralMetrics';
import neuralMetricsProvider from './NeuralMetricsProvider';
import neuralServiceRegistry from '../registry/NeuralServiceRegistry';
import { neuralReporter } from '../reporting/NeuralReporter';

/**
 * Neural System Monitor - Responsible for monitoring the health and performance
 * of the neural system components
 */
export class NeuralSystemMonitor {
  private static instance: NeuralSystemMonitor;
  private isActiveMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private healthCheckInterval: number = 30000; // 30 seconds default
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): NeuralSystemMonitor {
    if (!NeuralSystemMonitor.instance) {
      NeuralSystemMonitor.instance = new NeuralSystemMonitor();
    }
    return NeuralSystemMonitor.instance;
  }
  
  /**
   * Check if monitoring is active
   */
  public isActive(): boolean {
    return this.isActiveMonitoring;
  }
  
  /**
   * Start monitoring neural system health
   */
  public startMonitoring(interval: number = 30000): void {
    if (this.isActiveMonitoring) {
      console.warn('Neural system monitoring is already active');
      return;
    }
    
    this.healthCheckInterval = interval;
    this.isActiveMonitoring = true;
    
    // Perform initial health check
    this.performHealthCheck();
    
    // Set up interval for regular health checks
    this.monitoringInterval = setInterval(() => {
      this.performHealthCheck();
    }, interval);
    
    console.log(`Neural system monitoring started with ${interval}ms interval`);
  }
  
  /**
   * Stop monitoring neural system health
   */
  public stopMonitoring(): void {
    if (!this.isActiveMonitoring) {
      console.warn('Neural system monitoring is not active');
      return;
    }
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    this.isActiveMonitoring = false;
    console.log('Neural system monitoring stopped');
  }
  
  /**
   * Perform a health check on the neural system
   */
  public performHealthCheck(): PerformanceReport {
    try {
      // Get a performance report from the neural reporter
      const report = neuralReporter.generateReport();
      
      // Process the report to detect any issues
      this.processHealthReport(report);
      
      return report;
    } catch (error) {
      console.error('Error performing neural system health check:', error);
      
      // Generate a minimal error report
      const errorReport: PerformanceReport = {
        timestamp: new Date(),
        overallHealth: 0,
        services: {},
        systemMetrics: {
          cpuUsage: 0,
          memoryUsage: 0,
          responseTime: 0,
          operationsPerSecond: 0,
          errorRate: 1.0
        },
        recommendations: ['Investigate and resolve the system error']
      };
      
      return errorReport;
    }
  }
  
  /**
   * Process health report to detect issues
   */
  private processHealthReport(report: PerformanceReport): void {
    // Check overall health score
    if (report.overallHealth < 50) {
      console.warn(`Neural system health is critical: ${report.overallHealth}%`);
      // Trigger alerts or notifications
    } else if (report.overallHealth < 80) {
      console.warn(`Neural system health needs attention: ${report.overallHealth}%`);
    }
    
    // Check individual services
    Object.entries(report.services).forEach(([serviceId, serviceData]) => {
      if (serviceData.status === 'error') {
        console.error(`Service ${serviceId} is in error state`);
        // Trigger service-specific alerts
      } else if (serviceData.status === 'maintenance') {
        console.warn(`Service ${serviceId} is in maintenance mode`);
      }
      
      // Check service metrics for issues
      const metrics = serviceData.metrics;
      if (metrics.errorRate > 0.1) {
        console.warn(`Service ${serviceId} has high error rate: ${metrics.errorRate}`);
      }
      if (metrics.responseTime > 500) {
        console.warn(`Service ${serviceId} has high response time: ${metrics.responseTime}ms`);
      }
    });
    
    // Check system metrics
    const systemMetrics = report.systemMetrics;
    if (systemMetrics.cpuUsage > 90) {
      console.warn(`High CPU usage: ${systemMetrics.cpuUsage}%`);
    }
    if (systemMetrics.memoryUsage > 90) {
      console.warn(`High memory usage: ${systemMetrics.memoryUsage}%`);
    }
    if (systemMetrics.errorRate > 0.05) {
      console.warn(`Elevated error rate: ${systemMetrics.errorRate}`);
    }
  }
  
  /**
   * Get the current system status
   */
  public getSystemStatus(): any {
    const services = neuralServiceRegistry.getAllServices();
    
    // Calculate overall status
    let activeServices = 0;
    let errorServices = 0;
    let maintenanceServices = 0;
    
    services.forEach(service => {
      if (service.status === 'active') activeServices++;
      else if (service.status === 'error') errorServices++;
      else if (service.status === 'maintenance') maintenanceServices++;
    });
    
    let systemStatus = 'healthy';
    if (errorServices > 0) systemStatus = 'degraded';
    if (errorServices > services.length / 3) systemStatus = 'critical';
    
    return {
      status: systemStatus,
      totalServices: services.length,
      activeServices,
      errorServices,
      maintenanceServices,
      lastChecked: new Date()
    };
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
   * Reset a specific neural service
   */
  public async resetService(serviceId: string): Promise<boolean> {
    const service = neuralServiceRegistry.getService(serviceId);
    if (!service) {
      console.error(`Service ${serviceId} not found`);
      return false;
    }
    
    try {
      if (service.reset && typeof service.reset === 'function') {
        await service.reset();
        return true;
      }
      
      if (service.initialize && typeof service.initialize === 'function') {
        await service.initialize();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to reset service ${serviceId}:`, error);
      return false;
    }
  }
  
  /**
   * Reset the entire neural system
   */
  public async resetSystem(): Promise<boolean> {
    try {
      const services = neuralServiceRegistry.getAllServices();
      
      let success = true;
      for (const service of services) {
        if (service.reset && typeof service.reset === 'function') {
          const result = await service.reset();
          if (!result) success = false;
        }
      }
      
      return success;
    } catch (error) {
      console.error('Failed to reset neural system:', error);
      return false;
    }
  }
}

export const neuralSystemMonitor = NeuralSystemMonitor.getInstance();
export default neuralSystemMonitor;
