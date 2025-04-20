import { VerificationFormValues, VerificationSubmissionResponse, VerificationEligibilityResponse } from '@/types/verification';
import { uploadVerificationDocument } from './documentUpload';

/**
 * Check if a user can submit verification
 * @param userId User ID to check
 * @returns Eligibility response
 */
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  // In a real app, this would check if the user has already submitted verification
  // or if they're on cooldown after a rejection
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, allow all verification submissions
    return {
      canSubmit: true
    };
  } catch (error) {
    console.error('Error checking verification eligibility:', error);
    return {
      canSubmit: false,
      reason: 'Unable to check eligibility at this time'
    };
  }
};

/**
 * Submit verification request
 * @param userId User ID
 * @param documentType The type of document
 * @param frontImage Front image of ID
 * @param backImage Back image of ID (optional for passport)
 * @param selfieImage Selfie image
 * @returns Submission response
 */
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  frontImage: File,
  backImage: File | null,
  selfieImage: File
): Promise<VerificationSubmissionResponse> => {
  try {
    // Upload documents
    const [frontUrl, backUrl, selfieUrl] = await Promise.all([
      uploadVerificationDocument(frontImage, `${documentType}_front`, userId),
      backImage ? uploadVerificationDocument(backImage, `${documentType}_back`, userId) : Promise.resolve(null),
      uploadVerificationDocument(selfieImage, 'selfie', userId)
    ]);
    
    // In a real app, this would create a verification request record
    
    return {
      success: true,
      message: 'Verification request submitted successfully',
      requestId: `vr-${Date.now()}`
    };
  } catch (error) {
    console.error('Error submitting verification request:', error);
    return {
      success: false,
      message: 'Failed to submit verification request'
    };
  }
};

/**
 * Submit verification form
 * Wrapper function for submitVerificationRequest to handle form data
 */
export const submitVerificationForm = async (
  userId: string,
  formData: VerificationFormValues
): Promise<VerificationSubmissionResponse> => {
  // In a real app, this would upload files to storage and create a verification request
  console.log('Submitting verification form:', formData);
  
  try {
    return await submitVerificationRequest(
      userId,
      formData.documentType,
      formData.documentFrontImage.file!,
      formData.documentBackImage?.file || null,
      formData.selfieImage.file!
    );
  } catch (error) {
    console.error('Error submitting verification form:', error);
    return {
      success: false,
      message: 'Failed to submit verification request'
    };
  }
};
