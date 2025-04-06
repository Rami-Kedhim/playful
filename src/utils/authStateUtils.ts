
import { supabase } from "@/integrations/supabase/client";

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

export const isAdmin = (roles: string[]): boolean => {
  return roles.includes('admin');
};

export const isModerator = (roles: string[]): boolean => {
  return roles.includes('moderator');
};

export const isEscort = (roles: string[], profile: any): boolean => {
  return roles.includes('escort') || Boolean(profile?.is_escort);
};

export const isVerifiedEscort = (roles: string[], profile: any): boolean => {
  return (roles.includes('escort') || Boolean(profile?.is_escort)) && 
         (Boolean(profile?.is_verified));
};

export const isClient = (roles: string[]): boolean => {
  return roles.includes('client') || roles.includes('user');
};

export const hasPermissionToAccessSeo = (roles: string[]): boolean => {
  return roles.includes('admin') || roles.includes('moderator');
};

export const canBoost = (roles: string[], profile: any): boolean => {
  return isVerifiedEscort(roles, profile) && 
         (profile?.subscription_tier === 'premium' || profile?.subscription_tier === 'standard');
};
