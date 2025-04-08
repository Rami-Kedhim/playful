
import { useState, useEffect } from 'react';
import { 
  generateNeuralAnalytics, 
  generatePerformanceForecast
} from '@/services/neural/reporting/neuralAnalytics';
import { 
  NeuralAnalyticsReport, 
  PerformanceTrend 
} from '@/services/neural/types/neuralAnalytics';

export function useNeuralAnalytics(updateFrequencyMs = 30000) {
  const [analyticsData, setAnalyticsData] = useState<NeuralAnalyticsReport | null>(null);
  const [forecastData, setForecastData] = useState<PerformanceTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchAnalytics = () => {
      try {
        const report = generateNeuralAnalytics();
        const forecast = generatePerformanceForecast(7);
        
        if (mounted) {
          setAnalyticsData(report);
          setForecastData(forecast);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(`Failed to load analytics: ${err instanceof Error ? err.message : String(err)}`);
          setLoading(false);
        }
      }
    };
    
    // Initial fetch
    fetchAnalytics();
    
    // Set up polling for updates
    const intervalId = setInterval(fetchAnalytics, updateFrequencyMs);
    
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [updateFrequencyMs]);
  
  const refreshAnalytics = () => {
    setLoading(true);
    try {
      const report = generateNeuralAnalytics();
      const forecast = generatePerformanceForecast(7);
      setAnalyticsData(report);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError(`Failed to refresh analytics: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    analyticsData,
    forecastData,
    loading,
    error,
    refreshAnalytics
  };
}

export default useNeuralAnalytics;
