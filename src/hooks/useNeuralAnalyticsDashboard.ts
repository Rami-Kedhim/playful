
import { useState } from 'react';
import { useNeuralAnalytics } from './useNeuralAnalytics';
import { NeuralAnalyticsReport } from '@/services/neural/types/neuralAnalytics';
import { Anomaly } from '@/types/analytics';

export type AnalyticsChartType = 'usage' | 'performance' | 'forecast';

export function useNeuralAnalyticsDashboard() {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [activeChart, setActiveChart] = useState<AnalyticsChartType>('usage');
  const [acknowledgedAnomalies, setAcknowledgedAnomalies] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
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

  // Handle date range changes
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Filter chart data based on date range
  const getFilteredChartData = (data: Array<{date: string, value: number}>) => {
    if (!startDate && !endDate) return data;
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;
      return isAfterStart && isBeforeEnd;
    });
  };
  
  return {
    analyticsData: analyticsData ? {
      ...analyticsData,
      anomalies: filteredAnomalies,
      usageMetrics: {
        ...analyticsData.usageMetrics,
        dailyUsageTrend: getFilteredChartData(analyticsData.usageMetrics.dailyUsageTrend)
      },
      // We also need to filter performanceForecast if it exists
      performanceForecast: analyticsData.performanceForecast ? 
        analyticsData.performanceForecast.filter(item => {
          const itemDate = new Date(item.date);
          const isAfterStart = !startDate || itemDate >= startDate;
          const isBeforeEnd = !endDate || itemDate <= endDate;
          return isAfterStart && isBeforeEnd;
        }) : 
        analyticsData.performanceForecast
    } : null,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    hasCriticalAnomalies,
    acknowledgeAnomaly,
    startDate,
    endDate,
    handleDateRangeChange
  };
}

export default useNeuralAnalyticsDashboard;
