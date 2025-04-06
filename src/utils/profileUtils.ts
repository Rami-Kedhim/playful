
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads an avatar image to Supabase storage and returns the URL
 * @param file The image file to upload
 * @param user The current user
 * @param setUploadProgress Optional callback to update upload progress
 * @returns The URL of the uploaded avatar, or null if the upload failed
 */
export const uploadAvatar = async (
  file: File,
  user: any,
  setUploadProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    if (!user?.id) {
      throw new Error("User is not authenticated");
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("File size must be less than 2MB");
    }

    // Generate a unique file name to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${uuidv4()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload the file
    const { error: uploadError, data } = await supabase.storage
      .from("user-content")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        onUploadProgress: (progress) => {
          if (setUploadProgress) {
            setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        }
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from("user-content")
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error: any) {
    console.error("Error uploading avatar:", error.message);
    return null;
  }
};

/**
 * Creates a fallback avatar URL using the user's initials
 * @param name The name to generate initials from
 * @param bgColor Optional background color hex code (without #)
 * @param textColor Optional text color hex code (without #)
 * @returns URL for a generated avatar image
 */
export const getInitialsAvatar = (
  name: string,
  bgColor: string = "6d28d9",
  textColor: string = "ffffff"
): string => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=${bgColor}&color=${textColor}&size=256`;
};
