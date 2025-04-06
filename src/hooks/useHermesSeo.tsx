
/**
 * Hook for using HERMES-powered SEO optimization in components
 */
import { useState, useCallback } from 'react';
import hermesSeoService, { SeoOptimizationRequest, SeoOptimizationResult } from '@/services/seo/HermesSeoService';

export interface UseSeoOptimizationResult {
  optimizeSeo: (request: SeoOptimizationRequest) => Promise<SeoOptimizationResult>;
  applyOptimizations: (contentId: string, optimizations: SeoOptimizationResult) => Promise<boolean>;
  enhanceContentSeo: (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    currentTitle: string,
    currentDescription: string,
    keywords: string[]
  ) => Promise<SeoOptimizationResult>;
  optimizationResult: SeoOptimizationResult | null;
  isLoading: boolean;
  error: string | null;
}

export const useHermesSeo = (): UseSeoOptimizationResult => {
  const [optimizationResult, setOptimizationResult] = useState<SeoOptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Request SEO optimization from HERMES
   */
  const optimizeSeo = useCallback(async (request: SeoOptimizationRequest): Promise<SeoOptimizationResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await hermesSeoService.optimizeSeo(request);
      setOptimizationResult(result);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error during SEO optimization';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Apply HERMES-recommended SEO optimizations
   */
  const applyOptimizations = useCallback(async (
    contentId: string,
    optimizations: SeoOptimizationResult
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await hermesSeoService.applyOptimizations(contentId, optimizations);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply SEO optimizations';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Generate SEO enhancements for content
   */
  const enhanceContentSeo = useCallback(async (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    currentTitle: string,
    currentDescription: string,
    keywords: string[]
  ): Promise<SeoOptimizationResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await hermesSeoService.enhanceContentSeo(
        contentId,
        contentType,
        currentTitle,
        currentDescription,
        keywords
      );
      
      setOptimizationResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to enhance content SEO';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    optimizeSeo,
    applyOptimizations,
    enhanceContentSeo,
    optimizationResult,
    isLoading,
    error
  };
};

export default useHermesSeo;
