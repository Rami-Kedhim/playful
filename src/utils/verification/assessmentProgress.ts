
import { VerificationRequest, VerificationStatus } from '@/types/escort';

/**
 * Calculate percentage of verification progress
 */
export const calculateVerificationProgress = (status: VerificationStatus): number => {
  switch (status) {
    case 'pending':
      return 50;
    case 'approved':
      return 100;
    case 'rejected':
      return 100;
    default:
      return 0;
  }
};

/**
 * Get a user-friendly message for a verification status
 */
export const getVerificationStatusMessage = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return 'Your verification is being reviewed. This typically takes 24-48 hours.';
    case 'approved':
      return 'Your identity has been verified. Your profile now displays a verified badge.';
    case 'rejected':
      return 'Your verification was rejected. Please check the rejection reason and submit again.';
    default:
      return 'Submit your verification documents to get verified.';
  }
};

/**
 * Check if a verification is currently in progress
 */
export const isVerificationInProgress = (request?: VerificationRequest | null): boolean => {
  if (!request) return false;
  return request.status === 'pending';
};
