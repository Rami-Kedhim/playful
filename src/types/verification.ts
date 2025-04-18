
// Types for verification functionality

export interface VerificationDocument {
  id: string;
  document_type: string;
  url?: string;
  fileUrl?: string;
  file_path?: string;
  uploaded_at: Date | string;
  status: string;
  user_id?: string;
  verification_request_id?: string;
  reviewed_by?: string;
  reviewed_at?: Date | string;
  reviewer_notes?: string;
}

export interface VerificationRequest {
  id: string;
  user_id?: string;
  profile_id?: string; // For backwards compatibility
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  reviewed_at?: Date | string;
  submitted_at?: Date | string;
  reviewer_notes?: string;
  rejection_reason?: string;
  rejected_reason?: string; // For backwards compatibility
  requested_level?: string;
  level?: string; // For backwards compatibility
  documents?: VerificationDocument[];
}

export enum VerificationStatus {
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
  PREMIUM = 'premium'
}
