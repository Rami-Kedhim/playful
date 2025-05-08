
export type VerificationLevel = "none" | "basic" | "verified" | "premium";

export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved", 
  REJECTED = "rejected",
  IN_REVIEW = "in_review",
  EXPIRED = "expired"
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  requestedLevel: VerificationLevel;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerId?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  created_at?: Date; // For backward compatibility
  reviewer_notes?: string; // For backward compatibility 
  profile_id?: string; // For backward compatibility
}

export interface VerificationDocument {
  id: string;
  type: "id" | "selfie" | "address_proof" | "other";
  fileUrl: string;
  uploadedAt: Date;
  status: VerificationStatus;
  notes?: string;
  // Add compatibility fields for components that use these properties
  filePath?: string;
  documentType?: string;
}
