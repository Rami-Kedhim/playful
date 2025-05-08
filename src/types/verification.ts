
export type VerificationLevel = "none" | "basic" | "verified" | "premium";

export type VerificationStatus = "pending" | "approved" | "rejected";

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  requestedLevel: VerificationLevel;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerId?: string;
  documents: VerificationDocument[];
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
