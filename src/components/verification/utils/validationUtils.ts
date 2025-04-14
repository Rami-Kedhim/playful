
import { z } from 'zod';

// Constants for file validation
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Document type enum for type safety
export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  ID_CARD: 'id_card',
  DRIVER_LICENSE: 'driver_license'
} as const;

export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];

// Zod schema for verification form
const documentFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG and WEBP formats are supported'
    )
});

export const verificationFormSchema = z.object({
  documentType: z.enum([
    DOCUMENT_TYPES.PASSPORT, 
    DOCUMENT_TYPES.ID_CARD, 
    DOCUMENT_TYPES.DRIVER_LICENSE
  ]),
  documentFrontImage: documentFileSchema,
  documentBackImage: documentFileSchema.optional(),
  selfieImage: documentFileSchema
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// Helper function to get document name based on type
export const getDocumentTypeName = (type: DocumentType): string => {
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

// Helper to check if back image is required based on document type
export const isBackImageRequired = (documentType: DocumentType): boolean => {
  return documentType !== DOCUMENT_TYPES.PASSPORT;
};
