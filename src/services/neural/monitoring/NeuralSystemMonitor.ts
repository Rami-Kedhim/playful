
import { PerformanceReport, ServiceMetrics } from '@/types/neuralMetrics';
import neuralServiceRegistry from '../registry/NeuralServiceRegistry';
import { collectServiceMetrics } from '../reporting/neuralMetrics';
import { BaseNeuralService } from '../types/NeuralService';

/**
 * Neural System Monitor - Responsible for monitoring the health and performance
 * of neural services and components in the system
 */
export class NeuralSystemMonitor {
  private static instance: NeuralSystemMonitor;
  private isMonitoring: boolean = false;
  private monitorInterval: number | null = null;
  private serviceStatuses: Record<string, string> = {};
  private alerts: string[] = [];
  
  private constructor() {
    // Private constructor for singleton pattern
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
    return this.isMonitoring;
  }
  
  /**
   * Start monitoring neural system
   * @param interval Monitoring interval in milliseconds
   * @returns Cleanup function to stop monitoring
   */
  public startMonitoring(interval: number = 60000): () => void {
    if (this.isMonitoring) {
      console.log('Neural system monitoring already active');
      return this.stopMonitoring;
    }
    
    console.log(`Starting neural system monitoring (interval: ${interval}ms)`);
    this.isMonitoring = true;
    
    // Perform initial health check
    this.performHealthCheck();
    
    // Start monitoring interval
    this.monitorInterval = setInterval(() => {
      this.performHealthCheck();
    }, interval) as unknown as number;
    
    // Return function to stop monitoring
    return this.stopMonitoring;
  }
  
  /**
   * Stop monitoring neural system
   */
  public stopMonitoring = (): void => {
    if (!this.isMonitoring) {
      console.log('Neural system monitoring already inactive');
      return;
    }
    
    console.log('Stopping neural system monitoring');
    this.isMonitoring = false;
    
    if (this.monitorInterval !== null) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
  };
  
  /**
   * Perform health check on all registered neural services
   */
  public performHealthCheck(): PerformanceReport {
    console.log('Performing neural system health check');
    
    // Get all services from registry
    const services = neuralServiceRegistry.getAllServices();
    
    // Collect metrics from all services
    const serviceMetrics = collectServiceMetrics(services);
    
    // Create health report
    const report: PerformanceReport = {
      timestamp: new Date(),
      overallHealth: 'excellent',
      services: {},
      systemMetrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        responseTime: 0,
        operationsPerSecond: 0,
        errorRate: 0
      },
      recommendations: []
    };
    
    // Process each service
    services.forEach(service => {
      const metrics = serviceMetrics[service.moduleId] || this.getDefaultServiceMetrics();
      const prevStatus = this.serviceStatuses[service.moduleId];
      
      // Check for status changes
      if (prevStatus && prevStatus !== service.status) {
        this.alerts.push(`Service ${service.name} status changed from ${prevStatus} to ${service.status}`);
      }
      
      // Store current status
      this.serviceStatuses[service.moduleId] = service.status;
      
      // Add service to report
      report.services[service.moduleId] = {
        status: service.status,
        metrics
      };
      
      // Check for issues
      this.checkForServiceIssues(service, metrics);
    });
    
    return report;
  }
  
  /**
   * Get default service metrics
   */
  private getDefaultServiceMetrics(): ServiceMetrics {
    return {
      operationsCount: 0,
      errorCount: 0,
      responseTime: 0,
      latency: 0,
      errorRate: 0,
      successRate: 1.0,
      processingSpeed: 0,
      accuracy: 0,
      uptime: 0,
      requestsProcessed: 0,
      errors: 0
    };
  }
  
  /**
   * Check for issues with a service
   */
  private checkForServiceIssues(service: BaseNeuralService, metrics: ServiceMetrics): void {
    // Check for high error rate
    if (metrics.errorRate > 0.05) {
      this.alerts.push(`High error rate detected for ${service.name}: ${(metrics.errorRate * 100).toFixed(2)}%`);
      this.tryServiceRecovery(service);
    }
    
    // Check for low success rate
    if (metrics.successRate < 0.95) {
      this.alerts.push(`Low success rate detected for ${service.name}: ${(metrics.successRate * 100).toFixed(2)}%`);
      this.tryServiceRecovery(service);
    }
    
    // Check for high latency
    if (metrics.latency > 200) {
      this.alerts.push(`High latency detected for ${service.name}: ${metrics.latency}ms`);
    }
  }
  
  /**
   * Try to recover a failing service
   */
  private tryServiceRecovery(service: BaseNeuralService): void {
    console.log(`Attempting recovery for service: ${service.name}`);
    
    try {
      // If the service has a reset method, try to reset it
      if (typeof service.reset === 'function') {
        service.reset().then(success => {
          if (success) {
            console.log(`Successfully reset service: ${service.name}`);
          } else {
            console.error(`Failed to reset service: ${service.name}`);
          }
        }).catch(error => {
          console.error(`Error during service reset: ${service.name}`, error);
        });
      }
    } catch (error) {
      console.error(`Failed recovery attempt for service: ${service.name}`, error);
    }
  }
  
  /**
   * Get current system status
   */
  public getSystemStatus(): any {
    // Create basic system status
    const status = {
      operational: true,
      uptime: 99.9,
      activeModules: [],
      processingQueue: 0,
      latency: 0,
      memoryUtilization: 0,
      cpuUtilization: 0,
      errorRate: 0,
      neuralAccuracy: 0,
      stability: 0
    };
    
    try {
      // Get services from registry
      const services = neuralServiceRegistry.getAllServices();
      
      // Collect active service IDs
      status.activeModules = services
        .filter(service => service.status === 'active')
        .map(service => service.moduleId);
      
      // Get metrics from all services
      const allMetrics = services.map(service => service.getMetrics());
      
      // Calculate averages across services
      if (allMetrics.length > 0) {
        status.latency = allMetrics.reduce((sum, metrics) => sum + (metrics.latency || 0), 0) / allMetrics.length;
        status.errorRate = allMetrics.reduce((sum, metrics) => sum + (metrics.errorRate || 0), 0) / allMetrics.length;
        status.neuralAccuracy = allMetrics.reduce((sum, metrics) => sum + (metrics.accuracy || 0), 0) / allMetrics.length;
      }
      
      // Mock CPU and memory utilization
      status.cpuUtilization = 25 + Math.random() * 30;
      status.memoryUtilization = 40 + Math.random() * 20;
      status.stability = 100 - (status.errorRate * 100);
      
      // Custom logic for determining operational status
      status.operational = status.errorRate < 0.1 && status.stability > 80;
    } catch (error) {
      console.error('Error while getting system status:', error);
      status.operational = false;
      status.errorRate = 1.0;
      status.stability = 0;
    }
    
    return status;
  }
  
  /**
   * Get recent alerts
   */
  public getAlerts(): string[] {
    return [...this.alerts];
  }
  
  /**
   * Clear alerts
   */
  public clearAlerts(): void {
    this.alerts = [];
  }
}

export const neuralSystemMonitor = NeuralSystemMonitor.getInstance();
export default neuralSystemMonitor;
