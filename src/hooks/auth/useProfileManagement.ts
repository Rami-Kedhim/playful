
import { supabase } from "@/integrations/supabase/client";

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

  return {
    fetchProfile,
    updateProfile,
    checkUsernameAvailability
  };
}
