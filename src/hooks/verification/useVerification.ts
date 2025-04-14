
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Document validation schema
const documentSchema = z.object({
  type: z.enum(['id_card', 'passport', 'driver_license']),
  frontImage: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, {
    message: "Front image must be less than 5MB"
  }).refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: "Front image must be a JPG, PNG, or WEBP file"
  }),
  backImage: z.instanceof(File).optional()
    .refine(file => !file || file.size <= 5 * 1024 * 1024, {
      message: "Back image must be less than 5MB"
    })
    .refine(file => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: "Back image must be a JPG, PNG, or WEBP file"
    }),
  selfieImage: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, {
    message: "Selfie image must be less than 5MB"
  }).refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: "Selfie image must be a JPG, PNG, or WEBP file"
  })
});

export type VerificationDocument = z.infer<typeof documentSchema>;

export const useVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'uploading' | 'processing' | 'completed' | 'error'
  >('idle');

  const validateDocuments = useCallback((documents: VerificationDocument) => {
    try {
      documentSchema.parse(documents);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error('Validation Error', {
            description: err.message
          });
        });
      } else {
        console.error('Document validation error:', error);
        toast.error('Validation Error', {
          description: 'There was an error validating your documents'
        });
      }
      return false;
    }
  }, []);

  const submitVerification = useCallback(async (documents: VerificationDocument) => {
    if (!validateDocuments(documents)) {
      return false;
    }

    setIsSubmitting(true);
    setVerificationStatus('uploading');

    try {
      // First show a toast message that verification is being processed
      toast.info('Processing', {
        description: 'Uploading your verification documents...',
        duration: 3000,
      });

      // Simulate document upload and processing
      const { data, error } = await supabase.functions.invoke('process-verification', {
        body: {
          documentType: documents.type,
          frontImage: await documents.frontImage.arrayBuffer(),
          backImage: documents.backImage ? await documents.backImage.arrayBuffer() : null,
          selfieImage: await documents.selfieImage.arrayBuffer()
        }
      });

      if (error) {
        console.error('Error from Supabase function:', error);
        throw error;
      }

      setVerificationStatus('completed');
      toast.success('Verification Submitted', {
        description: 'Your documents are being processed. We\'ll notify you once review is complete.',
      });

      return true;
    } catch (error) {
      console.error('Verification submission error:', error);
      setVerificationStatus('error');
      toast.error('Verification Failed', {
        description: typeof error === 'object' && error !== null && 'message' in error 
          ? String(error.message)
          : 'Unable to submit verification. Please try again.'
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [validateDocuments]);

  return {
    submitVerification,
    isSubmitting,
    verificationStatus
  };
};
