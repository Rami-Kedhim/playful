
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MediaGenerationOptions {
  prompt: string;
  type: 'image' | 'video';
  modelId?: string;
  width?: number;
  height?: number;
  options?: Record<string, any>;
  userId?: string;
}

export const useMediaGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateMedia = async (params: MediaGenerationOptions): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Show a loading toast
      toast({
        title: `Generating ${params.type}...`,
        description: 'This may take a few moments to complete.',
      });
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-media', {
        body: {
          type: params.type,
          prompt: params.prompt,
          user_id: params.userId || 'anonymous',
          modelId: params.modelId,
          options: {
            width: params.width || 1024,
            height: params.height || 1024,
            ...params.options
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }

      // If the response is binary data, convert to object URL
      if (data instanceof ArrayBuffer) {
        const contentType = params.type === 'image' ? 'image/png' : 'video/mp4';
        const blob = new Blob([data], { type: contentType });
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
        
        toast({
          title: `${params.type.charAt(0).toUpperCase() + params.type.slice(1)} Generated!`,
          description: 'Your media has been successfully generated.',
        });
        
        return url;
      } 
      
      // If we received a URL or base64 string
      if (typeof data === 'string' || data?.url) {
        const url = data?.url || data;
        setMediaUrl(url);
        
        toast({
          title: `${params.type.charAt(0).toUpperCase() + params.type.slice(1)} Generated!`,
          description: 'Your media has been successfully generated.',
        });
        
        return url;
      }
      
      throw new Error('Invalid response format from media generator');
    } catch (err: any) {
      const errorMessage = err.message || `Failed to generate ${params.type}`;
      setError(errorMessage);
      
      toast({
        title: `${params.type.charAt(0).toUpperCase() + params.type.slice(1)} Generation Failed`,
        description: errorMessage,
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const resetMedia = () => {
    if (mediaUrl && mediaUrl.startsWith('blob:')) {
      URL.revokeObjectURL(mediaUrl);
    }
    setMediaUrl(null);
    setError(null);
  };

  return {
    generateMedia,
    resetMedia,
    loading,
    mediaUrl,
    error,
  };
};

export default useMediaGeneration;
