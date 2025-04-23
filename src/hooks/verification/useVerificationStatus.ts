
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';
import { VerificationStatus as VerificationStatusEnum } from '@/types/verification';

export interface VerificationStatus {
  status: string;
  canSubmit: boolean;
  lastSubmitted?: Date | null;
  reason?: string;
  isVerified: boolean;
}

// This hook is now a wrapper around the main useVerificationStatus hook
// to maintain backward compatibility
export const useVerificationStatus = () => {
  // Import the main hook from the components directory
  const mainHook = require('@/components/verification/hooks/useVerificationStatus').useVerificationStatus();
  
  return {
    status: {
      status: mainHook.status.status,
      canSubmit: mainHook.status.canSubmit,
      isVerified: mainHook.status.isVerified,
      lastSubmitted: mainHook.status.lastSubmitted,
      reason: mainHook.status.reason
    },
    loading: mainHook.loading,
    error: mainHook.error,
    submitVerification: mainHook.submitVerification,
    isVerified: mainHook.isVerified,
    verificationRequest: mainHook.verificationRequest
  };
};
