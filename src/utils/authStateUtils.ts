
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthState, UserProfile } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetches user roles from the database
 */
export const fetchUserRoles = async (userId: string) => {
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
 * Helper function to handle authentication errors
 */
export const handleAuthError = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  console.error("Authentication error:", error);
  
  toast({
    title: "Authentication Error",
    description: errorMessage,
    variant: "destructive",
  });
  
  return errorMessage;
};

/**
 * Updates a user's last online status
 */
export const updateLastOnline = async (userId: string) => {
  try {
    await supabase
      .from('profiles')
      .update({ last_online: new Date().toISOString() })
      .eq('id', userId);
  } catch (error) {
    console.error("Error updating last online status:", error);
  }
};
