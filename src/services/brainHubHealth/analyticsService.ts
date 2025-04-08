
import { neuralServiceRegistry } from '@/services/neural/registry/NeuralServiceRegistry';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import type { SystemHealthMetrics } from '@/services/neural/types/neuralHub';

export class AnalyticsService {
  /**
   * Get analytics data from all neural services
   */
  getServiceMetrics(): any[] {
    const services = neuralServiceRegistry.getAllServices();
    
    return services.map(service => {
      const metrics = service.getMetrics();
      return {
        moduleId: service.moduleId,
        moduleType: service.moduleType,
        metrics: {
          // Safely access properties with defaults
          operationsCount: metrics.operationsCount || 0,
          successRate: metrics.successRate || 100,
          averageLatency: metrics.averageLatency || 0,
          ...metrics
        },
        config: service.getConfig()
      };
    });
  }
  
  /**
   * Get system health metrics
   */
  getSystemHealth(): SystemHealthMetrics {
    return brainHub.getSystemStatus();
  }
  
  /**
   * Get aggregate system metrics
   */
  getAggregateMetrics(): any {
    const serviceMetrics = this.getServiceMetrics();
    const systemHealth = this.getSystemHealth();
    
    const totalOperations = serviceMetrics.reduce((total, service) => 
      total + (service.metrics.operationsCount || 0), 0);
    
    const averageSuccessRate = serviceMetrics.length > 0 
      ? serviceMetrics.reduce((total, service) => 
          total + (service.metrics.successRate || 0), 0) / serviceMetrics.length
      : 0;
      
    const averageLatency = serviceMetrics.length > 0 
      ? serviceMetrics.reduce((total, service) => 
          total + (service.metrics.averageLatency || 0), 0) / serviceMetrics.length
      : 0;
    
    return {
      totalOperations,
      averageSuccessRate,
      averageLatency,
      activeServices: serviceMetrics.filter(s => s.config.enabled).length,
      totalServices: serviceMetrics.length,
      systemHealth
    };
  }
  
  /**
   * Get performance trend over time
   * (Simulated data for demo purposes)
   */
  getPerformanceTrend(days: number = 7): any[] {
    const trend = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      trend.push({
        date: date.toISOString().split('T')[0],
        operations: Math.floor(Math.random() * 10000) + 5000,
        latency: Math.floor(Math.random() * 100) + 50,
        successRate: 95 + (Math.random() * 5),
        cpuUsage: Math.floor(Math.random() * 40) + 30,
        memoryUsage: Math.floor(Math.random() * 30) + 40
      });
    }
    
    return trend;
  }
}

export const analyticsService = new AnalyticsService();

export default analyticsService;
