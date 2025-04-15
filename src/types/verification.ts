
import { z } from "zod";

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license'
} as const;

export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];

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

export interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  text: string;
}
