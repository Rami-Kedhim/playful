
import { VerificationDocument, VerificationRequest, VerificationStatus } from '@/types/verification';

export const isPending = (status?: VerificationStatus): boolean => {
  return status === 'pending' || status === 'in_review';
};

export const isApproved = (status?: VerificationStatus): boolean => {
  return status === 'approved';
};

export const isRejected = (status?: VerificationStatus): boolean => {
  return status === 'rejected';
};

export const isExpired = (status?: VerificationStatus): boolean => {
  return status === 'expired';
};

// Mock function to create a verification request
export const createVerificationRequest = async (
  userId: string,
  documentUrls: string[]
): Promise<VerificationRequest | null> => {
  try {
    const request: VerificationRequest = {
      id: `req-${Date.now()}`,
      profile_id: userId,
      status: 'pending',
      requested_level: 'basic',
      documents: documentUrls.map((url, index) => ({
        id: `doc-${Date.now()}-${index}`,
        verification_id: `ver-${Date.now()}`,
        document_type: index === 0 ? 'id_front' : index === 1 ? 'id_back' : 'selfie',
        document_url: url,
        status: 'pending',
        created_at: new Date().toISOString(),
        // Backward compatibility fields
        type: index === 0 ? 'id_front' : index === 1 ? 'id_back' : 'selfie',
        fileUrl: url,
        uploadedAt: new Date().toISOString()
      })),
      created_at: new Date().toISOString(),
    };
    
    // In a real app this would be saved to a database
    console.log('Created verification request:', request);
    
    return request;
  } catch (error) {
    console.error('Error creating verification request:', error);
    return null;
  }
};

// Mock function to update verification status
export const updateVerificationStatus = async (
  requestId: string,
  status: VerificationStatus,
  notes?: string
): Promise<boolean> => {
  try {
    // In a real app this would update a database record
    console.log(`Updated verification ${requestId} to ${status}${notes ? ` with notes: ${notes}` : ''}`);
    return true;
  } catch (error) {
    console.error('Error updating verification status:', error);
    return false;
  }
};
