
import { generateNeuralAnalytics } from '@/services/neural/reporting/neuralAnalytics';
import { neuralMetrics } from '@/services/neural/reporting/neuralMetrics';
import { BrainHubAnalytics } from '@/types/brainHubHealth';

export function updateBrainHubAnalytics(): BrainHubAnalytics {
  try {
    // Get neural analytics
    const neuralReport = generateNeuralAnalytics();
    
    // Get performance report from metrics
    const dailyReport = neuralMetrics.generatePerformanceReport('daily');
    
    // Create utilization trend from neural trends
    const utilizationTrend = neuralReport.trends.map(trend => ({
      timestamp: trend.timestamp.toISOString(),
      value: trend.load
    }));
    
    // Return analytics data
    return {
      dailyOperations: dailyReport.totalOperations,
      averageResponseTime: dailyReport.averageResponseTime,
      errorRate: dailyReport.errorRate,
      utilizationTrend,
      recommendations: neuralReport.summary.recommendations
    };
    
  } catch (error) {
    console.error("Error updating Brain Hub analytics", error);
    return {
      dailyOperations: 0,
      averageResponseTime: 0,
      errorRate: 0,
      utilizationTrend: [],
      recommendations: []
    };
  }
}
