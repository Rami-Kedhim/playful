
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';
import { VerificationLevel, VerificationStatus } from '@/types/verification';

export interface VerificationStatusState {
  status: VerificationStatus;
  canSubmit: boolean;
  lastSubmitted?: Date | null;
  reason?: string;
  isVerified: boolean;
}

export const useVerificationStatus = () => {
  const { user, profile, updateUserProfile } = useAuth();
  const [status, setStatus] = useState<VerificationStatusState>({
    status: VerificationStatus.NONE,
    canSubmit: true,
    isVerified: false
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      // Check if profile has verification status
      const isVerified = !!profile.is_verified;
      
      const hasSubmittedVerification = user?.user_metadata?.verification_submitted === true;
      
      setStatus({
        status: hasSubmittedVerification ? VerificationStatus.PENDING : VerificationStatus.NONE,
        canSubmit: !isVerified,
        isVerified,
        lastSubmitted: user?.user_metadata?.verification_documents?.submittedAt ? 
          new Date(user.user_metadata.verification_documents.submittedAt) : null
      });
      
      setLoading(false);
    }
  }, [profile, user]);

  const submitVerification = async (documentUrl: string, selfieUrl: string) => {
    if (!user) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      // Update the user profile with verification data
      const success = await updateUserProfile({
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
      
      setStatus(prev => ({
        ...prev,
        status: VerificationStatus.PENDING,
        canSubmit: false,
        lastSubmitted: new Date()
      }));
      
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
