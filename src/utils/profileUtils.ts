
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { DatabaseGender } from "@/types/auth";

// This represents the Gender type as expected by our application code
export type Gender = "male" | "female" | "non-binary" | "transgender" | "other" | "prefer-not-to-say";

export const uploadAvatar = async (
  avatarFile: File | null, 
  user: User | null,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  if (!avatarFile || !user) return null;
  
  const fileExt = avatarFile.name.split('.').pop();
  const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  try {
    // If upload progress tracking is supported (browser has Fetch with Upload progress)
    if (onProgress && typeof XMLHttpRequest !== 'undefined') {
      const xhr = new XMLHttpRequest();
      
      // Create a promise that resolves when the upload is complete
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            onProgress(percentComplete);
          }
        });
        
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });
        
        xhr.addEventListener('error', () => reject(new Error('Upload failed')));
      });
      
      // Get the upload URL from Supabase
      const { data } = await supabase.storage.from('profiles').createSignedUploadUrl(filePath);
      if (!data) throw new Error('Failed to get upload URL');
      
      // Configure the XHR request
      xhr.open('PUT', data.signedUrl);
      
      // Set appropriate headers
      xhr.setRequestHeader('Content-Type', avatarFile.type);
      xhr.setRequestHeader('x-upsert', 'true');
      
      // Start the upload
      xhr.send(avatarFile);
      
      // Wait for the upload to complete
      await uploadPromise;
    } else {
      // Fallback to standard upload without progress tracking
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, avatarFile, {
          upsert: true
        });
        
      if (uploadError) {
        throw uploadError;
      }
    }
    
    // Get the public URL for the uploaded file
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
