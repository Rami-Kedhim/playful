import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface VerificationHookResult {
  status: string;
  isVerifying: boolean;
  error: string | null;
  submitVerification: (level?: string) => Promise<void>;
  refreshStatus: () => Promise<void>;
}

/**
 * useVerificationStatus Hook
 *
 * This hook provides the verification status of the current user and a function to submit
 * a verification request. It fetches the verification status from the user's profile and
 * allows the user to submit a verification request.
 */
export const useVerificationStatus = (): VerificationHookResult => {
  const { user, profile, updateUserProfile } = useAuth();
  const [status, setStatus] = useState<string>('NONE');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial verification status from the user profile
    if (profile?.verification_status) {
      setStatus(profile.verification_status);
    }
  }, [profile?.verification_status]);

  const refreshStatus = async () => {
    // Refresh verification status from the user profile
    if (profile?.verification_status) {
      setStatus(profile.verification_status);
    }
  };

  const submitVerification = async (level: string = 'BASIC') => {
    setIsVerifying(true);
    setError(null);

    try {
      // Simulate submitting a verification request
      // In a real application, you would send a request to your backend
      console.log(`Submitting verification request for level: ${level}`);

      // Simulate a successful verification
      const newStatus = 'PENDING';
      setStatus(newStatus);

      // Update the user profile with the new verification status
      if (user && updateUserProfile) {
        await updateUserProfile({ verification_status: newStatus });
      }
    } catch (err: any) {
      console.error("Failed to submit verification request:", err);
      setError("Failed to submit verification request. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    status,
    isVerifying,
    error,
    submitVerification,
    refreshStatus
  };
};
