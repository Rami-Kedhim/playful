
import { supabase } from "@/integrations/supabase/client";

/**
 * Check if a user is new (has no notifications yet)
 * @param userId The user ID to check
 * @returns Boolean indicating if this is a new user
 */
export const isNewUser = async (userId: string): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error checking new user status:", error);
      return false;
    }
    
    return count === 0;
  } catch (error) {
    console.error("Error in isNewUser:", error);
    return false;
  }
};

/**
 * Create a welcome notification for a new user
 * @param userId The user ID to create the notification for
 */
export const createWelcomeNotification = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'welcome',
        title: 'Welcome to UberEscorts!',
        content: 'Thank you for joining. Complete your profile to get started.',
        is_read: false
      });
    
    if (error) {
      console.error("Error creating welcome notification:", error);
    }
  } catch (error) {
    console.error("Error in createWelcomeNotification:", error);
  }
};

/**
 * Complete user onboarding process
 * @param userId The user ID to mark as onboarded
 */
export const completeUserOnboarding = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_completed: true })
      .eq('id', userId);
    
    if (error) {
      console.error("Error completing user onboarding:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in completeUserOnboarding:", error);
    return false;
  }
};
