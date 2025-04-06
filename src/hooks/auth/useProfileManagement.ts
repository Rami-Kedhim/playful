
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";
import { AIProfile } from "@/types/ai-profile";

export function useProfileManagement() {
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  const updateProfile = async (userId: string, userData: Partial<any>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  };
  
  const checkUsernameAvailability = async (username: string) => {
    try {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('username', username);
      
      if (error) {
        console.error("Error checking username:", error);
        throw error;
      }
      
      return count === 0;
    } catch (error) {
      console.error("Error in checkUsernameAvailability:", error);
      throw error;
    }
  };

  // New methods for AI profile management

  const createAIProfile = async (profileData: Omit<AIProfile, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from('ai_profiles')
        .insert([{
          ...profileData,
          is_ai: true,
          created_at: new Date().toISOString(),
          lucoin_chat_price: profileData.lucoin_chat_price || 5,
          lucoin_image_price: profileData.lucoin_image_price || 10
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating AI profile:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createAIProfile:", error);
      throw error;
    }
  };

  const updateAIProfile = async (profileId: string, profileData: Partial<AIProfile>) => {
    try {
      const { data, error } = await supabase
        .from('ai_profiles')
        .update(profileData)
        .eq('id', profileId)
        .select()
        .single();
      
      if (error) {
        console.error("Error updating AI profile:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in updateAIProfile:", error);
      throw error;
    }
  };

  const fetchAIProfile = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_profiles')
        .select('*')
        .eq('id', profileId)
        .single();
      
      if (error) {
        console.error("Error fetching AI profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchAIProfile:", error);
      return null;
    }
  };

  const createAIPremiumContent = async (profileId: string, contentData: {
    type: 'photo' | 'video' | 'message';
    title: string;
    description?: string;
    content_url: string;
    thumbnail_url?: string;
    price: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('ai_premium_content')
        .insert([{
          profile_id: profileId,
          ...contentData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating AI premium content:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createAIPremiumContent:", error);
      throw error;
    }
  };

  const fetchAIPremiumContent = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_premium_content')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching AI premium content:", error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchAIPremiumContent:", error);
      return [];
    }
  };

  const recordAIBoost = async (profileId: string, userId: string, amount: number, duration: number) => {
    try {
      // First record the boost transaction
      const { error: transactionError } = await supabase
        .from('lucoin_transactions')
        .insert([{
          user_id: userId,
          amount: -amount, // Negative as user is spending
          transaction_type: 'ai_boost',
          description: `Boost for AI profile ${profileId}`,
          metadata: {
            profile_id: profileId,
            duration_hours: duration
          }
        }]);
      
      if (transactionError) throw transactionError;
      
      // Then create/update the boost record
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + duration);
      
      const { data, error } = await supabase
        .from('active_boosts')
        .insert([{
          profile_id: profileId,
          user_id: userId,
          boost_amount: amount,
          start_time: new Date().toISOString(),
          end_time: endTime.toISOString(),
          status: 'active'
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error("Error in recordAIBoost:", error);
      throw error;
    }
  };

  const recordAIGift = async (profileId: string, userId: string, giftType: string, amount: number) => {
    try {
      // Record the gift transaction
      const { error: transactionError } = await supabase
        .from('lucoin_transactions')
        .insert([{
          user_id: userId,
          amount: -amount, // Negative as user is spending
          transaction_type: 'ai_gift',
          description: `Gift for AI profile ${profileId}`,
          metadata: {
            profile_id: profileId,
            gift_type: giftType
          }
        }]);
      
      if (transactionError) throw transactionError;
      
      // Record the gift itself
      const { data, error } = await supabase
        .from('ai_gifts')
        .insert([{
          profile_id: profileId,
          user_id: userId,
          gift_type: giftType,
          amount: amount,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error("Error in recordAIGift:", error);
      throw error;
    }
  };

  return {
    fetchProfile,
    updateProfile,
    checkUsernameAvailability,
    createAIProfile,
    updateAIProfile,
    fetchAIProfile,
    createAIPremiumContent,
    fetchAIPremiumContent,
    recordAIBoost,
    recordAIGift
  };
}
