
import { useState, useEffect } from 'react';
import { 
  generateMockNeuralAnalytics, 
  generateDetailedPerformanceMetrics
} from '@/services/neural/reporting/neuralAnalytics';

export default function useNeuralAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [detailedMetrics, setDetailedMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = generateMockNeuralAnalytics();
      const metrics = generateDetailedPerformanceMetrics();
      setAnalyticsData(data);
      setDetailedMetrics(metrics);
    } catch (err) {
      console.error("Error fetching neural analytics:", err);
      setError(err.message || "Failed to fetch neural analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAnalytics();
  }, []);

  return { analyticsData, detailedMetrics, loading, error, refreshAnalytics };
}
