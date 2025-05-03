
// Verification Types
export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

export enum VerificationStatus {
  NONE = "none",
  PENDING = "pending",
  IN_REVIEW = "in_review", // Added IN_REVIEW status
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired"
}

export interface VerificationDocument {
  id: string;
  type: string;
  filePath: string;
  status: VerificationStatus;
  uploadedAt: Date;
  reviewedAt?: Date;
  
  // Adding properties used in components
  documentType?: string;
  fileUrl?: string;
  // For backward compatibility
  verification_request_id?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  requestedLevel: VerificationLevel;
  submittedAt: Date;
  reviewedAt?: Date;
  documents: VerificationDocument[];
  notes?: string;
  
  // Adding properties for backward compatibility and used in components
  profile_id?: string;
  requested_level?: VerificationLevel;
  created_at?: string;
  reviewed_at?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  verificationLevel?: VerificationLevel;
  // Additional properties referenced in the code
  reviewer_id?: string;
}
