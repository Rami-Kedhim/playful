
// Update the Verification types to fix errors
export type VerificationLevel = "none" | "basic" | "verified" | "premium" | "enhanced";

export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved", 
  REJECTED = "rejected",
  IN_REVIEW = "in_review",
  EXPIRED = "expired",
  NONE = "none"
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  requestedLevel: VerificationLevel;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerId?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  created_at?: Date;
  reviewer_notes?: string;
  profile_id?: string;
  requested_level?: VerificationLevel;
  reviewed_at?: Date;
  verificationLevel?: VerificationLevel;
}

export interface VerificationDocument {
  id: string;
  type: "id" | "selfie" | "address_proof" | "other";
  fileUrl: string;
  uploadedAt: Date;
  status: VerificationStatus;
  notes?: string;
  filePath?: string;
  documentType?: string;
}

// Define constants for verification levels
export const VerificationLevels = {
  NONE: "none" as VerificationLevel,
  BASIC: "basic" as VerificationLevel,
  VERIFIED: "verified" as VerificationLevel,
  PREMIUM: "premium" as VerificationLevel,
  ENHANCED: "enhanced" as VerificationLevel
};
