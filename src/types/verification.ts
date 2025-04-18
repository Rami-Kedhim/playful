
// Create this file to define verification types
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  verification_id?: string;
  document_type?: string;
  document_url?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
  
  // Additional fields used in various components
  profile_id?: string;
  requested_level?: VerificationLevel;
  created_at?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewedAt?: string;
  reviewed_by?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  expires_at?: string;
}
