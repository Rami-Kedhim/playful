
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { VerificationRequest, VerificationLevel } from '@/types/verification';

export interface UseVerificationStatusResult {
  verificationRequest: VerificationRequest | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// Mock verification request data
const mockVerificationRequest: VerificationRequest = {
  id: 'ver-123456',
  userId: 'user-123',
  status: 'pending',
  documentType: 'id_card',
  created_at: new Date(),
  updated_at: new Date(),
  level: VerificationLevel.BASIC,
  requested_level: VerificationLevel.STANDARD,
  rejection_reason: null,
  // Add both formats to support different components
  rejectionReason: null,
  reviewer_notes: null,
  reviewerNotes: null,
  reviewedAt: null
};

export const useVerificationStatus = (): UseVerificationStatusResult => {
  const { user } = useAuth();
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerificationStatus = async () => {
    if (!user) {
      setVerificationRequest(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, we'll use mock data
      setVerificationRequest(mockVerificationRequest);
    } catch (err) {
      console.error('Error fetching verification status:', err);
      setError('Failed to fetch verification status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  return {
    verificationRequest,
    isLoading,
    error,
    refresh: fetchVerificationStatus
  };
};

export default useVerificationStatus;
