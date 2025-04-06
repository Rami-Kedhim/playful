
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches user roles from the database
 * @param userId The user ID to fetch roles for
 * @returns An array of role names
 */
export const fetchUserRoles = async (userId: string): Promise<string[]> => {
  try {
    // In a real application, you would fetch this from a user_roles table
    // For now, we'll simulate it with mock data based on the user ID
    
    // Example query (commented out):
    // const { data, error } = await supabase
    //   .from('user_roles')
    //   .select('role')
    //   .eq('user_id', userId);
    
    // if (error) {
    //   console.error("Error fetching user roles:", error);
    //   return [];
    // }
    
    // return data.map(item => item.role);
    
    // For simplicity, we'll return a static role for now
    // In a real app, this would come from the database
    return ['user'];
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }
};

/**
 * Creates a Supabase client for a specific user session
 * Useful for server-side operations
 */
export const createClientWithSession = (accessToken: string) => {
  return supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: '',
  });
};
