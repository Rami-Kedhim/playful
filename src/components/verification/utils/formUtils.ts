
import { z } from 'zod';

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Zod schema for verification form
export const verificationFormSchema = z.object({
  documentType: z.enum(['passport', 'id_card', 'driver_license', 'other']),
  documentFrontImage: z
    .any()
    .refine((file) => file instanceof File, 'Front image is required')
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
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
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .webp formats are supported'
    ),
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// Utility function to handle file change events
export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
  if (e.target.files && e.target.files[0]) {
    field.onChange(e.target.files[0]);
  }
};
