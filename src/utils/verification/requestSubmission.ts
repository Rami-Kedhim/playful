
import { toast } from "@/components/ui/use-toast";

export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  verificationId?: string;
}

/**
 * Check if a user is eligible to submit a verification request
 */
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  try {
    // In a real implementation, this would check against a backend API
    // For now, we'll simulate a response
    
    // Simulate checking if user has a pending request
    const hasPendingRequest = Math.random() > 0.8;
    if (hasPendingRequest) {
      return {
        canSubmit: false,
        reason: "You already have a pending verification request. Please wait for it to be processed."
      };
    }
    
    // Simulate checking if user has been rejected recently
    const wasRecentlyRejected = Math.random() > 0.9;
    if (wasRecentlyRejected) {
      return {
        canSubmit: false,
        reason: "Your verification was recently rejected. You must wait 7 days before submitting again."
      };
    }
    
    return { canSubmit: true };
  } catch (error) {
    console.error("Error checking verification eligibility:", error);
    return {
      canSubmit: false,
      reason: "Could not check eligibility. Please try again later."
    };
  }
};

/**
 * Submit a verification request with document images
 */
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  documentFrontImage: File,
  documentBackImage: File | null,
  selfieImage: File
): Promise<VerificationSubmissionResponse> => {
  try {
    // In a real implementation, this would upload the files to a storage service
    // and then create a verification request in the database
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate document processing
    const documentUrls = ["front_id_url", documentBackImage ? "back_id_url" : null, "selfie_url"].filter(Boolean);
    
    // In a real app, this would be a call to a backend API
    console.log("Verification request submitted", {
      userId,
      documentType,
      documentUrls
    });
    
    // Simulate random success/failure
    const isSuccessful = Math.random() > 0.2;
    
    if (!isSuccessful) {
      return {
        success: false,
        message: "There was an error processing your verification documents. Please try again."
      };
    }
    
    return {
      success: true,
      message: "Your verification request has been submitted successfully.",
      verificationId: "mock-verification-id"
    };
  } catch (error) {
    console.error("Error submitting verification request:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
};
