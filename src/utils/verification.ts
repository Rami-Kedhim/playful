
import { VerificationEligibilityResponse, VerificationSubmissionResponse } from '@/types/verification';

// Function to check if a user is eligible to submit a verification request
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  // In a real app, this would make an API call to check eligibility
  // For demonstration purposes, we'll simulate success
  return {
    canSubmit: true,
    reason: null
  };
};

// Function to submit a verification request
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  documentFrontImage?: File | null,
  documentBackImage?: File | null,
  selfieImage?: File | null
): Promise<VerificationSubmissionResponse> => {
  // In a real app, this would upload files and create a verification request
  // For demonstration purposes, we'll simulate success
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if required files are present
  if (!documentFrontImage || !selfieImage) {
    return {
      success: false,
      message: 'Missing required documents'
    };
  }
  
  console.log(`Submitting verification for user ${userId}`);
  console.log(`Document type: ${documentType}`);
  console.log(`Front image: ${documentFrontImage.name}`);
  if (documentBackImage) {
    console.log(`Back image: ${documentBackImage.name}`);
  }
  console.log(`Selfie image: ${selfieImage.name}`);
  
  return {
    success: true,
    message: 'Your verification request has been submitted successfully',
    requestId: `req-${Math.random().toString(36).substring(2, 10)}`
  };
};

// Check a user's verification status
export const checkVerificationStatus = async (userId: string) => {
  // In a real app, this would make an API call to check verification status
  // For demonstration purposes, we'll simulate a random status
  const statuses = ['pending', 'in_review', 'approved', 'rejected'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    status: randomStatus,
    lastRequest: randomStatus !== 'pending' ? {
      id: `req-${Math.random().toString(36).substring(2, 10)}`,
      profile_id: userId,
      status: randomStatus,
      requested_level: 'basic',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    } : null
  };
};
