
import { VerificationFormValues, VerificationSubmissionResponse } from '@/types/verification';

export const submitVerificationForm = async (
  userId: string,
  formData: VerificationFormValues
): Promise<VerificationSubmissionResponse> => {
  // In a real app, this would upload files to storage and create a verification request
  console.log('Submitting verification form:', formData);
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Verification request submitted successfully',
      requestId: `vr-${Date.now()}`
    };
  } catch (error) {
    console.error('Error submitting verification form:', error);
    return {
      success: false,
      message: 'Failed to submit verification request'
    };
  }
};
