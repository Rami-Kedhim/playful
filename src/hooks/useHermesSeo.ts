
import { useState, useCallback } from 'react';
import { hermesSeoService, SeoOptimizationResult } from '@/services/seo/HermesSeoService';

export function useHermesSeo() {
  const [optimizationResult, setOptimizationResult] = useState<SeoOptimizationResult>({
    pageUrl: '',
    title: '',
    metaDescription: '',
    h1: '',
    contentScore: 0,
    visibilityScore: 0,
    priorityKeywords: [],
    recommendations: [],
    originalContent: '',
    optimizedContent: '',
    readabilityScore: 0,
    keywordDensity: {},
  });
  
  const [optimizationHistory, setOptimizationHistory] = useState<SeoOptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState('');

  const optimizeContent = useCallback(async (content: string): Promise<SeoOptimizationResult> => {
    setIsOptimizing(true);
    setError('');
    
    try {
      const result = await hermesSeoService.optimizeContent(content);
      setOptimizationResult(result);
      setOptimizationHistory(prev => [result, ...prev]);
      return result;
    } catch (err: any) {
      setError(err?.message || 'Failed to optimize content');
      throw err;
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  const loadOptimizationHistory = useCallback(async (): Promise<SeoOptimizationResult[]> => {
    try {
      const history = await hermesSeoService.getOptimizationHistory();
      setOptimizationHistory(history);
      return history;
    } catch (err: any) {
      setError(err?.message || 'Failed to load optimization history');
      throw err;
    }
  }, []);

  const getContentScore = useCallback(async (content: string): Promise<number> => {
    try {
      return await hermesSeoService.getContentScore(content);
    } catch (err: any) {
      setError(err?.message || 'Failed to get content score');
      throw err;
    }
  }, []);

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
