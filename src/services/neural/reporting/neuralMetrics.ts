
import { ServiceMetrics } from '@/types/neuralMetrics';
import { BaseNeuralService } from '@/services/neural/index';

/**
 * Helper function to normalize metric values and handle latency/responseTime interoperability
 */
function normalizeMetrics(metrics: any): ServiceMetrics {
  // First, create an object with all required properties initialized
  const normalizedMetrics: ServiceMetrics = {
    // Core metrics
    operationsCount: 0,
    errorCount: 0,
    latency: 0,
    responseTime: 0,
    errorRate: 0,
    successRate: 1.0,
    
    // Base metrics from BaseBrainService
    processingSpeed: 0,
    accuracy: 0,
    uptime: 0,
    requestsProcessed: 0,
    errors: 0
  };
  
  // Then populate from the source metrics, with appropriate fallbacks
  normalizedMetrics.operationsCount = metrics.operationsCount || 0;
  normalizedMetrics.errorCount = metrics.errorCount || 0;
  
  // Handle latency/responseTime interoperability
  normalizedMetrics.latency = metrics.latency !== undefined ? metrics.latency : (metrics.responseTime || 0); 
  normalizedMetrics.responseTime = metrics.responseTime !== undefined ? metrics.responseTime : (metrics.latency || 0);
  
  // Calculate error and success rates if not provided
  if (metrics.errorRate !== undefined) {
    normalizedMetrics.errorRate = metrics.errorRate;
  } else if (normalizedMetrics.operationsCount > 0 && metrics.errorCount !== undefined) {
    normalizedMetrics.errorRate = metrics.errorCount / normalizedMetrics.operationsCount;
  }
  
  if (metrics.successRate !== undefined) {
    normalizedMetrics.successRate = metrics.successRate;
  } else if (normalizedMetrics.errorRate !== undefined) {
    normalizedMetrics.successRate = 1 - normalizedMetrics.errorRate;
  } else if (normalizedMetrics.operationsCount > 0 && normalizedMetrics.errorCount !== undefined) {
    normalizedMetrics.successRate = 1 - (normalizedMetrics.errorCount / normalizedMetrics.operationsCount);
  }
  
  // Add BaseBrainService metrics
  normalizedMetrics.processingSpeed = metrics.processingSpeed || 0;
  normalizedMetrics.accuracy = metrics.accuracy || 0;
  normalizedMetrics.uptime = metrics.uptime || 0;
  normalizedMetrics.requestsProcessed = metrics.requestsProcessed || 0;
  normalizedMetrics.errors = metrics.errors || 0;
  
  // Include any additional properties from the original metrics
  return {
    ...metrics,
    ...normalizedMetrics
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
        processingSpeed: 0,
        accuracy: 0,
        uptime: 0,
        requestsProcessed: 0,
        errors: 0,
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
