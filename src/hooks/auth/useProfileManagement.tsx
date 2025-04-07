
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AuthUser, UserProfile } from '@/types/auth';

interface ProfileUpdateResult {
  success: boolean;
  error?: string;
  profile?: UserProfile;
}

export const useProfileManagement = (user: AuthUser | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch profile data for the current user
   */
  const fetchProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      setError(error.message || "Failed to fetch profile data");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the user's profile
   */
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<ProfileUpdateResult> => {
    if (!user) return { success: false, error: "No authenticated user" };
    
    setIsLoading(true);
    setError(null);
    
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
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
      return { 
        success: true,
        profile: data
      };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Upload a profile picture
   */
  const uploadProfilePicture = async (file: File): Promise<ProfileUpdateResult> => {
    if (!user) return { success: false, error: "No authenticated user" };
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profile-pictures/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      // Update profile with new image URL
      return await updateProfile({ avatar_url: publicUrl });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to upload profile picture";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearError = () => setError(null);
  
  return {
    fetchProfile,
    updateProfile,
    uploadProfilePicture,
    isLoading,
    error,
    clearError,
  };
};
