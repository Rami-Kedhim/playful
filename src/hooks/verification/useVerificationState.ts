
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { checkVerificationStatus } from '@/utils/verification/statusCheck';
import type { VerificationStatus } from '@/types/verification';

export const useVerificationState = () => {
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
        setStatus(result.status);
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
