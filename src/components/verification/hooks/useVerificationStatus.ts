
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';
import { checkVerificationStatus } from '@/utils/verification/statusCheck';
import { VerificationLevel, VerificationStatus, VerificationRequest } from '@/types/verification';

export interface VerificationStatusState {
  status: VerificationStatus;
  canSubmit: boolean;
  lastSubmitted?: Date | null;
  reason?: string;
  isVerified: boolean;
}

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatusState>({
    status: VerificationStatus.NONE,
    canSubmit: true,
    isVerified: false
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    if (user) {
      const fetchVerificationStatus = async () => {
        setLoading(true);
        try {
          // Check if user is verified through metadata
          const isVerified = user.user_metadata?.verification_status === 'approved';
          
          // Check for verification requests
          const result = await checkVerificationStatus(user.id);
          
          // Check if we have a last submitted date
          const hasSubmitted = user.user_metadata?.verification_submitted === true;
          const submittedAt = user.user_metadata?.verification_documents?.submittedAt;
          
          setStatus({
            status: result.status,
            canSubmit: result.status !== VerificationStatus.PENDING && 
                       result.status !== VerificationStatus.IN_REVIEW,
            isVerified,
            lastSubmitted: submittedAt ? new Date(submittedAt) : null
          });
          
          if (result.lastRequest) {
            setVerificationRequest(result.lastRequest);
          }
          
        } catch (error: any) {
          console.error("Error fetching verification status:", error);
          setError(error.message || "Failed to fetch verification status");
          
          toast({
            title: "Error",
            description: "Could not retrieve verification status",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchVerificationStatus();
    }
  }, [user]);

  return {
    status,
    loading,
    error,
    isVerified: status.isVerified,
    verificationRequest
  };
};

export default useVerificationStatus;
