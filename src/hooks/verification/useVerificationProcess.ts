
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { submitVerificationRequest } from '@/utils/verification';
import type { DocumentType } from '@/types/verification';

export const useVerificationProcess = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitVerification = async (data: {
    documentType: DocumentType;
    documentFile: File;
    selfieFile?: File;
  }) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.documentFile,
        data.selfieFile || null,
        data.documentFile
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

