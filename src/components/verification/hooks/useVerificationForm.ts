
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DocumentType } from '@/types/verification';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const verificationFormSchema = z.object({
  documentType: z.string(),
  documentFile: z.any().refine(val => val instanceof File, { message: "Document file is required" }),
  selfieFile: z.any().optional().refine(val => val === undefined || val instanceof File, { message: "Invalid selfie file" }),
  consentChecked: z.boolean().refine(val => val === true, { message: "You must agree to the terms" }),
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export function useVerificationForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: 'id_card',
      documentFile: undefined,
      selfieFile: undefined,
      consentChecked: false,
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
}
