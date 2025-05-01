
import { supabase } from '@/lib/supabase';

/**
 * Upload a document file to Supabase storage
 * @param userId User ID for the file path
 * @param file File to upload
 * @param documentType Type of document for path construction
 * @returns Object with success flag, error, and URL
 */
export const uploadDocumentFile = async (
  userId: string,
  file: File,
  documentType: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Generate a unique identifier for the file
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${documentType}_${timestamp}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`;
    
    // Upload the file to Supabase storage
    const { data, error } = await supabase
      .storage
      .from('verification-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Document upload error:', error);
      return { success: false, error: error.message };
    }
    
    // Get public URL for the file
    const { data: publicUrlData } = supabase
      .storage
      .from('verification-documents')
      .getPublicUrl(data?.path || filePath);
    
    return { 
      success: true, 
      url: publicUrlData?.publicUrl 
    };
  } catch (error: any) {
    console.error('Document upload exception:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to upload document'
    };
  }
};

/**
 * Validate a file before upload
 * @param file File to validate
 * @returns Validation result object
 */
export const validateFile = (file: File | undefined): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Allowed types: JPG, PNG, PDF' 
    };
  }

  return { valid: true };
};
