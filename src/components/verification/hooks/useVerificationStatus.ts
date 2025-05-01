
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { checkVerificationStatus } from '@/utils/verification/statusCheck';
import { VerificationRequest, VerificationStatus } from '@/types/verification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    const loadStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await checkVerificationStatus(user.id);
        setStatus(result.status as VerificationStatus);
        setVerificationRequest(result.lastRequest || null);
      } catch (err: any) {
        console.error('Error checking verification status:', err);
        setError(err.message || 'Failed to load verification status');
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [user]);

  return {
    status,
    loading,
    error,
    verificationRequest,
    isVerified: status === VerificationStatus.APPROVED,
    refetch: () => {
      if (user) {
        setLoading(true);
        checkVerificationStatus(user.id)
          .then(result => {
            setStatus(result.status as VerificationStatus);
            setVerificationRequest(result.lastRequest || null);
          })
          .catch(err => {
            setError(err.message || 'Failed to reload verification status');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };
};

export default useVerificationStatus;
