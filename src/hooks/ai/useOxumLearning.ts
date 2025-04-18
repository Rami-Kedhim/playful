
import { useState, useCallback } from 'react';
import { oxumLearningService } from '@/services/ai/OxumLearningService';

interface OxumLearnedPattern {
  id: string;
  type: string;
  confidence: number;
  occurrences: number;
  lastObserved?: Date;
  category?: string;
  relatedPatterns?: string[];
}

export const useOxumLearning = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [patterns, setPatterns] = useState<OxumLearnedPattern[]>([]);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    setIsInitializing(true);
    setError(null);

    try {
      const success = await oxumLearningService.initialize();
      setIsInitialized(success);
      return success;
    } catch (err) {
      setError("Failed to initialize Oxum Learning: " + (err as Error).message);
      return false;
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const processInput = useCallback(async (input: string) => {
    if (!isInitialized) {
      setError("Oxum Learning not initialized");
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await oxumLearningService.processInput(input);
      setOutput(result);
      return result;
    } catch (err) {
      setError("Error processing input: " + (err as Error).message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isInitialized]);

  const loadLearnedPatterns = useCallback(async () => {
    if (!isInitialized) {
      setError("Oxum Learning not initialized");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const patterns = await oxumLearningService.getLearnedPatterns();
      setPatterns(patterns);
    } catch (err) {
      setError("Error loading learned patterns: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  return {
    isInitializing,
    isInitialized,
    isProcessing,
    isLoading,
    output,
    patterns,
    error,
    initialize,
    processInput,
    loadLearnedPatterns
  };
};
