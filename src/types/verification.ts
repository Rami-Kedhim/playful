
export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  VERIFIED = "verified",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

export const VERIFICATION_LEVELS = {
  NONE: "none" as VerificationLevel,
  BASIC: "basic" as VerificationLevel,
  VERIFIED: "verified" as VerificationLevel,
  ENHANCED: "enhanced" as VerificationLevel,
  PREMIUM: "premium" as VerificationLevel,
};

// Compatibility alias for components using the old reference
export const VERIFICATION_LEVEL = VERIFICATION_LEVELS;

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  documents: VerificationDocument[];
  verificationLevel: VerificationLevel;
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}

// Add any additional verification-related types here
