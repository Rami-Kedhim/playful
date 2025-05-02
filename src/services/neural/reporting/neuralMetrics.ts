
import neuralServiceRegistry from '../registry/NeuralServiceRegistry';
import { neuralHub } from '../HermesOxumBrainHub';
import { PerformanceReport, ServiceMetrics, HealthMetrics } from '@/types/neuralMetrics';

class NeuralMetricsService {
  private reports: PerformanceReport[] = [];
  private lastReportTime: Date = new Date();

  generatePerformanceReport(): PerformanceReport {
    const services = neuralServiceRegistry.getAllServices();
    const healthMetrics = neuralHub.getHealthMetrics();

    const serviceMetrics: Record<string, any> = {};
    let totalHealth = 0;

    services.forEach(service => {
      const metrics = service.getMetrics();
      const status = service.config.enabled ? 'active' : 'inactive';

      // Ensure metrics has required fields for ServiceMetrics
      const normalizedMetrics: ServiceMetrics = {
        ...metrics,
        latency: metrics.latency || metrics.responseTime || null,
        operationsCount: metrics.operationsCount || 0,
        errorCount: metrics.errorCount || 0
      };

      serviceMetrics[service.moduleId] = {
        status,
        metrics: normalizedMetrics
      };

      if (status === 'active') {
        // Calculate success rate if not provided
        const successRate = normalizedMetrics.successRate !== undefined ? 
          normalizedMetrics.successRate : 
          normalizedMetrics.operationsCount > 0 ? 
            ((normalizedMetrics.operationsCount - (normalizedMetrics.errorCount || 0)) / normalizedMetrics.operationsCount) : 
            0.7;
            
        totalHealth += (successRate * 100);
      }
    });

    const activeServices = services.filter(s => s.config.enabled).length;
    const overallHealth = activeServices > 0
      ? totalHealth / activeServices
      : 100;

    // Map health metrics to a consistent format that matches the HealthMetrics interface
    const mappedSystemMetrics = {
      cpuUsage: this.getMetricValue(healthMetrics, ['systemLoad', 'cpuUtilization', 'cpuUsage'], 0) * 100,
      memoryUsage: this.getMetricValue(healthMetrics, ['memoryAllocation', 'memoryUtilization', 'memoryUsage'], 0) * 100,
      responseTime: this.getMetricValue(healthMetrics, ['averageResponseTime', 'responseTime'], 0),
      operationsPerSecond: this.getMetricValue(healthMetrics, ['requestRate', 'operationsPerSecond'], 0),
      errorRate: this.getMetricValue(healthMetrics, ['errorRate'], 0)
    };

    const recommendations = this.generateRecommendations(
      services,
      healthMetrics,
      overallHealth
    );

    const report: PerformanceReport = {
      timestamp: new Date(),
      overallHealth: Math.round(overallHealth),
      services: serviceMetrics,
      systemMetrics: mappedSystemMetrics,
      recommendations
    };

    this.reports.push(report);
    if (this.reports.length > 100) {
      this.reports.shift();
    }
    this.lastReportTime = report.timestamp;

    return report;
  }

  // Helper method to safely get a metric value from different possible property names
  private getMetricValue(object: any, propertyNames: string[], defaultValue: number): number {
    for (const property of propertyNames) {
      if (object && typeof object[property] === 'number') {
        return object[property];
      }
    }
    return defaultValue;
  }

  getLatestReport(): PerformanceReport {
    if (!this.reports.length || (new Date().getTime() - this.lastReportTime.getTime() > 5 * 60 * 1000)) {
      return this.generatePerformanceReport();
    }
    return this.reports[this.reports.length - 1];
  }

  getHistoricalReports(startTime: Date, endTime: Date): PerformanceReport[] {
    return this.reports.filter(r => r.timestamp >= startTime && r.timestamp <= endTime);
  }

  generateRecommendations(services: any[], systemHealth: any, overallHealth: number): string[] {
    const recommendations: string[] = [];

    // Get system load from various possible property names
    const cpuLoad = this.getMetricValue(systemHealth, ['cpuUtilization', 'systemLoad', 'cpuUsage'], 0);
    const memoryLoad = this.getMetricValue(systemHealth, ['memoryUtilization', 'memoryAllocation', 'memoryUsage'], 0);
    const errorRate = this.getMetricValue(systemHealth, ['errorRate'], 0);

    if (cpuLoad > 0.8 || cpuLoad > 80) {
      recommendations.push('High CPU usage detected. Consider scaling resources or optimizing processing.');
    }

    if (memoryLoad > 0.85 || memoryLoad > 85) {
      recommendations.push('Memory usage is high. Review memory allocation or check for memory leaks.');
    }

    if (errorRate > 0.05 || errorRate > 5 || 
        (services.some(s => {
          const metrics = s.getMetrics();
          // Calculate error rate if not provided
          const calculatedErrorRate = metrics.errorRate || (
            metrics.errorCount && metrics.operationsCount ? 
            metrics.errorCount / metrics.operationsCount : 
            0
          );
          return calculatedErrorRate > 0.05;
        }))) {
      recommendations.push('Error rate exceeds recommended threshold. Investigate potential issues.');
    }

    const inactiveServices = services.filter(s => !s.config.enabled);
    if (inactiveServices.length) {
      recommendations.push(`${inactiveServices.length} neural services are inactive. Consider enabling them.`);
    }

    if (services.length >= 2) {
      const priorities = services.map(s => s.config.priority);
      const uniquePriorities = new Set(priorities).size;
      if (uniquePriorities < services.length) {
        recommendations.push('Multiple services have the same priority. Consider adjusting priorities.');
      }
    }

    if (overallHealth < 70) {
      recommendations.push('System health is below optimal levels. Review configurations and allocations.');
    }

    return recommendations;
  }
}

export const neuralMetrics = new NeuralMetricsService();
