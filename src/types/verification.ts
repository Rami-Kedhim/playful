
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
}
