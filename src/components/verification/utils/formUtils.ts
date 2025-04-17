
import { DOCUMENT_TYPES, DOCUMENT_REQUIREMENTS } from '@/types/verification';

export const isDocumentTypeValid = (documentType: string): boolean => {
  return Object.values(DOCUMENT_TYPES).includes(documentType);
};

export const getDocumentRequirements = (documentType: string) => {
  if (!isDocumentTypeValid(documentType)) {
    return {
      frontRequired: true,
      backRequired: false,
      selfieRequired: true
    };
  }
  
  return DOCUMENT_REQUIREMENTS[documentType];
};

export const isBackSideRequired = (documentType: string): boolean => {
  const requirements = getDocumentRequirements(documentType);
  return requirements.backRequired;
};

export const validateDocumentImage = (file: File | undefined): string | null => {
  if (!file) {
    return "Document image is required";
  }
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return "File size must be less than 5MB";
  }
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    return "File must be a JPG, JPEG, or PNG image";
  }
  
  return null;
};
