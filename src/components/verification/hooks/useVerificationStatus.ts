
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/lib/supabase';
import { VerificationStatus, VerificationRequest } from '@/types/verification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchVerificationStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check in user metadata first for verification status
        if (user.user_metadata?.verification_status) {
          setStatus(user.user_metadata.verification_status as VerificationStatus);
        }

        // Then fetch the most recent verification request
        const { data, error: fetchError } = await supabase
          .from('verification_requests')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (data && data.length > 0) {
          const request = data[0] as VerificationRequest;
          setVerificationRequest(request);
          setStatus(request.status as VerificationStatus);
        } else {
          setStatus(VerificationStatus.NONE);
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
    status,
    loading,
    error,
    verificationRequest
  };
};

export default useVerificationStatus;
