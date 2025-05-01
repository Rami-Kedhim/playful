
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';
import { uploadDocumentFile, validateFile } from '@/utils/verification/documentUpload';
import { submitVerificationRequest } from '@/utils/verification';

export const useVerificationProcess = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const submitVerification = async (data: any): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit verification documents",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    
    try {
      // Validate files
      const frontValidation = validateFile(data.frontFile);
      if (!frontValidation.valid) {
        toast({
          title: "Invalid front document",
          description: frontValidation.error || "Please check your front document",
          variant: "destructive",
        });
        return false;
      }

      if (data.backFile) {
        const backValidation = validateFile(data.backFile);
        if (!backValidation.valid) {
          toast({
            title: "Invalid back document",
            description: backValidation.error || "Please check your back document",
            variant: "destructive",
          });
          return false;
        }
      }

      const selfieValidation = validateFile(data.selfieFile);
      if (!selfieValidation.valid) {
        toast({
          title: "Invalid selfie",
          description: selfieValidation.error || "Please check your selfie photo",
          variant: "destructive",
        });
        return false;
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
        toast({
          title: "Verification submission failed",
          description: result.message || "There was an error submitting your verification request.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Verification submitted successfully",
        description: "Your verification documents have been submitted for review.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Verification submission error:', error);
      toast({
        title: "Verification submission failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    submitVerification
  };
};
