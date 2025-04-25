
import { useState } from 'react';
import { AIContext } from './types';

export const useAIContextState = () => {
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

