
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { VerificationRequest } from '@/types/escort';
import { useEscortVerification } from '@/hooks/escort/useEscortVerification';

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  
  const { checkVerificationStatus } = useEscortVerification((id, updates) => Promise.resolve(null));
  
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const status = await checkVerificationStatus(user.id);
        
        if (status) {
          setVerificationRequest({
            id: 'mock-request-id',
            escortId: user.id,
            status: status,
            documents: [],
            submittedAt: new Date().toISOString(), // Convert to string
            userId: user.id
          });
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching verification status:", err);
        setError("Failed to fetch verification status. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerificationStatus();
  }, [user, checkVerificationStatus]);

  return { loading, error, verificationRequest };
};
