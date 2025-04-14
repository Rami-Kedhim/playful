
import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const documentImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File must be 5MB or less")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp files are accepted"
    ),
});

export const verificationFormSchema = z.object({
  documentType: z.enum(["passport", "id_card", "driver_license"]),
  documentFrontImage: documentImageSchema,
  documentBackImage: documentImageSchema.optional(),
  selfieImage: documentImageSchema,
});

export type VerificationFormData = z.infer<typeof verificationFormSchema>;

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return error.errors[0].message;
  }
  return "An unexpected error occurred";
};
