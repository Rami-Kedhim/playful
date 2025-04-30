
import { useState } from 'react';
import { useNeuralAnalytics } from './useNeuralAnalytics';
import { NeuralAnalyticsReport } from '@/services/neural/types/neuralAnalytics';
import { Anomaly } from '@/types/analytics';

export type AnalyticsChartType = 'usage' | 'performance' | 'forecast';

export function useNeuralAnalyticsDashboard() {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [activeChart, setActiveChart] = useState<AnalyticsChartType>('usage');
  const [acknowledgedAnomalies, setAcknowledgedAnomalies] = useState<string[]>([]);
  
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
  
  // Filter anomalies to exclude acknowledged ones
  const filteredAnomalies = analyticsData?.anomalies.filter(
    anomaly => !acknowledgedAnomalies.includes(anomaly.id || '')
  ) || [];
  
  // Check if there are any critical anomalies
  const hasCriticalAnomalies = filteredAnomalies.some(
    anomaly => anomaly.severity === 'high'
  ) || false;
  
  // Function to acknowledge an anomaly
  const acknowledgeAnomaly = (id: string) => {
    setAcknowledgedAnomalies(prev => [...prev, id]);
  };
  
  return {
    analyticsData: analyticsData ? {
      ...analyticsData,
      anomalies: filteredAnomalies
    } : null,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    hasCriticalAnomalies,
    acknowledgeAnomaly
  };
}

export default useNeuralAnalyticsDashboard;
