
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { VerificationRequest, VerificationStatus, VerificationLevel } from '@/types/verification';

// Mock function to fetch verification status
const fetchVerificationStatus = async (userId: string): Promise<VerificationRequest | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data - 50% chance of having a verification
  if (Math.random() > 0.5) {
    return {
      id: '1234567890',
      userId: userId,
      status: VerificationStatus.PENDING,
      level: VerificationLevel.BASIC,
      documents: [],
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      // For backward compatibility
      user_id: userId,
      profile_id: userId,
      created_at: new Date().toISOString(),
      verificationLevel: VerificationLevel.BASIC,
      requested_level: VerificationLevel.BASIC
    };
  }
  
  return null;
};

export const useVerificationStatus = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  
  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVerificationStatus(user.id);
        setVerificationRequest(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load verification status');
        console.error('Error fetching verification status:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkStatus();
  }, [user]);
  
  return {
    loading,
    error,
    verificationRequest,
  };
};
