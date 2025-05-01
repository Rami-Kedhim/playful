
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export enum VerificationStatus {
  NONE = 'none',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license' | 'residence_permit' | 'selfie' | string;

export interface VerificationDocument {
  id: string;
  documentType: DocumentType;
  fileUrl: string;
  uploadedAt: string;
  status: VerificationStatus | string;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string | Date;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  profile_id?: string;
  requested_level: VerificationLevel;
  status: VerificationStatus | string;
  documents?: VerificationDocument[];
  created_at: string | Date;
  updated_at?: string | Date;
  reviewed_at?: string | Date;
  reviewedAt?: string | Date;
  reviewed_by?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  expires_at?: string | Date;
  submittedAt?: string | Date;
  verificationLevel?: VerificationLevel;
}
