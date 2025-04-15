
import { VerificationRequest, VerificationStatus } from "@/types/escort";

/**
 * Check if a verification request is pending
 */
export const isPending = (status: VerificationStatus): boolean => {
  return status === 'pending';
};

/**
 * Check if a verification request is approved
 */
export const isApproved = (status: VerificationStatus): boolean => {
  return status === 'approved';
};

/**
 * Check if a verification request is rejected
 */
export const isRejected = (status: VerificationStatus): boolean => {
  return status === 'rejected';
};

/**
 * Check if a verification request is expired
 */
export const isExpired = (request: VerificationRequest): boolean => {
  const expiryDate = new Date(request.submittedAt);
  expiryDate.setDate(expiryDate.getDate() + 30); // Assuming 30 days validity
  
  return new Date() > expiryDate;
};

/**
 * Create a new verification request
 */
export const createVerificationRequest = async (
  userId: string,
  documentUrls: string[]
): Promise<VerificationRequest> => {
  // In a real implementation, this would create a new verification request in the database
  
  // Convert string URLs to document objects
  const documents: VerificationDocument[] = documentUrls.map((url, index) => ({
    id: `doc-${index}`,
    type: 'id-verification',
    fileUrl: url,
    uploadedAt: new Date().toISOString(),
    status: 'pending'
  }));
  
  // Mock creating a verification request
  const request: VerificationRequest = {
    id: `verification-${Date.now()}`,
    userId,
    status: 'pending',
    verificationLevel: 'none', // Add the required verificationLevel property, starting with 'none'
    documents: documents,
    submittedAt: new Date().toISOString()
  };
  
  return request;
};

/**
 * Update the status of a verification request
 */
export const updateVerificationStatus = async (
  requestId: string,
  status: VerificationStatus,
  notes?: string
): Promise<boolean> => {
  // In a real implementation, this would update the status of a verification request in the database
  
  // Mock updating a verification request
  console.log(`Updating verification request ${requestId} to ${status}`, { notes });
  
  return true;
};
