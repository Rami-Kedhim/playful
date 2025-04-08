
import { brainHub, neuralHub, SystemHealthMetrics } from '@/services/neural';
import { BrainHubHealth, BrainHubHealthStatus } from '@/types/brainHubHealth';

export function checkBrainHubHealth(): BrainHubHealth {
  try {
    const systemStatus = brainHub.getSystemStatus();
    
    let neuralMetrics: SystemHealthMetrics | undefined = undefined;
    try {
      neuralMetrics = neuralHub.getHealthMetrics();
    } catch (error) {
      console.warn("Neural hub metrics unavailable", error);
    }
    
    const enhancedMetrics = brainHub.getEnhancedSystemMetrics();
    
    const warnings: string[] = [];
    const errors: string[] = [];
    
    if (systemStatus.cpuUsage > 80) {
      warnings.push(`High CPU usage: ${systemStatus.cpuUsage}%`);
    }
    
    if (systemStatus.memoryUsage > 85) {
      warnings.push(`High memory usage: ${systemStatus.memoryUsage}%`);
    }
    
    if (systemStatus.requestsPerMinute > 150) {
      warnings.push(`High request rate: ${systemStatus.requestsPerMinute} requests/minute`);
    }
    
    if (neuralMetrics && neuralMetrics.stability < 0.7) {
      warnings.push(`Low neural stability: ${(neuralMetrics.stability * 100).toFixed(1)}%`);
    }
    
    if (systemStatus.cpuUsage > 95) {
      errors.push(`Critical CPU usage: ${systemStatus.cpuUsage}%`);
    }
    
    if (systemStatus.memoryUsage > 95) {
      errors.push(`Critical memory usage: ${systemStatus.memoryUsage}%`);
    }
    
    if (enhancedMetrics.predictive?.optimizationOpportunities) {
      warnings.push(...enhancedMetrics.predictive.optimizationOpportunities);
    }
    
    let overallStatus: BrainHubHealthStatus = 'good';
    let message: string | undefined = undefined;
    
    if (errors.length > 0) {
      overallStatus = 'error';
      message = `${errors.length} critical issue${errors.length > 1 ? 's' : ''} detected`;
    } else if (warnings.length > 0) {
      overallStatus = 'warning';
      message = `${warnings.length} warning${warnings.length > 1 ? 's' : ''} detected`;
    }
    
    return {
      status: overallStatus,
      message,
      metrics: {
        cpuUsage: systemStatus.cpuUsage,
        memoryUsage: systemStatus.memoryUsage,
        requestsPerMinute: systemStatus.requestsPerMinute,
        lastOptimized: systemStatus.lastOptimized,
        neuralMetrics
      },
      warnings,
      errors
    };
    
  } catch (error) {
    console.error("Error checking Brain Hub health", error);
    return {
      status: 'error',
      message: 'Failed to check Brain Hub health',
      errors: ['Health check failure: ' + (error instanceof Error ? error.message : String(error))],
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        requestsPerMinute: 0,
        lastOptimized: Date.now()
      },
      warnings: []
    };
  }
}
