
export enum VerificationStatus {
  NONE = 'none',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license' | 'selfie' | string;

export interface VerificationDocument {
  id: string;
  documentType: DocumentType;
  fileUrl: string;
  uploadedAt: string;
  status: VerificationStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  profile_id?: string; // legacy compat
  status: VerificationStatus;
  verificationLevel?: VerificationLevel;
  requested_level?: VerificationLevel; // legacy compat
  documents: VerificationDocument[];
  submittedAt?: string;
  created_at?: string; // legacy compat
  updatedAt?: string;
  updated_at?: string; // legacy compat
  rejectionReason?: string;
  reviewer_notes?: string;
  reviewedBy?: string;
  reviewed_at?: string | Date;
  reviewedAt?: string | Date;
}
