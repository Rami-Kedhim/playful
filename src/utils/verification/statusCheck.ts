
import { supabase } from '@/integrations/supabase/client';
import { VerificationRequest, VerificationDocument, VerificationStatus } from '@/types/verification';

export const checkVerificationStatus = async (userId: string): Promise<{
  status: VerificationStatus | string;
  request?: VerificationRequest;
  documents?: VerificationDocument[];
}> => {
  try {
    const { data: verificationData, error: verificationError } = await supabase
      .from('verification_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (verificationError) {
      console.error('Error fetching verification status:', verificationError);
      return { status: VerificationStatus.PENDING };
    }
    
    if (!verificationData) {
      return { status: VerificationStatus.PENDING };
    }
    
    // Convert string status to enum
    let status: VerificationStatus | string = verificationData.status;
    
    // Map string statuses to enum values if needed
    if (status === 'pending') {
      status = VerificationStatus.PENDING;
    } else if (status === 'approved') {
      status = VerificationStatus.APPROVED;
    } else if (status === 'rejected') {
      status = VerificationStatus.REJECTED;
    } else if (status === 'in_review') {
      status = VerificationStatus.IN_REVIEW;
    }
    
    // Fetch documents
    const { data: documents, error: documentsError } = await supabase
      .from('verification_documents')
      .select('*')
      .eq('verification_id', verificationData.id);
    
    if (documentsError) {
      console.error('Error fetching verification documents:', documentsError);
      return { status, request: verificationData };
    }
    
    // Normalize documents
    const normalizedDocuments: VerificationDocument[] = documents ? documents.map(doc => ({
      id: doc.id,
      documentType: doc.document_type,
      document_type: doc.document_type,
      fileUrl: doc.file_url,
      file_url: doc.file_url,
      status: doc.status,
      uploadedAt: doc.uploaded_at,
      uploaded_at: doc.uploaded_at,
      verification_id: doc.verification_id
    })) : [];
    
    return {
      status,
      request: verificationData as VerificationRequest,
      documents: normalizedDocuments
    };
  } catch (error) {
    console.error('Error in checkVerificationStatus:', error);
    return { status: VerificationStatus.PENDING };
  }
};

export const getVerificationRequest = async (requestId: string): Promise<VerificationRequest> => {
  const { data, error } = await supabase
    .from('verification_requests')
    .select('*')
    .eq('id', requestId)
    .single();
  
  if (error) {
    console.error('Error fetching verification request:', error);
    throw error;
  }
  
  return {
    ...data,
    updated_at: data.updated_at || new Date().toISOString()
  } as VerificationRequest;
};
