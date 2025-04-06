
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

/**
 * Checks if the user has permission to access SEO tools
 * @param userRoles Array of user roles
 * @returns Boolean indicating if user can access SEO tools
 */
export const hasPermissionToAccessSeo = (userRoles: string[]): boolean => {
  return userRoles.includes('admin') || userRoles.includes('moderator');
};

/**
 * Checks if the user has admin role
 * @param userRoles Array of user roles
 * @returns Boolean indicating if user is an admin
 */
export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.includes('admin');
};

/**
 * Checks if the user has moderator role
 * @param userRoles Array of user roles
 * @returns Boolean indicating if user is a moderator
 */
export const isModerator = (userRoles: string[]): boolean => {
  return userRoles.includes('moderator');
};

/**
 * Checks if the user is a verified escort with active membership
 * @param userRoles Array of user roles
 * @param profile User profile data
 * @returns Boolean indicating if user is a verified escort
 */
export const isVerifiedEscort = (userRoles: string[], profile: any | null): boolean => {
  // Check if user has escort role
  const isEscort = userRoles.includes('escort');

  // Check if profile exists and has isVerified flag
  const isVerified = profile && profile.isVerified === true;

  // Check if profile has active membership
  const hasMembership = profile && 
    profile.membership && 
    profile.membership.status === 'active';

  // User must be an escort, verified, and have active membership
  return isEscort && isVerified && hasMembership;
};
