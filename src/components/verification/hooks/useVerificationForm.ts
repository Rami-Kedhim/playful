
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the verification form schema
const verificationFormSchema = z.object({
  documentType: z.string({
    required_error: "Please select a document type",
  }),
  documentFile: z.instanceof(File, {
    message: "Please upload a document file",
  }),
  selfieFile: z.instanceof(File, {
    message: "Please upload a selfie with your document",
  }).optional(),
  backFile: z.instanceof(File, {
    message: "Please upload the back of your document",
  }).optional().nullable(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export const useVerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ success: boolean; message: string } | null>(null);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: '',
      acceptTerms: false,
    },
  });

  return {
    form,
    loading,
    setLoading,
    submitted,
    setSubmitted,
    submitMessage,
    setSubmitMessage
  };
};

export default useVerificationForm;
