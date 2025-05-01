
/**
 * Validates a file before upload
 * @param file The file to validate
 * @returns Object with validation result and error message if any
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, or HEIC image.' 
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File is too large. Maximum file size is 10MB.' 
    };
  }

  return { valid: true };
};

/**
 * Uploads a document file to storage
 * @param userId The user ID
 * @param file The file to upload
 * @param docType The document type
 * @returns Object with upload result
 */
export const uploadDocumentFile = async (
  userId: string,
  file: File,
  docType: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${docType}_${Date.now()}.${fileExt}`;
    
    // For demo purposes, we'll just return a mock URL
    // In production, you would upload to storage
    const mockUrl = `https://storage.example.com/${fileName}`;
    
    return {
      success: true,
      url: mockUrl
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    return {
      success: false,
      error: 'Failed to upload document file'
    };
  }
};
