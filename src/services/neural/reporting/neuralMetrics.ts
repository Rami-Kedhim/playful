
import { ServiceMetrics } from '@/types/neuralMetrics';
import { BaseNeuralService } from '@/services/neural/index';

/**
 * Helper function to normalize metric values and handle latency/responseTime interoperability
 */
function normalizeMetrics(metrics: any): ServiceMetrics {
  return {
    operationsCount: metrics.operationsCount || 0,
    errorCount: metrics.errorCount || 0,
    latency: metrics.latency !== undefined ? metrics.latency : (metrics.responseTime || 0),
    responseTime: metrics.responseTime !== undefined ? metrics.responseTime : (metrics.latency || 0),
    errorRate: metrics.errorRate !== undefined ? metrics.errorRate : 
      (metrics.operationsCount > 0 && metrics.errorCount !== undefined ? 
        metrics.errorCount / metrics.operationsCount : 0),
    successRate: metrics.successRate || 
      (metrics.errorRate !== undefined ? (1 - metrics.errorRate) : 
        (metrics.operationsCount > 0 && metrics.errorCount !== undefined ? 
          1 - (metrics.errorCount / metrics.operationsCount) : 1.0))
  };
}

/**
 * Collect metrics from all registered neural services
 */
export function collectServiceMetrics(services: BaseNeuralService[]): Record<string, ServiceMetrics> {
  const serviceMetrics: Record<string, ServiceMetrics> = {};

  services.forEach(service => {
    try {
      const metrics = service.getMetrics();
      serviceMetrics[service.moduleId] = normalizeMetrics(metrics);
    } catch (error) {
      console.error(`Failed to collect metrics from ${service.name}:`, error);
      // Provide default metrics for failed services
      serviceMetrics[service.moduleId] = {
        operationsCount: 0,
        errorCount: 0,
        latency: 0,
        responseTime: 0,
        errorRate: 0,
        successRate: 0,
        error: `Failed to collect metrics: ${error}`
      };
    }
  });

  return serviceMetrics;
}

/**
 * Calculate aggregated system metrics
 */
export function calculateSystemMetrics(serviceMetrics: Record<string, ServiceMetrics>): any {
  let totalOperations = 0;
  let totalErrors = 0;
  let totalLatency = 0;
  let serviceCount = 0;

  Object.values(serviceMetrics).forEach(metrics => {
    totalOperations += metrics.operationsCount || 0;
    totalErrors += metrics.errorCount || 0;
    // Use either latency or responseTime depending on what's available
    const latencyValue = metrics.latency !== null ? metrics.latency : (metrics.responseTime || 0);
    totalLatency += latencyValue;
    serviceCount++;
  });

  return {
    totalOperations,
    totalErrors,
    averageLatency: serviceCount ? totalLatency / serviceCount : 0,
    errorRate: totalOperations ? totalErrors / totalOperations : 0,
    serviceCount
  };
}
