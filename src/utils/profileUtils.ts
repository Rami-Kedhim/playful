
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Gender = "male" | "female" | "non-binary" | "transgender" | "other" | "prefer-not-to-say";

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

export const validateGender = (gender: string | null): Gender => {
  const validGenders: Gender[] = [
    "male", "female", "non-binary", "transgender", "other", "prefer-not-to-say"
  ];
  
  if (!gender || !validGenders.includes(gender as Gender)) {
    return "other";
  }
  
  return gender as Gender;
};
