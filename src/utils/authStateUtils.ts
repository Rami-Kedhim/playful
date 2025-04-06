
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches user roles from the database
 * @param userId The user ID to fetch roles for
 * @returns Array of role strings
 */
export const fetchUserRoles = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }
    
    return data.map(roleObj => roleObj.role);
  } catch (error) {
    console.error("Error in fetchUserRoles:", error);
    return [];
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
