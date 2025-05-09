
// Verification system types

export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  VERIFIED = "verified",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  filePath?: string;
  documentType?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  requested_level?: string;
  requestedLevel?: string;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  created_at?: string;
  rejectionReason?: string;
  reviewed_at?: string;
}

export interface VerificationChecks {
  hasPhoneVerification?: boolean;
  hasEmailVerification?: boolean;
  hasPaymentVerification?: boolean;
  hasCommunityReviews?: boolean;
}

export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

export interface VerificationStatusResponse {
  status: VerificationStatus;
  lastRequest?: VerificationRequest;
}
