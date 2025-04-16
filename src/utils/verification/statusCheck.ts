
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
      return response.status;
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
        status = 'pending';
      } else if (numValue < 10) {
        status = 'approved';
      } else if (numValue < 13) {
        status = 'rejected';
      } else {
        status = 'in_review';
      }
      
      const documents: VerificationDocument[] = [
        {
          id: `doc-front-${userId}`,
          verification_id: `ver-${userId}`,
          document_type: 'id_card',
          document_url: 'https://example.com/mock-doc.jpg',
          status: status,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          type: 'id_card',
          fileUrl: 'https://example.com/mock-doc.jpg',
          uploadedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: `doc-selfie-${userId}`,
          verification_id: `ver-${userId}`,
          document_type: 'selfie',
          document_url: 'https://example.com/mock-selfie.jpg',
          status: status,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          type: 'selfie',
          fileUrl: 'https://example.com/mock-selfie.jpg',
          uploadedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      resolve({
        id: `ver-${userId}`,
        profile_id: userId,
        status: status,
        requested_level: 'basic',
        documents: documents,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString(),
        userId: userId,
        submittedAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      });
    }, 500);
  });
}
