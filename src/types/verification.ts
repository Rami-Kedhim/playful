
export type VerificationLevel = "none" | "basic" | "verified" | "premium";

export interface VerificationRequest {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
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
  status: "pending" | "approved" | "rejected";
  notes?: string;
}
