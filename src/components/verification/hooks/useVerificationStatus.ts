
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/lib/supabase';
import { VerificationRequest, VerificationStatus } from '@/types/verification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchVerificationStatus = async () => {
      try {
        // First check user metadata for verification status
        if (user.user_metadata?.verification_status === VerificationStatus.APPROVED) {
          setStatus(VerificationStatus.APPROVED);
          setLoading(false);
          return;
        }

        // Then check for verification requests in the database
        const { data, error } = await supabase
          .from('verification_requests')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching verification status:', error);
          setError('Failed to fetch verification status');
        } else if (data) {
          setStatus(data.status as VerificationStatus);
          setVerificationRequest(data as VerificationRequest);
        }
      } catch (err) {
        console.error('Error in verification status check:', err);
        setError('An unexpected error occurred');
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
    verificationRequest,
    isVerified: status === VerificationStatus.APPROVED
  };
};

export default useVerificationStatus;
