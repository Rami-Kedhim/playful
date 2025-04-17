
import { useState, useEffect } from 'react';
import { VerificationRequest, VerificationStatus, VerificationLevel } from '@/types/verification';

// Hook to get verification status for a user
export const useVerificationStatus = (userId?: string) => {
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    // Simulate fetching verification status from API
    const fetchStatus = async () => {
      setLoading(true);
      try {
        // Mock data - with properly typed fields
        const mockRequest: VerificationRequest = {
          id: 'ver_123',
          userId: userId, 
          profile_id: userId,
          status: VerificationStatus.PENDING,
          requested_level: VerificationLevel.BASIC,
          documents: [],
          createdAt: new Date().toISOString(),
          // Include all required fields plus compatibility fields
          created_at: new Date().toISOString(),
          level: VerificationLevel.BASIC,
          verificationLevel: VerificationLevel.BASIC,
          user_id: userId
        };
        
        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setRequest(mockRequest);
        setError(null);
      } catch (err) {
        console.error('Error fetching verification status:', err);
        setError('Failed to load verification status');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, [userId]);
  
  return {
    request,
    loading,
    error,
    isVerified: request?.status === VerificationStatus.APPROVED,
    isPending: request?.status === VerificationStatus.PENDING || 
               request?.status === VerificationStatus.IN_REVIEW,
    isRejected: request?.status === VerificationStatus.REJECTED
  };
};
