
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

/**
 * Checks if the user has permission to access SEO tools
 * @param userRoles Array of user role strings
 * @returns Boolean indicating if user has SEO access
 */
export const hasPermissionToAccessSeo = (userRoles: string[]): boolean => {
  return userRoles.some(role => ['admin', 'moderator'].includes(role));
};

/**
 * Checks if the user is a verified escort with active membership
 * @param userRoles Array of user role strings
 * @param profile User profile data
 * @returns Boolean indicating if user is a verified escort
 */
export const isVerifiedEscort = (userRoles: string[], profile: any): boolean => {
  const isEscort = userRoles.includes('escort');
  const isVerified = profile?.is_verified === true;
  const hasActiveMembership = profile?.membership?.status === 'active';
  
  return isEscort && isVerified && hasActiveMembership;
};

/**
 * Checks if the user is an admin
 * @param userRoles Array of user role strings
 * @returns Boolean indicating if user is an admin
 */
export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.includes('admin');
};

/**
 * Checks if the user is a moderator
 * @param userRoles Array of user role strings
 * @returns Boolean indicating if user is a moderator
 */
export const isModerator = (userRoles: string[]): boolean => {
  return userRoles.includes('moderator');
};
