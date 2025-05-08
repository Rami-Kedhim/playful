
export const getDocumentTypeLabel = (documentType: string): string => {
  switch (documentType) {
    case 'id':
      return 'ID Document';
    case 'selfie':
      return 'Selfie Photo';
    case 'address_proof':
      return 'Proof of Address';
    default:
      return 'Document';
  }
};

// Export enums as objects to fix errors in components using them as values
import { VerificationLevel, VerificationStatus } from '@/types/verification';

export const VerificationLevels = {
  NONE: 'none' as VerificationLevel,
  BASIC: 'basic' as VerificationLevel,
  VERIFIED: 'verified' as VerificationLevel,
  PREMIUM: 'premium' as VerificationLevel,
  ENHANCED: 'enhanced' as VerificationLevel
};

export const VerificationStatuses = {
  PENDING: VerificationStatus.PENDING,
  APPROVED: VerificationStatus.APPROVED,
  REJECTED: VerificationStatus.REJECTED,
  IN_REVIEW: VerificationStatus.IN_REVIEW,
  EXPIRED: VerificationStatus.EXPIRED,
  NONE: VerificationStatus.NONE
};

export { type VerificationLevel, VerificationStatus };
