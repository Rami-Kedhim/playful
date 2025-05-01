
import { z } from 'zod';
import { documentTypeOptions } from './documentTypeHelper';

export const verificationFormSchema = z.object({
  documentType: z.string().min(1, 'Please select an ID type'),
  documentFile: z.instanceof(File, { message: 'Please upload your ID document' }),
  selfieFile: z.instanceof(File, { message: 'Please upload your selfie' }),
  backFile: z.instanceof(File).optional(),
  privacyConsent: z.boolean().refine(val => val === true, { message: 'You must agree to the privacy policy' }),
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export const getInitialValues = (): Partial<VerificationFormValues> => {
  return {
    documentType: documentTypeOptions[0].value,
    privacyConsent: false
  };
};
