
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

/**
 * Get estimated time remaining for verification review
 */
export const getEstimatedTimeRemaining = (request?: VerificationRequest | null): string => {
  if (!request || request.status !== 'pending') return '';
  
  // Calculate hours since submission
  const submittedAt = new Date(request.submittedAt);
  const now = new Date();
  const hoursSinceSubmission = Math.floor((now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60));
  
  // Assuming 48 hours max for review
  const remainingHours = Math.max(0, 48 - hoursSinceSubmission);
  
  if (remainingHours <= 0) {
    return 'Review taking longer than expected';
  } else if (remainingHours < 24) {
    return `Estimated ${remainingHours} hour${remainingHours !== 1 ? 's' : ''} remaining`;
  } else {
    const days = Math.floor(remainingHours / 24);
    const hours = remainingHours % 24;
    return `Estimated ${days} day${days !== 1 ? 's' : ''} ${hours > 0 ? `and ${hours} hour${hours !== 1 ? 's' : ''}` : ''} remaining`;
  }
};

/**
 * Get a descriptive status text for verification
 */
export const getVerificationStatusDescription = (status: VerificationStatus): string => {
  switch (status) {
    case 'pending':
      return 'Your documents are being reviewed by our verification team.';
    case 'approved':
      return 'Congratulations! Your identity has been verified.';
    case 'rejected':
      return 'Unfortunately, your verification was not approved.';
    default:
      return 'Complete verification to unlock all platform features.';
  }
};

/**
 * Check if verification documents are complete and valid
 */
export const areVerificationDocumentsComplete = (request?: VerificationRequest | null): boolean => {
  if (!request) return false;
  
  // Check if we have at least 2 documents (ID front and selfie minimum)
  if (request.documents.length < 2) return false;
  
  // Check if any document has an error status
  const hasErrors = request.documents.some(doc => doc.status === 'rejected');
  
  return !hasErrors;
};
