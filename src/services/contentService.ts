
import { analyticsService, AIAnalyticsService } from "./analyticsService";
import { supabase } from "@/integrations/supabase/client";
import { ImageUnlockParams, VideoUnlockParams, ContentPurchase } from "@/types/monetization";

export class ContentService {
  static async purchaseContent(contentId: string, profileId: string, price: number): Promise<boolean> {
    try {
      console.log(`[Content] Purchasing content: ${contentId} for profile: ${profileId}`);
      
      // In a real app, this would call a Supabase function to handle the transaction
      // For this demo, we'll simulate a successful purchase
      
      // Track purchase analytics
      await AIAnalyticsService.trackEvent(
        profileId,
        'content_purchase',
        { contentId, price }
      );
      
      // Here we would store the purchase record in the database
      
      return true;
    } catch (error: any) {
      console.error('[Content] Purchase failed:', error);
      return false;
    }
  }
  
  static async unlockImage({ profileId, imageUrl, price }: ImageUnlockParams): Promise<boolean> {
    try {
      // Generate a unique content ID for the image
      const imageId = `image-${profileId}-${imageUrl.split('/').pop()}`;
      
      // Use the existing purchaseContent function
      const success = await this.purchaseContent(imageId, profileId, price);
      
      if (success) {
        // Track analytics for image unlocking
        await AIAnalyticsService.trackEvent(
          profileId,
          'image_unlock',
          { imageUrl, price }
        );
      }
      
      return success;
    } catch (error: any) {
      console.error('[Content] Image unlock failed:', error);
      return false;
    }
  }
  
  static async unlockVideo({ profileId, videoId, price }: VideoUnlockParams): Promise<boolean> {
    try {
      // Generate a unique content ID for the video
      const contentId = `video-${profileId}-${videoId}`;
      
      // Use the existing purchaseContent function
      const success = await this.purchaseContent(contentId, profileId, price);
      
      if (success) {
        // Track analytics for video unlocking
        await AIAnalyticsService.trackEvent(
          profileId,
          'video_unlock',
          { videoId, price }
        );
      }
      
      return success;
    } catch (error: any) {
      console.error('[Content] Video unlock failed:', error);
      return false;
    }
  }
  
  static isContentUnlocked(unlockedContent: string[], contentId: string): boolean {
    return unlockedContent.includes(contentId);
  }
  
  static isImageUnlocked(unlockedContent: string[], profileId: string, imageUrl: string): boolean {
    const imageId = `image-${profileId}-${imageUrl.split('/').pop()}`;
    return this.isContentUnlocked(unlockedContent, imageId);
  }
  
  static isVideoUnlocked(unlockedContent: string[], profileId: string, videoId: string): boolean {
    const contentId = `video-${profileId}-${videoId}`;
    return this.isContentUnlocked(unlockedContent, contentId);
  }
}
