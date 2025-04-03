
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIProfile } from '@/types/ai-profile';
import { generateAIImage } from '@/services/ai/aiProfileService';
import { toast } from '@/components/ui/use-toast';

export const useAIImageGeneration = (
  profile: AIProfile | null,
  setError: (error: string | null) => void
) => {
  const { user } = useAuth();
  const [generatingImage, setGeneratingImage] = useState(false);

  const generateImage = useCallback(async (prompt: string) => {
    if (!user || !profile) {
      setError('Cannot generate image: no active profile');
      return null;
    }
    
    setGeneratingImage(true);
    setError(null);
    
    try {
      const result = await generateAIImage(user.id, prompt, profile.id);
      
      if (result.error) {
        if (result.requiresPayment) {
          toast({
            title: 'Payment Required',
            description: `You need ${result.price || 10} Lucoins to generate this image`,
            variant: 'destructive',
          });
        } else {
          throw new Error(result.error);
        }
        return null;
      }
      
      return result.imageUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
      toast({
        title: 'Error',
        description: err.message || 'Failed to generate image',
        variant: 'destructive',
      });
      return null;
    } finally {
      setGeneratingImage(false);
    }
  }, [user, profile, setError]);

  return {
    generatingImage,
    generateImage
  };
};
