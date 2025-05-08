
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Service for handling NSFW API integrations
 * Uses Supabase Edge Functions for secure API calls and avoids exposing API keys
 */
export class NSFWApiService {
  /**
   * Generate NSFW content using the most cost-effective API provider
   * @param prompt The prompt for generating content
   * @param options Additional generation options
   */
  public async generateNSFWImage(prompt: string, options: {
    model?: string;
    name?: string;
    age?: string;
    ethnicity?: string;
    style?: string;
    clothingType?: string;
    background?: string;
    pose?: string;
  } = {}): Promise<string | null> {
    try {
      // Show loading toast
      toast({
        title: "Generating Image",
        description: "Please wait while we generate your image...",
      });
      
      console.log("Generating NSFW image with prompt:", prompt);
      
      // Use Supabase Edge Function to securely handle API call
      const { data, error } = await supabase.functions.invoke('generate-nsfw-image', {
        body: {
          prompt,
          model: options.model || 'stablediffusionapi/realistic-vision-v5',
          name: options.name || 'Lucia',
          age: options.age || '25',
          ethnicity: options.ethnicity || 'Latina',
          style: options.style || 'Glamour',
          clothing: options.clothingType || 'Elegant dress',
          background: options.background || 'Luxury hotel suite',
          pose: options.pose || 'Seductive'
        }
      });
      
      if (error) {
        console.error("Error generating NSFW image:", error);
        toast({
          title: "Generation Failed",
          description: error.message || "Failed to generate image",
          variant: "destructive",
        });
        return null;
      }
      
      // Handle binary response (the generated image)
      if (data instanceof Blob || data instanceof ArrayBuffer) {
        const blob = data instanceof Blob ? data : new Blob([data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return url;
      }
      
      // Handle URL or base64 response
      if (typeof data === 'string' || data?.url) {
        const imageUrl = data?.url || data;
        return imageUrl;
      }
      
      // If we get here, something unexpected happened
      console.error("Unexpected response format:", data);
      toast({
        title: "Generation Failed",
        description: "Received an unexpected response format",
        variant: "destructive",
      });
      return null;
      
    } catch (err: any) {
      console.error("NSFW image generation failed:", err);
      toast({
        title: "Generation Failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  }
  
  /**
   * Moderate content to ensure compliance with platform guidelines
   * Uses OpenAI's moderation API via Supabase Edge Function
   */
  public async moderateContent(text: string): Promise<{
    isSafe: boolean;
    categories: Record<string, number>;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('moderate-content', {
        body: { text }
      });
      
      if (error) {
        console.error("Error moderating content:", error);
        return {
          isSafe: false,
          categories: { error: 1.0 }
        };
      }
      
      return data;
    } catch (err) {
      console.error("Content moderation failed:", err);
      return {
        isSafe: false,
        categories: { error: 1.0 }
      };
    }
  }
}

// Export singleton instance
export const nsfwApiService = new NSFWApiService();
export default nsfwApiService;
