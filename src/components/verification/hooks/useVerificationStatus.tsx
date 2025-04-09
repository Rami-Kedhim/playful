
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { VerificationRequest } from '@/types/escort';

export function useVerificationStatus() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchVerificationStatus() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // For demonstration purposes, we're using a mocked verification request
        // In a real app, this would be a fetch call to your API
        // const response = await fetch(`/api/verification/${user.id}`);
        // const data = await response.json();
        
        // Mock data for testing the UI
        const mockVerificationData: VerificationRequest = {
          id: 'mock-verification-1',
          userId: user.id,
          status: Math.random() > 0.7 ? 'pending' : Math.random() > 0.5 ? 'in_review' : Math.random() > 0.3 ? 'approved' : 'rejected',
          submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
          updatedAt: new Date().toISOString(),
          documents: [
            {
              id: 'doc-1',
              type: 'id_card',
              fileUrl: '/mock-id-front.jpg',
              uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
              status: 'pending'
            }
          ],
          rejectionReason: Math.random() > 0.7 ? 'Documents unclear or incomplete' : undefined
        };

        setTimeout(() => {
          setVerificationRequest(mockVerificationData);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        console.error('Error fetching verification status:', err);
        setError('Failed to load verification status. Please try again later.');
        setLoading(false);
      }
    }

    fetchVerificationStatus();
  }, [user]);

  const refetchVerificationStatus = () => {
    setLoading(true);
    // Reset status and re-fetch
    setVerificationRequest(null);
    setError(null);
    
    // Implementation would call the actual API in a real app
    setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 1000);
  };

  return {
    loading,
    error,
    verificationRequest,
    refetchVerificationStatus
  };
}
