
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { VerificationStatus, VerificationLevel, VerificationDocument, VerificationRequest } from '@/types/verification';

// Mock API function to get verification status
const fetchVerificationStatus = async (userId: string) => {
  // Simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return {
    id: '123456',
    profile_id: userId,
    user_id: userId,
    status: VerificationStatus.PENDING,
    requested_level: VerificationLevel.BASIC,
    documents: [
      {
        id: '1',
        verification_id: '123456',
        type: 'id_card',
        file_url: '/images/mock/id-card-front.jpg',
        uploaded_at: new Date().toISOString(),
        document_type: 'id_card',
        document_url: '/images/mock/id-card-front.jpg',
        status: VerificationStatus.PENDING,
        created_at: new Date().toISOString(),
        // For backward compatibility
        fileUrl: '/images/mock/id-card-front.jpg',
        uploadedAt: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // For backward compatibility
    userId: userId,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verificationLevel: VerificationLevel.BASIC
  };
};

export const useEscortVerification = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    const getVerificationStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchVerificationStatus(user.id);
        setVerificationRequest(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    };
    
    getVerificationStatus();
  }, [user]);

  const submitVerification = async (formData: FormData) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      setLoading(true);
      
      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a "submitted" request
      setVerificationRequest({
        id: Math.random().toString(36).substring(2, 11),
        profile_id: user.id,
        user_id: user.id,
        status: VerificationStatus.PENDING,
        requested_level: VerificationLevel.BASIC,
        documents: [],
        created_at: new Date().toISOString(),
        // For backward compatibility
        userId: user.id,
        submittedAt: new Date().toISOString()
      });
      
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Failed to submit verification request');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    verificationRequest,
    submitVerification
  };
};

export default useEscortVerification;
