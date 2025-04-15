
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VerificationReviewPanel from '@/components/verification/admin/VerificationReviewPanel';
import RoleGuard from '@/components/auth/RoleGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const VerificationDashboard = () => {
  const { data: requests, refetch } = useQuery({
    queryKey: ['verification-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('verification_requests')
        .select(`
          *,
          profile:profiles(username, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async (requestId: string) => {
    const { error } = await supabase
      .from('verification_requests')
      .update({ 
        status: 'approved',
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (!error) {
      refetch();
    }
  };

  const handleReject = async (requestId: string, reason?: string) => {
    const { error } = await supabase
      .from('verification_requests')
      .update({ 
        status: 'rejected',
        reviewer_notes: reason,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (!error) {
      refetch();
    }
  };

  return (
    <RoleGuard allowedRoles={['admin', 'moderator']} showAccessDenied>
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <VerificationReviewPanel
                    requests={requests?.filter(r => r.status === 'pending') || []}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>

                <TabsContent value="approved">
                  <VerificationReviewPanel
                    requests={requests?.filter(r => r.status === 'approved') || []}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>

                <TabsContent value="rejected">
                  <VerificationReviewPanel
                    requests={requests?.filter(r => r.status === 'rejected') || []}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
};

export default VerificationDashboard;
