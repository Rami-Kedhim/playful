
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a file to Supabase storage
 */
export const uploadFile = async (
  file: File,
  bucket: string,
  folder: string = '',
  options?: {
    upsert?: boolean;
    onProgress?: (progress: number) => void;
  }
): Promise<{ url: string | null; error: string | null }> => {
  try {
    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder ? `${folder}/` : ''}${uuidv4()}.${fileExtension}`;
    
    // Upload the file to storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: options?.upsert || false
      });
      
    if (error) {
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
      
    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error("Error uploading file:", error);
    
    toast({
      title: "Upload failed",
      description: error.message || "Failed to upload file",
      variant: "destructive",
    });
    
    return { url: null, error: error.message };
  }
};

/**
 * Remove a file from storage
 */
export const removeFile = async (
  filePath: string,
  bucket: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // Get the file path from the full URL
    const path = filePath.split(`/${bucket}/`)[1];
    
    if (!path) {
      throw new Error("Invalid file path");
    }
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
      
    if (error) {
      throw error;
    }
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Error removing file:", error);
    
    return { success: false, error: error.message };
  }
};
