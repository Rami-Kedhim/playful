
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ContentPurchase, ImageUnlockParams, VideoUnlockParams } from "@/types/monetization";

export const contentMonetizationService = {
  /**
   * Purchase content item
   */
  async purchaseContent(contentId: string, profileId: string, price: number): Promise<boolean> {
    try {
      // Check user wallet balance
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', profileId)
        .single();

      if (walletError) throw walletError;
      
      if (!wallet || wallet.balance < price) {
        toast({
          title: "Insufficient funds",
          description: "Please add more funds to your wallet to purchase this content.",
          variant: "destructive",
        });
        return false;
      }
      
      // Process the purchase through an edge function for security
      const { data, error } = await supabase.functions.invoke('process-content-purchase', {
        body: {
          contentId,
          userId: profileId,
          price
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message || "Purchase failed");
      
      // Record the successful purchase in local history
      await this.recordPurchaseLocally(contentId, profileId, price);
      
      toast({
        title: "Purchase successful!",
        description: "You now have access to this content.",
      });
      
      return true;
    } catch (error: any) {
      console.error('[Content] Purchase failed:', error);
      
      toast({
        title: "Purchase failed",
        description: error.message || "There was an error processing your purchase.",
        variant: "destructive",
      });
      
      return false;
    }
  },
  
  /**
   * Record a purchase in the local database
   */
  async recordPurchaseLocally(contentId: string, userId: string, price: number): Promise<void> {
    try {
      await supabase
        .from('content_purchases')
        .insert({
          content_id: contentId,
          user_id: userId,
          amount: price,
          status: 'completed',
          payment_method: 'wallet',
          purchased_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error("Error recording content purchase:", error);
      // Non-blocking - won't stop the purchase from completing
    }
  },
  
  /**
   * Unlock an image
   */
  async unlockImage({ profileId, imageUrl, price }: ImageUnlockParams): Promise<boolean> {
    try {
      // Generate a unique content ID for the image
      const imageId = `image-${imageUrl.split('/').pop()}`;
      
      // Use the existing purchaseContent function
      return await this.purchaseContent(imageId, profileId, price);
    } catch (error: any) {
      console.error('[Content] Image unlock failed:', error);
      return false;
    }
  },
  
  /**
   * Unlock a video
   */
  async unlockVideo({ profileId, videoId, price }: VideoUnlockParams): Promise<boolean> {
    try {
      // Generate a unique content ID for the video
      const contentId = `video-${videoId}`;
      
      // Use the existing purchaseContent function
      return await this.purchaseContent(contentId, profileId, price);
    } catch (error: any) {
      console.error('[Content] Video unlock failed:', error);
      return false;
    }
  },
  
  /**
   * Check if content is unlocked for a user
   */
  async isContentUnlockedForUser(contentId: string, userId: string): Promise<boolean> {
    try {
      const { count, error } = await supabase
        .from('content_purchases')
        .select('*', { count: 'exact', head: true })
        .eq('content_id', contentId)
        .eq('user_id', userId)
        .eq('status', 'completed');
        
      if (error) throw error;
      
      return count > 0;
    } catch (error) {
      console.error("Error checking content access:", error);
      return false;
    }
  },
  
  /**
   * Get all unlocked content for a user
   */
  async getUserUnlockedContent(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('content_purchases')
        .select('content_id')
        .eq('user_id', userId)
        .eq('status', 'completed');
        
      if (error) throw error;
      
      return data.map(item => item.content_id);
    } catch (error) {
      console.error("Error fetching unlocked content:", error);
      return [];
    }
  },
  
  /**
   * Subscribe to content purchase events
   */
  subscribeToContentPurchases(userId: string, callback: (purchase: any) => void) {
    return supabase
      .channel('public:content_purchases')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'content_purchases',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();
  }
};
