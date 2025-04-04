
import { VerificationStatus, VerificationRequest } from "@/types/escort";

/**
 * Check if verification status is pending
 * @param status The verification status
 */
export const isPending = (status?: VerificationStatus): boolean => {
  return status === 'pending';
};

/**
 * Check if verification status is approved
 * @param status The verification status
 */
export const isApproved = (status?: VerificationStatus): boolean => {
  return status === 'approved';
};

/**
 * Check if verification status is rejected
 * @param status The verification status
 */
export const isRejected = (status?: VerificationStatus): boolean => {
  return status === 'rejected';
};

/**
 * Check if verification is expired
 * @param request The verification request
 */
export const isExpired = (request?: VerificationRequest): boolean => {
  if (!request || !request.submittedAt || !request.id) return false;
  
  const submittedDate = new Date(request.submittedAt);
  const expiryDate = new Date(submittedDate);
  expiryDate.setDate(expiryDate.getDate() + 30); // Assuming 30 days validity
  
  return new Date() > expiryDate;
};

/**
 * Create a verification request
 * @param userId The user ID
 * @param documents Array of document URLs
 * @param documentType Type of document
 */
export const createVerificationRequest = async (
  userId: string,
  documents: string[],
  documentType: string
): Promise<VerificationRequest> => {
  // In a real app, this would send to an API
  // For now, we'll simulate it with a local object
  
  const verificationRequest: VerificationRequest = {
    id: `vr-${Date.now()}`,
    escortId: userId,
    status: 'pending',
    documents,
    submittedAt: new Date(),
    documentType,
    userId
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return verificationRequest;
};

/**
 * Update verification status
 * @param requestId The request ID
 * @param status The new status
 */
export const updateVerificationStatus = async (
  requestId: string,
  status: VerificationStatus
): Promise<boolean> => {
  // In a real app, this would send to an API
  // For now, we'll just simulate success
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true;
};
