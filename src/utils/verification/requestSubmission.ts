
import { VerificationEligibilityResponse, VerificationSubmissionResponse } from "./types";
import { uploadVerificationDocuments } from "./documentUpload";
import { createVerificationRequest } from "./statusCheck";

/**
 * Check if a user can submit a verification request
 */
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  // In a real app, this would check against an API
  // For now, we'll simulate a successful response
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    canSubmit: true,
    reason: undefined
  };
};

/**
 * Submit verification request to the API
 */
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  documentFrontImage: File,
  documentBackImage?: File | null,
  selfieImage?: File
): Promise<VerificationSubmissionResponse> => {
  try {
    // In a real app, this would submit to an API endpoint
    
    // 1. Upload documents to storage
    const documents: File[] = [
      documentFrontImage
    ];
    
    if (documentBackImage) {
      documents.push(documentBackImage);
    }
    
    if (selfieImage) {
      documents.push(selfieImage);
    }
    
    const documentUrls = await uploadVerificationDocuments(documents);
    
    // 2. Create verification request
    const request = await createVerificationRequest(userId, documentUrls, documentType);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: "Verification request submitted successfully",
      requestId: request.id
    };
  } catch (error) {
    console.error("Error submitting verification:", error);
    return {
      success: false,
      message: "Failed to submit verification request"
    };
  }
};
