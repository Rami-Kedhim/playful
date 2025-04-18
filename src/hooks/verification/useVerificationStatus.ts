
import { useState, useEffect } from 'react';
import { VerificationRequest, VerificationDocument, DocumentType } from '@/types/verification';
import verificationService from '@/services/verificationService';

export const useVerificationStatus = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        setLoading(true);
        const userRequest = await verificationService.getVerificationRequest(userId);
        
        if (userRequest) {
          // Create a request object without the documentType property
          const requestData = {
            id: userRequest.id,
            user_id: userId,
            status: userRequest.status,
            documents: userRequest.documents || [],
            // Include other properties as needed, making sure they match the VerificationRequest type
          };
          
          setRequest(requestData as VerificationRequest);
          
          // If the request has documents, set them
          if (userRequest.documents && userRequest.documents.length > 0) {
            setDocuments(userRequest.documents);
          } else if (userRequest.documentIds && userRequest.documentIds.length > 0) {
            const docs = await verificationService.getDocuments(userRequest.documentIds);
            setDocuments(docs);
          }
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch verification status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchVerificationStatus();
    }
  }, [userId]);

  // Submit a new document
  const submitDocument = async (documentFile: File, documentType: DocumentType) => {
    setLoading(true);
    try {
      if (!request) {
        // Create a new verification request first
        const newRequest = await verificationService.createVerificationRequest(userId);
        setRequest(newRequest);
      }
      
      // Upload the document
      const document = await verificationService.uploadDocument({
        user_id: userId,
        document_type: documentType,
        file: documentFile,
        verification_request_id: request?.id || '',
      });
      
      // Update the documents list
      setDocuments(prev => [...prev, document]);
      return document;
    } catch (err) {
      setError('Failed to submit document');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Submit the verification request for review
  const submitVerificationRequest = async () => {
    if (!request) {
      setError('No verification request to submit');
      return;
    }
    
    setLoading(true);
    try {
      const updatedRequest = await verificationService.submitVerificationRequest(request.id);
      setRequest(updatedRequest);
    } catch (err) {
      setError('Failed to submit verification request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    request,
    documents,
    error,
    submitDocument,
    submitVerificationRequest,
  };
};
