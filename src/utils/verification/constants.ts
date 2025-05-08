
import { VerificationLevel, VerificationStatus } from '@/types/verification';

// Export these values for use in components that reference VerificationLevel directly
export const VERIFICATION_LEVEL = {
  NONE: VerificationLevel.NONE,
  BASIC: VerificationLevel.BASIC,
  ENHANCED: VerificationLevel.ENHANCED,
  PREMIUM: VerificationLevel.PREMIUM,
  VERIFIED: VerificationLevel.VERIFIED
};

// Export for components using VerificationStatus directly
export const VERIFICATION_STATUS = {
  NONE: VerificationStatus.NONE,
  PENDING: VerificationStatus.PENDING,
  IN_REVIEW: VerificationStatus.IN_REVIEW,
  APPROVED: VerificationStatus.APPROVED,
  REJECTED: VerificationStatus.REJECTED,
  EXPIRED: VerificationStatus.EXPIRED
};
