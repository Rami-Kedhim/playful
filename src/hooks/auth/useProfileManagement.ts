
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

export const useProfileManagement = () => {
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };
  
  const updateProfile = async (userId: string, userData: Partial<UserProfile>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        console.error("Error updating user profile:", error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  };
  
  return { fetchProfile, updateProfile };
};
