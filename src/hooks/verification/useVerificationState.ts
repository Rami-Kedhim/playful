
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { checkVerificationStatus } from '@/utils/verification/statusCheck';
import type { VerificationStatus } from '@/types/verification';

interface VerificationStateResult {
  status: VerificationStatus | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
  isPending: boolean;
  isRejected: boolean;
}

export const useVerificationState = (): VerificationStateResult => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatus = async () => {
      if (!user) {
        setStatus(null);
        setLoading(false);
        return;
      }

      try {
        const result = await checkVerificationStatus(user.id);
        // Cast result.status to VerificationStatus
        setStatus(result.status as VerificationStatus);
      } catch (err: any) {
        setError(err.message);
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
    isVerified: status === 'approved',
    isPending: status === 'pending',
    isRejected: status === 'rejected'
  };
};

export default useVerificationState;
