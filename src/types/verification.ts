
export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  VERIFIED = "verified",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

export interface VerificationRequest {
  id: string;
  userId: string;
  documentType: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  selfieImageUrl?: string;
  status: "pending" | "approved" | "rejected";
  requestedLevel: VerificationLevel;
  verificationLevel?: VerificationLevel;
  submittedAt: string;
  processedAt?: string;
  notes?: string;
  rejectionReason?: string;
}

export interface VerificationStatus {
  userId: string;
  level: VerificationLevel;
  isVerified: boolean;
  lastUpdated: string;
  expiresAt?: string;
  pendingRequests: number;
}
