
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (
  file: File,
  bucket: string,
  folder: string = ''
): Promise<{ success: boolean, url?: string, error?: string }> => {
  try {
    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        error: error.message
      };
    }
    
    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return {
      success: true,
      url: publicUrl
    };
  } catch (error: any) {
    console.error('Error in uploadFile:', error);
    return {
      success: false,
      error: error.message || 'An unknown error occurred'
    };
  }
};
