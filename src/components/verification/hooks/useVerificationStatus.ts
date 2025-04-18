
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
  createVerificationRequest: (document_type: string) => Promise<void>;
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
  }, [user]);
  
  const refreshVerificationStatus = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('userId', user.id)
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
  
  const createVerificationRequest = async (document_type: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Generate a random ID for the document
      const documentId = Math.random().toString(36).substring(2, 15);

      // Now includes the required 'type' property
      const pendingDoc: VerificationDocument = {
        id: documentId,
        type: document_type as DocumentType,
        document_type: document_type as DocumentType,
        status: "pending",
        uploaded_at: new Date()
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
    verificationRequest: verification, // Add alias for components using verificationRequest
    loading,
    error,
    createVerificationRequest,
    refreshVerificationStatus
  };
};
