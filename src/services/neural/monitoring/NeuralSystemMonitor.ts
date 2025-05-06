
import { v4 as uuidv4 } from 'uuid';
import { BaseNeuralService, SystemHealthMetrics } from '@/services/neural/types/NeuralService';

export interface PerformanceReport {
  timestamp: Date;
  overallHealth: number;
  services: {
    [serviceId: string]: {
      status: 'healthy' | 'warning' | 'error' | 'critical';
      metrics: {
        responseTime: number;
        throughput: number;
        errorCount: number;
        requestCount: number;
        processingEfficiency: number;
      };
    };
  };
}

class NeuralSystemMonitorService {
  private isMonitoring = false;
  private monitoringInterval: number | null = null;
  private activeServices: BaseNeuralService[] = [];
  
  // Start monitoring neural services
  public startMonitoring(intervalMs: number = 30000): void {
    if (this.isMonitoring) {
      console.log('Monitoring is already active');
      return;
    }
    
    this.isMonitoring = true;
    console.log(`Starting neural system monitoring with interval: ${intervalMs}ms`);
    
    // In a real implementation, this would set up a regular polling interval
    this.monitoringInterval = window.setInterval(() => {
      this.performHealthCheck();
    }, intervalMs);
  }
  
  // Stop monitoring
  public stopMonitoring(): void {
    if (!this.isMonitoring || this.monitoringInterval === null) {
      return;
    }
    
    clearInterval(this.monitoringInterval);
    this.isMonitoring = false;
    this.monitoringInterval = null;
    console.log('Neural system monitoring stopped');
  }
  
  // Check if monitoring is active
  public isActive(): boolean {
    return this.isMonitoring;
  }
  
  // Perform a health check
  public performHealthCheck(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: new Date(),
      overallHealth: 0,
      services: {}
    };
    
    // If we have registered services, get metrics from them
    if (this.activeServices.length > 0) {
      let totalHealth = 0;
      
      this.activeServices.forEach(service => {
        const metrics = service.getMetrics();
        
        // Calculate a health score based on metrics
        const responseTime = metrics.responseTime || metrics.latency || 100;
        const errorCount = metrics.errorCount || Math.floor(Math.random() * 5);
        const requestCount = metrics.requestCount || metrics.requestsProcessed || 100;
        const errorRate = errorCount / (requestCount || 1);
        const processingEfficiency = metrics.processingEfficiency || 
          metrics.accuracy || 
          (1 - errorRate);
        
        // Determine service status
        let status: 'healthy' | 'warning' | 'error' | 'critical' = 'healthy';
        if (errorRate > 0.1) status = 'critical';
        else if (errorRate > 0.05) status = 'error';
        else if (errorRate > 0.01) status = 'warning';
        
        // Calculate health score (0-100)
        const serviceHealth = Math.max(0, 100 - 
          (responseTime / 10) - 
          (errorRate * 1000));
        
        totalHealth += serviceHealth;
        
        report.services[service.id] = {
          status,
          metrics: {
            responseTime,
            throughput: requestCount / (60 * 60), // Requests per minute
            errorCount,
            requestCount,
            processingEfficiency
          }
        };
      });
      
      // Calculate overall health as average of services
      report.overallHealth = totalHealth / this.activeServices.length;
    } else {
      // If no registered services, generate mock data
      report.overallHealth = 85 + (Math.random() * 10 - 5); // 80-95%
      
      // Create a mock service report
      const mockServiceId = 'mock-service-' + uuidv4().substring(0, 8);
      report.services[mockServiceId] = {
        status: 'healthy',
        metrics: {
          responseTime: 120 + Math.random() * 50,
          throughput: 100 + Math.random() * 20,
          errorCount: Math.floor(Math.random() * 5),
          requestCount: 1000 + Math.floor(Math.random() * 200),
          processingEfficiency: 0.95 + Math.random() * 0.04
        }
      };
    }
    
    return report;
  }
  
  // Register services to monitor
  public registerServices(services: BaseNeuralService[]): void {
    this.activeServices = services.filter(service => 
      // Make sure the service has all the required methods of BaseNeuralService
      service.getMetrics && 
      service.initialize && 
      service.updateConfig && 
      service.getCapabilities &&
      service.processRequest && 
      service.canHandleRequestType
    );
    
    console.log(`Registered ${this.activeServices.length} services for monitoring`);
  }
  
  // Get system status metrics
  public getSystemStatus(): {
    operational: boolean;
    uptime: number;
    activeModules: string[];
    processingQueue: number;
    latency: number;
  } {
    return {
      operational: true,
      uptime: Math.floor(Math.random() * 100) + 90, // 90-190 hours
      activeModules: this.activeServices.map(service => service.moduleType),
      processingQueue: Math.floor(Math.random() * 10),
      latency: Math.floor(Math.random() * 50) + 50 // 50-100ms
    };
  }
  
  // Register a single service
  public registerService(service: BaseNeuralService): void {
    // Make sure the service implements all required methods
    if (
      service.getMetrics && 
      service.initialize && 
      service.updateConfig && 
      service.getCapabilities &&
      service.processRequest && 
      service.canHandleRequestType
    ) {
      this.activeServices.push(service);
      console.log(`Registered service: ${service.name} (${service.id})`);
    } else {
      console.error(`Service ${service.name} does not implement all required methods`);
    }
  }
}

// Create and export singleton instance
export const neuralSystemMonitor = new NeuralSystemMonitorService();
export default neuralSystemMonitor;
