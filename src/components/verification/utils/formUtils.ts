
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const documentFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG and WEBP formats are supported'
    )
});

export const verificationFormSchema = z.object({
  documentType: z.enum(['passport', 'id_card', 'driver_license']),
  documentFrontImage: documentFileSchema,
  documentBackImage: documentFileSchema.optional(),
  selfieImage: documentFileSchema
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;
