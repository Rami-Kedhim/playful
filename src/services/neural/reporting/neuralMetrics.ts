
import neuralServiceRegistry from '../registry/NeuralServiceRegistry';
import { neuralHub } from '../HermesOxumBrainHub';
import { PerformanceReport, ServiceMetrics } from '@/types/neuralMetrics';

class NeuralMetricsService {
  private reports: PerformanceReport[] = [];
  private lastReportTime: Date = new Date();

  generatePerformanceReport(): PerformanceReport {
    const services = neuralServiceRegistry.getAllServices();
    const systemHealth = neuralHub.getHealthMetrics();

    const serviceMetrics: Record<string, any> = {};
    let totalHealth = 0;

    services.forEach(service => {
      const metrics = service.getMetrics();
      const status = service.config.enabled ? 'active' : 'inactive';

      serviceMetrics[service.moduleId] = {
        status,
        metrics
      };

      if (status === 'active') {
        // Use metrics.errorCount and metrics.operationsCount to calculate successRate if not defined
        const serviceHealth = metrics.successRate !== undefined ? 
          metrics.successRate * 100 : 
          metrics.operationsCount > 0 ? 
            ((metrics.operationsCount - (metrics.errorCount || 0)) / metrics.operationsCount) * 100 : 
            70;
        totalHealth += serviceHealth;
      }
    });

    const activeServices = services.filter(s => s.config.enabled).length;
    const overallHealth = activeServices > 0
      ? totalHealth / activeServices
      : 100;

    const healthMetrics = neuralHub.getHealthMetrics();

    // Map the health metrics to the structure expected by PerformanceReport
    const mappedSystemMetrics = {
      cpuUsage: healthMetrics.systemLoad ? healthMetrics.systemLoad * 100 : healthMetrics.cpuUtilization || 0,
      memoryUsage: healthMetrics.memoryAllocation ? healthMetrics.memoryAllocation * 100 : healthMetrics.memoryUtilization || 0,
      responseTime: healthMetrics.averageResponseTime || healthMetrics.responseTime || 0,
      operationsPerSecond: healthMetrics.requestRate || healthMetrics.operationsPerSecond || 0,
      errorRate: healthMetrics.errorRate || 0
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

    if (systemHealth.cpuUtilization > 80 || systemHealth.systemLoad > 0.8) {
      recommendations.push('High CPU usage detected. Consider scaling resources or optimizing processing.');
    }

    if (systemHealth.memoryUtilization > 85 || systemHealth.memoryAllocation > 0.85) {
      recommendations.push('Memory usage is high. Review memory allocation or check for memory leaks.');
    }

    if (systemHealth.errorRate > 5 || 
        (services.some(s => {
          const metrics = s.getMetrics();
          return metrics.errorCount && metrics.operationsCount && 
                (metrics.errorCount / metrics.operationsCount > 0.05);
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
