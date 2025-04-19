
import { useState } from 'react';
import { hermesSeoService, SeoOptimizationResult } from '@/services/seo/HermesSeoService';

export function useHermesSeo() {
  const [optimizationResult, setOptimizationResult] = useState<SeoOptimizationResult | null>(null);
  const [optimizationHistory, setOptimizationHistory] = useState<SeoOptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizeContent = async (content: string): Promise<SeoOptimizationResult | null> => {
    try {
      setIsOptimizing(true);
      setError(null);
      
      const result = await hermesSeoService.optimizeContent(content);
      setOptimizationResult(result);
      
      // Update history
      loadOptimizationHistory();
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to optimize content');
      return null;
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const loadOptimizationHistory = async (): Promise<SeoOptimizationResult[]> => {
    try {
      const history = await hermesSeoService.getOptimizationHistory();
      setOptimizationHistory(history);
      return history;
    } catch (err: any) {
      setError(err.message || 'Failed to load optimization history');
      return [];
    }
  };
  
  const getContentScore = async (content: string): Promise<number> => {
    try {
      return await hermesSeoService.getContentScore(content);
    } catch (err: any) {
      setError(err.message || 'Failed to get content score');
      return 0;
    }
  };

  return {
    optimizeContent,
    optimizationResult,
    optimizationHistory,
    loadOptimizationHistory,
    getContentScore,
    isOptimizing,
    error
  };
}
