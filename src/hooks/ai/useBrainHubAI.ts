
import { useState, useEffect, useCallback } from 'react';
import { brainHub } from '@/services/neural/HermesOxumNeuralHub';

/**
 * Brain Hub AI integration types
 */
export interface BrainHubAIConfig {
  componentId: string;
  capabilities?: string[];
  userContext?: {
    userId?: string;
    preferences?: Record<string, any>;
    history?: Array<{
      action: string;
      timestamp: number;
    }>;
  };
}

export interface BrainHubAIResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Hook for interacting with Brain Hub AI capabilities
 */
export const useBrainHubAI = (config: BrainHubAIConfig) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Connect to Brain Hub on mount
  useEffect(() => {
    connectToBrainHub();
  }, []);
  
  // Connect to Brain Hub
  const connectToBrainHub = useCallback(async () => {
    try {
      console.log(`Connecting ${config.componentId} to Brain Hub...`);
      
      const result = await brainHub.processRequest({
        type: "register_capabilities",
        data: {
          componentId: config.componentId,
          capabilities: config.capabilities || ["basic_intelligence"],
          userContext: config.userContext
        }
      });
      
      setIsConnected(result.success);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
      
      return result.success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to connect to Brain Hub';
      console.error(errorMessage, err);
      setError(errorMessage);
      setIsConnected(false);
      return false;
    }
  }, [config.componentId, config.capabilities, config.userContext]);
  
  // Process request through Brain Hub
  const processRequest = useCallback(async <T = any>(
    requestType: string,
    requestData: any,
    filters?: Record<string, any>
  ): Promise<BrainHubAIResult<T>> => {
    if (!isConnected) {
      // Try to connect first
      const connected = await connectToBrainHub();
      
      if (!connected) {
        return {
          success: false,
          error: 'Not connected to Brain Hub'
        };
      }
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const result = await brainHub.processRequest({
        type: requestType,
        data: requestData,
        filters: filters
      });
      
      return result as BrainHubAIResult<T>;
    } catch (err: any) {
      const errorMessage = err.message || `Brain Hub ${requestType} processing failed`;
      console.error(errorMessage, err);
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsProcessing(false);
    }
  }, [isConnected, connectToBrainHub]);
  
  // Record interaction in Brain Hub
  const recordInteraction = useCallback(async (
    interactionType: string,
    interactionData?: any
  ): Promise<void> => {
    if (!isConnected) {
      // Skip if not connected to avoid errors
      return;
    }
    
    try {
      await brainHub.processRequest({
        type: "record_interaction",
        data: {
          componentId: config.componentId,
          interactionType,
          interactionData,
          timestamp: new Date().toISOString()
        }
      });
    } catch (err) {
      console.warn(`Failed to record ${interactionType} interaction:`, err);
    }
  }, [isConnected, config.componentId]);
  
  return {
    isConnected,
    isProcessing,
    error,
    connectToBrainHub,
    processRequest,
    recordInteraction
  };
};

export default useBrainHubAI;
