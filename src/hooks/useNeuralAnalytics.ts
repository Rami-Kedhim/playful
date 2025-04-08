
import { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural';
import { 
  generateNeuralAnalytics, 
  generatePerformanceForecast,
  NeuralAnalyticsReport,
  PerformanceTrend
} from '@/services/neural/reporting/neuralAnalytics';
import { TrainingProgress } from '@/services/neural/types/neuralHub';

export function useNeuralAnalytics() {
  const [analytics, setAnalytics] = useState<NeuralAnalyticsReport | null>(null);
  const [forecast, setForecast] = useState<PerformanceTrend[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // 30 seconds default
  
  // Load initial data
  useEffect(() => {
    refreshData();
    
    // Set up refresh interval
    const intervalId = setInterval(() => {
      refreshData();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  // Function to refresh all analytics data
  const refreshData = async () => {
    try {
      setLoading(true);
      
      // Get neural analytics
      const analyticsData = generateNeuralAnalytics();
      setAnalytics(analyticsData);
      
      // Get performance forecast
      const forecastData = generatePerformanceForecast(7); // 7-day forecast
      setForecast(forecastData);
      
      // Get training jobs
      const activeTrainingJobs = neuralHub.getActiveTrainingJobs();
      setTrainingJobs(activeTrainingJobs);
      
      setError(null);
    } catch (err) {
      console.error("Error refreshing neural analytics:", err);
      setError("Failed to load neural analytics data");
    } finally {
      setLoading(false);
    }
  };
  
  // Start a new model training job
  const startModelTraining = (modelId: string, config?: any) => {
    try {
      const success = neuralHub.startTraining(modelId, config);
      if (success) {
        refreshData(); // Refresh data to show new training job
      }
      return success;
    } catch (err) {
      console.error("Error starting model training:", err);
      setError(`Failed to start training for model: ${modelId}`);
      return false;
    }
  };
  
  // Stop an ongoing training job
  const stopModelTraining = (modelId: string) => {
    try {
      const success = neuralHub.stopTraining(modelId);
      if (success) {
        refreshData(); // Refresh data to reflect stopped training
      }
      return success;
    } catch (err) {
      console.error("Error stopping model training:", err);
      setError(`Failed to stop training for model: ${modelId}`);
      return false;
    }
  };
  
  // Update refresh interval
  const updateRefreshInterval = (interval: number) => {
    setRefreshInterval(interval);
  };
  
  return {
    analytics,
    forecast,
    trainingJobs,
    loading,
    error,
    refreshData,
    startModelTraining,
    stopModelTraining,
    updateRefreshInterval
  };
}

export default useNeuralAnalytics;
