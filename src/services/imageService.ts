
import ApiService from './api/apiService';
import { toast } from "@/hooks/use-toast";

export const defaultImagePlaceholders = {
  profile: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=500&auto=format&fit=crop",
  escort: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop", 
  gallery: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=500&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=500&auto=format&fit=crop",
  avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=128&h=128&auto=format&fit=crop"
};

export interface ImageParams {
  name?: string;
  age?: string;
  ethnicity?: string;
  style?: string;
  outfitType?: string;
  background?: string;
  width?: number;
  height?: number;
}

export class ImageService {
  /**
   * Generate escort profile image based on parameters
   */
  static async generateEscortImage(params: ImageParams): Promise<string | null> {
    try {
      // Construct a detailed prompt for realistic but appropriate image
      const prompt = `Professional portrait photo of ${params.name || 'a person'}, 
        ${params.age || '25'} years old, ${params.ethnicity || 'person'} in 
        ${params.outfitType || 'professional attire'}, ${params.style || 'elegant'} style, 
        in ${params.background || 'professional setting'}. High quality, professional photo, 
        detailed portrait, clear face, good lighting.`;
      
      const result = await ApiService.generateImage(prompt, {
        width: params.width || 512, 
        height: params.height || 768
      });
      
      return result;
    } catch (error) {
      console.error('Error generating escort image:', error);
      toast({
        title: "Image Generation Failed",
        description: "Could not generate profile image. Using placeholder instead.",
        variant: "destructive",
      });
      return defaultImagePlaceholders.escort;
    }
  }
  
  /**
   * Check if an image URL is valid and accessible
   */
  static async isImageValid(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get a placeholder image for when generation fails
   */
  static getPlaceholder(type: keyof typeof defaultImagePlaceholders): string {
    return defaultImagePlaceholders[type] || defaultImagePlaceholders.profile;
  }
  
  /**
   * Get a random avatar from an API
   */
  static getRandomAvatar(seed?: string): string {
    // Using DiceBear's free API for avatars
    const style = 'avataaars';
    const seedValue = seed || Math.random().toString(36).substring(2, 8);
    
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seedValue}`;
  }
}

export default ImageService;
