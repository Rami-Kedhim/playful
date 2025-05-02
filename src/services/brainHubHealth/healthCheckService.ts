
import { BrainHubHealth } from "@/types/brainHubHealth";
import { brainHub } from "../neural/HermesOxumBrainHub";

export default function checkBrainHubHealth(): BrainHubHealth {
  try {
    // Get system status from brain hub
    const metrics = brainHub.getSystemStatus();
    
    // Generate warnings based on thresholds
    const warnings: string[] = [];
    if (metrics.cpuUtilization > 80) warnings.push("CPU utilization is high");
    if (metrics.memoryUtilization > 85) warnings.push("Memory utilization is high");
    if (metrics.errorRate > 2) warnings.push("Error rate is above threshold");
    
    // Generate errors based on thresholds
    const errors: string[] = [];
    if (metrics.cpuUtilization > 95) errors.push("CPU utilization critical");
    if (metrics.memoryUtilization > 95) errors.push("Memory utilization critical");
    if (metrics.errorRate > 5) errors.push("Error rate critical");
    
    // Determine status
    let status: BrainHubHealth['status'] = 'online';
    if (errors.length > 0) status = 'error';
    else if (warnings.length > 0) status = 'warning';
    else status = 'healthy';
    
    // Map metrics to ensure compatibility with required fields
    // Ensure all required properties exist by providing defaults or mapping to existing values
    const mappedMetrics = {
      ...metrics,
      // Ensure all required fields are present and initialized
      memoryAllocation: metrics.memoryAllocation || metrics.memoryUtilization / 100 || 0,
      networkThroughput: metrics.networkThroughput || 0,
      requestRate: metrics.requestRate || metrics.operationsPerSecond || 0,
      averageResponseTime: metrics.averageResponseTime || metrics.responseTime || 0
    };
    
    // Build health object
    const health: BrainHubHealth = {
      status,
      metrics: {
        cpuUsage: metrics.cpuUtilization || 0,
        memoryUsage: metrics.memoryUtilization || 0,
        requestsPerMinute: (metrics.operationsPerSecond || 0) / 60,
        lastOptimized: Date.now() - (1000 * 60 * 60), // 1 hour ago
        neuralMetrics: {
          accuracy: metrics.neuralAccuracy || 0,
          efficiency: metrics.neuralEfficiency || 0,
          latency: metrics.neuralLatency || 0
        }
      },
      warnings,
      errors
    };
    
    if (status !== 'healthy') {
      health.message = status === 'error' 
        ? "System experiencing critical issues"
        : "System experiencing performance issues";
    }
    
    return health;
  } catch (error) {
    console.error("Error checking Brain Hub health:", error);
    
    return {
      status: 'offline',
      message: 'Failed to retrieve Brain Hub health status',
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        requestsPerMinute: 0,
        lastOptimized: Date.now()
      },
      warnings: [],
      errors: ['Connection error to Brain Hub service']
    };
  }
}
