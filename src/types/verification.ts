
// Update the Verification types to fix errors
export type VerificationLevel = "none" | "basic" | "verified" | "premium" | "enhanced";

export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved", 
  REJECTED = "rejected",
  IN_REVIEW = "in_review",
  EXPIRED = "expired",
  NONE = "none" // Add NONE to fix errors
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
  // Add these properties to fix errors
  requested_level?: VerificationLevel; // For backward compatibility
  reviewed_at?: Date; // For backward compatibility
  verificationLevel?: VerificationLevel; // For backward compatibility
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

// Add VerificationLevel as an enumeration (as some components use it this way)
export const VerificationLevels = {
  NONE: "none" as VerificationLevel,
  BASIC: "basic" as VerificationLevel,
  VERIFIED: "verified" as VerificationLevel,
  PREMIUM: "premium" as VerificationLevel,
  ENHANCED: "enhanced" as VerificationLevel
};
