
import { supabase } from '@/lib/supabase';

/**
 * Validates a file before upload
 * @param file File to validate
 * @returns Validation result
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file size (max 10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File format not supported. Please use JPG, PNG or PDF' };
  }

  return { valid: true };
};

/**
 * Uploads a document file to Supabase storage
 * @param userId User ID
 * @param file File to upload
 * @param type Document type
 * @returns Upload result
 */
export const uploadDocumentFile = async (
  userId: string,
  file: File,
  type: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}_${timestamp}.${fileExt}`;
    const filePath = `verification/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('verification-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('verification-documents')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error('Error in document upload:', error);
    return { success: false, error: error.message || 'Failed to upload document' };
  }
};
