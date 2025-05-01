
/**
 * Upload document files to the server
 */
export const uploadDocumentFile = async (
  file: File, 
  userId: string, 
  docType: string
): Promise<{fileUrl: string; success: boolean; error?: string}> => {
  // This is a mock implementation, in a real app this would upload to Supabase Storage
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock file URL (in a real app this would be the uploaded file URL)
    const mockFileUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`;
    
    return {
      success: true,
      fileUrl: mockFileUrl
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    return {
      success: false,
      fileUrl: '',
      error: 'Failed to upload document file'
    };
  }
};

/**
 * Validate file size and type
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = [
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'application/pdf'
  ];
  
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a JPEG, PNG, WebP or PDF file' };
  }
  
  return { valid: true };
};
