
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface VerificationRequest {
  id: string;
  profile_id?: string;
  requested_level: VerificationLevel;
  status: VerificationStatus | string;
  documents?: any[];
  created_at: string | Date;
  updated_at?: string | Date;
  reviewed_at?: string | Date;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string | Date;
  submittedAt?: string | Date;
  verificationLevel?: VerificationLevel;
}
