
// Fix import of neuralHub
import { defaultModelParameters } from "../models/modelParameters";
import { neuralHub } from '../HermesOxumNeuralHub';

export function checkServiceHealth(serviceId: string): { healthy: boolean; issues: string[] } {
  const service = neuralHub.getService(serviceId);
  const issues: string[] = [];
  
  if (!service) {
    return { healthy: false, issues: [`Service ${serviceId} not found`] };
  }
  
  if (!service.config.enabled) {
    issues.push(`Service is disabled`);
  }
  
  const metrics = service.getMetrics();
  if (metrics.errorRate > 5) {
    issues.push(`High error rate: ${metrics.errorRate.toFixed(2)}%`);
  }
  
  if (metrics.latency > 100) {
    issues.push(`High latency: ${metrics.latency.toFixed(2)}ms`);
  }
  
  return {
    healthy: issues.length === 0,
    issues
  };
}

export function optimizeServiceParameters(serviceId: string): boolean {
  const service = neuralHub.getService(serviceId);
  
  if (!service) {
    console.error(`Cannot optimize: Service ${serviceId} not found`);
    return false;
  }
  
  // Apply optimized parameters based on service type
  const params = { ...defaultModelParameters };
  
  // Adjust parameters based on service type
  switch (service.moduleType) {
    case 'text-analysis':
      params.learningRate = 0.0008;
      params.batchSize = 32;
      params.temperature = 0.8;
      break;
    case 'image-analysis':
      params.learningRate = 0.0005;
      params.batchSize = 32;
      break;
    default:
      // Use defaults
      break;
  }
  
  // Update the service config
  service.updateConfig({
    sensitivity: 0.75,
    threshold: 0.65,
    mode: 'optimized'
  });
  
  console.log(`Optimized parameters for ${service.name} (${service.moduleId})`);
  return true;
}
