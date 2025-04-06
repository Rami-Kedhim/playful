
import { useState } from 'react';
import hermesSeoService, { 
  SeoOptimizationRequest, 
  SeoOptimizationResult 
} from '@/services/seo/HermesSeoService';

export const useHermesSeo = () => {
  const [optimizationResult, setOptimizationResult] = useState<SeoOptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Enhance content SEO using HERMES intelligence
   */
  const enhanceContentSeo = async (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    title: string,
    description: string,
    keywords: string[]
  ): Promise<SeoOptimizationResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await hermesSeoService.enhanceContentSeo(
        contentId,
        contentType,
        title,
        description,
        keywords
      );
      
      setOptimizationResult(result);
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to optimize content with HERMES';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Apply optimizations to content
   */
  const applyOptimizations = async (
    contentId: string,
    optimizations: SeoOptimizationResult
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await hermesSeoService.applyOptimizations(
        contentId,
        optimizations
      );
      
      return success;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to apply HERMES optimizations';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    enhanceContentSeo,
    applyOptimizations,
    optimizationResult,
    isLoading,
    error
  };
};

export default useHermesSeo;
