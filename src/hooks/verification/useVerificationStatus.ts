
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';

export interface VerificationStatus {
  status: string;
  canSubmit: boolean;
  lastSubmitted?: Date | null;
  reason?: string;
  isVerified: boolean;
}

export const useVerificationStatus = () => {
  const { user, profile, updateUserProfile } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>({
    status: 'not_started',
    canSubmit: true,
    isVerified: false
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      // Check if profile has verification status
      const isVerified = !!profile.is_verified;
      
      setStatus({
        status: isVerified ? 'verified' : 'not_started',
        canSubmit: !isVerified,
        isVerified
      });
      
      setLoading(false);
    }
  }, [profile]);

  const submitVerification = async (documentUrl: string, selfieUrl: string) => {
    if (!user) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      // Update the user profile with verification data using properties that exist in the User type
      const success = await updateUserProfile({
        // Instead of using verification_submitted which doesn't exist in the User type
        // We'll store the verification info in user_metadata which is allowed
        user_metadata: {
          verification_submitted: true,
          verification_documents: {
            documentUrl,
            selfieUrl,
            submittedAt: new Date().toISOString()
          }
        }
      });
      
      if (!success) throw new Error("Failed to submit verification");
      
      setStatus({
        ...status,
        status: 'pending',
        canSubmit: false,
        lastSubmitted: new Date()
      });
      
      toast({
        title: "Verification submitted",
        description: "Your verification has been submitted and is pending review.",
      });
      
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to submit verification");
      
      toast({
        title: "Verification failed",
        description: "There was an error submitting your verification.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    error,
    submitVerification,
    isVerified: status.isVerified
  };
};
