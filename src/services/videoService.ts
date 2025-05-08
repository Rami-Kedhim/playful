
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

export interface VideoGenerationOptions {
  prompt: string;
  duration?: number;
  width?: number;
  height?: number;
  modelId?: string;
}

export class VideoService {
  /**
   * Generate a video based on text prompt
   */
  static async generateVideo(options: VideoGenerationOptions): Promise<string | null> {
    try {
      toast({
        title: "Video Generation Started",
        description: "This may take up to a minute to complete.",
      });
      
      const { data, error } = await supabase.functions.invoke('generate-media', {
        body: {
          type: 'video',
          prompt: options.prompt,
          user_id: 'anonymous',
          options: {
            width: options.width || 512,
            height: options.height || 512,
          },
          modelId: options.modelId || 'cerspense/zeroscope_v2_576w'
        }
      });
      
      if (error) throw new Error(error.message);
      
      toast({
        title: "Video Generated Successfully",
        description: "Your video is now ready to view",
      });
      
      return data?.url || data;
    } catch (error) {
      console.error('Video generation failed:', error);
      toast({
        title: "Video Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  }
  
  /**
   * Get a placeholder video URL
   */
  static getPlaceholderVideo(): string {
    return 'https://cdn.coverr.co/videos/coverr-an-aerial-view-of-a-beach-2584/1080p.mp4';
  }
  
  /**
   * Extract thumbnail from video URL
   */
  static async extractThumbnail(videoUrl: string): Promise<string | null> {
    // For this demo version, we'll return a static placeholder
    // In a real implementation, you'd want to generate an actual thumbnail
    return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop';
  }
}

export default VideoService;
