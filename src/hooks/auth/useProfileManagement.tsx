
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AuthUser, UserProfile } from '@/types/auth';

export const useProfileManagement = (userId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);

  // Update profile function
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!userId) {
      toast({
        title: "Update failed",
        description: "No user is currently authenticated",
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId);
      
      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile function
  const fetchProfile = async (): Promise<UserProfile | null> => {
    if (!userId) return null;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, fetchProfile, isLoading };
};
