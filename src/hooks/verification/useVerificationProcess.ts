
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { submitVerificationForm } from '@/utils/verification';
import type { DocumentType } from '@/types/verification';

export const useVerificationProcess = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitVerification = async (data: {
    documentType: DocumentType;
    documentFile: File;
    selfieFile?: File;
    documentBackImage?: {file: File, preview: string} | null;
    documentFrontImage: {file: File, preview: string};
    selfieImage: {file: File, preview: string};
  }) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      // We'll use the submitVerificationForm function from our utils
      // which handles the upload and form submission
      const result = await submitVerificationForm(
        user.id,
        {
          documentType: data.documentType,
          documentFile: data.documentFrontImage.file,
          documentBackImage: data.documentBackImage || undefined,
          selfieImage: data.selfieImage
        }
      );
      
      if (result.success) {
        toast({
          title: "Verification Submitted",
          description: "Your verification request has been submitted successfully."
        });
        return true;
      }
      
      throw new Error(result.message || "Failed to submit verification");
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit verification request",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitVerification,
    loading
  };
};

export default useVerificationProcess;
