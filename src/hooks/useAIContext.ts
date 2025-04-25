
import { useCallback, useEffect, useState } from 'react';
import type { AIContext } from '@/types/ai-context';

export function useAIContext() {
  const [context, setContext] = useState<AIContext | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const updateContext = useCallback((newContext: Partial<AIContext>) => {
    setContext(prev => {
      if (!prev) return newContext as AIContext;
      return { ...prev, ...newContext };
    });
    setLastUpdated(new Date());
  }, []);

  return {
    context,
    lastUpdated,
    updateContext
  };
}
