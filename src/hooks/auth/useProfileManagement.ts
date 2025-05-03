
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { UserProfile } from '@/types/auth';

export const useProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Update the user's profile
   */
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!profileData.id) return false;
    
    setIsLoading(true);
    
    try {
      // First update the auth metadata if needed
      if (profileData.username || profileData.avatarUrl) {
        const authUpdate = {
          ...(profileData.username && { username: profileData.username }),
          ...(profileData.avatarUrl && { avatar_url: profileData.avatarUrl }),
        };
        
        const { error: authError } = await supabase.auth.updateUser({
          data: authUpdate
        });
        
        if (authError) throw authError;
      }
      
      // Process gender field if it exists
      let processedData = { ...profileData };
      
      if (processedData.gender) {
        const gender = processedData.gender.toString();
        if (!['male', 'female', 'other', 'trans', 'non-binary'].includes(gender)) {
          // Default fallback for any unsupported values
          processedData.gender = 'other';
        }
      }
      
      // Then update the profile record
      const { error } = await supabase
        .from('profiles')
        .update({
          ...processedData,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileData.id);
      
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
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    if (!userId) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
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
