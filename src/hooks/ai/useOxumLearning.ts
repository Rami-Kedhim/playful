import { useState, useEffect, useCallback } from 'react';
import { oxumLearningService } from '@/services/neural/modules/OxumLearningService';
import { useBrainHub } from '@/hooks/useBrainHub';

interface OxumLearningOptions {
  componentId: string;
  autoSync?: boolean;
  culturalContext?: Record<string, any>;
}

interface OxumLearningResult {
  enhancedOutput: string;
  culturalContext: any;
  confidenceScore: number;
}

/**
 * Hook for integrating Oxum learning capabilities into React components
 */
export const useOxumLearning = (options: OxumLearningOptions) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Integrate with Brain Hub
  const brainHub = useBrainHub(`oxum-learning-${options.componentId}`, {
    moduleType: 'learning',
    culturalContext: options.culturalContext
  });
  
  // Initialize Oxum Learning service
  useEffect(() => {
    const initializeService = async () => {
      try {
        const success = await oxumLearningService.initialize();
        setIsInitialized(success);
        
        if (!success) {
          throw new Error('Failed to initialize Oxum Learning');
        }
      } catch (err: any) {
        console.error('Error initializing Oxum Learning:', err);
        setError(err.message || 'Failed to initialize Oxum Learning');
      }
    };
    
    initializeService();
  }, []);
  
  /**
   * Process text through the Oxum learning system
   */
  const processText = useCallback((input: string, context?: any): OxumLearningResult => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Merge context with Brain Hub data if available
      const combinedContext = {
        ...(context || {}),
        ...(brainHub.data || {})
      };
      
      // Process through Oxum Learning service
      const result = oxumLearningService.processInput(input, combinedContext);
      
      // Sync with Brain Hub if available and auto-sync enabled
      if (brainHub.isConnected && options.autoSync) {
        brainHub.setData({
          lastProcessed: new Date().toISOString(),
          culturalContext: result.culturalContext
        });
      }
      
      return result;
    } catch (err: any) {
      console.error('Error processing text with Oxum Learning:', err);
      setError(err.message || 'Failed to process text');
      
      // Return unchanged input with low confidence
      return {
        enhancedOutput: input,
        culturalContext: context || {},
        confidenceScore: 0
      };
    } finally {
      setIsProcessing(false);
    }
  }, [brainHub, options.autoSync]);
  
  /**
   * Get learned patterns from the Oxum learning service
   */
  const getLearnedPatterns = useCallback(() => {
    return oxumLearningService.getLearnedPatterns();
  }, []);
  
  /**
   * Get cultural contexts from the Oxum learning service
   */
  const getCulturalContexts = useCallback(() => {
    return oxumLearningService.getCulturalContexts();
  }, []);
  
  return {
    isInitialized,
    isProcessing,
    error,
    processText,
    getLearnedPatterns,
    getCulturalContexts,
    brainHubConnected: brainHub.isConnected
  };
};

export default useOxumLearning;
