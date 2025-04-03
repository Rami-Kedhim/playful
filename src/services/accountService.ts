
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "@/services/notificationsService";

/**
 * Create a welcome notification for new users
 */
export const createWelcomeNotification = async (userId: string) => {
  try {
    return await createNotification(
      userId,
      "system",
      "Welcome to LuxLife!",
      "Thank you for joining our platform. Complete your profile to get started.",
    );
  } catch (error) {
    console.error("Error creating welcome notification:", error);
    return false;
  }
};

/**
 * Check if user is new (registered within the last minute)
 */
export const isNewUser = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    if (!data?.created_at) return false;
    
    const createdAt = new Date(data.created_at);
    const now = new Date();
    
    // Check if user was created within the last minute
    const timeDiff = (now.getTime() - createdAt.getTime()) / 1000 / 60; // minutes
    
    return timeDiff <= 1; // If created less than 1 minute ago
  } catch (error) {
    console.error("Error checking if user is new:", error);
    return false;
  }
};
