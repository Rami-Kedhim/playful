
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';

type SensitiveOperation = 'payment' | 'identity-verification' | 'profile-update' | 'withdrawal';

interface UseSecurityProps {
  operation: SensitiveOperation;
  redirectOnVerified?: string;
  title?: string;
  description?: string;
}

/**
 * Hook to check if a security verification is needed for sensitive operations
 */
export const useSecurity = ({
  operation,
  redirectOnVerified,
  title,
  description
}: UseSecurityProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // If user is not authenticated, they cannot be verified
    if (!user) {
      setIsVerified(false);
      setIsCheckingStatus(false);
      return;
    }

    // Check if the user has a valid verification for this operation
    const checkVerificationStatus = () => {
      // In a production app, this would check with the backend
      // For this demo, we'll use localStorage
      const verifications = JSON.parse(localStorage.getItem('verifications') || '{}');
      const verification = verifications[operation];
      
      if (!verification) {
        setIsVerified(false);
        setIsCheckingStatus(false);
        return;
      }
      
      // Check if verification has expired
      const expiryTime = new Date(verification.expiry).getTime();
      const currentTime = new Date().getTime();
      
      if (currentTime > expiryTime) {
        // Verification expired
        setIsVerified(false);
        setIsCheckingStatus(false);
        return;
      }
      
      // Verification is valid
      setIsVerified(true);
      setIsCheckingStatus(false);
    };
    
    checkVerificationStatus();
  }, [user, operation]);
  
  /**
   * Request verification - redirects to verification page
   */
  const requestVerification = () => {
    navigate('/verify', { 
      state: { 
        operation, 
        redirectTo: redirectOnVerified || location.pathname,
        title,
        description
      } 
    });
  };
  
  return {
    isVerified,
    isCheckingStatus,
    requestVerification
  };
};

export default useSecurity;
