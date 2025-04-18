
import { DocumentType } from '@/types/verification';

// File validation constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validateDocumentFile = (file: File | null, documentType: DocumentType): string | null => {
  if (!file) {
    return 'Document file is required';
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return `File size should be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }
  
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return `File type must be one of: ${ACCEPTED_IMAGE_TYPES.join(', ')}`;
  }
  
  return null;
};

export const validateSelfieFile = (file: File | null, documentType: DocumentType): string | null => {
  // Check if selfie is required for this document type
  const isRequired = ['id_card', 'passport', 'drivers_license', 'residence_permit'].includes(documentType);
  
  if (isRequired && !file) {
    return 'Selfie is required for verification';
  }
  
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      return `File size should be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return `File type must be one of: ${ACCEPTED_IMAGE_TYPES.join(', ')}`;
    }
  }
  
  return null;
};
