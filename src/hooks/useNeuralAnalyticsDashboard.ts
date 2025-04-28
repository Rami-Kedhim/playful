
import { useState } from 'react';
import { useNeuralAnalytics } from './useNeuralAnalytics';
import { NeuralAnalyticsReport } from '@/services/neural/types/neuralAnalytics';

export type AnalyticsChartType = 'usage' | 'performance' | 'forecast';

export function useNeuralAnalyticsDashboard() {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [activeChart, setActiveChart] = useState<AnalyticsChartType>('usage');
  
  // Extract and format key metrics for display
  const keyMetrics = analyticsData ? {
    responseTime: {
      value: analyticsData.operationalMetrics.averageResponseTime,
      change: analyticsData.operationalMetrics.responseTimeChange,
      unit: 'ms'
    },
    accuracy: {
      value: analyticsData.operationalMetrics.averageAccuracy * 100,
      change: analyticsData.operationalMetrics.accuracyChange,
      unit: '%'
    },
    errorRate: {
      value: analyticsData.operationalMetrics.errorRate,
      change: analyticsData.operationalMetrics.errorRateChange,
      unit: '%'
    },
    operations: {
      value: analyticsData.operationalMetrics.totalOperations,
      change: analyticsData.operationalMetrics.operationsChange,
      unit: ''
    }
  } : null;
  
  // Check if there are any critical anomalies
  const hasCriticalAnomalies = analyticsData?.anomalies.some(
    anomaly => anomaly.severity === 'high'
  ) || false;
  
  return {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    hasCriticalAnomalies
  };
}

export default useNeuralAnalyticsDashboard;
