
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { neuralServiceRegistry } from '@/services/neural/registry/NeuralServiceRegistry';

class HealthCheckService {
  /**
   * Get overall system health status
   */
  getSystemStatus(): { status: 'healthy' | 'warning' | 'critical'; issues: string[] } {
    const systemMetrics = brainHub.getSystemStatus();
    const issues: string[] = [];
    
    // Check CPU utilization
    if (systemMetrics.cpuUtilization > 80) {
      issues.push(`High CPU utilization: ${systemMetrics.cpuUtilization.toFixed(1)}%`);
    }
    
    // Check memory utilization
    if (systemMetrics.memoryUtilization > 85) {
      issues.push(`High memory utilization: ${systemMetrics.memoryUtilization.toFixed(1)}%`);
    }
    
    // Check error rate
    if (systemMetrics.errorRate > 5) {
      issues.push(`High error rate: ${systemMetrics.errorRate.toFixed(1)}%`);
    }
    
    // Check network latency
    if (systemMetrics.networkLatency > 300) {
      issues.push(`High network latency: ${systemMetrics.networkLatency.toFixed(0)}ms`);
    }
    
    // Check service health
    const services = neuralServiceRegistry.getAllServices();
    const enabledServices = services.filter(s => s.getConfig().enabled);
    
    if (enabledServices.length === 0 && services.length > 0) {
      issues.push('No active neural services');
    }
    
    // Determine overall status
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    
    if (issues.length === 1) {
      status = 'warning';
    } else if (issues.length > 1) {
      status = 'critical';
    }
    
    return {
      status,
      issues
    };
  }
  
  /**
   * Run diagnostics on all neural services
   */
  runSystemDiagnostics(): Promise<any> {
    return new Promise(resolve => {
      // Simulate diagnostic process
      setTimeout(() => {
        const services = neuralServiceRegistry.getAllServices();
        const diagnosticResults = services.map(service => {
          const metrics = service.getMetrics();
          const config = service.getConfig();
          
          return {
            moduleId: service.moduleId,
            moduleType: service.moduleType,
            status: config.enabled ? 'active' : 'inactive',
            health: Math.random() > 0.2 ? 'healthy' : 'warning',
            metrics: {
              operations: metrics.operationsCount || 0,
              successRate: metrics.successRate || 0,
              latency: metrics.averageLatency || 0
            },
            recommendations: []
          };
        });
        
        // Add some recommendations
        if (diagnosticResults.length > 0) {
          const randomIndex = Math.floor(Math.random() * diagnosticResults.length);
          diagnosticResults[randomIndex].recommendations.push(
            'Consider increasing resource allocation for better performance'
          );
        }
        
        // Add general recommendations
        const generalRecommendations = [
          'Regular neural network retraining recommended',
          'Consider optimizing model parameters for improved accuracy',
          'Memory usage optimization may improve overall system performance'
        ];
        
        resolve({
          status: 'completed',
          timestamp: new Date().toISOString(),
          serviceResults: diagnosticResults,
          generalRecommendations: generalRecommendations.slice(0, Math.floor(Math.random() * 3) + 1)
        });
      }, 1000);
    });
  }
  
  /**
   * Check resource allocation efficiency
   */
  checkResourceAllocation(): { 
    efficiency: number;
    recommendations: string[];
  } {
    const services = neuralServiceRegistry.getAllServices();
    const enabledServices = services.filter(s => s.getConfig().enabled);
    
    // Calculate efficiency score
    const totalAllocation = enabledServices.reduce((sum, s) => sum + s.getConfig().resourceAllocation, 0);
    const totalPriority = enabledServices.reduce((sum, s) => sum + s.getConfig().priority, 0);
    
    let efficiency = 0.7; // Default moderate efficiency
    
    if (enabledServices.length > 1) {
      // Higher score for balanced resource allocation based on priority
      const idealAllocationRatio = 100 / totalPriority;
      
      const deviations = enabledServices.map(s => {
        const idealAllocation = s.getConfig().priority * idealAllocationRatio;
        const actualAllocation = s.getConfig().resourceAllocation;
        return Math.abs(idealAllocation - actualAllocation) / idealAllocation;
      });
      
      const avgDeviation = deviations.reduce((sum, dev) => sum + dev, 0) / deviations.length;
      efficiency = Math.max(0, Math.min(1, 1 - avgDeviation));
    }
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (efficiency < 0.7) {
      recommendations.push('Resource allocation not optimally aligned with service priorities');
      recommendations.push('Consider using automatic resource optimization');
    }
    
    if (totalAllocation > 90 && enabledServices.length > 1) {
      recommendations.push('High total resource allocation may cause system performance issues');
    }
    
    const highPriorityLowResource = enabledServices.filter(s => 
      s.getConfig().priority > 70 && s.getConfig().resourceAllocation < 30
    );
    
    if (highPriorityLowResource.length > 0) {
      recommendations.push(`${highPriorityLowResource.length} high priority services have insufficient resources allocated`);
    }
    
    return {
      efficiency,
      recommendations
    };
  }
}

export const healthCheckService = new HealthCheckService();
export default healthCheckService;
