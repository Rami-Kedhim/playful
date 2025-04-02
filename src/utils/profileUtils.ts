
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// This represents the Gender type as expected by our application code
export type Gender = "male" | "female" | "non-binary" | "transgender" | "other" | "prefer-not-to-say";

// This represents the gender type as accepted by our database
type DatabaseGender = "male" | "female" | "other";

export const uploadAvatar = async (avatarFile: File | null, user: User | null): Promise<string | null> => {
  if (!avatarFile || !user) return null;
  
  const fileExt = avatarFile.name.split('.').pop();
  const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  try {
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, avatarFile);
      
    if (uploadError) {
      throw uploadError;
    }
    
    const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
};

/**
 * Validates and maps the gender value to ensure it's compatible with the database
 * If the value is not one of the accepted database values, maps it to "other"
 */
export const validateGender = (gender: string | null): DatabaseGender => {
  // Define valid database genders
  const validDatabaseGenders: DatabaseGender[] = ["male", "female", "other"];
  
  // If the gender is null or not in the valid database genders, return "other"
  if (!gender || !validDatabaseGenders.includes(gender as DatabaseGender)) {
    // Map specific values to "other" for the database
    return "other";
  }
  
  return gender as DatabaseGender;
};
