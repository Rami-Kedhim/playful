
/**
 * Calculate the verification assessment progress for an escort profile
 * @param verificationRequest The verification request object
 * @returns Progress percentage from 0-100
 */
export const calculateVerificationProgress = (
  verificationRequest?: any
): number => {
  if (!verificationRequest) return 0;
  
  // Simple initial implementation - in the future this could be more sophisticated
  // based on multiple stages of verification
  
  switch (verificationRequest.status) {
    case 'pending':
      return 50; // Request submitted but not yet reviewed
    case 'approved':
      return 100; // Verification completed successfully
    case 'rejected':
      return 25; // Request was rejected, partial progress
    default:
      return 0; // No verification or unknown status
  }
};

/**
 * Get a human-readable status message for verification
 * @param verificationRequest The verification request object
 * @returns Status message string
 */
export const getVerificationStatusMessage = (
  verificationRequest?: any
): string => {
  if (!verificationRequest) return "Not started";
  
  switch (verificationRequest.status) {
    case 'pending':
      return "Under review";
    case 'approved':
      return "Verified";
    case 'rejected':
      return "Verification rejected";
    default:
      return "Not started";
  }
};

/**
 * Determine if verification is currently in progress
 * @param verificationRequest The verification request object
 * @returns Boolean indicating if verification is in progress
 */
export const isVerificationInProgress = (
  verificationRequest?: any
): boolean => {
  if (!verificationRequest) return false;
  return verificationRequest.status === 'pending';
};
