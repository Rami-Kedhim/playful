
import { VerificationRequest, VerificationStatus } from "@/types/escort";

// Check if a verification request is pending
export const isPending = (request?: VerificationRequest): boolean => {
  if (!request) return false;
  return request.status === 'pending';
};

// Check if a verification request is approved
export const isApproved = (request?: VerificationRequest): boolean => {
  if (!request) return false;
  return request.status === 'approved';
};

// Check if a verification request is rejected
export const isRejected = (request?: VerificationRequest): boolean => {
  if (!request) return false;
  return request.status === 'rejected';
};

// Check if a verification request has expired
export const isExpired = (request?: VerificationRequest): boolean => {
  if (!request) return false;
  
  // If there's a reviewedAt date, it's been processed and isn't expired
  if (request.reviewedAt) return false;
  
  // Check if it's been more than 30 days since submission
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - request.submittedAt.getTime() > thirtyDaysMs;
};

// Create a new verification request
export const createVerificationRequest = (
  escortId: string,
  documents: string[],
  escortUserId: string
): VerificationRequest => {
  return {
    id: `vr-${Date.now()}`,
    escortId,
    status: 'pending',
    documents,
    submittedAt: new Date(),
    userId: escortUserId
  };
};

// Update verification request status
export const updateVerificationStatus = (
  request: VerificationRequest,
  status: VerificationStatus,
  notes?: string
): VerificationRequest => {
  return {
    ...request,
    status,
    notes,
    reviewedAt: new Date()
  };
};
