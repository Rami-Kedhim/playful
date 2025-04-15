
import { z } from "zod";
import { DOCUMENT_TYPES } from "@/utils/verification/documentTypes";

// Max file size 5MB in bytes
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const FileSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: "File must be 5MB or less"
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, and .webp formats are supported"
    })
});

export const verificationFormSchema = z.object({
  documentType: z.enum([
    DOCUMENT_TYPES.ID_CARD,
    DOCUMENT_TYPES.PASSPORT,
    DOCUMENT_TYPES.DRIVERS_LICENSE
  ]),
  documentFrontImage: FileSchema,
  documentBackImage: FileSchema.optional(),
  selfieImage: FileSchema
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;
