
import { supabase } from '@/integrations/supabase/client';
import { VerificationStatus, VerificationRequest, VerificationDocument } from '@/types/verification';

/**
 * Check the status of a user's verification request
 * @param userId User ID to check
 * @returns The verification status or null if no request found
 */
export async function checkVerificationStatus(userId: string): Promise<VerificationStatus | null> {
  try {
    // In a real app, we'd check the database for the user's verification status
    // This is a mock implementation
    const response = await getMockVerificationRequest(userId);
    
    if (response) {
      // Convert string to enum
      return response.status as VerificationStatus;
    }
    
    return null;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return null;
  }
}

/**
 * Get details of a user's verification request
 * @param userId User ID to check
 * @returns The verification request object or null if not found
 */
export async function getVerificationRequest(userId: string): Promise<VerificationRequest | null> {
  try {
    // In a real app, we'd fetch this from Supabase
    // This is a mock implementation
    return getMockVerificationRequest(userId);
  } catch (error) {
    console.error('Error getting verification request:', error);
    return null;
  }
}

// Helper functions for status checking
export function isPending(status: VerificationStatus): boolean {
  return status === VerificationStatus.PENDING;
}

export function isApproved(status: VerificationStatus): boolean {
  return status === VerificationStatus.APPROVED;
}

export function isRejected(status: VerificationStatus): boolean {
  return status === VerificationStatus.REJECTED;
}

export function isExpired(status: VerificationStatus): boolean {
  return status === VerificationStatus.EXPIRED;
}

export function createVerificationRequest(userId: string, level: string): Promise<VerificationRequest> {
  // Mock implementation
  return Promise.resolve({
    id: `ver-${userId}`,
    status: VerificationStatus.PENDING,
    userId,
    submittedAt: new Date().toISOString(),
    documents: [],
    requestedLevel: level
  } as unknown as VerificationRequest);
}

export function updateVerificationStatus(requestId: string, status: VerificationStatus): Promise<void> {
  console.log(`Updating request ${requestId} to status ${status}`);
  return Promise.resolve();
}

// Helper function to generate mock verification data
function getMockVerificationRequest(userId: string): Promise<VerificationRequest | null> {
  // Simulate an API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random status based on user ID
      const lastChar = userId.slice(-1);
      const numValue = parseInt(lastChar, 16) || 0;
      
      let status: VerificationStatus;
      if (numValue < 5) {
        status = VerificationStatus.PENDING;
      } else if (numValue < 10) {
        status = VerificationStatus.APPROVED;
      } else if (numValue < 13) {
        status = VerificationStatus.REJECTED;
      } else {
        status = VerificationStatus.IN_REVIEW;
      }
      
      const documents: VerificationDocument[] = [
        {
          id: `doc-front-${userId}`,
          document_type: 'id_card',
          document_url: 'https://example.com/mock-doc.jpg',
          status: status,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          type: 'id_card',
          fileUrl: 'https://example.com/mock-doc.jpg',
          uploadedAt: new Date(Date.now() - 86400000).toISOString()
        } as VerificationDocument,
        {
          id: `doc-selfie-${userId}`,
          document_type: 'selfie',
          document_url: 'https://example.com/mock-selfie.jpg',
          status: status,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          type: 'selfie',
          fileUrl: 'https://example.com/mock-selfie.jpg',
          uploadedAt: new Date(Date.now() - 86400000).toISOString()
        } as VerificationDocument
      ];
      
      resolve({
        id: `ver-${userId}`,
        profile_id: userId,
        status: status,
        requested_level: 'basic',
        documents: documents,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        userId: userId,
        submittedAt: new Date(Date.now() - 86400000).toISOString()
      } as VerificationRequest);
    }, 500);
  });
}
