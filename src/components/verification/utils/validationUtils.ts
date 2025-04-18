
import { VerificationFormValues } from '@/types/verification';
import { 
  MAX_FILE_SIZE, 
  ACCEPTED_IMAGE_TYPES,
  ID_CARD,
  PASSPORT,
  DRIVER_LICENSE,
  RESIDENCE_PERMIT
} from '@/types/verification';

export const getDocumentTypeLabel = (documentType: string): string => {
  switch (documentType) {
    case PASSPORT:
      return "Passport";
    case ID_CARD:
      return "ID Card";
    case DRIVER_LICENSE:
      return "Driver's License";
    case RESIDENCE_PERMIT:
      return "Residence Permit";
    default:
      return "Document";
  }
};

export const validateFile = (file: File | undefined): string | null => {
  if (!file) return "File is required";
  
  if (file.size > MAX_FILE_SIZE) {
    return `File size should be less than ${MAX_FILE_SIZE / 1000000}MB`;
  }
  
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "File must be a valid image (JPG, JPEG, PNG)";
  }
  
  return null;
};

export const validateVerificationForm = (values: VerificationFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.documentType) {
    errors.documentType = "Document type is required";
  }
  
  // Validate front of document
  if (!values.documentFrontImage?.file) {
    errors.documentFrontImage = "Front of document is required";
  } else {
    const frontFileError = validateFile(values.documentFrontImage.file);
    if (frontFileError) {
      errors.documentFrontImage = frontFileError;
    }
  }
  
  // Validate back of document (required except for passport)
  if (values.documentType !== PASSPORT) {
    if (!values.documentBackImage?.file) {
      errors.documentBackImage = "Back of document is required";
    } else if (values.documentBackImage.file) {
      const backFileError = validateFile(values.documentBackImage.file);
      if (backFileError) {
        errors.documentBackImage = backFileError;
      }
    }
  }
  
  // Validate selfie
  if (!values.selfieImage?.file) {
    errors.selfieImage = "Selfie with ID is required";
  } else {
    const selfieFileError = validateFile(values.selfieImage.file);
    if (selfieFileError) {
      errors.selfieImage = selfieFileError;
    }
  }
  
  return errors;
};
