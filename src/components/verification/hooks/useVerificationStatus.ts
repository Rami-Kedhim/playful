
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { VerificationStatus as VerificationStatusEnum, VerificationRequest } from '@/types/verification';
import { supabase } from '@/lib/supabase';

interface UseVerificationStatusResult {
  status: VerificationStatusEnum;
  loading: boolean;
  error: string | null;
  verificationRequest: VerificationRequest | null;
}

export const useVerificationStatus = (): UseVerificationStatusResult => {
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatusEnum>(VerificationStatusEnum.NONE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
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
          setStatus((verificationData.status as VerificationStatusEnum) || VerificationStatusEnum.NONE);
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
            setStatus((data.status as VerificationStatusEnum) || VerificationStatusEnum.NONE);
          } else {
            setStatus(VerificationStatusEnum.NONE);
          }
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
