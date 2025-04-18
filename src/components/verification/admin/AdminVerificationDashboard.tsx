
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import VerificationReviewPanel from './VerificationReviewPanel';
import ReviewRequestModal from './ReviewRequestModal';
import { VerificationRequest } from '@/types/verification'; // Import from verification types

const AdminVerificationDashboard = () => {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { refetch } = useQuery({
    queryKey: ['verification-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .order('submittedAt', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({ 
          status: 'approved',
          reviewedAt: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request Approved",
        description: "The verification request has been approved successfully.",
      });

      refetch();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve the verification request.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string, reason?: string) => {
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({ 
          status: 'rejected',
          reviewerNotes: reason,
          reviewedAt: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request Rejected",
        description: "The verification request has been rejected.",
      });

      refetch();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Error",
        description: "Failed to reject the verification request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <VerificationReviewPanel
        onApprove={async (id, notes) => {
          setSelectedRequest({ id } as VerificationRequest);
          setIsReviewModalOpen(true);
          return Promise.resolve();
        }}
        onReject={async (id, notes) => {
          setSelectedRequest({ id } as VerificationRequest);
          setIsReviewModalOpen(true);
          return Promise.resolve();
        }}
        request={{} as VerificationRequest}
        loading={false}
      />
      
      <ReviewRequestModal
        request={selectedRequest}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedRequest(null);
        }}
        onApprove={() => {
          if (selectedRequest) {
            handleApprove(selectedRequest.id);
            setIsReviewModalOpen(false);
            setSelectedRequest(null);
          }
        }}
        onReject={(reason) => {
          if (selectedRequest) {
            handleReject(selectedRequest.id, reason);
            setIsReviewModalOpen(false);
            setSelectedRequest(null);
          }
        }}
      />
    </div>
  );
};

export default AdminVerificationDashboard;
