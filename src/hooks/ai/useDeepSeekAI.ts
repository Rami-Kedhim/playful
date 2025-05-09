
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface DeepSeekGenerationParams {
  prompt: string;
  modelType?: 'image' | 'text' | 'video';
  modelId?: string;
  negativePrompt?: string;
  guidanceScale?: number;
  steps?: number;
  width?: number;
  height?: number;
}

export interface DeepSeekResponse {
  url?: string;
  text?: string;
  error?: string;
}

/**
 * Hook for interacting with DeepSeek AI models through Hugging Face
 */
export const useDeepSeekAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DeepSeekResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  /**
   * Generate content using DeepSeek AI models
   */
  const generateContent = async (params: DeepSeekGenerationParams): Promise<DeepSeekResponse> => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Show loading toast
      toast({
        title: `Generating with DeepSeek AI`,
        description: "This may take up to a minute to complete...",
      });

      // Prepare the request based on content type
      let functionName = 'generate-nsfw-image';
      if (params.modelType === 'text') {
        functionName = 'generate-ai-message';
      } else if (params.modelType === 'video') {
        functionName = 'generate-media';
      }
      
      // Call the appropriate edge function
      const { data, error: apiError } = await supabase.functions.invoke(functionName, {
        body: {
          customPrompt: params.prompt,
          negativePrompt: params.negativePrompt,
          modelId: params.modelId || 'deepseek-ai/deepseek-vl-7b-chat',
          ...params
        }
      });
      
      if (apiError) throw new Error(apiError.message);
      
      // Handle binary responses (images)
      if (data instanceof ArrayBuffer) {
        const blob = new Blob([data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        
        const response = { url };
        setResult(response);
        
        toast({
          title: "Generation Complete",
          description: "Your AI content has been generated successfully!"
        });
        
        return response;
      } 

      // Handle text/JSON responses
      const response = typeof data === 'string' 
        ? { text: data } 
        : data.url 
          ? { url: data.url } 
          : data.text 
            ? { text: data.text } 
            : data;
      
      setResult(response);
      
      toast({
        title: "Generation Complete",
        description: "Your AI content has been generated successfully!"
      });
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred during generation';
      setError(errorMsg);
      
      toast({
        title: "Generation Failed",
        description: errorMsg,
        variant: "destructive"
      });
      
      return { error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Clear generated content from state
   */
  const clearResult = () => {
    if (result?.url && result.url.startsWith('blob:')) {
      URL.revokeObjectURL(result.url);
    }
    setResult(null);
    setError(null);
  };
  
  /**
   * Get available DeepSeek models 
   */
  const getAvailableModels = () => {
    return [
      { id: 'deepseek-ai/deepseek-vl-7b-chat', name: 'DeepSeek Vision-Language 7B', type: 'multimodal' },
      { id: 'deepseek-ai/deepseek-coder-33b-instruct', name: 'DeepSeek Coder 33B', type: 'code' },
      { id: 'deepseek-ai/deepseek-math-7b-instruct', name: 'DeepSeek Math 7B', type: 'math' },
      { id: 'deepseek-ai/deepseek-llm-67b-chat', name: 'DeepSeek LLM 67B', type: 'text' }
    ];
  };

  return {
    generateContent,
    clearResult,
    getAvailableModels,
    result,
    error,
    isLoading
  };
};

export default useDeepSeekAI;
