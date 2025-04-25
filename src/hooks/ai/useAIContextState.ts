
import { useState } from 'react';
import { AIContext, UseAIContextStateReturn } from './types';

export const useAIContextState = (): UseAIContextStateReturn => {
  const [aiContext, setAIContext] = useState<AIContext | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return {
    aiContext,
    setAIContext,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};
