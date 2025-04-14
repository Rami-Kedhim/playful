
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Constants
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
export const verificationFormSchema = z.object({
  documentType: z.enum([
    DOCUMENT_TYPES.PASSPORT, 
    DOCUMENT_TYPES.ID_CARD, 
    DOCUMENT_TYPES.DRIVER_LICENSE
  ]),
  documentFrontImage: z
    .any()
    .refine((file) => file instanceof File, 'Front image is required')
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE, 
      'Max file size is 5MB'
    )
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .webp formats are supported'
    ),
  documentBackImage: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE),
      'Max file size is 5MB'
    )
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .png and .webp formats are supported'
    ),
  selfieImage: z
    .any()
    .refine((file) => file instanceof File, 'Selfie image is required')
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE, 
      'Max file size is 5MB'
    )
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .webp formats are supported'
    ),
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// Updated utility function to handle file change events with the correct parameters
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>, 
  form: UseFormReturn<VerificationFormValues>, 
  fieldName: keyof VerificationFormValues
) => {
  if (e.target.files && e.target.files[0]) {
    form.setValue(fieldName, e.target.files[0], { shouldValidate: true });
  } else {
    // Clear the field if no file is selected
    form.setValue(fieldName, null, { shouldValidate: true });
  }
};

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
