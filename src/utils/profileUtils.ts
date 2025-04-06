
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
