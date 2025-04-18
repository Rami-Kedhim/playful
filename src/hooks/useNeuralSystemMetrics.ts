
import { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { SystemHealthMetrics } from '@/types/neural';

// Default system health metrics
const defaultMetrics: SystemHealthMetrics = {
  cpuUtilization: 0.45,
  memoryUtilization: 0.38,
  networkLatency: 120, // ms
  errorFrequency: 0.02,
  userSatisfactionScore: 0.87,
  responseTime: 250, // ms
  algorithmEfficiency: 0.78,
  dataPrecision: 0.92,
  systemUptime: 99.98, // percentage
  lastMaintenanceDate: new Date(),
  // Fields that neuralHub.getHealthMetrics() might return
  load: 0.42,
  userEngagement: 0.65,
  lastUpdated: Date.now()
};

export interface NeuralSystemMetricsResult {
  metrics: SystemHealthMetrics;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  recommendations: string[];
  lastUpdated: Date;
  hasAnomalies: boolean;
  anomalies?: {
    metric: string;
    value: number;
    expected: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export const useNeuralSystemMetrics = (
  refreshInterval: number = 60000, // Default refresh every minute
  initialMetrics?: Partial<SystemHealthMetrics>
): NeuralSystemMetricsResult => {
  const [metrics, setMetrics] = useState<SystemHealthMetrics>({
    ...defaultMetrics,
    ...initialMetrics
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Calculate overall system status
  const calculateStatus = (metrics: SystemHealthMetrics): 'optimal' | 'good' | 'warning' | 'critical' => {
    const criticalMetrics = [
      metrics.cpuUtilization > 0.9,
      metrics.memoryUtilization > 0.9,
      metrics.errorFrequency > 0.1,
      metrics.systemUptime < 95
    ];
    
    const warningMetrics = [
      metrics.cpuUtilization > 0.7,
      metrics.memoryUtilization > 0.7,
      metrics.errorFrequency > 0.05,
      metrics.networkLatency > 500,
      metrics.responseTime > 1000,
      metrics.userSatisfactionScore < 0.7
    ];
    
    if (criticalMetrics.some(Boolean)) return 'critical';
    if (warningMetrics.some(Boolean)) return 'warning';
    if (metrics.cpuUtilization < 0.5 && metrics.memoryUtilization < 0.5 && metrics.errorFrequency < 0.01)
      return 'optimal';
    
    return 'good';
  };
  
  // Generate recommendations based on metrics
  const generateRecommendations = (metrics: SystemHealthMetrics): string[] => {
    const recommendations: string[] = [];
    
    if (metrics.cpuUtilization > 0.8)
      recommendations.push("Scale up neural processing resources to reduce CPU load");
      
    if (metrics.memoryUtilization > 0.8)
      recommendations.push("Optimize memory usage or increase memory allocation");
      
    if (metrics.errorFrequency > 0.05)
      recommendations.push("Investigate rising error rates in neural operations");
      
    if (metrics.networkLatency > 300)
      recommendations.push("Check network configuration for neural data transmission");
      
    if (metrics.userSatisfactionScore < 0.8)
      recommendations.push("Review and improve response quality in user-facing neural systems");
      
    // If no specific recommendations, add a general one
    if (recommendations.length === 0)
      recommendations.push("All neural systems operating within optimal parameters");
      
    return recommendations;
  };
  
  // Detect anomalies in metrics
  const detectAnomalies = (metrics: SystemHealthMetrics) => {
    const anomalies = [];
    const expectedRanges = {
      cpuUtilization: { min: 0.3, max: 0.7 },
      memoryUtilization: { min: 0.2, max: 0.6 },
      errorFrequency: { min: 0, max: 0.03 },
      userSatisfactionScore: { min: 0.8, max: 1 }
    };
    
    // Check CPU utilization
    if (metrics.cpuUtilization < expectedRanges.cpuUtilization.min || 
        metrics.cpuUtilization > expectedRanges.cpuUtilization.max) {
      anomalies.push({
        metric: 'cpuUtilization',
        value: metrics.cpuUtilization,
        expected: (expectedRanges.cpuUtilization.min + expectedRanges.cpuUtilization.max) / 2,
        severity: metrics.cpuUtilization > 0.8 ? 'high' : 'medium'
      });
    }
    
    // Check memory utilization
    if (metrics.memoryUtilization < expectedRanges.memoryUtilization.min || 
        metrics.memoryUtilization > expectedRanges.memoryUtilization.max) {
      anomalies.push({
        metric: 'memoryUtilization',
        value: metrics.memoryUtilization,
        expected: (expectedRanges.memoryUtilization.min + expectedRanges.memoryUtilization.max) / 2,
        severity: metrics.memoryUtilization > 0.8 ? 'high' : 'medium'
      });
    }
    
    return anomalies;
  };
  
  // Effect to periodically refresh metrics
  useEffect(() => {
    // Initial load
    const updateMetrics = () => {
      try {
        // Get metrics from neural hub - fallback to default if not available
        const hubMetrics = neuralHub.getHealthMetrics();
        
        // Update with real-time metrics if available
        setMetrics(prevMetrics => ({
          ...prevMetrics,
          ...hubMetrics,
          // Randomly fluctuate some values for demonstration
          cpuUtilization: prevMetrics.cpuUtilization + (Math.random() * 0.1 - 0.05),
          memoryUtilization: prevMetrics.memoryUtilization + (Math.random() * 0.1 - 0.05),
          errorFrequency: Math.max(0, prevMetrics.errorFrequency + (Math.random() * 0.01 - 0.005)),
          lastMaintenanceDate: prevMetrics.lastMaintenanceDate
        }));
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error updating neural system metrics:', error);
      }
    };
    
    updateMetrics();
    
    // Set up interval for refreshing
    const intervalId = setInterval(updateMetrics, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  // Calculate derived metrics
  const status = calculateStatus(metrics);
  const recommendations = generateRecommendations(metrics);
  const anomalies = detectAnomalies(metrics);
  
  return {
    metrics,
    status,
    recommendations,
    lastUpdated,
    hasAnomalies: anomalies.length > 0,
    anomalies: anomalies.length > 0 ? anomalies : undefined
  };
};

export default useNeuralSystemMetrics;
