
import { supabase } from '@/lib/supabase';

/**
 * Upload a verification document to Supabase storage
 * @param userId User ID
 * @param file Document file to upload
 * @param documentType Type of document (id_card, passport, etc.)
 * @param category Category of upload (front, back, selfie)
 * @returns URL of the uploaded file
 */
export const uploadVerificationDocument = async (
  userId: string, 
  file: File, 
  documentType: string,
  category: string
): Promise<string> => {
  try {
    // Create a unique file name
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filePath = `${userId}/${documentType}_${category}_${timestamp}.${fileExtension}`;
    
    // Upload to verification-documents bucket
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('verification-documents')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true
      });
      
    if (uploadError) {
      console.error(`Error uploading ${category} document:`, uploadError);
      throw new Error(`Failed to upload ${category} document: ${uploadError.message}`);
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('verification-documents')
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Error processing ${category} document:`, error);
    throw error;
  }
};

/**
 * Check if there are pending document uploads
 * @param userId User ID
 * @returns Boolean indicating pending uploads
 */
export const hasPendingUploads = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('verification_documents')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .limit(1);
      
    if (error) {
      console.error('Error checking for pending uploads:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking for pending uploads:', error);
    return false;
  }
};
