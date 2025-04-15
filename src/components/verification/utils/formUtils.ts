
import { z } from "zod";
import { DOCUMENT_TYPES } from "@/utils/verification/documentTypes";

export { DOCUMENT_TYPES };

export const verificationFormSchema = z.object({
  documentType: z.enum([
    DOCUMENT_TYPES.ID_CARD,
    DOCUMENT_TYPES.PASSPORT,
    DOCUMENT_TYPES.DRIVERS_LICENSE
  ]),
  documentFrontImage: z.object({
    file: z.instanceof(File)
  }),
  documentBackImage: z.object({
    file: z.instanceof(File)
  }).optional(),
  selfieImage: z.object({
    file: z.instanceof(File)
  })
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;
