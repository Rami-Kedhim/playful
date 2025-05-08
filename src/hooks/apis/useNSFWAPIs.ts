
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { NSFWFriendlyAPIs } from '@/services/apis/NSFWFriendlyAPIs';

interface NSFWImageGenerationOptions {
  prompt: string;
  model?: string;
  guidance_scale?: number;
  num_inference_steps?: number;
  negative_prompt?: string;
}

export const useNSFWAPIs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Generate image using Hugging Face models
  const generateImage = useCallback(async (options: NSFWImageGenerationOptions): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      toast({
        title: "Generating Image",
        description: "Please wait while we create your image...",
      });
      
      const { data, error: apiError } = await supabase.functions.invoke('nsfw-image-generation', {
        body: options
      });
      
      if (apiError) throw new Error(apiError.message);
      
      if (data instanceof ArrayBuffer) {
        const blob = new Blob([data], { type: 'image/png' });
        return URL.createObjectURL(blob);
      } else if (typeof data === 'string') {
        return data;
      } else if (data?.url) {
        return data.url;
      }
      
      throw new Error('Unknown response format from image generation API');
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Image Generation Failed",
        description: err.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Get available API options
  const getAPIOptions = useCallback((category: keyof typeof NSFWFriendlyAPIs) => {
    return NSFWFriendlyAPIs[category] || [];
  }, []);

  return {
    loading,
    error,
    generateImage,
    getAPIOptions,
    availableCategories: Object.keys(NSFWFriendlyAPIs)
  };
};
