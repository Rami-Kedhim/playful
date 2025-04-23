
// Remove imports of non-existent types and add minimal typing in function signatures

import { uploadVerificationDocument } from './documentUpload';

/**
 * Check if a user can submit verification
 * @param userId User ID to check
 * @returns Eligibility response
 */
export const canSubmitVerification = async (userId: string): Promise<{ canSubmit: boolean; reason?: string; cooldownRemaining?: number }> => {
  // Simulate API call and allow all submissions
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { canSubmit: true };
  } catch (error) {
    console.error('Error checking verification eligibility:', error);
    return { canSubmit: false, reason: 'Unable to check eligibility at this time' };
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
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  try {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('frontImage', frontImage);
    if (backImage) formData.append('backImage', backImage);
    formData.append('selfieImage', selfieImage);
    
    // Call the process-verification edge function
    const response = await fetch(`https://haffqtqpbnaviefewfmn.supabase.co/functions/v1/process-verification`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
      }
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit verification request');
    }
    
    return {
      success: true,
      message: 'Verification submitted successfully',
      requestId: result.verificationId
    };
  } catch (error) {
    console.error('Error submitting verification request:', error);
    return { success: false, message: 'Failed to submit verification request' };
  }
};

/**
 * Submit verification form
 * Wrapper function for submitVerificationRequest to handle form data
 */
export const submitVerificationForm = async (
  userId: string,
  formData: any
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  console.log('Submitting verification form:', formData);
  try {
    return await submitVerificationRequest(
      userId,
      formData.documentType,
      formData.documentFrontImage.file,
      formData.documentBackImage?.file || null,
      formData.selfieImage.file
    );
  } catch (error) {
    console.error('Error submitting verification form:', error);
    return { success: false, message: 'Failed to submit verification request' };
  }
};
