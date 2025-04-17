
import { z } from 'zod';
import { DOCUMENT_TYPES, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/types/verification';

// Document type validation
export const isDocumentTypeValid = (documentType: string): boolean => {
  return Object.values(DOCUMENT_TYPES).includes(documentType);
};

// Get document requirements by type
export const getDocumentRequirements = (documentType: string) => {
  return {
    frontRequired: true,
    backRequired: documentType !== DOCUMENT_TYPES.PASSPORT,
    selfieRequired: true
  };
};

// Check if back side is required based on document type
export const isBackSideRequired = (documentType: string): boolean => {
  const requirements = getDocumentRequirements(documentType);
  return requirements.backRequired;
};

// Validate document image files
export const validateDocumentImage = (file: File | undefined): string | null => {
  if (!file) {
    return "Document image is required";
  }
  
  // Check file size (max 5MB)
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB";
  }
  
  // Check file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "File must be a JPG, JPEG, PNG or WEBP image";
  }
  
  return null;
};

// Helper function to get document name based on type
export const getDocumentTypeName = (type: string): string => {
  switch (type) {
    case DOCUMENT_TYPES.PASSPORT:
      return 'Passport';
    case DOCUMENT_TYPES.ID_CARD:
      return 'ID Card';
    case DOCUMENT_TYPES.DRIVER_LICENSE:
      return 'Driver\'s License';
    default:
      return 'Unknown Document Type';
  }
};
