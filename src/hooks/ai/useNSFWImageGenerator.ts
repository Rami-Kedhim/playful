
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface NSFWImageGenerationParams {
  model?: string;
  name?: string;
  age?: string;
  ethnicity?: string;
  style?: string;
  skinTone?: string;
  clothing?: string;
  background?: string;
  pose?: string;
  tags?: string[];
}

export const useNSFWImageGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async (params: NSFWImageGenerationParams): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-nsfw-image', {
        body: params
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }

      // If the response is binary data (the image), convert to object URL
      if (data instanceof ArrayBuffer) {
        const blob = new Blob([data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        return url;
      } 
      
      // If we received a URL or base64 string
      if (typeof data === 'string' || data?.url) {
        const url = data?.url || data;
        setImageUrl(url);
        return url;
      }
      
      // If we get here, something unexpected happened
      throw new Error('Invalid response format from image generator');
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate NSFW image';
      setError(errorMessage);
      toast({
        title: 'Image Generation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const resetImage = () => {
    // Release the object URL if it exists
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
    setError(null);
  };

  return {
    generateImage,
    resetImage,
    loading,
    imageUrl,
    error,
  };
};
