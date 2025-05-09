
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

export enum VerificationStatus {
  PENDING = "pending",
  IN_REVIEW = "in_review",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export interface VerificationDocument {
  id: string;
  type: string;
  documentType?: string; // Added for DocumentPreview component
  fileUrl: string;
  filePath?: string; // Added for DocumentPreview component
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  notes?: string; // Added for DocumentPreview component
  reviewer_notes?: string; // Added for consistency
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string; // Added for compatibility
  status: VerificationStatus | string;
  documents: VerificationDocument[];
  verificationLevel: VerificationLevel;
  requested_level?: VerificationLevel; // Added for compatibility
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}
