
export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  IN_REVIEW = "in_review",
  INCOMPLETE = "incomplete"
}

export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  STANDARD = "standard",
  PREMIUM = "premium",
  ELITE = "elite"
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: string;
  verification_id: string;
  document_type: string;
  document_url?: string;
  file_url?: string;
  fileUrl?: string;
  created_at?: string;
  uploaded_at?: string; // Added for backward compatibility
}

export interface VerificationRequest {
  id: string;
  userId: string;
  level: VerificationLevel;
  status: VerificationStatus;
  documents: VerificationDocument[];
  createdAt: string;
  updatedAt: string;
  reviewer_id?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  reviewerNotes?: string;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  expiration_date?: string;
  profile_id?: string;
  profileId?: string;
}

export const DOCUMENT_REQUIREMENTS = {
  [VerificationLevel.BASIC]: ['id_front', 'selfie'],
  [VerificationLevel.STANDARD]: ['id_front', 'id_back', 'selfie', 'proof_of_address'],
  [VerificationLevel.PREMIUM]: ['id_front', 'id_back', 'selfie', 'proof_of_address', 'professional_photo'],
  [VerificationLevel.ELITE]: ['id_front', 'id_back', 'selfie', 'proof_of_address', 'professional_photo', 'background_check']
};
