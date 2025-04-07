
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/auth';
import { toast } from '@/components/ui/use-toast';

export const useProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (userId: string, userData: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Update auth user metadata
      const { error } = await supabase.auth.updateUser({
        data: { ...userData }
      });
      
      if (error) throw error;
      
      // Update profile in profiles table if needed
      const profileUpdate = {
        ...(userData.username && { username: userData.username }),
        ...(userData.profileImageUrl && { avatar_url: userData.profileImageUrl }),
      };
      
      if (Object.keys(profileUpdate).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileUpdate)
          .eq('id', userId);
          
        if (profileError) throw profileError;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      return { data };
    } catch (error: any) {
      return { error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    getProfile,
    isLoading
  };
};

export default useProfileManagement;
