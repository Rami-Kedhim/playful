import neuralServiceRegistry from '../registry/NeuralServiceRegistry';
import { neuralHub } from '../HermesOxumNeuralHub';

class NeuralMetricsService {
  private reports: any[] = [];
  private lastReportTime: Date = new Date();

  generatePerformanceReport() {
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
        // Use metrics.successRate only if defined
        const serviceHealth = (metrics.successRate ?? 0.7) * 100;
        totalHealth += serviceHealth;
      }
    });

    const activeServices = services.filter(s => s.config.enabled).length;
    const overallHealth = activeServices > 0
      ? totalHealth / activeServices
      : 100;

    const recommendations = this.generateRecommendations(
      services,
      systemHealth,
      overallHealth
    );

    const report = {
      timestamp: new Date(),
      overallHealth: Math.round(overallHealth),
      services: serviceMetrics,
      systemMetrics: {
        cpuUsage: systemHealth.cpuUtilization,
        memoryUsage: systemHealth.memoryUtilization,
        responseTime: systemHealth.responseTime,
        operationsPerSecond: systemHealth.operationsPerSecond,
        errorRate: systemHealth.errorRate
      },
      recommendations
    };

    this.reports.push(report);
    if (this.reports.length > 100) {
      this.reports.shift();
    }
    this.lastReportTime = report.timestamp;

    return report;
  }

  getLatestReport() {
    if (!this.reports.length || (new Date().getTime() - this.lastReportTime.getTime() > 5 * 60 * 1000)) {
      return this.generatePerformanceReport();
    }
    return this.reports[this.reports.length - 1];
  }

  getHistoricalReports(startTime: Date, endTime: Date) {
    return this.reports.filter(r => r.timestamp >= startTime && r.timestamp <= endTime);
  }

  generateRecommendations(services: any[], systemHealth: any, overallHealth: number): string[] {
    const recommendations: string[] = [];

    if (systemHealth.cpuUtilization > 80) {
      recommendations.push('High CPU usage detected. Consider scaling resources or optimizing processing.');
    }

    if (systemHealth.memoryUtilization > 85) {
      recommendations.push('Memory usage is high. Review memory allocation or check for memory leaks.');
    }

    if (systemHealth.errorRate > 5) {
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
