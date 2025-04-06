import { VerificationRequest } from "@/types/escort";

/**
 * Calculate the verification progress as a percentage
 */
export const calculateVerificationProgress = (request: VerificationRequest): number => {
  switch (request.status) {
    case 'pending':
      return 25;
    case 'in_review':
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
 * Get a user-friendly message about the verification status
 */
export const getVerificationStatusMessage = (request: VerificationRequest): string => {
  switch (request.status) {
    case 'pending':
      return 'Your verification is pending review. This typically takes 24-48 hours.';
    case 'in_review':
      return 'Your verification is being reviewed by our team.';
    case 'approved':
      return 'Your verification has been approved. Your profile now shows as verified.';
    case 'rejected':
      return 'Your verification was not approved. Please check your documents and try again.';
    default:
      return 'Unknown verification status.';
  }
};

/**
 * Check if verification is in progress (pending or in_review)
 */
export const isVerificationInProgress = (request: VerificationRequest): boolean => {
  return request.status === 'pending' || request.status === 'in_review';
};
