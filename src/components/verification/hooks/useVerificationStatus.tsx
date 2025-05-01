
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { getVerificationRequestById, getAllVerificationRequests } from '@/services/verificationService';
import { VerificationRequest, VerificationStatus as VerificationStatusEnum } from '@/types/verification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [status, setStatus] = useState<VerificationStatusEnum>(VerificationStatusEnum.NONE);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // For demo purposes, we'll get all requests and filter by the first one
        // In a real app, you'd fetch by user ID
        const requests = await getAllVerificationRequests();
        const userRequest = requests[0]; // Just using the first one for demo
        
        if (userRequest) {
          setVerificationRequest(userRequest);
          setStatus(userRequest.status as VerificationStatusEnum);
          setIsVerified(userRequest.status === VerificationStatusEnum.APPROVED);
        }
      } catch (err) {
        console.error('Error fetching verification status:', err);
        setError('Failed to load verification status');
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, [user]);

  return {
    loading,
    error,
    verificationRequest,
    status,
    isVerified
  };
};

export default useVerificationStatus;
