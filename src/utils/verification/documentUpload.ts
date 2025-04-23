
import { supabase } from '@/integrations/supabase/client';

/**
 * Upload a document to Supabase storage
 * @param file File to upload
 * @param filePrefix Prefix for the file name
 * @param userId User ID
 * @returns URL to the uploaded file
 */
export const uploadVerificationDocument = async (
  file: File,
  filePrefix: string,
  userId: string
): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${filePrefix}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('verification-documents')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('verification-documents')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading verification document:', error);
    throw new Error('Failed to upload document');
  }
};

export const getFileTypeFromMimeType = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('application/pdf')) return 'pdf';
  if (mimeType.startsWith('application/msword') || mimeType.includes('officedocument.wordprocessingml')) return 'doc';
  return 'other';
};
