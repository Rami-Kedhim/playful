
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/lib/supabase';
import { VerificationRequest, VerificationStatus, VerificationLevel } from '@/types/verification';

export function useVerificationStatus() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchVerificationStatus() {
      try {
        setLoading(true);
        setError(null);

        // In a real application, this would be an API call to your backend
        // For now, we'll simulate getting the verification status from user metadata
        const { data: { user: userData }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!userData) {
          setLoading(false);
          return;
        }

        // Check if verification data exists in the user metadata
        if (userData.user_metadata?.verification_request) {
          const verificationData = userData.user_metadata.verification_request;
          
          setVerificationRequest({
            id: verificationData.id,
            profile_id: verificationData.profile_id || userData.id,
            requested_level: verificationData.requested_level || VerificationLevel.BASIC,
            status: verificationData.status || VerificationStatus.PENDING,
            documents: verificationData.documents || [],
            created_at: verificationData.created_at,
            submittedAt: verificationData.submittedAt,
            reviewedAt: verificationData.reviewedAt,
            reviewer_notes: verificationData.reviewer_notes,
            rejectionReason: verificationData.rejectionReason,
          });
          
          setStatus(verificationData.status);
        } else if (userData.user_metadata?.verification_status) {
          // If only a status exists without a full request record
          setStatus(userData.user_metadata.verification_status as VerificationStatus);
        }
      } catch (err: any) {
        console.error('Error fetching verification status:', err);
        setError(err.message || 'Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    }

    fetchVerificationStatus();
  }, [user]);

  return {
    loading,
    error,
    status,
    verificationRequest,
  };
}

export default useVerificationStatus;
