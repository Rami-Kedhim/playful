
import { VerificationStatus } from "@/types/escort";

/**
 * Calculate the progress percentage based on verification status
 */
export const calculateVerificationProgress = (status: VerificationStatus): number => {
  switch (status) {
    case 'pending':
      return 50;
    case 'in_review':
      return 75;
    case 'approved':
      return 100;
    case 'rejected':
      return 100;
    default:
      return 0;
  }
};

/**
 * Get a user-friendly message describing the verification status
 */
export const getVerificationStatusMessage = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return 'Your verification has been submitted and is awaiting review. Please check back later.';
    case 'in_review':
      return 'Your verification is currently being reviewed by our team. This typically takes 24-48 hours.';
    case 'approved':
      return 'Your identity has been successfully verified. Your profile now has verified status.';
    case 'rejected':
      return 'Your verification was not approved. Please review the feedback and submit new documents if needed.';
    default:
      return 'No verification information available.';
  }
};

/**
 * Check if a verification request is currently in progress
 */
export const isVerificationInProgress = (status: VerificationStatus): boolean => {
  return status === 'pending' || status === 'in_review';
};

/**
 * Get the estimated completion time based on status
 */
export const getEstimatedCompletionTime = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return '24-48 hours';
    case 'in_review':
      return '24 hours';
    default:
      return 'N/A';
  }
};

/**
 * Get a suitable title for the current verification status
 */
export const getVerificationStatusTitle = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return 'Verification Pending';
    case 'in_review':
      return 'Verification In Review';
    case 'approved':
      return 'Verification Approved';
    case 'rejected':
      return 'Verification Rejected';
    default:
      return 'Verification Status';
  }
};
