
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { VerificationStatus as VerificationStatusEnum, VerificationRequest } from '@/types/verification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [status, setStatus] = useState<VerificationStatusEnum>(VerificationStatusEnum.NONE);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call to fetch the user's verification request
        // For now, we'll use a mock implementation
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

        // Mock data - in a real app we'd fetch this from the backend
        if (user.user_metadata?.verification_status) {
          setStatus(user.user_metadata.verification_status as VerificationStatusEnum);
          
          if (user.user_metadata.verification_request) {
            setVerificationRequest(user.user_metadata.verification_request as VerificationRequest);
          }
        } else {
          setStatus(VerificationStatusEnum.NONE);
        }
      } catch (err: any) {
        console.error('Error fetching verification status:', err);
        setError(err.message || 'Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, [user]);

  return {
    loading,
    error,
    status,
    verificationRequest,
    isVerified: status === VerificationStatusEnum.APPROVED,
    // Helper functions
    canSubmitNew: status !== VerificationStatusEnum.PENDING && status !== VerificationStatusEnum.IN_REVIEW,
  };
};

export default useVerificationStatus;
