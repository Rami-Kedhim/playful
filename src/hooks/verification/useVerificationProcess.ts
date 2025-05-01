
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { submitVerificationRequest, uploadDocumentFile, validateFile } from '@/utils/verification';
import { toast } from '@/components/ui/use-toast';

interface VerificationData {
  documentType: string;
  frontFile: File;
  backFile?: File | null;
  selfieFile: File;
  acceptTerms: boolean;
}

export const useVerificationProcess = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitVerification = async (data: VerificationData): Promise<boolean> => {
    if (!user?.id) {
      setError('You must be logged in to submit verification');
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit verification documents.",
        variant: "destructive",
      });
      return false;
    }

    if (!data.acceptTerms) {
      setError('You must accept the terms and privacy policy');
      toast({
        title: "Submission Error",
        description: "You must accept the terms and privacy policy to proceed.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate files
      const frontValidation = validateFile(data.frontFile);
      if (!frontValidation.valid) {
        throw new Error(frontValidation.error || 'Invalid front document');
      }

      if (data.backFile) {
        const backValidation = validateFile(data.backFile);
        if (!backValidation.valid) {
          throw new Error(backValidation.error || 'Invalid back document');
        }
      }

      const selfieValidation = validateFile(data.selfieFile);
      if (!selfieValidation.valid) {
        throw new Error(selfieValidation.error || 'Invalid selfie');
      }

      // Submit verification request
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.frontFile,
        data.backFile || null,
        data.selfieFile
      );

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit verification');
      }

      toast({
        title: "Verification Submitted",
        description: "Your verification documents have been submitted successfully and are pending review.",
      });
      
      setSuccess(true);
      return true;
    } catch (err: any) {
      console.error('Verification submission error:', err);
      setError(err.message || 'An unexpected error occurred');
      toast({
        title: "Verification Failed",
        description: err.message || "There was an error submitting your verification documents.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitVerification,
    loading,
    error,
    success
  };
};

export default useVerificationProcess;
