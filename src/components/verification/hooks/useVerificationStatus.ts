
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { VerificationRequest } from '@/types/auth';

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
        
        // Generate a random verification level for testing
        const levels = ['none', 'basic', 'enhanced', 'premium'];
        const randomLevelIndex = Math.floor(Math.random() * levels.length);
        
        // Mock data for testing the UI
        const mockRequest: VerificationRequest = {
          id: 'mock-request-id',
          profile_id: user.id,
          status: Math.random() > 0.7 ? 'pending' : Math.random() > 0.5 ? 'in_review' : Math.random() > 0.3 ? 'approved' : 'rejected',
          requested_level: levels[randomLevelIndex],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setTimeout(() => {
          setVerificationRequest(mockRequest);
          setLoading(false);
        }, 800); // Simulate network delay
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
    }, 800);
  };

  return {
    loading,
    error,
    verificationRequest,
    refetchVerificationStatus
  };
}
