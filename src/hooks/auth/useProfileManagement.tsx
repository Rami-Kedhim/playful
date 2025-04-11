
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthUser, UserProfile } from '@/types/auth';

export const useProfileManagement = (user: AuthUser | null) => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Update the user's profile
   */
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // First update the auth metadata if needed
      if (profileData.username || profileData.avatar_url) {
        const authUpdate = {
          ...(profileData.username && { username: profileData.username }),
          ...(profileData.avatar_url && { avatar_url: profileData.avatar_url }),
        };
        
        const { error: authError } = await supabase.auth.updateUser({
          data: authUpdate
        });
        
        if (authError) throw authError;
      }
      
      // Then update the profile record
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      return true;
    } catch (error: any) {
      console.error("Failed to update profile:", error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch profile data for the current user
   */
  const fetchProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return data as UserProfile;
    } catch (error: any) {
      console.error("Failed to fetch profile:", error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    updateProfile,
    fetchProfile,
    isLoading,
  };
};

export default useProfileManagement;
