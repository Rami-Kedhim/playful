
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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

// Adding the missing functions
export const handleAuthError = (error: unknown): string => {
  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
  
  toast({
    title: "Authentication Error",
    description: errorMessage,
    variant: "destructive",
  });
  
  console.error(error);
  return errorMessage;
};

export const updateLastOnline = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ last_online: new Date().toISOString() })
      .eq('id', userId);
    
    if (error) {
      console.error("Error updating last online status:", error);
    }
  } catch (error) {
    console.error("Error in updateLastOnline:", error);
  }
};
