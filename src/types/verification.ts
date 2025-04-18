
export interface VerificationDocument {
  id: string;
  document_type: string;
  file_path: string;
  uploaded_at: string;
  status: 'pending' | 'approved' | 'rejected';
  verification_request_id: string;
  reviewer_notes?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_level: 'basic' | 'advanced' | 'premium';
  created_at: string;
  documents?: VerificationDocument[];
  reviewer_notes?: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  PREMIUM = 'premium'
}

export interface VerificationStats {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  averageProcessingTime: number;
}
