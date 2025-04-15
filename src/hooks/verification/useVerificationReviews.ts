
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useVerificationReviews = () => {
  const [loading, setLoading] = useState(false);

  const approveRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({ 
          status: 'approved',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      await supabase.functions.invoke('send-verification-email', {
        body: { requestId, status: 'approved' }
      });

      toast({
        title: 'Success',
        description: 'Verification request approved',
      });

      return true;
    } catch (error: any) {
      console.error('Error approving request:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve request',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId: string, reason?: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({ 
          status: 'rejected',
          reviewer_notes: reason,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      await supabase.functions.invoke('send-verification-email', {
        body: { requestId, status: 'rejected', rejectionReason: reason }
      });

      toast({
        title: 'Success',
        description: 'Verification request rejected',
      });

      return true;
    } catch (error: any) {
      console.error('Error rejecting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject request',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    approveRequest,
    rejectRequest
  };
};
