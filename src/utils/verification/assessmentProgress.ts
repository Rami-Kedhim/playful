
import { VerificationStatus } from "@/types/escort";

/**
 * Calculate verification progress percentage based on status
 */
export const calculateVerificationProgress = (status: VerificationStatus): number => {
  switch (status) {
    case 'pending':
      return 30;
    case 'in_review':
      return 60;
    case 'approved':
      return 100;
    case 'rejected':
      return 100;
    default:
      return 0;
  }
};

/**
 * Get user-friendly status message based on verification status
 */
export const getVerificationStatusMessage = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return 'Your verification request has been submitted and is in the queue for review. We\'ll notify you once it begins processing.';
    case 'in_review':
      return 'Our team is currently reviewing your verification documents. We\'ll update you once the review is complete.';
    case 'approved':
      return 'Congratulations! Your identity has been successfully verified. You now have full access to all platform features.';
    case 'rejected':
      return 'Unfortunately, your verification request was not approved. Please review the reason below and submit a new request with the necessary corrections.';
    default:
      return 'Unknown verification status.';
  }
};

/**
 * Get appropriate status title based on verification status
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

/**
 * Get estimated completion time based on verification status
 */
export const getEstimatedCompletionTime = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return '24-48 hours';
    case 'in_review':
      return '12-24 hours';
    case 'approved':
    case 'rejected':
      return 'Completed';
    default:
      return 'Unknown';
  }
};

/**
 * Check if verification is currently in progress
 */
export const isVerificationInProgress = (status: VerificationStatus): boolean => {
  return status === 'pending' || status === 'in_review';
};
