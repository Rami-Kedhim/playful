
// Fix imports of VerificationRequest and VerificationStatus from '@/types/verification'

import { VerificationRequest, VerificationStatus } from '@/types/verification';

/**
 * Additional verification information
 */
export interface VerificationChecks {
  hasPhoneVerification?: boolean;
  hasEmailVerification?: boolean;
  hasPaymentVerification?: boolean;
  hasCommunityReviews?: boolean;
}

/**
 * Response for verification eligibility check
 */
export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number; // in hours
}

/**
 * Response for verification submission
 */
export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

/**
 * Verification status check response
 */
export interface VerificationStatusResponse {
  status: VerificationStatus;
  lastRequest?: VerificationRequest;
}

