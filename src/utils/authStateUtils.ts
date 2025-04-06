
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the user's roles from the database
 * @param userId The user's ID
 * @returns Array of role strings
 */
export const fetchUserRoles = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.rpc('get_user_roles', {
      _user_id: userId
    });
    
    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchUserRoles:", error);
    return [];
  }
};

/**
 * Checks if a user has a specific role
 * @param userId The user's ID
 * @param role The role to check
 * @returns Boolean indicating if the user has the role
 */
export const checkUserHasRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: role
    });
    
    if (error) {
      console.error("Error checking user role:", error);
      return false;
    }
    
    return data || false;
  } catch (error) {
    console.error("Error in checkUserHasRole:", error);
    return false;
  }
};
