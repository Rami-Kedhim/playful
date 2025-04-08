
import { brainHub, neuralHub } from '@/services/neural';
import { BrainHubHealth, BrainHubHealthStatus } from '@/types/brainHubHealth';

/**
 * Performs a comprehensive check of Brain Hub health status
 * @returns The current health status of the Brain Hub
 */
export function checkBrainHubHealth(): BrainHubHealth {
  try {
    // Get system status from Brain Hub
    const systemStatus = brainHub.getSystemStatus();
    
    // Get neural health metrics
    const neuralMetrics = neuralHub.getHealthMetrics();
    
    // Determine overall status
    let status: BrainHubHealthStatus = 'good';
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Check CPU usage
    if (systemStatus.cpuUsage > 80) {
      status = 'error';
      errors.push('Critical CPU usage detected');
    } else if (systemStatus.cpuUsage > 60) {
      if (status === 'good') status = 'warning';
      warnings.push('High CPU usage detected');
    }
    
    // Check memory usage
    if (systemStatus.memoryUsage > 85) {
      status = 'error';
      errors.push('Critical memory usage detected');
    } else if (systemStatus.memoryUsage > 70) {
      if (status === 'good') status = 'warning';
      warnings.push('High memory usage detected');
    }
    
    // Check neural system metrics
    if (neuralMetrics.errorRate > 0.1) {
      status = 'error';
      errors.push(`High neural error rate: ${(neuralMetrics.errorRate * 100).toFixed(1)}%`);
    } else if (neuralMetrics.errorRate > 0.01) {
      if (status === 'good') status = 'warning';
      warnings.push(`Elevated neural error rate: ${(neuralMetrics.errorRate * 100).toFixed(1)}%`);
    }
    
    if (neuralMetrics.stability < 0.5) {
      status = 'error';
      errors.push('Neural system stability critical');
    } else if (neuralMetrics.stability < 0.7) {
      if (status === 'good') status = 'warning';
      warnings.push('Neural system stability degraded');
    }
    
    // Generate message based on status
    let message = '';
    if (status === 'good') {
      message = 'All systems operating normally';
    } else if (status === 'warning') {
      message = 'System operating with warnings';
    } else if (status === 'error') {
      message = 'System experiencing critical issues';
    }
    
    return {
      status,
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
    console.error('Failed to check Brain Hub health:', error);
    return {
      status: 'error',
      message: 'Failed to retrieve system health',
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        requestsPerMinute: 0,
        lastOptimized: Date.now(),
      },
      warnings: [],
      errors: ['Unable to connect to Brain Hub monitoring system']
    };
  }
}
