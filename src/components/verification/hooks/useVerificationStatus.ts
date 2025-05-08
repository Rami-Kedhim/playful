
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { VerificationRequest, VERIFICATION_STATUS } from '@/types/verification';
import { supabase } from '@/integrations/supabase/client';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerificationStatus = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Get the most recent verification request
      const { data, error: fetchError } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('userId', user.id)
        .order('submittedAt', { ascending: false })
        .limit(1);

      if (fetchError) {
        throw fetchError;
      }

      if (data && data.length > 0) {
        const latestRequest = data[0] as VerificationRequest;
        setStatus(latestRequest.status);
        setVerificationRequest(latestRequest);
      } else {
        setStatus(null);
        setVerificationRequest(null);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching verification status:', err);
      setError(err.message || 'Failed to fetch verification status');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchVerificationStatus();
  }, [fetchVerificationStatus]);

  return {
    status,
    verificationRequest,
    loading,
    error,
    refresh: fetchVerificationStatus
  };
};

export default useVerificationStatus;
