
export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  VERIFIED = "verified",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

// Make VerificationStatus an enum so it can be used as a value
export enum VerificationStatus {
  NONE = "none",
  PENDING = "pending",
  IN_REVIEW = "in_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired"
}

export interface VerificationDocument {
  id: string;
  type: string;
  documentType?: string;
  fileUrl: string;
  filePath?: string;
  uploadedAt: Date | string;
  status: string | VerificationStatus;
  notes?: string;
  verification_request_id?: string;
  reviewer_notes?: string;
  reviewed_at?: Date | string;
  reviewed_by?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string;
  documentType?: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  selfieImageUrl?: string;
  status: string | VerificationStatus;
  requestedLevel: VerificationLevel | string;
  requested_level?: VerificationLevel | string;
  verificationLevel?: VerificationLevel;
  submittedAt: string | Date;
  created_at?: string;
  processedAt?: string;
  notes?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  reviewed_at?: string | Date;
  reviewed_by?: string;
  documents?: VerificationDocument[];
  expires_at?: string | Date;
  reviewedAt?: string | Date; // Allow both naming conventions
}

export interface VerificationStatusInfo {
  userId: string;
  level: VerificationLevel;
  isVerified: boolean;
  lastUpdated: string;
  expiresAt?: string;
  pendingRequests: number;
  status?: string | VerificationStatus;
}

// Export VerificationLevels for ProfilePage.tsx
export const VerificationLevels = VerificationLevel;
