
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { VerificationStatus, VerificationRequest } from '@/types/verification';
import { supabase } from '@/lib/supabase';

interface UseVerificationStatusResult {
  status: VerificationStatus;
  loading: boolean;
  error: string | null;
  verificationRequest: VerificationRequest | null;
}

export const useVerificationStatus = (): UseVerificationStatusResult => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  // Memoize the fetch function to avoid recreation on every render
  const fetchVerificationStatus = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Get verification request from user metadata or from database in real implementation
      const verificationData = user.user_metadata?.verification_request;
      
      if (verificationData) {
        setVerificationRequest(verificationData as VerificationRequest);
        setStatus((verificationData.status as VerificationStatus) || VerificationStatus.NONE);
      } else {
        // In a real implementation, we would fetch this from the database
        // For now, use a simulated API call
        const { data, error } = await supabase
          .from('verification_requests')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw error;
        }

        if (data) {
          setVerificationRequest(data as VerificationRequest);
          setStatus((data.status as VerificationStatus) || VerificationStatus.NONE);
        } else {
          setStatus(VerificationStatus.NONE);
        }
      }
    } catch (err: any) {
      console.error('Error fetching verification status:', err);
      setError(err.message || 'Failed to fetch verification status');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Use the memoized fetch function in the effect
  useEffect(() => {
    fetchVerificationStatus();
  }, [fetchVerificationStatus]);

  return {
    status,
    loading,
    error,
    verificationRequest
  };
};

export default useVerificationStatus;
