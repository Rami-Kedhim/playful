
import { supabase } from "@/integrations/supabase/client";
import { DatabaseGender } from "@/types/auth";

/**
 * Validates gender input against allowed values
 * @param gender The gender string to validate
 * @returns Boolean indicating if gender is valid
 */
export const validateGender = (gender: string): boolean => {
  const validGenders: DatabaseGender[] = ['male', 'female', 'other'];
  return validGenders.includes(gender as DatabaseGender);
};

/**
 * Uploads a profile image to storage
 * @param userId User ID for the file path
 * @param file File to upload
 * @returns URL of the uploaded file
 */
export const uploadProfileImage = async (userId: string, file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${userId}/${fileName}`;
    
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600'
      });
    
    if (error) {
      throw error;
    }
    
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

/**
 * Updates a user profile in the database
 * @param userId User ID
 * @param profileData Profile data to update
 * @returns Updated profile data
 */
export const updateUserProfile = async (userId: string, profileData: any): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Checks if a username is available
 * @param username Username to check
 * @returns Boolean indicating if username is available
 */
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    // If data is null, username is available
    return data === null;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
};

/**
 * Generates a fallback avatar URL using initials
 * @param name User's name or username
 * @returns URL for the avatar with initials
 */
export const getInitialsAvatar = (name: string): string => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  // Generate a consistent color based on the name
  const hue = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360);
  const bgColor = `hsl(${hue}, 65%, 60%)`;
  const encodedBg = encodeURIComponent(bgColor);
  
  // Create a URL for a placeholder avatar with initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${encodedBg.replace('#', '')}&color=fff&size=256`;
};

/**
 * Uploads an avatar file and returns the URL
 * @param file File to upload
 * @param user User object with ID
 * @param progressCallback Optional callback for upload progress
 * @returns URL of the uploaded avatar
 */
export const uploadAvatar = async (
  file: File, 
  user: { id: string }, 
  progressCallback?: (progress: number) => void
): Promise<string | null> => {
  try {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    // Report initial progress
    if (progressCallback) progressCallback(10);
    
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Report progress after upload
    if (progressCallback) progressCallback(70);
    
    const { data } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);
    
    // Report completion
    if (progressCallback) progressCallback(100);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
};
