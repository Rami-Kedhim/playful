
import { supabase } from "@/integrations/supabase/client";

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
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (result.error) {
      return {
        requiresPayment: result.requiresPayment || false,
        price: result.price,
        error: result.error
      };
    }
    
    return {
      imageUrl: result.image_url,
      requiresPayment: false, // Already paid in the function
      price: result.price
    };
  } catch (error: any) {
    console.error("Error generating AI image:", error);
    return {
      requiresPayment: false,
      error: error.message
    };
  }
};
