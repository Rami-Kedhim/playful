
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Generate an AI image using DALL-E
 */
export const generateAIImage = async (
  userId: string,
  prompt: string,
  aiProfileId?: string
): Promise<{
  imageUrl?: string;
  requiresPayment: boolean;
  price?: number;
  error?: string;
}> => {
  try {
    // Show loading toast
    const loadingToast = toast({
      title: "Generating image...",
      description: "Please wait while we create your image",
    });
    
    const { data: result, error } = await supabase.functions.invoke('generate-ai-content', {
      body: {
        prompt,
        user_id: userId,
        ai_profile_id: aiProfileId,
        type: 'image',
        size: "1024x1024",
        style: "natural"
      }
    });
    
    // Dismiss loading toast
    loadingToast.dismiss?.();
    
    if (error) {
      console.error("Supabase function error:", error);
      toast({
        title: "Image generation failed",
        description: error.message || "An error occurred while generating the image",
        variant: "destructive",
      });
      throw new Error(error.message);
    }
    
    if (result.error) {
      if (result.requiresPayment) {
        toast({
          title: "Insufficient Lucoins",
          description: `You need ${result.price} Lucoins to generate this image`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Image generation failed",
          description: result.error || "Failed to generate image",
          variant: "destructive",
        });
      }
      
      return {
        requiresPayment: result.requiresPayment || false,
        price: result.price,
        error: result.error
      };
    }
    
    toast({
      title: "Image generated!",
      description: "Your AI image has been created successfully",
    });
    
    return {
      imageUrl: result.image_url,
      requiresPayment: false, // Already paid in the function
      price: result.price
    };
  } catch (error: any) {
    console.error("Error generating AI image:", error);
    toast({
      title: "Image generation failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
    return {
      requiresPayment: false,
      error: error.message
    };
  }
};
