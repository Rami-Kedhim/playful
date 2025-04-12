
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';
import { toast } from '@/components/ui/use-toast';

export const useProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Update the user profile in the database
   */
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!profileData.id) {
      toast({
        title: 'Error',
        description: 'Profile ID is required',
        variant: 'destructive',
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // Update auth metadata if username or avatar_url is changing
      if (profileData.username || profileData.avatar_url) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            username: profileData.username,
            avatar_url: profileData.avatar_url,
          }
        });
        
        if (authError) throw authError;
      }
      
      // Update the profile record
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileData.id);
      
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch a profile by ID
   */
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
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
      console.error('Error fetching profile:', error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Check if a username is available
   */
  const checkUsernameAvailability = async (username: string, currentUserId?: string): Promise<boolean> => {
    try {
      // Skip empty usernames
      if (!username.trim()) return false;
      
      // Query to check if username exists
      const query = supabase
        .from('profiles')
        .select('id')
        .eq('username', username);
      
      // If we have the current user ID, exclude it from the check
      if (currentUserId) {
        query.neq('id', currentUserId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Username is available if no records are found
      return data.length === 0;
    } catch (error) {
      console.error('Error checking username availability:', error);
      return false;
    }
  };
  
  /**
   * Upload an avatar image
   */
  const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error.message);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    updateProfile,
    fetchProfile,
    checkUsernameAvailability,
    uploadAvatar,
    isLoading,
  };
};

export default useProfileManagement;
