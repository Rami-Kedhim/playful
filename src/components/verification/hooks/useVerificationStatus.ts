
import { useState, useEffect } from 'react';
import { VerificationRequest, VerificationStatus } from '@/types/verification';

export const useVerificationStatus = (userId: string | undefined) => {
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the verification status
    const fetchStatus = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Here we would normally fetch from an API
        // For now, mock a verification request
        setTimeout(() => {
          const mockRequest: VerificationRequest = {
            id: 'mock-request-id',
            userId: userId,
            status: VerificationStatus.PENDING,
            documents: [
              {
                id: 'doc-1',
                document_type: 'ID_CARD' as any,
                uploaded_at: new Date(),
                status: VerificationStatus.PENDING
              }
            ],
            created_at: new Date(),
            updated_at: new Date(),
            // For compatibility with both created_at and createdAt
            createdAt: new Date(),
            // For compatibility with both reviewed_at and reviewedAt
            reviewedAt: new Date()
          };
          
          setRequest(mockRequest);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching verification status:", err);
        setError("Failed to retrieve verification status");
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
    isPending: request?.status === VerificationStatus.PENDING,
    isRejected: request?.status === VerificationStatus.REJECTED,
    inReview: request?.status === VerificationStatus.REVIEW
  };
};

export default useVerificationStatus;
