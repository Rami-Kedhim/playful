
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verificationFormSchema, getInitialValues } from '../utils/formUtils';

export const useVerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ success: boolean; message: string } | null>(null);
  
  const form = useForm({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: getInitialValues(),
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
