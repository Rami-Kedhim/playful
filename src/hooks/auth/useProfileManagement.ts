
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthUser, UserProfile, DatabaseGender } from '@/types/auth';

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
      
      // Process gender field to ensure it matches DatabaseGender type
      let processedData = { ...profileData };
      
      // Map extended gender values to supported DatabaseGender values
      if (profileData.gender) {
        const gender = profileData.gender.toString();
        if (!['male', 'female', 'other', 'trans', 'non-binary'].includes(gender)) {
          // Default fallback for any unsupported values
          processedData.gender = 'other' as DatabaseGender;
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
