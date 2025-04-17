
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
    userId: userId,
    level: VerificationLevel.BASIC,
    status: VerificationStatus.PENDING,
    documents: [
      {
        id: '1',
        type: 'id_card',
        url: '/images/mock/id-card-front.jpg',
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        // For backward compatibility
        verification_id: '123456',
        document_type: 'id_card',
        document_url: '/images/mock/id-card-front.jpg',
        file_url: '/images/mock/id-card-front.jpg',
        fileUrl: '/images/mock/id-card-front.jpg',
        created_at: new Date().toISOString(),
        uploaded_at: new Date().toISOString()
      }
    ],
    submittedAt: new Date().toISOString(),
    // For backward compatibility
    user_id: userId,
    profile_id: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    verificationLevel: VerificationLevel.BASIC,
    requested_level: VerificationLevel.BASIC
  } as VerificationRequest;
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
        userId: user.id,
        level: VerificationLevel.BASIC,
        status: VerificationStatus.PENDING,
        documents: [],
        submittedAt: new Date().toISOString(),
        // For backward compatibility
        user_id: user.id,
        profile_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        verificationLevel: VerificationLevel.BASIC,
        requested_level: VerificationLevel.BASIC
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
