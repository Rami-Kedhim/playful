
// Fix property and query usage to use camelCase and support legacy alternatives

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  VerificationRequest, 
  VerificationStatus,
  VerificationDocument,
  DocumentType
} from '@/types/verification';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface UseVerificationStatusResult {
  verification: VerificationRequest | null;
  verificationRequest: VerificationRequest | null; // Added alias
  loading: boolean;
  error: string | null;
  createVerificationRequest: (document_type: DocumentType) => Promise<void>;
  refreshVerificationStatus: () => Promise<void>;
}

export const useVerificationStatus = (): UseVerificationStatusResult => {
  const [verification, setVerification] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    refreshVerificationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  const refreshVerificationStatus = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use eq on both legacy and current user id fields
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .or(`userId.eq.${user.id},profile_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      setVerification(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching verification status:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const createVerificationRequest = async (document_type: DocumentType) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const documentId = Math.random().toString(36).substring(2, 15);

      const pendingDoc: VerificationDocument = {
        id: documentId,
        documentType: document_type,
        status: VerificationStatus.PENDING,
        uploadedAt: new Date().toISOString(),
        fileUrl: '',
      };
      
      const { data, error } = await supabase
        .from('verification_requests')
        .insert([
          { 
            userId: user.id, 
            status: VerificationStatus.PENDING,
            documents: [pendingDoc]
          }
        ])
        .select('*')
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      setVerification(data);
      
      toast({
        title: "Verification Request Created",
        description: "Your verification request has been created and is awaiting submission.",
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error creating verification request:", err);
      
      toast({
        title: "Error Creating Request",
        description: "Failed to create verification request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    verification,
    verificationRequest: verification,
    loading,
    error,
    createVerificationRequest,
    refreshVerificationStatus
  };
};
