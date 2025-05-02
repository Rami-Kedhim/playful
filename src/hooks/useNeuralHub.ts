
import { useState, useCallback } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { BrainHubRequest, BrainHubResponse, ModelParameters } from '@/services/neural/types/neuralHub';

/**
 * Custom hook for interacting with the Neural Hub system
 * Provides methods for sending requests and managing model parameters
 */
export function useNeuralHub() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<BrainHubResponse | null>(null);

  // Initialize the hub if not already initialized
  useCallback(() => {
    neuralHub.initialize();
  }, []);

  // Send a request to the neural hub
  const sendRequest = useCallback(async (request: BrainHubRequest): Promise<BrainHubResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await neuralHub.processRequest(request);
      setLastResponse(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Error processing neural request';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update model parameters
  const updateParameters = useCallback((parameters: Partial<ModelParameters>): void => {
    try {
      neuralHub.updateModelParameters(parameters);
    } catch (err: any) {
      setError(err.message || 'Error updating model parameters');
    }
  }, []);

  // Get current model parameters
  const getParameters = useCallback((): ModelParameters => {
    return neuralHub.getModelParameters();
  }, []);

  // Get system health metrics
  const getHealthMetrics = useCallback(() => {
    return neuralHub.getHealthMetrics();
  }, []);

  // Get system status
  const getSystemStatus = useCallback(() => {
    return neuralHub.getSystemStatus();
  }, []);

  return {
    sendRequest,
    updateParameters,
    getParameters,
    getHealthMetrics,
    getSystemStatus,
    isLoading,
    error,
    lastResponse
  };
}

export default useNeuralHub;
