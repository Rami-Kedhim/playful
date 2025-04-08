
import { BrainHubAnalytics } from "@/types/brainHubHealth";
import { brainHub } from "../neural/HermesOxumBrainHub";
import { neuralServiceRegistry } from "../neural/registry/NeuralServiceRegistry";

/**
 * Generate analytics for the Brain Hub
 */
export default function updateBrainHubAnalytics(): BrainHubAnalytics {
  try {
    // Get metrics from brain hub and services
    const metrics = brainHub.getSystemStatus();
    const services = neuralServiceRegistry.getAllServices();
    
    // Calculate total operations
    let totalOperations = 0;
    services.forEach(service => {
      const serviceMetrics = service.getMetrics();
      totalOperations += serviceMetrics.operationsCount || 0;
    });
    
    // Generate mock trend data
    const utilizationTrend = generateMockTrendData();
    
    // Generate recommendations based on metrics
    const recommendations = generateRecommendations(metrics);
    
    return {
      dailyOperations: totalOperations,
      averageResponseTime: metrics.responseTime,
      errorRate: metrics.errorRate,
      utilizationTrend,
      recommendations
    };
  } catch (error) {
    console.error("Error updating Brain Hub analytics:", error);
    
    return {
      dailyOperations: 0,
      averageResponseTime: 0,
      errorRate: 0,
      utilizationTrend: [],
      recommendations: ["System analytics unavailable - please check connection"]
    };
  }
}

/**
 * Generate mock trend data for visualization
 */
function generateMockTrendData() {
  const now = Date.now();
  const trend = [];
  
  // Generate data points for the last 24 hours (hourly)
  for (let i = 0; i < 24; i++) {
    const timestamp = now - (23 - i) * 3600000;
    const cpuBase = 30 + Math.sin(i / 3) * 15; // Sinusoidal pattern
    const memoryBase = 40 + Math.cos(i / 4) * 10; // Cosinusoidal pattern
    const operationsBase = 1000 + Math.sin(i / 2) * 500; // Higher frequency sin
    
    trend.push({
      timestamp,
      cpuUsage: cpuBase + Math.random() * 10,
      memoryUsage: memoryBase + Math.random() * 15,
      operations: Math.max(0, operationsBase + (Math.random() - 0.5) * 200)
    });
  }
  
  return trend;
}

/**
 * Generate intelligent recommendations based on system health
 */
function generateRecommendations(metrics: any): string[] {
  const recommendations = [];
  
  // CPU recommendations
  if (metrics.cpuUtilization > 75) {
    recommendations.push("Consider scaling out neural processing capacity to reduce CPU load");
  }
  
  // Memory recommendations
  if (metrics.memoryUtilization > 80) {
    recommendations.push("Memory utilization is high - consider optimizing caching strategy");
  }
  
  // Error rate recommendations
  if (metrics.errorRate > 1.5) {
    recommendations.push("Increased error rate detected - review error logs for patterns");
  }
  
  // Response time recommendations
  if (metrics.responseTime > 150) {
    recommendations.push("High response latency - consider response time optimization");
  }
  
  // Balance recommendations
  if (metrics.stability < 85) {
    recommendations.push("System stability below optimal threshold - consider maintenance");
  }
  
  // Add at least one recommendation if none were generated
  if (recommendations.length === 0) {
    recommendations.push("All systems operating within optimal parameters");
  }
  
  return recommendations;
}
