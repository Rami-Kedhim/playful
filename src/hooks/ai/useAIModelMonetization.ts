
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useUBX } from "@/hooks/useUBX";
import { AIProfile } from "@/types/ai-profile";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface AIContentPurchase {
  id: string;
  content_id: string;
  user_id: string;
  profile_id: string;
  amount: number;
  created_at: string;
}

export interface AIGift {
  id: string;
  gift_type: string;
  amount: number;
  user_id: string;
  profile_id: string;
  created_at: string;
}

export function useAIModelMonetization() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { processTransaction } = useUBX();

  const purchaseAIContent = async (contentId: string, profileId: string, price: number): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase this content",
        variant: "destructive",
      });
      return false;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // First verify if the user already purchased this content
      const { data: existingPurchase, error: checkError } = await supabase
        .from('ai_content_purchases')
        .select('*')
        .eq('content_id', contentId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking existing purchases:", checkError);
        throw new Error("Failed to verify purchase status");
      }
      
      if (existingPurchase) {
        toast({
          title: "Already purchased",
          description: "You already have access to this content",
        });
        return true;
      }
      
      // Process payment with UBX
      const success = await processTransaction({
        amount: -price, // Negative as user is spending
        transactionType: 'ai_content_purchase',
        description: `Purchase AI content (${contentId})`,
        metadata: {
          content_id: contentId,
          profile_id: profileId
        }
      });
      
      if (!success) {
        throw new Error("Transaction processing failed");
      }
      
      // Record the purchase
      const { error: purchaseError } = await supabase
        .from('ai_content_purchases')
        .insert([{
          content_id: contentId,
          user_id: user.id,
          profile_id: profileId,
          amount: price,
          created_at: new Date().toISOString()
        }]);
      
      if (purchaseError) {
        throw purchaseError;
      }
      
      toast({
        title: "Purchase successful",
        description: "You now have access to this content",
      });
      
      return true;
    } catch (err: any) {
      console.error("Error purchasing AI content:", err);
      setError(err.message || "Failed to purchase content");
      
      toast({
        title: "Purchase failed",
        description: err.message || "An error occurred during purchase",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const sendAIGift = async (profileId: string, giftType: string, amount: number): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to send a gift",
        variant: "destructive",
      });
      return false;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Process payment with UBX
      const success = await processTransaction({
        amount: -amount, // Negative as user is spending
        transactionType: 'ai_gift',
        description: `Gift for AI profile (${profileId})`,
        metadata: {
          profile_id: profileId,
          gift_type: giftType
        }
      });
      
      if (!success) {
        throw new Error("Transaction processing failed");
      }
      
      // Record the gift
      const { error: giftError } = await supabase
        .from('ai_gifts')
        .insert([{
          profile_id: profileId,
          user_id: user.id,
          gift_type: giftType,
          amount: amount,
          created_at: new Date().toISOString()
        }]);
      
      if (giftError) {
        throw giftError;
      }
      
      toast({
        title: "Gift sent",
        description: `You sent a ${giftType} gift!`,
      });
      
      return true;
    } catch (err: any) {
      console.error("Error sending AI gift:", err);
      setError(err.message || "Failed to send gift");
      
      toast({
        title: "Gift failed",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const boostAIProfile = async (profileId: string, amount: number, durationHours: number): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to boost this profile",
        variant: "destructive",
      });
      return false;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Process payment with UBX
      const success = await processTransaction({
        amount: -amount, // Negative as user is spending
        transactionType: 'ai_boost',
        description: `Boost for AI profile (${profileId})`,
        metadata: {
          profile_id: profileId,
          duration_hours: durationHours
        }
      });
      
      if (!success) {
        throw new Error("Transaction processing failed");
      }
      
      // Create boost record
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + durationHours);
      
      const { error: boostError } = await supabase
        .from('active_boosts')
        .insert([{
          profile_id: profileId,
          user_id: user.id,
          boost_amount: amount,
          start_time: new Date().toISOString(),
          end_time: endTime.toISOString(),
          status: 'active'
        }]);
      
      if (boostError) {
        throw boostError;
      }
      
      toast({
        title: "Profile boosted",
        description: `Profile boosted for ${durationHours} hours!`,
      });
      
      return true;
    } catch (err: any) {
      console.error("Error boosting AI profile:", err);
      setError(err.message || "Failed to boost profile");
      
      toast({
        title: "Boost failed",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const checkContentAccess = async (contentId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { count, error } = await supabase
        .from('ai_content_purchases')
        .select('*', { count: 'exact', head: true })
        .eq('content_id', contentId)
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error checking content access:", error);
        return false;
      }
      
      return !!count;
    } catch (error) {
      console.error("Error in checkContentAccess:", error);
      return false;
    }
  };

  const fetchPurchasedContent = async (userId: string): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('ai_content_purchases')
        .select('content_id')
        .eq('user_id', userId);
      
      if (error) {
        console.error("Error fetching purchased content:", error);
        return [];
      }
      
      return data.map(item => item.content_id);
    } catch (error) {
      console.error("Error in fetchPurchasedContent:", error);
      return [];
    }
  };

  return {
    purchaseAIContent,
    sendAIGift,
    boostAIProfile,
    checkContentAccess,
    fetchPurchasedContent,
    isProcessing,
    error
  };
}
