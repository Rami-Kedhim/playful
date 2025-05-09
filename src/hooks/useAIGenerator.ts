
import { useState } from 'react';
import { huggingFaceService, GenerationParams, GenerationResult } from '@/services/ai/HuggingFaceService';

export interface UseAIGeneratorOptions {
  defaultModel?: string;
  contentType?: 'text' | 'image' | 'video' | 'multimodal';
}

/**
 * Hook for AI content generation across the app
 */
export const useAIGenerator = (options: UseAIGeneratorOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (params: GenerationParams): Promise<GenerationResult> => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the default model if none provided
      const modelToUse = params.model || options.defaultModel || 
        huggingFaceService.getRecommendedModel(
          options.contentType === 'text' ? 'text' : 
          options.contentType === 'video' ? 'video' : 
          options.contentType === 'multimodal' ? 'multimodal' : 'general'
        );
      
      const generationResult = await huggingFaceService.generateContent({
        ...params,
        model: modelToUse
      });
      
      setResult(generationResult);
      return generationResult;
    } catch (err: any) {
      const errorMessage = err.message || 'Content generation failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  
  const getAvailableModels = () => {
    return huggingFaceService.getAvailableModels(options.contentType);
  };
  
  const clearResult = () => {
    if (result?.url && result.url.startsWith('blob:')) {
      URL.revokeObjectURL(result.url);
    }
    setResult(null);
    setError(null);
  };
  
  return {
    generateContent,
    clearResult,
    getAvailableModels,
    loading,
    result,
    error
  };
};

export default useAIGenerator;
