
import { VerificationDocument, VerificationRequest, VerificationStatus } from '@/types/verification';
import { VerificationEligibilityResponse, VerificationSubmissionResponse } from '@/types/verification';

// Common function to check if user can submit verification
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  // In a real app, this would check with the backend
  // For now we'll just return true
  return {
    canSubmit: true
  };
};

// Function to submit verification request
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  frontImage: File,
  backImage: File | null,
  selfieImage: File
): Promise<VerificationSubmissionResponse> => {
  try {
    // In a real app, we'd upload these files to storage
    // And then create a verification request in the database
    
    // Simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: "Verification request submitted successfully!",
      requestId: `verification-${Date.now()}`
    };
  } catch (error) {
    console.error("Error submitting verification request:", error);
    return {
      success: false,
      message: "Failed to submit verification request. Please try again later."
    };
  }
};

// Export other verification helpers
export * from './verification/statusCheck';
export * from './verification/requestSubmission';
export * from './verification/documentUpload';
