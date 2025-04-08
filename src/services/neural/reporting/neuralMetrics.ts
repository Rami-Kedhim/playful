
import { neuralServiceRegistry } from '../registry/NeuralServiceRegistry';
import { neuralHub } from '../HermesOxumNeuralHub';

/**
 * Performance report interface
 */
export interface PerformanceReport {
  timestamp: Date;
  overallHealth: number; // 0-100
  services: {
    [moduleId: string]: {
      status: 'active' | 'inactive' | 'error';
      metrics: Record<string, any>;
    };
  };
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    [key: string]: any;
  };
  recommendations: string[];
}

/**
 * Neural metrics service for reporting and analysis
 */
class NeuralMetricsService {
  private reports: PerformanceReport[] = [];
  private lastReportTime: Date = new Date();
  
  /**
   * Generate a performance report for the neural system
   */
  generatePerformanceReport(): PerformanceReport {
    const services = neuralServiceRegistry.getAllServices();
    const systemHealth = neuralHub.getHealthMetrics();
    
    const serviceMetrics: PerformanceReport['services'] = {};
    let totalHealth = 0;
    
    // Collect metrics from all services
    services.forEach(service => {
      const metrics = service.getMetrics();
      const status = service.config.enabled ? 'active' : 'inactive';
      
      serviceMetrics[service.moduleId] = {
        status,
        metrics
      };
      
      // Add to total health score
      if (status === 'active') {
        const serviceHealth = (metrics.successRate || 0.7) * 100;
        totalHealth += serviceHealth;
      }
    });
    
    // Calculate overall health score
    const activeServices = services.filter(s => s.config.enabled).length;
    const overallHealth = activeServices > 0 
      ? totalHealth / activeServices
      : systemHealth.stability * 100;
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(
      services,
      systemHealth,
      overallHealth
    );
    
    // Create report
    const report: PerformanceReport = {
      timestamp: new Date(),
      overallHealth: Math.round(overallHealth),
      services: serviceMetrics,
      systemMetrics: {
        cpuUsage: systemHealth.cpuUtilization * 100,
        memoryUsage: systemHealth.memoryUtilization * 100,
        responseTime: systemHealth.responseTime,
        operationsPerSecond: systemHealth.operationsPerSecond,
        errorRate: systemHealth.errorRate * 100
      },
      recommendations
    };
    
    // Store report
    this.reports.push(report);
    if (this.reports.length > 100) {
      this.reports.shift(); // Keep only the last 100 reports
    }
    this.lastReportTime = report.timestamp;
    
    return report;
  }
  
  /**
   * Get the latest performance report
   */
  getLatestReport(): PerformanceReport {
    // If no report exists or the last report is older than 5 minutes, generate a new one
    if (
      this.reports.length === 0 ||
      (new Date().getTime() - this.lastReportTime.getTime() > 5 * 60 * 1000)
    ) {
      return this.generatePerformanceReport();
    }
    
    return this.reports[this.reports.length - 1];
  }
  
  /**
   * Get historical reports within a time range
   * @param startTime Start of time range
   * @param endTime End of time range
   */
  getHistoricalReports(startTime: Date, endTime: Date): PerformanceReport[] {
    return this.reports.filter(report => 
      report.timestamp >= startTime && report.timestamp <= endTime
    );
  }
  
  /**
   * Generate recommendations based on metrics
   */
  private generateRecommendations(
    services: any[],
    systemHealth: any,
    overallHealth: number
  ): string[] {
    const recommendations: string[] = [];
    
    // System health recommendations
    if (systemHealth.cpuUtilization > 0.7) {
      recommendations.push('High CPU usage detected. Consider scaling resources or optimizing processing.');
    }
    
    if (systemHealth.memoryUtilization > 0.8) {
      recommendations.push('Memory usage is high. Review memory allocation or check for memory leaks.');
    }
    
    if (systemHealth.errorRate > 0.05) {
      recommendations.push('Error rate exceeds recommended threshold. Investigate potential issues.');
    }
    
    // Service-specific recommendations
    const inactiveServices = services.filter(s => !s.config.enabled);
    if (inactiveServices.length > 0) {
      recommendations.push(`${inactiveServices.length} neural services are inactive. Consider enabling them for improved system performance.`);
    }
    
    // Resource allocation recommendations
    if (services.length >= 2) {
      const priorities = services.map(s => s.config.priority);
      const uniquePriorities = new Set(priorities).size;
      if (uniquePriorities < services.length) {
        recommendations.push('Multiple services have the same priority. Consider adjusting priorities for optimal resource allocation.');
      }
    }
    
    // Overall health recommendation
    if (overallHealth < 70) {
      recommendations.push('System health is below optimal levels. Review service configurations and resource allocations.');
    }
    
    return recommendations;
  }
}

export const neuralMetrics = new NeuralMetricsService();
