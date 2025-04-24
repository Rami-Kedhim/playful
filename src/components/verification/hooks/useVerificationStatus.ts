
import { useEffect, useState } from 'react';
import { VerificationStatus } from '@/types/verification';
import { useAuth } from '@/hooks/auth';
import { checkVerificationStatus } from '@/utils/verification/statusCheck';

export function useVerificationStatus() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      if (!user?.id) return;
      
      try {
        const result = await checkVerificationStatus(user.id);
        setStatus(result.status);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [user]);

  return { status, loading, error };
}

