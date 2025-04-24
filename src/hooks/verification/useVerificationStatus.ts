
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
      status: mainHook.status,
      canSubmit: mainHook.status !== VerificationStatusEnum.PENDING && mainHook.status !== VerificationStatusEnum.IN_REVIEW,
      isVerified: mainHook.status === VerificationStatusEnum.APPROVED,
      lastSubmitted: mainHook.verificationRequest?.submittedAt || mainHook.verificationRequest?.created_at || null,
      reason: mainHook.verificationRequest?.rejectionReason || mainHook.verificationRequest?.reviewer_notes
    },
    loading: mainHook.loading,
    error: mainHook.error,
    verificationRequest: mainHook.verificationRequest,
    isVerified: mainHook.status === VerificationStatusEnum.APPROVED,
    submitVerification: () => {
      console.log('Submit verification placeholder');
      return Promise.resolve(true);
    }
  };
};
