
import { z } from "zod";

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license'
};

export const DOCUMENT_TYPE_LABELS = {
  'id_card': 'ID Card',
  'passport': 'Passport',
  'drivers_license': 'Driver\'s License'
};

export const DOCUMENT_TYPE_REQUIREMENTS = {
  'id_card': 'Ensure front and back are clearly visible with text legible.',
  'passport': 'Ensure all the details in the passport are clearly visible.',
  'drivers_license': 'Ensure front and back are clearly visible with photo and details legible.'
};

export const verificationFormSchema = z.object({
  documentType: z.string(),
  documentFrontImage: z.object({
    file: z.instanceof(File).optional()
  }).optional().refine((data) => data && data.file, {
    message: "Front image is required"
  }),
  documentBackImage: z.object({
    file: z.instanceof(File).optional()
  }).optional(),
  selfieImage: z.object({
    file: z.instanceof(File).optional()
  }).optional().refine((data) => data && data.file, {
    message: "Selfie image is required"
  })
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;
